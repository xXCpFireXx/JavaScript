import axios from "axios";
const inputCity = document.getElementById("city");
const section = document.getElementById("container");

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("searchBtn");
    btn.addEventListener("click", consultWeather);
});


const consultWeather = async () => {
    const apiKey = import.meta.env.VITE_WEATHER_API;
    const inputCityValue = capitalizeFirstLetter(inputCity.value.trim());

    if (!inputCityValue) {
        notification('Please type a correct city name', '#736cedff', 3000)
        return;
    }

    const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${inputCityValue}&appid=${apiKey}&units=metric&lang=en`

    try {
        const response = await axios.get(urlApi);
        const { name, main: { temp, humidity }, wind: { speed }, weather, sys: { country, sunrise, sunset } } = response.data;
        const { description, icon } = weather[0];

        const sunriseLocal = new Date(sunrise * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        const sunsetLocal = new Date(sunset * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        const urlIcon = `https://rodrigokamada.github.io/openweathermap/images/${icon}_t@4x.png`;

        section.innerHTML = `
                <div class="headWeather">
                    <h1>${name}, ${country}</h1>
                    <h3>${capitalizeFirstLetter(description)}</h3>
                </div>

                <div class="iconWeather">
                    <img src="${urlIcon}" alt="${description}">
                </div>

                <h1 class="temperature">${Math.round(temp)}ºC</h1>

                <div class="infoWeather">
                    <div class="detailsWeather">
                        <img src="./img/humidity.svg" alt="humidity">
                        <h4>Humidity</h4>
                        <p>${humidity}%</p>
                    </div>
                    <div class="detailsWeather">
                        <img src="./img/wind.svg" alt="wind speed">
                        <h4>Wind speed</h4>
                        <p>${speed} m/s</p>
                    </div>
                    <div class="detailsWeather">
                        <img src="./img/sunrise.svg" alt="sunrise">
                        <h4>Sunrise</h4>
                        <p>${sunriseLocal}</p>
                    </div>
                    <div class="detailsWeather">
                        <img src="./img/sunset.svg" alt="sunset">
                        <h4>Sunset</h4>
                        <p>${sunsetLocal}</p>
                    </div>
                </div>`

            section.style.display = "flex";

    } catch (error) {
        notification('City not found or error consulting the weather.', '#736cedff', 3000);
        console.error(error)
    }

    inputCity.value = "";
}

inputCity.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        consultWeather();
    }
});

const notification = (text, color, duration) => {
    Toastify({
        text: text,
        duration: duration,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            borderRadius: "8px",
            padding: "15px",
            background: color,
        },
    }).showToast();
};

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
