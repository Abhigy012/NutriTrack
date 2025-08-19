const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.MONGODB_URI;
const port = process.env.PORT;
const app = require("./app");
const connectDB = require("./config/db");
const cron = require("node-cron");
const foodModel = require("./models/food");

connectDB();

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

// Simple daily cleanup: remove logs older than 24h (runs hourly)
cron.schedule("0 * * * *", async () => {
  try {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    await foodModel.deleteMany({ timestamp: { $lt: cutoff } });
  } catch (err) {
    console.error("cleanup error", err.message);
  }
});
