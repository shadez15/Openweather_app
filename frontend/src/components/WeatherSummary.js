// import React, { useState, useEffect } from 'react';
// import weatherService from '../services/weatherService';

// function WeatherSummary() {
//   const [weatherData, setWeatherData] = useState([]);

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       const data = await weatherService.getWeather('delhi');
//       setWeatherData(data);
//     };
//     fetchWeatherData();
//   }, []);

//   return (
//     <div>
//       <h2>Delhi Weather Summary</h2>
//       <ul>
//         {weatherData.map((entry) => (
//           <li key={entry.dt}>
//             Temp: {entry.temp}°C, Weather: {entry.weather}, Time: {new Date(entry.dt * 1000).toLocaleString()}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default WeatherSummary;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/weather';

const WeatherSummary = ({ city }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       if (!city) {
         setError('City name is required.');
         return; // Prevent fetching if city is undefined
       }

        const fetchWeatherData = async () => {
          try {
            const response = await axios.get(`${API_BASE_URL}/${city}`);
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error); // Log full error
            setError('Failed to fetch weather data. Check console for details.');
        }finally {
                setLoading(false);
            }
        };
        fetchWeatherData();
    }, [city]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
    if (!weatherData) {
      return <p>Loading...</p>;
  }

    return (
        <div>
            <h2>Weather Summary for {city}</h2>
            <p>Main: {weatherData.main}</p>
            <p>Temperature: {weatherData.temp} °C</p>
            <p>Feels Like: {weatherData.feels_like} °C</p>
            <p>Last Updated: {new Date(weatherData.dt * 1000).toLocaleString()}</p>
        </div>
    );
};

export default WeatherSummary;

