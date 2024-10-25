const { pool } = require("../db/pool");

async function saveDailySummary(
  city,
  date,
  avgTemp,
  maxTemp,
  minTemp,
  dominantWeather
) {
  const query = `
    INSERT INTO daily_summary (city, date, avg_temp, max_temp, min_temp, dominant_weather)
    VALUES ($1, $2, $3, $4, $5, $6);
  `;
  await pool.query(query, [
    city,
    date,
    avgTemp,
    maxTemp,
    minTemp,
    dominantWeather,
  ]);
}

async function getDailySummary(city) {
  const query = `
    SELECT * FROM daily_summary WHERE city = $1 ORDER BY date DESC LIMIT 1;
  `;
  const result = await pool.query(query, [city]);
  return result.rows[0];
}

module.exports = { saveDailySummary, getDailySummary };
