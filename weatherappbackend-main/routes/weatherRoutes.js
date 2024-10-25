const express = require("express");
const {
  getLatestWeather,
  getDailyWeather,
  getWeeklyWeather,
  getDailyForecast,
  updateDailySummary,
  getWeatherSummary,
} = require("../models/weatherModel");

const router = express.Router();

router.get("/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const data = await getLatestWeather(city);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/daily/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const data = await getDailyWeather(city);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/weekly/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const data = await getWeeklyWeather(city);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/dailyForecast/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const data = await getDailyForecast(city);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/updateDailySummary", async (req, res) => {
  try {
    const city = req.params.city;
    const data = await updateDailySummary(city);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/summary/:city/:date", async (req, res) => {
  try {
    const { city, date } = req.params;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res
        .status(400)
        .json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }
    const data = await getWeatherSummary(city, date);
    if (!data) {
      return res.status(404).json({
        message: "No weather summary found for the specified date and city.",
      });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
