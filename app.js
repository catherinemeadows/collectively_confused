let weatherData = null;

let selectedDestination = "KPNS";

let routeLayer = null;

let sigmetMap = null;
let sigmetLayer = null;
let destinationMarker = null;

let watchMap = null;
let watchLayer = null;
let watchRouteLayer = null;
let watchDestinationMarker = null;

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
        "Dothan Regional",
    
    KCEW:
        "Bob Sikes Airport",
    
    KNPA:
        "Naval Air Station Pensacola",
    
    KGPT:
        "Gulfport-Biloxi International",
    
    KJKA:
        "Jack Edwards Field",
    
    KPQL:
        "Trent Lott International Airport",
    
    KBFM:
        "Mobile International Airport",

    KMAI:
        "Marianna Municipal Airport",
        
};


const destinations = [

    "KPNS",
    "KMOB",
    "KHSA",
    "KTLH",
    "KDHN",
    "KCEW",
    "KNPA",
    "KGPT",
    "KJKA",
    "KPQL",
    "KBFM",
    "KMAI",

];

const airportCoordinates = {

    KNDZ: {
        lat: 30.7044,
        lon: -87.0230
    },

    KPNS: {
        lat: 30.4734,
        lon: -87.1866
    },

    KCEW: {
        lat: 30.7788,
        lon: -86.5221
    },

    KMOB: {
        lat: 30.6914,
        lon: -88.2428
    },

    KHSA: {
        lat: 30.3678,
        lon: -89.4546
    },

    KTLH: {
        lat: 30.3965,
        lon: -84.3503
    },

    KDHN: {
        lat: 31.3213,
        lon: -85.4496
    },

    KGPT: {
        lat: 30.4072692,
        lon: -89.0700958
    },

    KJKA: {
        lat: 30.2896389,
        lon: -87.6717778
    },

    KNPA: {
        lat: 30.3532728,
        lon: -87.3179711
    },

    KPQL: {
        lat: 30.4628,
        lon: -88.5292
    },

    KBFM: {
        lat: 30.6269,
        lon: -88.0689
    },

    KMAI: {
        lat: 30.5172,
        lon: -88.0397
    },

};


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

    "🌬️ Gusty surface winds often indicate mechanical turbulence when strong winds interact with buildings, trees, and terrain.",

    "🌬️ Density altitude matters! Hot, humid, and high conditions reduce helicopter performance because the air is less dense." ,

    "☀️ A helicopter may have plenty of power on a cool morning but struggle on a hot afternoon because increased density altitude reduces available power and increases power required." ,
   
    "🌫️ Haze can make distant objects appear farther away or less distinct, which can make judging distance and terrain more difficult during training flights." ,

    "🚁 Translational lift occurs when a helicopter gains enough forward airspeed to fly into cleaner, more horizontal airflow, making the rotor system more efficient." ,

    "🌡️ The temperature/dew-point spread is important for aviation weather. When the two get very close, the potential for fog or low clouds increases" ,

    "💨 Vortex ring state is more likely with high power, low airspeed, and a high rate of descent—conditions that allow the rotor to become immersed in its own vortices." ,

    "🔄 Autorotation works because the upward flow of air through the rotor during the descent keeps the blades rotating after a loss of engine power." ,

    "⚖️ The retreating blade has a lower relative airspeed than the advancing blade, so helicopters have aerodynamic limits that airplanes don't encounter in the same way." ,

    "🛩️ Dissymmetry of lift occurs because the advancing blade initially produces more lift than the retreating blade. Blade flapping helps equalize the lift across the rotor disk." ,

    "💧 Humidity also affects density altitude. Moist air is actually less dense than dry air, so high humidity can slightly reduce aircraft performance." ,

    "⛰️ High elevation + high temperature + high humidity can create a significant density-altitude problem, especially for helicopters operating near their performance limits." ,

    "☀️ A dark-colored or paved surface can create localized heating, producing thermals and turbulence that can affect low-level helicopter operations." ,

    "⛈️ A thunderstorm can produce dangerous winds well outside the visible rain shaft, so simply avoiding the precipitation core doesn't necessarily eliminate the hazard." ,

    "🌫️ A small temperature/dew-point spread can be an early clue for fog or low clouds, especially when winds are light." ,

    "🌊 Water, sand, grass, and other surfaces can change the effectiveness of ground effect, so the actual environment matters when evaluating hover performance." ,

    "🌀 Retreating blade stall can occur at high airspeeds when the retreating blade doesn't have enough relative airflow to produce the required lift." ,

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
        renderTafs();
        renderDestinations();
        renderSelectedAirport();
        renderSigmet();
        renderWatches();
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

function renderTafs() {

    console.log("hello");
    const tafElement =
        document.getElementById("knse-taf");

    const etaInput =
        document.getElementById("knse-eta");

    const etaButton =
        document.getElementById("knse-eta-button");

    const etaWindow =
        document.getElementById("knse-eta-window");

    const rawToggle =
        document.getElementById("knse-raw-toggle");

    const rawElement =
        document.getElementById("knse-raw-taf");


    if (!tafElement || !etaInput || !etaButton) {
        return;
    }


    const rawTaf =
        weatherData?.tafs?.KNSE?.raw_taf;


    if (!rawTaf || rawTaf === "TAF unavailable") {

        tafElement.innerHTML =
            `<p>TAF unavailable</p>`;

        return;
    }


    // Parse the TAF into forecast periods
    let periods;

    try {

        periods =
            parseTafPeriods(rawTaf);

    } catch (error) {

        console.error(
            "TAF parsing error:",
            error
        );

        tafElement.innerText =
            "Unable to read TAF.";

        return;
    }

    // Build the full TAF display:
    // readable forecast periods first,
    // raw coded TAF at the bottom.
    const fullTafElement =
        document.getElementById("knse-full-taf");

    if (fullTafElement) {
        const readableTafs =
            periods
                .map(period => {

                    return `
                        <div class="taf-period">

                            <div class="taf-time">
                                ${period.time}
                            </div>

                            <div class="taf-summary">
                                ${formatTafConditions(
                                    period.conditions
                                )}
                            </div>

                        </div>
                    `;

                })
                .join("");
        
        const formattedRawTaf =
            rawTaf.replace(
                /\s+(BECMG|TEMPO|FM\d{6}|PROB\d{2})/g,
                "\n\n$1"
            );

        fullTafElement.innerHTML = `

            <div class="taf-full-readable">

                <h3>Full TAF Forecast</h3>

                ${readableTafs}

            </div>

            <div class="taf-full-raw">

                <h3>Raw TAF</h3>

                <pre>${formattedRawTaf}</pre>

            </div>

        `;
    }

    rawToggle.addEventListener("click", function () {
        if (!fullTafElement) {
            console.error("Full TAF element not found");
            return;
        }

        const currentlyHidden =
            fullTafElement.hasAttribute("hidden");

        console.log(
            "Currently hidden:",
            currentlyHidden
        );

        if (currentlyHidden) {

            // SHOW
            fullTafElement.removeAttribute("hidden");

            rawToggle.innerText =
                "▾ Hide Full TAF";

        } else {

            // HIDE
            fullTafElement.setAttribute(
                "hidden",
                ""
            );

            rawToggle.innerText =
                "▸ Show Full TAF";

        }

    });


    // Show forecast when ETA button is clicked
    etaButton.addEventListener(
        "click",
        function () {

            const eta =
                new Date(etaInput.value);


            if (isNaN(eta.getTime())) {

                tafElement.innerHTML =
                    `<p>Please enter an ETA.</p>`;

                etaWindow.innerText =
                    "";

                return;
            }


            // One hour before ETA
            const windowStart =
                new Date(
                    eta.getTime() -
                    60 * 60 * 1000
                );


            // One hour after ETA
            const windowEnd =
                new Date(
                    eta.getTime() +
                    60 * 60 * 1000
                );


            // Display the user's local time
            etaWindow.innerText =
                `Forecast window: ${
                    formatUserLocalTime(windowStart)
                } – ${
                    formatUserLocalTime(windowEnd)
                }`;


            // Find TAF periods that overlap
            // the ±1 hour ETA window
            const applicablePeriods =
                periods.filter(
                    period =>
                        period.start < windowEnd &&
                        period.end > windowStart
                );


            if (!applicablePeriods.length) {

                tafElement.innerHTML =
                    `<p>
                        No TAF conditions apply
                        to this ETA window.
                    </p>`;

                return;
            }


            tafElement.innerHTML =
                applicablePeriods
                    .map(period => {

                        return `
                            <div class="taf-period">

                                <div class="taf-time">
                                    ${period.time}
                                </div>

                                <div class="taf-summary">
                                    ${formatTafConditions(
                                        period.conditions
                                    )}
                                </div>

                            </div>
                        `;

                    })
                    .join("");

        }
    );

}

function parseTafPeriods(rawTaf) {

    // Clean up whitespace
    const taf =
        rawTaf
            .replace(/\s+/g, " ")
            .trim();

    const validityMatch =
        taf.match(
            /\b(\d{2})(\d{2})\/(\d{2})(\d{2})\b/
        );


    if (!validityMatch) {
        return [];
    }


    const startDay =
        Number(validityMatch[1]);

    const startHour =
        Number(validityMatch[2]);

    const endDay =
        Number(validityMatch[3]);

    const endHour =
        Number(validityMatch[4]);


    const startDate =
        makeTafDate(
            startDay,
            startHour,
            0
        );


    const tafEndDate =
        makeTafDate(
            endDay,
            endHour,
            0,
            startDate
        );


    /*
       Everything after the validity
       group begins the forecast.
    */

    const validityIndex =
        taf.indexOf(
            validityMatch[0]
        );


    const forecastText =
        taf.substring(
            validityIndex +
            validityMatch[0].length
        ).trim();


    /*
       Split at:

       FM201800
       TEMPO 2020/2024
       BECMG 2021/2023
    */

    const changeRegex =
        /\b(FM\d{6}|TEMPO\s+\d{4}\/\d{4}|BECMG\s+\d{4}\/\d{4})\b/g;


    const changes = [];

    let match;


    while (
        (
            match =
                changeRegex.exec(
                    forecastText
                )
        ) !== null
    ) {

        changes.push({

            marker:
                match[0],

            index:
                match.index

        });

    }


    const periods = [];


    /*
       Initial prevailing forecast
    */

    const firstChangeIndex =
        changes.length
            ? changes[0].index
            : forecastText.length;


    const initialConditions =
        forecastText
            .substring(
                0,
                firstChangeIndex
            )
            .trim();


    if (initialConditions) {

        const firstEnd =
            changes.length
                ? getChangeStartDate(
                    changes[0].marker,
                    startDate
                )
                : tafEndDate;


        periods.push({

            type:
                "PREVAILING",

            start:
                startDate,

            end:
                firstEnd,

            conditions:
                initialConditions

        });

    }


    /*
       Process FM / TEMPO / BECMG
    */

    changes.forEach(
        (change, index) => {

            const next =
                changes[
                    index + 1
                ];


            const conditionStart =
                change.index +
                change.marker.length;


            const conditionEnd =
                next
                    ? next.index
                    : forecastText.length;


            const conditions =
                forecastText
                    .substring(
                        conditionStart,
                        conditionEnd
                    )
                    .trim();


            if (
                change.marker
                    .startsWith("FM")
            ) {

                const start =
                    getChangeStartDate(
                        change.marker,
                        startDate
                    );


                const end =
                    next
                        ? getChangeStartDate(
                            next.marker,
                            start
                        )
                        : tafEndDate;


                periods.push({

                    type:
                        "FM",

                    start:
                        start,

                    end:
                        end,

                    conditions:
                        conditions

                });

            }


            else if (
                change.marker
                    .startsWith("TEMPO")
            ) {

                const range =
                    getRangeDates(
                        change.marker,
                        startDate
                    );


                periods.push({

                    type:
                        "TEMPO",

                    start:
                        range.start,

                    end:
                        range.end,

                    conditions:
                        conditions

                });

            }


            else if (
                change.marker
                    .startsWith("BECMG")
            ) {

                const range =
                    getRangeDates(
                        change.marker,
                        startDate
                    );


                periods.push({

                    type:
                        "BECMG",

                    start:
                        range.start,

                    end:
                        range.end,

                    conditions:
                        conditions

                });

            }

        }
    );


    return periods.map(
        period => {

            return {

                ...period,

                time:
                    formatTafTimeRange(
                        period.start,
                        period.end,
                        period.type
                    )

            };

        }
    );

}


const TAF_TIME_ZONE =
    "America/Chicago";


function makeTafDate(
    day,
    hour,
    minute = 0,
    referenceDate = new Date()
) {

    /*
       Start with current UTC
       month/year.
    */

    let year =
        referenceDate.getUTCFullYear();

    let month =
        referenceDate.getUTCMonth();


    /*
       Handle TAFs that cross
       into another month.
    */

    const referenceDay =
        referenceDate.getUTCDate();


    if (
        day < referenceDay - 15
    ) {

        month += 1;

    }


    else if (
        day > referenceDay + 15
    ) {

        month -= 1;

    }


    return new Date(
        Date.UTC(
            year,
            month,
            day,
            hour,
            minute
        )
    );

}

function formatUserLocalTime(date) {
    return new Intl.DateTimeFormat(
        "en-US",
        {
            hour: "numeric",
            minute: "2-digit"
        }
    ).format(date);
}

function getChangeStartDate(
    marker,
    referenceDate
) {

    /*
       FMDDHHMM
       Example:
       FM201800
    */

    if (
        marker.startsWith("FM")
    ) {

        const match =
            marker.match(
                /FM(\d{2})(\d{2})(\d{2})/
            );


        if (!match) {
            return referenceDate;
        }


        return makeTafDate(
            Number(match[1]),
            Number(match[2]),
            Number(match[3]),
            referenceDate
        );

    }


    /*
       TEMPO DDHH/DDHH
       or BECMG DDHH/DDHH
    */

    const match =
        marker.match(
            /(\d{2})(\d{2})\/(\d{2})(\d{2})/
        );


    if (!match) {
        return referenceDate;
    }


    return makeTafDate(
        Number(match[1]),
        Number(match[2]),
        0,
        referenceDate
    );

}

function getRangeDates(
    marker,
    referenceDate
) {

    const match =
        marker.match(
            /(\d{2})(\d{2})\/(\d{2})(\d{2})/
        );


    if (!match) {

        return {

            start:
                referenceDate,

            end:
                referenceDate

        };

    }


    const start =
        makeTafDate(
            Number(match[1]),
            Number(match[2]),
            0,
            referenceDate
        );


    const end =
        makeTafDate(
            Number(match[3]),
            Number(match[4]),
            0,
            start
        );


    return {
        start,
        end
    };

}

function formatLocalTime(date) {

    return new Intl.DateTimeFormat(
        "en-US",
        {
            timeZone:
                TAF_TIME_ZONE,

            hour:
                "numeric",

            minute:
                "2-digit",

            timeZoneName:
                "short"
        }
    ).format(date);

}

function formatLocalDay(date) {

    return new Intl.DateTimeFormat(
        "en-US",
        {
            timeZone:
                TAF_TIME_ZONE,

            weekday:
                "short"
        }
    ).format(date);

}

function formatTafTimeRange(
    start,
    end,
    type
) {

    const startDay =
        formatLocalDay(start);

    const endDay =
        formatLocalDay(end);


    let label =
        `${formatLocalTime(start)} – ` +
        `${formatLocalTime(end)}`;


    if (
        startDay !== endDay
    ) {

        label =
            `${startDay} ${formatLocalTime(start)} – ` +
            `${endDay} ${formatLocalTime(end)}`;

    }


    if (type === "TEMPO") {

        return (
            `⚠️ TEMPORARY: ${label}`
        );

    }


    if (type === "BECMG") {

        return (
            `🔄 BECOMING: ${label}`
        );

    }


    return label;

}

function formatTafConditions(
    conditions
) {

    const parts = [];


    /*
       WIND

       Example:
       18012G20KT
    */

    const wind =
        conditions.match(
            /\b(\d{3}|VRB)(\d{2,3})(G\d{2,3})?KT\b/
        );


    if (wind) {

        const direction =
            wind[1] === "VRB"
                ? "Variable"
                : `${wind[1]}°`;


        let windText =
            `💨 ${direction} @ ${Number(wind[2])} kt`;


        if (wind[3]) {

            windText +=
                ` gusting ${Number(
                    wind[3].substring(1)
                )} kt`;

        }


        parts.push(
            windText
        );

    }


    /*
       VISIBILITY
    */

    const visibility =
        conditions.match(
            /\b(P?\d+(?:\/\d+)?|P6)SM\b/
        );


    if (visibility) {

        let value =
            visibility[1];


        if (value === "P6") {

            value =
                "greater than 6";

        }


        parts.push(
            `👁️ Visibility: ${value} SM`
        );

    }


    /*
       CLOUDS
    */

    const cloudRegex =
        /\b(FEW|SCT|BKN|OVC)(\d{3})\b/g;


    const clouds = [];

    let cloudMatch;


    while (
        (
            cloudMatch =
                cloudRegex.exec(
                    conditions
                )
        ) !== null
    ) {

        const amount =
            cloudMatch[1];


        const height =
            Number(
                cloudMatch[2]
            ) * 100;


        clouds.push(
            `${amount} ${height.toLocaleString()} ft`
        );

    }


    if (clouds.length) {

        parts.push(
            `☁️ ${clouds.join(", ")}`
        );

    }


    /*
       WEATHER

       Keep common TAF codes recognizable
       but give pilots a plain-English cue.
    */

    const weather = [];


    if (
        /\bTSRA\b/.test(
            conditions
        )
    ) {

        weather.push(
            "⛈️ Thunderstorms with rain"
        );

    }


    else if (
        /\bRA\b/.test(
            conditions
        )
    ) {

        weather.push(
            "🌧️ Rain"
        );

    }


    if (
        /\bBR\b/.test(
            conditions
        )
    ) {

        weather.push(
            "🌫️ Mist"
        );

    }


    if (
        /\bFG\b/.test(
            conditions
        )
    ) {

        weather.push(
            "🌫️ Fog"
        );

    }


    if (
        /\bHZ\b/.test(
            conditions
        )
    ) {

        weather.push(
            "🌫️ Haze"
        );

    }


    parts.push(
        ...weather
    );


    /*
       If there is something we
       didn't decode, retain the
       original aviation shorthand.
    */

    parts.push(
        `<span class="taf-code">
            ${conditions}
        </span>`
    );


    return parts.join(
        "<br>"
    );

}

function renderDestinations() {

    const container =
        document.getElementById("destinations");

    if (!container || !weatherData) {
        return;
    }

    container.innerHTML = "";


    destinations.forEach(airport => {

        const wx =
            weatherData.airports[airport];


        const button =
            document.createElement("button");


        // Important: prevent any strange
        // form/button behavior
        button.type = "button";

        button.className = "destination";

        button.dataset.airport = airport;


        if (airport === selectedDestination) {

            button.classList.add("active");

        }


        const category =
            wx?.flight_category || "UNKNOWN";


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


        button.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                event.stopPropagation();

                selectedDestination =
                    airport;

                renderDestinations();
                renderSelectedAirport();
                renderSigmet();
                renderWatches();

            }
        );


        container.appendChild(button);

    });

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

                <div class="selected-airport-taf">
                <br>
            <span class="label">
                TERMINAL AERODROME FORECAST
            </span>

            <h3>
                ✈️ ${airport} TAF
            </h3>

            <label for="selected-taf-eta">
                ETA (Local Time)
            </label>

            <div class="taf-eta-controls">

                <input
                    type="datetime-local"
                    id="selected-taf-eta"
                >

                <button
                    id="selected-taf-eta-button"
                    type="button"
                >
                    Show TAF
                </button>

            </div>

            <div
                id="selected-taf-window"
                class="taf-window">
            </div>

            <div
                id="selected-taf"
                class="taf-readable"
            >
                Enter an ETA to see applicable forecasts.
            </div>
            <br>

            <button
                id="selected-taf-full-button"
                type="button"
            >
                ▸ Show Full TAF
            </button>

            <br>
            

            <div
                id="selected-taf-full"
                class="taf-full"
                hidden
            ></div>

        </div>

    `;

    renderSelectedAirportTaf();

}

function renderSelectedAirportTaf() {

    const airport = selectedDestination;

    const tafElement =
        document.getElementById("selected-taf");

    const etaInput =
        document.getElementById("selected-taf-eta");

    const etaButton =
        document.getElementById("selected-taf-eta-button");

    const etaWindow =
        document.getElementById("selected-taf-window");

    const fullButton =
        document.getElementById("selected-taf-full-button");

    const fullElement =
        document.getElementById("selected-taf-full");


    if (
        !tafElement ||
        !etaInput ||
        !etaButton ||
        !etaWindow ||
        !fullButton ||
        !fullElement
    ) {
        return;
    }

    const rawTaf =
        weatherData?.tafs?.[airport]?.raw_taf;


    if (!rawTaf || rawTaf === "TAF unavailable") {

        tafElement.innerHTML =
            `<p>TAF unavailable</p>`;

        fullButton.hidden = true;

        return;
    }


    let periods;

    try {

        periods =
            parseTafPeriods(rawTaf);

    } catch (error) {

        console.error(
            "TAF parsing error:",
            error
        );

        tafElement.innerText =
            "Unable to read TAF.";

        return;
    }

    console.log("ello");


    /*
     * FULL TAF
     *
     * Show every readable TAF period,
     * followed by the raw TAF.
     */

    const formattedRawTaf =
        rawTaf.replace(
                /\s+(BECMG|TEMPO|FM\d{6}|PROB\d{2})/g,
                "\n\n$1"
        );


    fullElement.innerHTML = `

        <div class="taf-all-readable">
            <h3>Full TAF Forecast</h3>
            ${periods
                .map(period => {

                    return `
                        <div class="taf-period">

                            <div class="taf-time">
                                ${period.time}
                            </div>

                            <div class="taf-summary">
                                ${formatTafConditions(
                                    period.conditions
                                )}
                            </div>

                        </div>
                    `;

                })
                .join("")
            }

        </div>

        <div class="taf-raw-section">
            <div class="taf-raw-title">
                <h3>Raw TAF</h3>
            </div>
             <pre>${formattedRawTaf}</pre>

        </div>

    `;

    /*
     * SHOW / HIDE FULL TAF
     */

    fullButton.addEventListener(
        "click",
        function () {

            const isHidden =
                fullElement.hidden;

            fullElement.hidden =
                !isHidden;

            fullButton.innerText =
                isHidden
                    ? "▾ Hide Full TAF"
                    : "▸ Show Full TAF";

        }
    );


    /*
     * SHOW TAF FOR ETA ±1 HOUR
     */

    etaButton.addEventListener(
        "click",
        function () {

            const eta =
                new Date(etaInput.value);


            if (isNaN(eta.getTime())) {

                tafElement.innerHTML =
                    `<p>Please enter an ETA.</p>`;

                etaWindow.innerText =
                    "";

                return;
            }


            const windowStart =
                new Date(
                    eta.getTime() -
                    60 * 60 * 1000
                );


            const windowEnd =
                new Date(
                    eta.getTime() +
                    60 * 60 * 1000
                );


            etaWindow.innerText =
                `Forecast window: ${
                    formatUserLocalTime(windowStart)
                } – ${
                    formatUserLocalTime(windowEnd)
                }`;


            const applicablePeriods =
                periods.filter(
                    period =>
                        period.start < windowEnd &&
                        period.end > windowStart
                );


            if (!applicablePeriods.length) {

                tafElement.innerHTML =
                    `<p>
                        No TAF conditions apply
                        to this ETA window.
                    </p>`;

                return;
            }


            tafElement.innerHTML =
                applicablePeriods
                    .map(period => {

                        return `
                            <div class="taf-period">

                                <div class="taf-time">
                                    ${period.time}
                                </div>

                                <div class="taf-summary">
                                    ${formatTafConditions(
                                        period.conditions
                                    )}
                                </div>

                            </div>
                        `;

                    })
                    .join("");

        }
    );

}

function renderSigmet() {

    const sigmet =
        weatherData?.kndz_convective_sigmet;


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

    if (!sigmet) {

        title.innerText =
            "SIGMET data unavailable";

        description.innerText =
            "Unable to check convective weather.";

        return;

    }


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

    renderSigmetMap();
    renderSigmetDetails();
    renderWatchDetails();
    renderWatchMap();

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

/* =================================
   MAIN WEBSITE TABS
================================= */

document
    .querySelectorAll(".tab-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            function(event) {

                event.preventDefault();


                const selectedTab =
                    this.dataset.tab;


                document
                    .querySelectorAll(".tab-button")
                    .forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });


                document
                    .querySelectorAll(".tab-content")
                    .forEach(content => {

                        content.classList.remove(
                            "active"
                        );

                    });


                this.classList.add(
                    "active"
                );


                const target =
                    document.getElementById(
                        selectedTab
                    );


                if (target) {
                    target.classList.add(
                        "active"
                    );
                }
                if (selectedTab === "flight-planning") {
                    refreshSigmetMap();
                }

            }
        );

    });

// SIGMET FUNCTIONS // 
// **************** //
function renderSigmetMap() {

    const mapElement =
        document.getElementById(
            "sigmet-map"
        );

    if (!mapElement) {
        return;
    }


    const kndz = [
        airportCoordinates.KNDZ.lat,
        airportCoordinates.KNDZ.lon
    ];


    /*
       Create map only once
    */

    if (!sigmetMap) {

        sigmetMap =
            L.map(
                "sigmet-map"
            ).setView(
                kndz,
                7
            );


        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                attribution:
                    "&copy; OpenStreetMap contributors"
            }
        ).addTo(
            sigmetMap
        );


        /*
           Permanent KNDZ marker
        */

        L.marker(
            kndz
        )
        .addTo(
            sigmetMap
        )
        .bindPopup(
            "<strong>KNDZ</strong><br>Departure"
        );

    }


    /*
       Remove old route
    */

    if (routeLayer) {

        sigmetMap.removeLayer(
            routeLayer
        );

        routeLayer = null;

    }


    /*
       Remove old destination marker
    */

    if (destinationMarker) {

        sigmetMap.removeLayer(
            destinationMarker
        );

        destinationMarker = null;

    }


    /*
       Remove old SIGMET polygons
    */

    if (sigmetLayer) {

        sigmetMap.removeLayer(
            sigmetLayer
        );

        sigmetLayer = null;

    }


    /*
       Get destination
    */

    const destination =
        airportCoordinates[
            selectedDestination
        ];


    /*
       Draw route and destination
    */

    if (destination) {

        routeLayer =
            L.polyline(
                [
                    [
                        airportCoordinates.KNDZ.lat,
                        airportCoordinates.KNDZ.lon
                    ],

                    [
                        destination.lat,
                        destination.lon
                    ]
                ],
                {
                    color:
                        "#1d668c",

                    weight:
                        4,

                    dashArray:
                        "8 6"
                }
            )
            .addTo(
                sigmetMap
            );


        destinationMarker =
            L.marker(
                [
                    destination.lat,
                    destination.lon
                ]
            )
            .addTo(
                sigmetMap
            )
            .bindPopup(
                `<strong>
                    ${selectedDestination}
                </strong>
                <br>
                Destination`
            );

    }


    /*
       Get SIGMET data
    */

    const sigmet =
        weatherData
            ?.kndz_convective_sigmet;


    /*
       IMPORTANT:
       Draw ALL active SIGMETs,
       not only SIGMETs containing KNDZ
    */

    const sigmetsToDraw =
        sigmet?.active_sigmets
        ||
        sigmet?.matches
        ||
        [];


    console.log(
        "SIGMETs to draw:",
        sigmetsToDraw
    );


    /*
       Build GeoJSON features
    */

    const features =
        sigmetsToDraw
            .filter(
                item =>
                    item.geometry
            )
            .map(
                item => ({

                    type:
                        "Feature",

                    geometry:
                        item.geometry,

                    properties:
                        item.properties || {}

                })
            );


    console.log(
        "SIGMET GeoJSON features:",
        features
    );


    /*
       Draw SIGMET polygons
    */

    if (features.length > 0) {

        const geojson = {

            type:
                "FeatureCollection",

            features:
                features

        };


        sigmetLayer =
            L.geoJSON(
                geojson,
                {

                    style: {

                        color:
                            "#c62828",

                        weight:
                            3,

                        fillColor:
                            "#ef5350",

                        fillOpacity:
                            0.25

                    },


                    onEachFeature:
                        function(
                            feature,
                            layer
                        ) {

                            const properties =
                                feature.properties
                                || {};


                            const label =
                                properties.rawAirSigmet
                                ||
                                properties.rawSigmet
                                ||
                                properties.rawText
                                ||
                                properties.name
                                ||
                                "Convective SIGMET";


                            layer.bindPopup(
                                `<strong>
                                    ⚡ Convective SIGMET
                                </strong>
                                <br><br>
                                ${label}`
                            );

                        }

                }
            )
            .addTo(
                sigmetMap
            );

    }


    /*
       Build bounds from:
       KNDZ + destination + SIGMETs
    */

    const bounds =
        L.latLngBounds();


    bounds.extend(
        kndz
    );


    if (destination) {

        bounds.extend(
            [
                destination.lat,
                destination.lon
            ]
        );

    }


    if (
        sigmetLayer &&
        sigmetLayer
            .getBounds()
            .isValid()
    ) {

        bounds.extend(
            sigmetLayer.getBounds()
        );

    }


    /*
       Fit everything on screen
    */

    if (bounds.isValid()) {

        sigmetMap.fitBounds(
            bounds,
            {
                padding:
                    [25, 25],

                maxZoom:
                    8
            }
        );

    }


    /*
       Important for tabs/mobile
    */

    refreshSigmetMap();

}

function renderSigmetDetails() {

    const container =
        document.getElementById(
            "sigmet-details"
        );


    if (!container) {
        return;
    }


    const sigmetData =
        weatherData
            ?.kndz_convective_sigmet;


    if (!sigmetData) {

        container.innerHTML = `

            <div class="sigmet-detail">

                <span
                    class="sigmet-detail-label">
                    STATUS
                </span>

                <span
                    class="sigmet-detail-value">
                    ⚠️ SIGMET data unavailable
                </span>

            </div>

        `;

        return;

    }


    const kndzSigmets =
        sigmetData.matches
        || [];


    const destinationSigmets =
        getDestinationSigmets(
            selectedDestination
        );


    const routeSigmets =
        getRouteSigmets(
            selectedDestination
        );


    const kndzStatus =
        kndzSigmets.length
            ? "⚠️ INSIDE"
            : "✅ CLEAR";


    const destinationStatus =
        destinationSigmets.length
            ? "⚠️ INSIDE"
            : "✅ CLEAR";


    const routeStatus =
        routeSigmets.length
            ? "⚠️ INTERSECTS"
            : "✅ CLEAR";


    container.innerHTML = `

        <div class="sigmet-detail">

            <span
                class="sigmet-detail-label">
                KNDZ
            </span>

            <span
                class="sigmet-detail-value">
                ${kndzStatus}
            </span>

        </div>


        <div class="sigmet-detail">

            <span
                class="sigmet-detail-label">
                ${selectedDestination}
            </span>

            <span
                class="sigmet-detail-value">
                ${destinationStatus}
            </span>

        </div>


        <div class="sigmet-detail">

            <span
                class="sigmet-detail-label">
                ENROUTE
            </span>

            <span
                class="sigmet-detail-value">
                ${routeStatus}
            </span>

        </div>

    `;


    /*
       Add a prominent warning
       when any portion of the route
       intersects a SIGMET.
    */

    if (routeSigmets.length) {

        container.innerHTML += `

            <div
                class="
                    sigmet-route-warning
                ">

                ⚡ Your KNDZ →
                ${selectedDestination}
                route intersects an active
                Convective SIGMET.

            </div>

        `;

    }

}

function pointInRing(
    lon,
    lat,
    ring
) {

    let inside = false;

    let j =
        ring.length - 1;


    for (
        let i = 0;
        i < ring.length;
        i++
    ) {

        const xi =
            ring[i][0];

        const yi =
            ring[i][1];

        const xj =
            ring[j][0];

        const yj =
            ring[j][1];


        const intersects =

            (
                (yi > lat)
                !==
                (yj > lat)
            )

            &&

            (
                lon
                <
                (
                    (xj - xi)
                    *
                    (lat - yi)
                    /
                    (
                        (yj - yi)
                        || 0.0000001
                    )
                    +
                    xi
                )
            );


        if (intersects) {

            inside =
                !inside;

        }


        j = i;

    }


    return inside;

}

function pointInPolygon(
    lon,
    lat,
    polygon
) {

    if (
        !polygon ||
        !polygon.length
    ) {

        return false;

    }


    // Must be inside outer boundary
    if (
        !pointInRing(
            lon,
            lat,
            polygon[0]
        )
    ) {

        return false;

    }


    // Make sure it isn't inside
    // a polygon "hole"
    for (
        let i = 1;
        i < polygon.length;
        i++
    ) {

        if (
            pointInRing(
                lon,
                lat,
                polygon[i]
            )
        ) {

            return false;

        }

    }


    return true;

}

function pointInGeometry(
    lon,
    lat,
    geometry
) {

    if (!geometry) {
        return false;
    }


    if (
        geometry.type ===
        "Polygon"
    ) {

        return pointInPolygon(
            lon,
            lat,
            geometry.coordinates
        );

    }


    if (
        geometry.type ===
        "MultiPolygon"
    ) {

        return geometry.coordinates.some(
            polygon =>
                pointInPolygon(
                    lon,
                    lat,
                    polygon
                )
        );

    }


    return false;

}

function refreshSigmetMap() {

    if (!sigmetMap) {
        return;
    }

    setTimeout(() => {

        sigmetMap.invalidateSize();

    }, 250);

}

function getDestinationSigmets(
    airport
) {

    const coordinates =
        airportCoordinates[
            airport
        ];


    if (!coordinates) {
        return [];
    }


    const sigmets =
        weatherData
            ?.kndz_convective_sigmet
            ?.active_sigmets
        || [];


    return sigmets.filter(
        sigmet =>
            pointInGeometry(
                coordinates.lon,
                coordinates.lat,
                sigmet.geometry
            )
    );

}

function getRouteSigmets(
    destination
) {

    const start =
        airportCoordinates.KNDZ;

    const end =
        airportCoordinates[
            destination
        ];


    if (
        !start ||
        !end
    ) {

        return [];

    }


    const sigmets =
        weatherData
            ?.kndz_convective_sigmet
            ?.active_sigmets
        || [];


    const hits =
        new Set();


    /*
        Test 250 points between
        KNDZ and the destination.

        This is plenty for these
        relatively short regional routes.
    */

    const samples = 250;


    for (
        let i = 0;
        i <= samples;
        i++
    ) {

        const fraction =
            i / samples;


        const lat =
            start.lat +
            (
                end.lat -
                start.lat
            )
            * fraction;


        const lon =
            start.lon +
            (
                end.lon -
                start.lon
            )
            * fraction;


        sigmets.forEach(
            (sigmet, index) => {

                if (
                    pointInGeometry(
                        lon,
                        lat,
                        sigmet.geometry
                    )
                ) {

                    hits.add(
                        index
                    );

                }

            }
        );

    }


    return Array.from(
        hits
    ).map(
        index =>
            sigmets[index]
    );

}


// WW FUNCTIONS // 
// ************ //
function getDestinationWatches(
    airport
) {

    const coordinates =
        airportCoordinates[
            airport
        ];


    if (!coordinates) {
        return [];
    }


    const watches =
        weatherData
            ?.severe_weather_watches
            ?.active_watches
        || [];


    return watches.filter(
        watch =>
            pointInGeometry(
                coordinates.lon,
                coordinates.lat,
                watch.geometry
            )
    );

}

function getRouteWatches(
    destination
) {

    const start =
        airportCoordinates.KNDZ;

    const end =
        airportCoordinates[
            destination
        ];


    if (
        !start ||
        !end
    ) {

        return [];

    }


    const watches =
        weatherData
            ?.severe_weather_watches
            ?.active_watches
        || [];


    const hits =
        new Set();


    const samples = 250;


    for (
        let i = 0;
        i <= samples;
        i++
    ) {

        const fraction =
            i / samples;


        const lat =
            start.lat +
            (
                end.lat -
                start.lat
            )
            * fraction;


        const lon =
            start.lon +
            (
                end.lon -
                start.lon
            )
            * fraction;


        watches.forEach(
            (watch, index) => {

                if (
                    pointInGeometry(
                        lon,
                        lat,
                        watch.geometry
                    )
                ) {

                    hits.add(
                        index
                    );

                }

            }
        );

    }


    return Array.from(
        hits
    ).map(
        index =>
            watches[index]
    );

}

function renderWatches() {

    const data =
        weatherData
            ?.severe_weather_watches;


    const card =
        document.getElementById(
            "watch-card"
        );


    const summary =
        document.getElementById(
            "watch-summary"
        );


    if (
        !card ||
        !summary
    ) {

        return;

    }


    card.classList.remove(
        "safe",
        "danger",
        "unknown-watch"
    );


    if (!data) {

        card.classList.add(
            "unknown-watch"
        );

        summary.innerText =
            "Watch data unavailable.";

        return;

    }


    const destinationWatches =
        getDestinationWatches(
            selectedDestination
        );


    const routeWatches =
        getRouteWatches(
            selectedDestination
        );


    const kndzWatches =
        data.matches || [];


    /*
       Any relevant WW?
    */

    if (
        kndzWatches.length ||
        destinationWatches.length ||
        routeWatches.length
    ) {

        card.classList.add(
            "danger"
        );


        summary.innerText =
            `⚠️ An active severe weather watch affects the KNDZ → ${selectedDestination} flight.`;

    }

    else {

        card.classList.add(
            "safe"
        );


        summary.innerText =
            `No Tornado or Severe Thunderstorm Watch currently affects KNDZ, ${selectedDestination}, or the straight-line route.`;

    }


    renderWatchDetails();

    renderWatchMap();

}

function renderWatchDetails() {

    const container =
        document.getElementById(
            "watch-details"
        );


    if (!container) {
        return;
    }


    const data =
        weatherData
            ?.severe_weather_watches;


    if (!data) {

        container.innerHTML =
            "Watch data unavailable.";

        return;

    }


    const kndzWatches =
        data.matches || [];


    const destinationWatches =
        getDestinationWatches(
            selectedDestination
        );


    const routeWatches =
        getRouteWatches(
            selectedDestination
        );


    const kndzStatus =
        kndzWatches.length
            ? "⚠️ WATCH"
            : "✅ CLEAR";


    const destinationStatus =
        destinationWatches.length
            ? "⚠️ WATCH"
            : "✅ CLEAR";


    const routeStatus =
        routeWatches.length
            ? "⚠️ INTERSECTS"
            : "✅ CLEAR";


    container.innerHTML = `

        <div class="watch-detail">

            <span class="watch-detail-label">
                KNDZ
            </span>

            <span class="watch-detail-value">
                ${kndzStatus}
            </span>

        </div>


        <div class="watch-detail">

            <span class="watch-detail-label">
                ${selectedDestination}
            </span>

            <span class="watch-detail-value">
                ${destinationStatus}
            </span>

        </div>


        <div class="watch-detail">

            <span class="watch-detail-label">
                ENROUTE
            </span>

            <span class="watch-detail-value">
                ${routeStatus}
            </span>

        </div>

    `;


    /*
       Show which watches matter
    */

    const relevant =
        [
            ...kndzWatches,
            ...destinationWatches,
            ...routeWatches
        ];


    const unique =
        Array.from(
            new Set(
                relevant.map(
                    watch =>
                        watch.headline
                        ||
                        watch.event
                )
            )
        );


    if (unique.length) {

        container.innerHTML += `

            <div class="watch-warning">

                <strong>
                    🌩️ Active Watch
                </strong>

                <br>

                ${unique.join("<br>")}

            </div>

        `;

    }

}

function renderWatchMap() {

    const mapElement =
        document.getElementById(
            "watch-map"
        );


    if (!mapElement) {
        return;
    }


    const kndz = [
        airportCoordinates.KNDZ.lat,
        airportCoordinates.KNDZ.lon
    ];


    /*
       Create map once
    */

    if (!watchMap) {

        watchMap =
            L.map(
                "watch-map"
            ).setView(
                kndz,
                7
            );


        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                attribution:
                    "&copy; OpenStreetMap contributors"
            }
        ).addTo(
            watchMap
        );


        L.marker(
            kndz
        )
        .addTo(
            watchMap
        )
        .bindPopup(
            "<strong>KNDZ</strong><br>Departure"
        );

    }


    /*
       Remove previous route
    */

    if (watchRouteLayer) {

        watchMap.removeLayer(
            watchRouteLayer
        );

        watchRouteLayer = null;

    }


    /*
       Remove previous destination
    */

    if (watchDestinationMarker) {

        watchMap.removeLayer(
            watchDestinationMarker
        );

        watchDestinationMarker = null;

    }


    /*
       Remove previous WW polygons
    */

    if (watchLayer) {

        watchMap.removeLayer(
            watchLayer
        );

        watchLayer = null;

    }


    const destination =
        airportCoordinates[
            selectedDestination
        ];


    /*
       Draw route
    */

    if (destination) {

        watchRouteLayer =
            L.polyline(
                [
                    kndz,

                    [
                        destination.lat,
                        destination.lon
                    ]
                ],
                {
                    color:
                        "#1d668c",

                    weight:
                        4,

                    dashArray:
                        "8 6"
                }
            )
            .addTo(
                watchMap
            );


        watchDestinationMarker =
            L.marker(
                [
                    destination.lat,
                    destination.lon
                ]
            )
            .addTo(
                watchMap
            )
            .bindPopup(
                `<strong>${selectedDestination}</strong>
                 <br>
                 Destination`
            );

    }


    /*
       Get all active WW polygons
    */

    const watches =
        weatherData
            ?.severe_weather_watches
            ?.active_watches
        || [];


    const features =
        watches
            .filter(
                watch =>
                    watch.geometry
            )
            .map(
                watch => ({

                    type:
                        "Feature",

                    geometry:
                        watch.geometry,

                    properties: {
                        event:
                            watch.event,

                        headline:
                            watch.headline,

                        expires:
                            watch.expires
                    }

                })
            );


    /*
       Draw polygons
    */

    if (features.length) {

        watchLayer =
            L.geoJSON(
                {
                    type:
                        "FeatureCollection",

                    features:
                        features
                },
                {

                    style: {

                        color:
                            "#d97706",

                        weight:
                            3,

                        fillColor:
                            "#f59e0b",

                        fillOpacity:
                            0.25

                    },


                    onEachFeature:
                        function(
                            feature,
                            layer
                        ) {

                            const props =
                                feature.properties
                                || {};


                            layer.bindPopup(
                                `<strong>
                                    🌩️ ${props.event || "Weather Watch"}
                                 </strong>

                                 <br><br>

                                 ${props.headline || ""}`
                            );

                        }

                }
            )
            .addTo(
                watchMap
            );

    }


    /*
       Fit route + WW polygons
    */

    const bounds =
        L.latLngBounds();


    bounds.extend(
        kndz
    );


    if (destination) {

        bounds.extend(
            [
                destination.lat,
                destination.lon
            ]
        );

    }


    if (
        watchLayer &&
        watchLayer
            .getBounds()
            .isValid()
    ) {

        bounds.extend(
            watchLayer.getBounds()
        );

    }


    if (bounds.isValid()) {

        watchMap.fitBounds(
            bounds,
            {
                padding:
                    [25, 25],

                maxZoom:
                    8
            }
        );

    }


    /*
       Important for tabs/mobile
    */

    setTimeout(
        () => {

            watchMap.invalidateSize();

        },
        250
    );

}

showNewFact();

loadWeather();

window.addEventListener(
    "resize",
    refreshSigmetMap
);


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
