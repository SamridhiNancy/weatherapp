const { pool } = require("../db/pool");
const axios = require("axios");
require("dotenv").config();

async function saveWeatherData(city, temperature, feelsLike, main, timestamp) {
  const query = `
    INSERT INTO weather_data (city, temperature, feels_like, main, timestamp)
    VALUES ($1, $2, $3, $4, $5);
  `;
  await pool.query(query, [city, temperature, feelsLike, main, timestamp]);
}

async function getLatestWeather(city) {
  const query = `
    SELECT * FROM weather_data
    WHERE city = $1
    ORDER BY timestamp DESC LIMIT 1;
  `;
  const result = await pool.query(query, [city]);
  return result.rows[0];
}

async function getDailyWeather(city) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&cnt=7`;
  const response = await axios.get(url);
  return response.data;
}

async function getWeeklyWeather(city) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  const response = await axios.get(url);

  const weeklyData = response.data.list.reduce((acc, item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!acc[date]) {
      acc[date] = {
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        weather: item.weather[0].description,
        icon: item.weather[0].icon,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, item.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, item.main.temp_max);
    }
    return acc;
  }, {});

  return Object.entries(weeklyData).map(([date, data]) => ({
    date,
    ...data,
  }));
}

const getDailyForecast = async (city) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    );

    const todayForecast = response.data.list.slice(0, 8).map((item) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      temp: `${Math.round(item.main.temp)}°C`,
    }));

    return todayForecast;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Error fetching weather data");
  }
};

const generateSummary = (minTemp, maxTemp, avgTemp, predominantCondition) => {
  let summary = `Today's weather in the city shows a temperature range from ${minTemp}°C to ${maxTemp}°C with an average temperature of ${avgTemp}°C.`;

  switch (predominantCondition.toLowerCase()) {
    case "clear sky":
      summary +=
        " It is a clear day with plenty of sunshine. A perfect day to be outdoors!";
      break;
    case "few clouds":
    case "scattered clouds":
    case "broken clouds":
      summary +=
        " It’s a partially cloudy day. Some clouds might linger, but there’s still plenty of sunlight.";
      break;
    case "shower rain":
    case "rain":
    case "light rain":
      summary += " Expect some rain today. Don’t forget to carry an umbrella!";
      break;
    case "thunderstorm":
      summary +=
        " Thunderstorms are expected. It’s best to stay indoors and avoid outdoor activities.";
      break;
    case "snow":
      summary += " Snow is expected today. Bundle up if you’re heading out!";
      break;
    case "mist":
    case "haze":
    case "fog":
      summary +=
        " Visibility might be low due to misty or foggy conditions. Drive carefully!";
      break;
    default:
      summary += ` The weather is predominantly ${predominantCondition}.`;
  }

  return summary;
};

const updateDailySummary = async (city) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    );

    const data = response.data.list.slice(0, 8);

    const temperatures = data.map((entry) => entry.main.temp);
    const minTemp = Math.min(...temperatures);
    const maxTemp = Math.max(...temperatures);
    const avgTemp = (
      temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length
    ).toFixed(2);

    const weatherDescriptions = data.map(
      (entry) => entry.weather[0].description
    );
    const predominantCondition = weatherDescriptions
      .sort(
        (a, b) =>
          weatherDescriptions.filter((v) => v === a).length -
          weatherDescriptions.filter((v) => v === b).length
      )
      .pop();

    const summary = generateSummary(
      minTemp,
      maxTemp,
      avgTemp,
      predominantCondition
    );

    const query = `
            INSERT INTO weather_summary (city, date, min_temp, max_temp, avg_temp, predominant_condition, summary)
            VALUES ($1, CURRENT_DATE, $2, $3, $4, $5, $6)
            ON CONFLICT (city, date) DO UPDATE 
            SET min_temp = $2, max_temp = $3, avg_temp = $4, predominant_condition = $5, summary = $6, updated_at = CURRENT_TIMESTAMP;
        `;

    await pool.query(query, [
      city,
      minTemp,
      maxTemp,
      avgTemp,
      predominantCondition,
      summary,
    ]);

    return {
      message: "Daily weather summary updated successfully",
      minTemp,
      maxTemp,
      avgTemp,
      predominantCondition,
      summary,
    };
  } catch (error) {
    console.error("Error fetching or updating weather data:", error);
  }
};

const getWeatherSummary = async (city, date) => {
  const query = `
    SELECT * FROM weather_summary
    WHERE city = $1 AND date = $2;
  `;
  const result = await pool.query(query, [city, date]);
  return result.rows[0];
};

module.exports = {
  saveWeatherData,
  getLatestWeather,
  getDailyWeather,
  getWeeklyWeather,
  getDailyForecast,
  updateDailySummary,
  getWeatherSummary,
};
