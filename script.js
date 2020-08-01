// API Stuff
window.addEventListener("load", () => {
    var lat;
    var long;

    // Getting variables
    let timezoneLocation = document.querySelector(".timezone-location");
    let temperatureDegree = document.querySelector(".temperature-degrees");
    let temperatureDescription = document.querySelector(
        ".temperature-description"
    );
    let temperatureSectionDegrees = document.querySelector(
        ".temperature-section-degrees"
    );
    const temperatureType = document.querySelector(
        ".temperature-section-degrees span"
    );

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            // Proxy
            const proxy = "https://cors-anywhere.herokuapp.com/";

            // API + Proxy
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=16db124531a4839965ddaf94da846f15`;

            // Once we have a response, do stuff
            fetch(api)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    // Degree types
                    var degreesKelvin = data.main.temp;
                    var degreesCelsius = degreesKelvin - 273.15;
                    var degreesFahrenheit = (degreesCelsius * 9) / 5 + 32;

                    // DOM variables
                    timezoneLocation.textContent = data.sys.country;
                    temperatureDegree.textContent = Math.round(degreesCelsius);
                    temperatureDescription.textContent =
                        data.weather[0].description;

                    // Change icons
                    var iconID = data.weather[0].icon;
                    setIcons(iconID, document.querySelector(".timezone-icon"));

                    // Change from Celsius/Farenheit
                    temperatureSectionDegrees.addEventListener("click", () => {
                        if (temperatureType.textContent === "C") {
                            temperatureType.textContent = "F";
                            temperatureDegree.textContent = Math.round(
                                degreesFahrenheit
                            );
                        } else {
                            temperatureType.textContent = "C";
                            temperatureDegree.textContent = Math.round(
                                degreesCelsius
                            );
                        }
                    });
                });
        });
    } else {
        // No permissions
        h1.textContent = "Please give location permissions to your browser";
    }

    // - Set Icons based on ID from API
    function setIcons(iconID, iconClass) {
        const skycons = new Skycons({ color: "white" });
        var currentIcon = "";
        if (iconID == "01d") {
            currentIcon = "CLEAR_DAY";
        } else if (iconID == "02d") {
            currentIcon = "PARTLY_CLOUDY_DAY";
        } else if (iconID == "03d") {
            currentIcon = "CLOUDY";
        } else if (iconID == "04d") {
            currentIcon = "CLOUDY";
        } else if (iconID == "10d") {
            currentIcon = "RAIN";
        }

        skycons.play();
        return skycons.set(iconClass, Skycons[currentIcon]);
    }
});
