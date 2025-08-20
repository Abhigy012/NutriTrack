const express = require("express");
const app = express();
const dotenv = require("dotenv");
const authRoutes = require("../backend/routes/authRoutes");
const foodRoutes = require("../backend/routes/foodRoutes");
const reportRoutes = require("../backend/routes/reportRoutes");
const cookieparser = require("cookie-parser");
dotenv.config();
const cors = require("cors");
const frontend = process.env.FRONTEND_URL;

// ===== Middlewares =====
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: `${frontend}`,
    credentials: true,
  })
);

// ===== Routes =====
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoutes);
app.use("/food", foodRoutes);
app.use("/report", reportRoutes);

// ===== Log outbound IP (for Render deployment) =====
const https = require("https");
https.get("https://ifconfig.me/ip", (res) => {
  let data = "";
  res.on("data", chunk => (data += chunk));
  res.on("end", () => {
    console.log("🌐 Render outbound IP:", data.trim());
  });
});

module.exports = app;
