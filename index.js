const toggleButton = document.querySelector(".theme-toggle");
const body = document.body;

toggleButton.addEventListener("click", () => {
    body.classList.toggle("light-theme");
});

// Weather App

const weatherForm = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "2d15e28692f9e98ee0cce1ac86dd3bdd";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value.trim();

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            displayError("City not found or API error");
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Weather data not available");
    }
    return await response.json();
}

function displayWeatherInfo(data) {
    const cityName = data.name;
    const temp = Math.round(data.main.temp);
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const weatherId = data.weather[0].id;
    const emoji = getWeatherEmoji(weatherId);

    card.innerHTML = `
        <h1 class="cityDisplay">${cityName}</h1>
        <p class="tempDisplay">${temp}°C</p>
        <p class="humidityDisplay">Humidity: ${humidity}%</p>
        <p class="descDisplay">${description}</p>
        <p class="weatherEmoji">${emoji}</p>
    `;
    card.style.display = "flex";
}

function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) {
        return "⛈️"; 
    } else if (weatherId >= 300 && weatherId < 500) {
        return "🌦️"; 
    } else if (weatherId >= 500 && weatherId < 600) {
        return "🌧️"; 
    } else if (weatherId >= 600 && weatherId < 700) {
        return "❄️"; 
    } else if (weatherId >= 700 && weatherId < 800) {
        return "🌫️"; 
    } else if (weatherId === 800) {
        return "☀️"; 
    } else if (weatherId > 800 && weatherId < 900) {
        return "☁️"; 
    } else {
        return "🌈"; 
    }
}

function displayError(message) {
    card.innerHTML = `<p class="errorDisplay">${message}</p>`;
    card.style.display = "flex";
}
