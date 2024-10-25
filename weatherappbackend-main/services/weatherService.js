const axios = require("axios");
const { saveWeatherData } = require("../models/weatherModel");
require("dotenv").config();

async function fetchWeatherData(city) {
  const response = await axios.get(
    `${process.env.OPENWEATHER_ENDPOINT_URL}?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`
  );
  const { temp, feels_like } = response.data.main;
  const main = response.data.weather[0].main;
  const timestamp = new Date(response.data.dt * 1000);

  const temperature = temp - 273.15;
  const feelsLike = feels_like - 273.15;

  await saveWeatherData(city, temperature, feelsLike, main, timestamp);
}

module.exports = { fetchWeatherData };
