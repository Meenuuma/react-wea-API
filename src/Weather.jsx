import { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("/images/default.jpeg");
  const [error, setError] = useState(null);

  const API_KEY = "7637ceff301e95720e7d22725c9676d7";

  // Function to fetch weather data
  const fetchWeather = async () => {
    try {
      setError(null); // Clear errors
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      updateBackground(response.data.weather[0].main);
    } catch (error) {
      setError("City not found. Try again.");
      setWeather(null);
      setBackgroundImage("/images/default.jpeg");
    }
  };

  // Fetch Weather on Load
  useEffect(() => {
    fetchWeather();
  }, []);

  // Change Background Image Dynamically
  const updateBackground = (condition) => {
    const backgrounds = {
      Clear: "/images/clear.webp",
      Clouds: "/images/cloudy.jpeg",
      Rain: "/images/rain.jpeg",
      Snow: "/images/snow.jpeg",
      Thunderstorm: "/images/thunderstorm.jpeg",
    };
    setBackgroundImage(backgrounds[condition] || "/images/default.jpeg");
  };

  // Handle City Input Change
  const handleCityChange = (e) => setCity(e.target.value);

  // Handle Search
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})`,backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat", }}
    >
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg w-80">
        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter city"
          />
          <button type="submit" className="w-full mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-400">
            Search
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center font-semibold">{error}</p>}

        {/* Weather Data */}
        {weather ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold">{weather.name}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="mx-auto"
            />
            <p className="text-lg capitalize">{weather.weather[0].description}</p>
            <p className="text-4xl font-semibold">{weather.main.temp}°C</p>

            {/* Additional Weather Info */}
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div><p className="font-medium">🌡️ Feels Like:</p> <p>{weather.main.feels_like}°C</p></div>
              <div><p className="font-medium">💧 Humidity:</p> <p>{weather.main.humidity}%</p></div>
              <div><p className="font-medium">💨 Wind Speed:</p> <p>{weather.wind.speed} m/s</p></div>
              <div><p className="font-medium">🌍 Pressure:</p> <p>{weather.main.pressure} hPa</p></div>
            </div>
          </div>
        ) : (
          !error && <p className="text-center text-gray-500">Loading weather...</p>
        )}
      </div>
    </div>
  );
};

export default Weather;
