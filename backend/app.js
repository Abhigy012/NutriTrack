const express = require("express");
const app = express();
const dotenv = require("dotenv");
const authController = require("./controllers/authController");
dotenv.config();
const cors = require("cors");
const frontend = process.env.FRONTEND_URL;
console.log(frontend);
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

app.use("/auth", authController);
module.exports = app;
