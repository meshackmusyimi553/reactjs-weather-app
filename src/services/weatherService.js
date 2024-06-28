// src/services/weatherService.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

console.log('API Key:', API_KEY); // Debugging statement

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Response error:', error.response.data);
      throw new Error(error.response.data.message || 'Error fetching weather data');
    } else if (error.request) {
      console.error('Request error:', error.request);
      throw new Error('No response received from the server');
    } else {
      console.error('Error', error.message);
      throw new Error(error.message);
    }
  }
};
