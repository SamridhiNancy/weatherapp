const express = require("express");
const { getDailySummary } = require("../models/summaryModel");

const router = express.Router();

router.get("/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const summary = await getDailySummary(city);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
