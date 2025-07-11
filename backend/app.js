const express = require("express");
const app = express();
const dotenv = require("dotenv");
const authRoutes = require("../backend/routes/authRoutes");
const foodRoutes = require("../backend/routes/foodRoutes")
const cookieparser = require("cookie-parser");
dotenv.config();
const cors = require("cors");
const frontend = process.env.FRONTEND_URL;
console.log(frontend);
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: `${frontend}`,
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoutes);
app.use("/food", foodRoutes);
module.exports = app;
