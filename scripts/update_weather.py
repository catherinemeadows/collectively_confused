import json
import os
import re
from datetime import datetime, timezone
import time

import requests


AIRPORTS = [
    "KNDZ",
    "KPNS",
    "KMOB",
    "KHSA",
    "KTLH",
    "KDHN",
    "KCEW",
]

KNDZ_LAT = 30.7044
KNDZ_LON = -87.0230

METAR_URL = "https://aviationweather.gov/api/data/metar"
TAF_URL = "https://aviationweather.gov/api/data/taf"

TAF_AIRPORTS = [
    "KNDZ",
    "KNSE",
]
SIGMET_URL = "https://aviationweather.gov/api/data/airsigmet"

HEADERS = {
    "User-Agent": "HoveysFlightDesk/1.0 aviation weather training project"
}


def safe_float(value):
    if value is None:
        return None

    try:
        return float(value)
    except (ValueError, TypeError):
        pass

    match = re.search(r"-?\d+(?:\.\d+)?", str(value))

    if match:
        try:
            return float(match.group())
        except ValueError:
            pass

    return None


def first_value(data, keys):
    for key in keys:
        if key in data:
            value = data[key]
            if value is not None and value != "":
                return value

    return None


def normalize_metar_response(payload):
    if isinstance(payload, list):
        return payload

    if isinstance(payload, dict):
        for key in ["data", "results", "metars"]:
            if isinstance(payload.get(key), list):
                return payload[key]

    return []


def get_station_id(observation):
    station = first_value(
        observation,
        [
            "icaoId",
            "stationId",
            "station_id",
            "station",
            "id",
        ],
    )

    return str(station).upper() if station else None


def find_ceiling(observation):
    ceilings = []

    clouds = first_value(
        observation,
        ["clouds", "cloudLayers", "skyConditions"],
    )

    if isinstance(clouds, list):
        for layer in clouds:
            if not isinstance(layer, dict):
                continue

            cover = str(
                first_value(
                    layer,
                    ["cover", "amount", "skyCover"],
                )
                or ""
            ).upper()

            base = safe_float(
                first_value(
                    layer,
                    ["base", "baseFtAgl", "cloudBase"],
                )
            )

            if cover in ["BKN", "OVC", "VV"] and base is not None:
                ceilings.append(base)

    direct = safe_float(
        first_value(
            observation,
            ["ceiling", "ceil", "cig"],
        )
    )

    if direct is not None:
        if direct < 100:
            direct *= 100

        ceilings.append(direct)

    return min(ceilings) if ceilings else None


def determine_category(ceiling, visibility):
    if (
        (ceiling is not None and ceiling < 500)
        or
        (visibility is not None and visibility < 1)
    ):
        return "LIFR"

    if (
        (ceiling is not None and ceiling < 1000)
        or
        (visibility is not None and visibility < 3)
    ):
        return "IFR"

    if (
        (ceiling is not None and ceiling <= 3000)
        or
        (visibility is not None and visibility <= 5)
    ):
        return "MVFR"

    if ceiling is not None or visibility is not None:
        return "VFR"

    return "UNKNOWN"


def format_visibility(visibility):
    if visibility is None:
        return "---"

    if visibility >= 10:
        return "10+ SM"

    return f"{visibility:g} SM"


def format_ceiling(ceiling):
    if ceiling is None:
        return "No BKN/OVC ceiling reported"

    return f"{int(ceiling):,} ft AGL"


def format_wind(observation):
    direction = first_value(
        observation,
        ["wdir", "windDir", "windDirection"],
    )

    speed = safe_float(
        first_value(
            observation,
            ["wspd", "windSpeed"],
        )
    )

    gust = safe_float(
        first_value(
            observation,
            ["wgst", "windGust"],
        )
    )

    if direction is None and speed is None:
        return "---"

    if speed == 0:
        return "Calm"

    if str(direction).upper() in ["VRB", "VARIABLE"]:
        direction_text = "VRB"

    else:
        number = safe_float(direction)

        if number is not None:
            direction_text = f"{int(number):03d}°"
        else:
            direction_text = str(direction)

    text = f"{direction_text} @ {int(speed or 0)} kt"

    if gust is not None and gust > 0:
        text += f" G{int(gust)}"

    return text


def format_altimeter(observation):
    value = safe_float(
        first_value(
            observation,
            ["altim", "altimeter"],
        )
    )

    if value is None:
        return "---"

    if value > 100:
        value = value * 0.0295299830714

    return f"{value:.2f} inHg"


def process_observation(observation):
    raw_metar = first_value(
        observation,
        ["rawOb", "rawText", "raw_text", "metar"],
    )

    visibility = safe_float(
        first_value(
            observation,
            ["visib", "visibility", "visibilityStatuteMiles"],
        )
    )

    ceiling = find_ceiling(observation)

    category = first_value(
        observation,
        ["fltCat", "flightCategory", "flight_category"],
    )

    if category:
        category = str(category).upper()
    else:
        category = determine_category(
            ceiling,
            visibility,
        )

    observation_time = first_value(
        observation,
        [
            "obsTime",
            "observationTime",
            "observation_time",
            "reportTime",
        ],
    )

    return {
        "raw_metar": raw_metar,
        "flight_category": category,
        "visibility_sm": visibility,
        "visibility_display": format_visibility(visibility),
        "ceiling_ft_agl": ceiling,
        "ceiling_display": format_ceiling(ceiling),
        "wind_display": format_wind(observation),
        "altimeter_display": format_altimeter(observation),
        "observation_time": observation_time,
    }


def fetch_metars():
    response = get_with_retries(
        METAR_URL,
        params={
            "ids": ",".join(AIRPORTS),
            "format": "json",
        },
    )

    response.raise_for_status()

    observations = normalize_metar_response(
        response.json()
    )

    result = {}

    for observation in observations:
        station = get_station_id(observation)

        if station in AIRPORTS:
            result[station] = process_observation(
                observation
            )

    for airport in AIRPORTS:
        if airport not in result:
            result[airport] = {
                "raw_metar": "METAR unavailable",
                "flight_category": "UNKNOWN",
                "visibility_sm": None,
                "visibility_display": "---",
                "ceiling_ft_agl": None,
                "ceiling_display": "---",
                "wind_display": "---",
                "altimeter_display": "---",
                "observation_time": None,
            }

    return result

def fetch_tafs():
    response = get_with_retries(
        TAF_URL,
        params={
            "ids": ",".join(TAF_AIRPORTS),
            "format": "json",
        },
    )

    response.raise_for_status()

    tafs = response.json()

    result = {}

    for taf in tafs:
        station = get_station_id(taf)

        if station in TAF_AIRPORTS:
            result[station] = {
                "raw_taf": taf.get(
                    "rawTAF",
                    "TAF unavailable"
                )
            }

    for airport in TAF_AIRPORTS:
        if airport not in result:
            result[airport] = {
                "raw_taf": "TAF unavailable"
            }

    return result


def point_in_ring(lon, lat, ring):
    inside = False
    j = len(ring) - 1

    for i in range(len(ring)):
        xi, yi = ring[i][0], ring[i][1]
        xj, yj = ring[j][0], ring[j][1]

        intersects = (
            ((yi > lat) != (yj > lat))
            and
            (
                lon
                <
                (
                    (xj - xi)
                    * (lat - yi)
                    / ((yj - yi) or 1e-12)
                    + xi
                )
            )
        )

        if intersects:
            inside = not inside

        j = i

    return inside


def point_in_polygon(lon, lat, polygon):
    if not polygon:
        return False

    if not point_in_ring(
        lon,
        lat,
        polygon[0],
    ):
        return False

    for hole in polygon[1:]:
        if point_in_ring(
            lon,
            lat,
            hole,
        ):
            return False

    return True


def point_in_geometry(lon, lat, geometry):
    if not geometry:
        return False

    geometry_type = geometry.get("type")
    coordinates = geometry.get(
        "coordinates",
        [],
    )

    if geometry_type == "Polygon":
        return point_in_polygon(
            lon,
            lat,
            coordinates,
        )

    if geometry_type == "MultiPolygon":
        return any(
            point_in_polygon(
                lon,
                lat,
                polygon,
            )
            for polygon in coordinates
        )

    return False


def is_convective_sigmet(feature):
    properties = feature.get(
        "properties",
        {},
    )

    text = json.dumps(
        properties
    ).upper()

    return (
        "CONVECTIVE SIGMET" in text
        or
        "CONVECTIVE" in text
        or
        "THUNDERSTORM" in text
    )


def sigmet_label(feature):
    properties = feature.get(
        "properties",
        {},
    )

    for key in [
        "rawAirSigmet",
        "rawSigmet",
        "rawText",
        "raw_text",
        "name",
        "id",
        "sigmetId",
        "airSigmetId",
    ]:
        value = properties.get(key)

        if value:
            return str(value).strip()[:300]

    return "Active Convective SIGMET"


# def fetch_kndz_convective_sigmet():
    try:
        response = get_with_retries(
            SIGMET_URL,
            params={
                "format": "geojson",
            },
        )

        if response.status_code == 204:
            return {
                "status": "CLEAR",
                "matches": [],
            }

        response.raise_for_status()

        payload = response.json()

        features = payload.get(
            "features",
            [],
        )

        matches = []

        for feature in features:
            if not is_convective_sigmet(
                feature
            ):
                continue

            if point_in_geometry(
                KNDZ_LON,
                KNDZ_LAT,
                feature.get("geometry"),
            ):

                matches.append(
                    {
                        "label": sigmet_label(feature),

                        "geometry": feature.get("geometry"),

                        "properties": feature.get("properties",
                        {})
                    }
                )

        if matches:
            return {
                "status": "INSIDE",
                "matches": matches,
            }

        return {
            "status": "CLEAR",
            "matches": [],
        }

    except Exception as error:
        print(
            "SIGMET ERROR:",
            error,
        )

        return {
            "status": "UNKNOWN",
            "matches": [],
            "message":
                "Unable to retrieve SIGMET data.",
        }

def fetch_kndz_convective_sigmet():
    
    try:

        response = get_with_retries(
            SIGMET_URL,
            params={
                "format": "geojson"
            },
        )


        if response.status_code == 204:

            return {
                "status": "CLEAR",
                "matches": [],
                "active_sigmets": []
            }


        response.raise_for_status()

        payload = response.json()

        features = payload.get(
            "features",
            []
        )


        kndz_matches = []

        active_sigmets = []


        for feature in features:

            # Skip anything that isn't
            # a Convective SIGMET
            if not is_convective_sigmet(
                feature
            ):
                continue


            geometry = feature.get(
                "geometry"
            )


            if not geometry:
                continue


            item = {

                "label":
                    sigmet_label(
                        feature
                    ),

                "geometry":
                    geometry,

                "properties":
                    feature.get(
                        "properties",
                        {}
                    )

            }


            # Save ALL active Convective SIGMETs
            # so the browser can check routes
            # and destinations.
            active_sigmets.append(
                item
            )


            # Separately determine whether
            # KNDZ itself is inside one.
            if point_in_geometry(
                KNDZ_LON,
                KNDZ_LAT,
                geometry
            ):

                kndz_matches.append(
                    item
                )


        return {

            "status":
                "INSIDE"
                if kndz_matches
                else "CLEAR",

            "matches":
                kndz_matches,

            "active_sigmets":
                active_sigmets

        }


    except Exception as error:

        print(
            "SIGMET ERROR:",
            error
        )


        return {

            "status":
                "UNKNOWN",

            "matches":
                [],

            "active_sigmets":
                [],

            "message":
                "Unable to retrieve SIGMET data."

        }

def main():
    print("Fetching METAR data...")

    try:
        airports = fetch_metars()

    except Exception as error:
        print(
            "METAR ERROR:",
            error,
        )

        airports = {}

        for airport in AIRPORTS:
            airports[airport] = {
                "raw_metar":
                    "METAR unavailable",

                "flight_category":
                    "UNKNOWN",

                "visibility_display":
                    "---",

                "ceiling_display":
                    "---",

                "wind_display":
                    "---",

                "altimeter_display":
                    "---",
            }

    print(
        "Checking Convective SIGMETs..."
    )

    sigmet = (
        fetch_kndz_convective_sigmet()
    )

    data = {
        "generated_at":
            datetime.now(
                timezone.utc
            ).isoformat(),

        "departure":
            "KNDZ",

        "airports":
            airports,

        "kndz_convective_sigmet":
            sigmet,
    }

    tafs = fetch_tafs()

    data = {
    "generated_at":
        datetime.now(
            timezone.utc
        ).isoformat(),

    "departure":
        "KNDZ",

    "airports":
        airports,

    "tafs":
        tafs,

    "kndz_convective_sigmet":
        sigmet,
}

    os.makedirs(
        "data",
        exist_ok=True,
    )

    with open(
        "data/weather.json",
        "w",
        encoding="utf-8",
    ) as file:

        json.dump(
            data,
            file,
            indent=2,
        )

    print(
        "Weather data written "
        "to data/weather.json"
    )

def get_with_retries(
    url,
    params=None,
    attempts=4
):
    """
    Retry temporary Aviation Weather
    Center server failures.
    """

    for attempt in range(1, attempts + 1):

        try:

            response = requests.get(
                url,
                params=params,
                headers=HEADERS,
                timeout=45,
            )


            if response.status_code in [
                502,
                503,
                504
            ]:

                print(
                    f"AWC temporary error "
                    f"{response.status_code}. "
                    f"Attempt {attempt}/{attempts}"
                )


                if attempt < attempts:

                    wait_seconds = (
                        attempt * 10
                    )

                    print(
                        f"Waiting "
                        f"{wait_seconds} seconds..."
                    )

                    time.sleep(
                        wait_seconds
                    )

                    continue


            response.raise_for_status()

            return response


        except requests.RequestException as error:

            print(
                f"Request failed on "
                f"attempt {attempt}/{attempts}: "
                f"{error}"
            )


            if attempt == attempts:
                raise


            time.sleep(
                attempt * 10
            )


    raise RuntimeError(
        "Aviation Weather request failed."
    )


if __name__ == "__main__":
    main()
