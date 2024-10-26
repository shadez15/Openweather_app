const axios = require('axios');

const OPEN_WEATHER_MAP_API_KEY = process.env.OPENWEATHER_API_KEY; 
const OPEN_WEATHER_MAP_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getWeatherForCity = async (req, res) => {
    const city = req.params.city;
    if (!city) {
        return res.status(400).json({ error: 'City name is required.' });
    }
    try {
        const response = await axios.get(OPEN_WEATHER_MAP_BASE_URL, {
            params: {
                q: city,
                appid: OPEN_WEATHER_MAP_API_KEY,
                units: 'metric', 
            },
        });

        const { main, weather, dt } = response.data;
        res.json({
            main: weather[0].main,
            temp: main.temp,
            feels_like: main.feels_like,
            dt,
        });
    } catch (error) {
        console.error('Error fetching weather data from API:', error.message);
        res.status(500).json({ error: 'Failed to retrieve weather data' });
    }
};

module.exports = {
    getWeatherForCity,
};
