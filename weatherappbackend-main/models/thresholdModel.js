const { pool } = require("../db/pool");

async function setThreshold(
  city,
  maxTemp,
  minTemp,
  condition,
  email,
  tempUnit
) {
  const query = `
    INSERT INTO thresholds (city, max_temp, min_temp, condition, email, temp_unit)
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (email, city) DO UPDATE SET 
      max_temp = EXCLUDED.max_temp,
      min_temp = EXCLUDED.min_temp,
      condition = EXCLUDED.condition,
      temp_unit = EXCLUDED.temp_unit
    RETURNING *;  -- Return the updated or inserted row
  `;

  try {
    const result = await pool.query(query, [
      city,
      maxTemp,
      minTemp,
      condition,
      email,
      tempUnit,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error setting threshold:", error);
    throw error;
  }
}

async function getThresholds() {
  const query = "SELECT * FROM thresholds;";
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error retrieving thresholds:", error);
    throw error;
  }
}

module.exports = { setThreshold, getThresholds };
