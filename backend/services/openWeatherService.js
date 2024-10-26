const axios = require('axios');
const Weather = require('../models/Weather');
const { kelvinToCelsius } = require('../utils/tempConversion');

const apiKey = process.env.OPENWEATHER_API_KEY;
const cityIds = { delhi: '1273294', mumbai: '1275339', chennai: '1264527' };

const fetchAndStoreWeatherData = async () => {
    for (const city in cityIds) {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityIds[city]}&appid=${apiKey}`;
            const response = await axios.get(url);
            const { main: { temp, feels_like }, weather, dt } = response.data;

            const weatherData = new Weather({
                city,
                temp: kelvinToCelsius(temp),
                feels_like: kelvinToCelsius(feels_like),
                dt,
                weather: weather[0].main,
            });

            await weatherData.save();
        } catch (error) {
            console.error('Error fetching weather data', error);
        }
    }
};

module.exports = { fetchAndStoreWeatherData };
