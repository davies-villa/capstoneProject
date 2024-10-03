import React, { useEffect, useState } from 'react';

const WeatherForecast = ({ city }) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`/api/weather?city=${city}`);
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="weather-forecast">
      <h3>Weather Forecast</h3>
      {weather.map((item) => (
        <div key={item.dt}>
          <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
          <p>{item.weather[0].description}</p>
          <p>Temp: {item.main.temp}°C</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
