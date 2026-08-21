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
        "Dothan Regional",
    
    KCEW:
        "Bob Sikes Airport",

};


const destinations = [

    "KPNS",
    "KMOB",
    "KHSA",
    "KTLH",
    "KDHN",
    "KCEW",

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

// function renderTafs() {

//     const tafs =
//         weatherData.tafs;
//     document.getElementById(
//         "knse-taf"
//     ).innerText =
//         tafs.KNSE?.raw_taf ||
//         "TAF unavailable";
// }

function renderTafs() {

    const tafElement =
        document.getElementById("knse-taf");

    if (!tafElement) {
        return;
    }

    const rawTaf =
        weatherData?.tafs?.KNSE?.raw_taf;

    if (!rawTaf) {

        tafElement.innerHTML =
            `<p>TAF unavailable</p>`;

        return;
    }


    try {

        const periods =
            parseTafPeriods(rawTaf);


        if (!periods.length) {

            tafElement.innerHTML =
                `<div class="taf-raw">${rawTaf}</div>`;

            return;
        }


        tafElement.innerHTML =
            periods.map(period => {

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

            }).join("");


    } catch (error) {

        console.error(
            "TAF parsing error:",
            error
        );

        tafElement.innerText =
            rawTaf;

    }

}

function parseTafPeriods(rawTaf) {

    // Clean up whitespace
    const taf =
        rawTaf
            .replace(/\s+/g, " ")
            .trim();


    /*
       Find the overall validity period.

       Example:
       2012/2118

       = valid from the 20th at 1200Z
         until the 21st at 1800Z
    */

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



// function renderDestinations() {

//     const container =
//         document.getElementById(
//             "destinations"
//         );


//     container.innerHTML = "";


//     destinations.forEach(
//         airport => {

//             const wx =
//                 weatherData.airports[
//                     airport
//                 ];


//             const button =
//                 document.createElement(
//                     "button"
//                 );


//             button.className =
//                 "destination";


//             if (
//                 airport ===
//                 selectedDestination
//             ) {

//                 button.classList.add(
//                     "active"
//                 );

//             }


//             const category =
//                 wx.flight_category ||
//                 "UNKNOWN";


//             button.innerHTML = `

//                 <span class="destination-code">
//                     ${airport}
//                 </span>

//                 <span class="destination-name">
//                     ${airportNames[airport]}
//                 </span>

//                 <span
//                     class="
//                         mini-category
//                         ${categoryClass(category)}
//                     ">
//                     ${category}
//                 </span>

//             `;


//             button.onclick =
//                 () => {

//                     selectedDestination =
//                         airport;

//                     renderDestinations();

//                     renderSelectedAirport();

//                 };


//             container.appendChild(
//                 button
//             );

//         }
//     );

// }

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


                console.log(
                    "Selected destination:",
                    selectedDestination
                );


                renderDestinations();

                renderSelectedAirport();

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

            }
        );

    });


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
