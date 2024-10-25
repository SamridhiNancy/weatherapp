const express = require("express");
const cors = require("cors");
const weatherRoutes = require("./routes/weatherRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const thresholdRoutes = require("./routes/thresholdRoutes");
const { pool } = require("./db/pool");
const cronJobs = require("./services/cronJobs");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/weather", weatherRoutes);
app.use("/summary", summaryRoutes);
app.use("/threshold", thresholdRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await pool.connect();
  console.log("Connected to Database");
  cronJobs.startJobs();
});
