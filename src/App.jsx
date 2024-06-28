// src/App.js
import React, { useState } from 'react';
import { fetchWeather } from './services/weatherService';
import './index.css'; // Tailwind CSS

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const data = await fetchWeather(city);
      setWeather(data);
      setError('');
    } catch (error) {
      setError('City not found or error fetching data');
    }
  };

  const getWeatherIcon = (description) => {
    const lowerDescription = description.toLowerCase();
    if (lowerDescription.includes('clear')) {
      return 'sun';
    } else if (lowerDescription.includes('clouds')) {
      return 'clouds';
    } else if (lowerDescription.includes('rain')) {
      return 'rain';
    } else if (lowerDescription.includes('snow')) {
      return 'snow';
    } else {
      return 'sun'; // default icon
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
      <div className="w-full max-w-md p-6 bg-white bg-opacity-20 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">Weather App</h1>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="p-2 rounded text-black w-full"
          />
          <button 
            onClick={handleSearch}
            className="bg-white text-blue-500 px-4 py-2 rounded font-semibold hover:bg-gray-200 transition w-full"
          >
            Search
          </button>
        </div>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {weather && (
          <div className="weather-container mt-6 text-left">
            <h2 className="text-2xl font-semibold">{weather.name}</h2>
            <p className="text-lg">{weather.weather[0].description}</p>
            <p className="text-xl">{weather.main.temp}°C</p>
            <div className={`weather-icon ${getWeatherIcon(weather.weather[0].description)}`}></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
