import React, { useState } from 'react';
import axios from 'axios';

function Weather() {
  const [query, setQuery] = useState();
  const [weather, setWeather] = useState({
    data: {},
    error: false,
  });

  const toDate = () => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };
  

  const search = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setQuery('');
      setWeather({ ...weather, loading: true });
      const url = 'https://api.openweathermap.org/data/2.5/weather';
      const appid = '43e1d367bdc6abb6d842293a4f4be90e';

      try {
        const response = await axios.get(url, {
          params: {
            q: query,
            units: 'metric',
            appid: appid,
          },
        });
        setWeather({ data: response.data, error: false });
      } catch (error) {
        setWeather({ ...weather, data: {}, error: true });
        setQuery('');
        console.log('error', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white"> 
      <h1 className="text-4xl mb-4">
        Weather App<span>🌤</span>
      </h1>
      <div className="mb-6">
        <input
          type="text"
          className="px-4 py-2 border rounded-md bg-gray-800 text-white" 
          placeholder="Search City.."
          name="query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyPress={search}
        />
      </div>

      {weather.error && (
        <p className="text-red-600 text-lg mb-4">Sorry, City not found</p>
      )}

      {weather && weather.data && weather.data.main && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">
            {weather.data.name}, <span>{weather.data.sys.country}</span>
          </h2>
          <div className="mb-2">
            <span>{toDate()}</span>
          </div>
          <div className="flex items-center justify-center mb-2">
            <img
              className="w-16 h-16 mr-2"
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
            />
            <span className="text-4xl">
              {Math.round(weather.data.main.temp)}
              <sup className="text-xl">&deg;C</sup>
            </span>
          </div>
          <div className="mb-2">
            <p>Humidity: {weather.data.main.humidity}%</p>
          </div>
          <div>
            <p className="capitalize mb-1">
              {weather.data.weather[0].description}
            </p>
            <p>Wind Speed: {weather.data.wind.speed}m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;