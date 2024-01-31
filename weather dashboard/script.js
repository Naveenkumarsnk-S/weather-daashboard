// Define an array of cities with their corresponding latitude and longitude
const cities = [
    { name: "New York", lat: 40.7128, lon: -74.0060 },
    { name: "London", lat: 51.5074, lon: -0.1278 },
    { name: "Paris", lat: 48.8566, lon: 2.3522 },
    // Add more cities as needed
];

// Function to populate the dropdown with city options
function populateDropdown() {
    const citySelect = document.getElementById('citySelect');
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = `${city.lat},${city.lon}`;
        option.textContent = city.name;
        citySelect.appendChild(option);
    });
}

// Function to fetch weather based on selected city
async function getWeather() {
    const selectedCity = document.getElementById('citySelect').value;
    if (!selectedCity) {
        alert('Please select a city');
        return;
    }

    const [lat, lon] = selectedCity.split(',');
    const apiKey = '882ad903b68e279b92ed4827960ff1ca';

    try {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const weatherData = await weatherResponse.json();
        displayWeather(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        displayErrorMessage();
    }
}

// Function to display weather data
function displayWeather(weatherData) {
    const weatherOutput = document.getElementById('weatherOutput');
    weatherOutput.innerHTML = `
        <h2>Current Weather in ${weatherData.name}</h2>
        <p>Temperature: ${weatherData.main.temp}°C</p>
        <p>Weather: ${weatherData.weather[0].description}</p>
        <p>Humidity: ${weatherData.main.humidity}%</p>
    `;
}

// Function to display error message
function displayErrorMessage() {
    const weatherOutput = document.getElementById('weatherOutput');
    weatherOutput.innerHTML = '<p>Failed to fetch weather data. Please try again.</p>';
}

// Call populateDropdown function when the page loads
populateDropdown();
async function getWeather() {
    const selectedCity = document.getElementById('citySelect').value;
    if (!selectedCity) {
        alert('Please select a city');
        return;
    }

    const [lat, lon] = selectedCity.split(',');
    const apiKey = '882ad903b68e279b92ed4827960ff1ca';

    try {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        
        if (!weatherResponse.ok) {
            throw new Error('Failed to fetch weather data. Please try again.');
        }

        const weatherData = await weatherResponse.json();
        displayWeather(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        displayErrorMessage();
    }
}
