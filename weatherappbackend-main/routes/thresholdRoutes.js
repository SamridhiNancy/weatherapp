const express = require("express");
const { setThreshold, getThresholds } = require("../models/thresholdModel");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { city, maxTemp, minTemp, condition, email, tempUnit } = req.body;
    await setThreshold(city, maxTemp, minTemp, condition, email, tempUnit);
    res.json({ message: "Threshold set successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const thresholds = await getThresholds();
    res.json(thresholds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
