const cron = require("node-cron");
const { fetchWeatherData } = require("./weatherService");
const { getThresholds } = require("../models/thresholdModel");
const {
  getLatestWeather,
  updateDailySummary,
} = require("../models/weatherModel");
const { sendEmail } = require("../utils/emails");

function startJobs() {
  cron.schedule("*/5 * * * *", async () => {
    const cities = [
      "Delhi",
      "Mumbai",
      "Chennai",
      "Bangalore",
      "Kolkata",
      "Hyderabad",
    ];
    for (const city of cities) {
      try {
        await fetchWeatherData(city);
        console.log(`Weather data fetched for ${city}`);
        await updateDailySummary(city);
        console.log(`Daily weather summary updated for ${city}`);
      } catch (error) {
        console.error(`Error fetching data for ${city}:`, error);
      }
    }
    await checkAlerts();
  });
}

async function checkAlerts() {
  console.log("check alerts is called");
  try {
    const thresholds = await getThresholds();

    for (const threshold of thresholds) {
      const { city, max_temp, min_temp, email, tempUnit } = threshold;

      const recentWeather = await getLatestWeather(city);

      if (recentWeather) {
        const { temperature } = recentWeather;
        if (tempUnit === "F") {
          temperature = (temperature * 9) / 5 + 32; // Convert Celsius to Fahrenheit
        }

        if (temperature > max_temp) {
          const subject = `Weather Alert: High Temperature in ${city}`;
          const message = `Alert: The temperature in ${city} has exceeded the threshold of ${max_temp}°${tempUnit}. Current temperature: ${temperature.toFixed(
            2
          )}°${tempUnit}.`;
          await sendEmail(email, subject, message);
          console.log(`High temperature alert sent to ${email} for ${city}`);
        }

        if (temperature < min_temp) {
          const subject = `Weather Alert: Low Temperature in ${city}`;
          const message = `Alert: The temperature in ${city} has dropped below the threshold of ${min_temp}°${tempUnit}. Current temperature: ${temperature.toFixed(
            2
          )}°${tempUnit}.`;
          await sendEmail(email, subject, message);
          console.log(`Low temperature alert sent to ${email} for ${city}`);
        }
      }
    }
  } catch (error) {
    console.error("Error checking alerts:", error);
  }
}

module.exports = { startJobs };
