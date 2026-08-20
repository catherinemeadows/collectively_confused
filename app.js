let weatherData = null;

let selectedDestination = "KPNS";


const airportNames = {

    KNDZ:
        "Whiting Field NAS North",

    KPNS:
        "Pensacola International",

    KMOB:
        "Mobile Regional",

    KHSA:
        "Stennis International",

    KTLH:
        "Tallahassee International",

    KDHN:
        "Dothan Regional"

};


const destinations = [

    "KPNS",
    "KMOB",
    "KHSA",
    "KTLH",
    "KDHN"

];


const aviationFacts = [

    "🚁 Effective translational lift occurs as the rotor system moves into relatively undisturbed air, increasing rotor efficiency. The flow of air through the rotor disk is more horizontal, which reduces induced velocity and induced drag.",

    "🌡️ A decreasing temperature–dew point spread generally indicates increasing relative humidity and a greater potential for clouds or fog.",

    "☁️ A ceiling is the height of the lowest broken or overcast cloud layer, or vertical visibility into an obscuration.",

    "🧭 Remember: when flying from high pressure toward lower pressure without resetting the altimeter, true altitude will be lower than indicated altitude.",

    "🌧️ Supercooled liquid water can remain liquid below 0°C until it contacts an aircraft surface and freezes.",

    "🌙 NVGs amplify available light rather than producing their own illumination, which makes lunar illumination and terrain shadowing important.",

    "💨 METAR wind direction is reported relative to true north.",

    "📡 A METAR describes observed weather conditions at or near an aerodrome. A TAF is a forecast.",

    "🚁 Rotor blades experience dissymmetry of lift in forward flight because the advancing blade sees a higher relative velocity than the retreating blade.",

    "🛩️ Pressure altitude is the altitude indicated when the altimeter is set to 29.92 inHg.",

    "🌫️ Radiation fog commonly favors clear skies, light winds, and enough low-level moisture for the surface temperature to cool toward the dew point.",

    "🚁 Tail rotor thrust counters the torque effect but also results in a drift-called translating tendency.",

    "🚁 The FAA Helicopter Flying Handbook notes that high humidity can produce roughly a 3 to 4% performance reduction compared with dry air at the same altitude and temperature.",

    "🌊 Water can be your windsock. FAA helicopter guidance includes visual wind estimates from water: increasing ripples, waves, whitecaps, and spray can help indicate wind strength when you're operating away from a weather station.",

    "🌬️ Gusty surface winds often indicate mechanical turbulence when strong winds interact with buildings, trees, and terrain."

];


async function loadWeather() {

    try {

        /*
         Add timestamp to URL so the browser
         does not keep using an old JSON file.
        */

        const response =
            await fetch(
                "data/weather.json?t=" +
                Date.now()
            );


        if (!response.ok) {

            throw new Error(
                "Weather file unavailable"
            );

        }


        weatherData =
            await response.json();


        renderDeparture();

        renderDestinations();

        renderSelectedAirport();

        renderSigmet();

        renderUpdateStatus();

    }

    catch (error) {

        console.error(error);

        document.getElementById(
            "data-status"
        ).innerText =
            "⚠️ Weather data could not be loaded.";

    }

}



function renderDeparture() {

    const wx =
        weatherData.airports.KNDZ;


    document.getElementById(
        "kndz-metar"
    ).innerText =
        wx.raw_metar ||
        "METAR unavailable";


    document.getElementById(
        "kndz-wind"
    ).innerText =
        wx.wind_display ||
        "---";


    document.getElementById(
        "kndz-vis"
    ).innerText =
        wx.visibility_display ||
        "---";


    document.getElementById(
        "kndz-ceiling"
    ).innerText =
        wx.ceiling_display ||
        "---";


    document.getElementById(
        "kndz-altimeter"
    ).innerText =
        wx.altimeter_display ||
        "---";


    setCategoryElement(
        document.getElementById(
            "kndz-category"
        ),
        wx.flight_category
    );

}



function renderDestinations() {

    const container =
        document.getElementById(
            "destinations"
        );


    container.innerHTML = "";


    destinations.forEach(
        airport => {

            const wx =
                weatherData.airports[
                    airport
                ];


            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "destination";


            if (
                airport ===
                selectedDestination
            ) {

                button.classList.add(
                    "active"
                );

            }


            const category =
                wx.flight_category ||
                "UNKNOWN";


            button.innerHTML = `

                <span class="destination-code">
                    ${airport}
                </span>

                <span class="destination-name">
                    ${airportNames[airport]}
                </span>

                <span
                    class="
                        mini-category
                        ${categoryClass(category)}
                    ">
                    ${category}
                </span>

            `;


            button.onclick =
                () => {

                    selectedDestination =
                        airport;

                    renderDestinations();

                    renderSelectedAirport();

                };


            container.appendChild(
                button
            );

        }
    );

}



function renderSelectedAirport() {

    const airport =
        selectedDestination;


    const wx =
        weatherData.airports[
            airport
        ];


    document.getElementById(
        "route-title"
    ).innerText =
        `KNDZ → ${airport}`;


    const container =
        document.getElementById(
            "selected-airport"
        );


    container.innerHTML = `

        <div class="airport-header">

            <div>

                <span class="eyebrow">
                    DESTINATION
                </span>

                <h2>
                    ${airport}
                </h2>

                <p>
                    ${airportNames[airport]}
                </p>

            </div>

            <div
                id="selected-category"
                class="
                    category
                    ${categoryClass(
                        wx.flight_category
                    )}
                ">

                ${
                    wx.flight_category ||
                    "UNKNOWN"
                }

            </div>

        </div>


        <div class="selected-weather">

            <span class="label">
                CURRENT METAR
            </span>

            <div class="selected-metar">

                ${
                    wx.raw_metar ||
                    "METAR unavailable"
                }

            </div>

        </div>


        <div class="weather-grid">

            <div class="weather-box">

                <span class="weather-label">
                    WIND
                </span>

                <span class="weather-value">
                    ${wx.wind_display || "---"}
                </span>

            </div>


            <div class="weather-box">

                <span class="weather-label">
                    VISIBILITY
                </span>

                <span class="weather-value">
                    ${wx.visibility_display || "---"}
                </span>

            </div>


            <div class="weather-box">

                <span class="weather-label">
                    CEILING
                </span>

                <span class="weather-value">
                    ${wx.ceiling_display || "---"}
                </span>

            </div>


            <div class="weather-box">

                <span class="weather-label">
                    ALTIMETER
                </span>

                <span class="weather-value">
                    ${wx.altimeter_display || "---"}
                </span>

            </div>

        </div>

    `;

}



function renderSigmet() {

    const sigmet =
        weatherData.kndz_convective_sigmet;


    const card =
        document.getElementById(
            "sigmet-card"
        );


    const title =
        document.getElementById(
            "sigmet-title"
        );


    const description =
        document.getElementById(
            "sigmet-description"
        );


    card.classList.remove(
        "safe",
        "danger",
        "checking",
        "unknown-sigmet"
    );


    if (
        sigmet.status ===
        "INSIDE"
    ) {

        card.classList.add(
            "danger"
        );


        title.innerText =
            "KNDZ IS INSIDE A CONVECTIVE SIGMET";


        if (
            sigmet.matches &&
            sigmet.matches.length
        ) {

            description.innerText =
                sigmet.matches
                    .map(
                        x =>
                            x.label
                    )
                    .join(" • ");

        }

        else {

            description.innerText =
                "An active convective SIGMET polygon contains KNDZ.";

        }

    }


    else if (
        sigmet.status ===
        "CLEAR"
    ) {

        card.classList.add(
            "safe"
        );


        title.innerText =
            "KNDZ is not inside a Convective SIGMET";


        description.innerText =
            "No active convective SIGMET polygon containing KNDZ was found in the latest data.";

    }


    else {

        card.classList.add(
            "unknown-sigmet"
        );


        title.innerText =
            "Convective SIGMET status unavailable";


        description.innerText =
            sigmet.message ||
            "Unable to determine current SIGMET status.";

    }

}



function renderUpdateStatus() {

    const status =
        document.getElementById(
            "data-status"
        );


    const card =
        document.getElementById(
            "status-card"
        );


    const updated =
        new Date(
            weatherData.generated_at
        );


    const now =
        new Date();


    const ageMinutes =
        Math.round(
            (
                now -
                updated
            ) /
            60000
        );


    status.innerText =
        `Weather data updated ${updated.toUTCString()} (${ageMinutes} min ago)`;


    if (
        ageMinutes > 15
    ) {

        card.classList.add(
            "stale"
        );


        status.innerText +=
            " ⚠️ DATA MAY BE STALE";

    }

}



function categoryClass(
    category
) {

    if (!category) {
        return "unknown";
    }


    return category
        .toLowerCase();

}



function setCategoryElement(
    element,
    category
) {

    element.innerText =
        category ||
        "UNKNOWN";


    element.className =
        "category " +
        categoryClass(
            category
        );

}



function showNewFact() {

    const index =
        Math.floor(
            Math.random() *
            aviationFacts.length
        );


    document.getElementById(
        "aviation-fact"
    ).innerText =
        aviationFacts[index];

}


showNewFact();

loadWeather();


/*
 Refresh the LOCAL weather.json
 every 60 seconds.

 GitHub Actions updates the file
 separately.
*/

setInterval(
    loadWeather,
    60000
);