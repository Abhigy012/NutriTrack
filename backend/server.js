const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.MONGODB_URI;
const port = process.env.PORT;
const app = require("./app");
const connectDB = require("./config/db");

connectDB();

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
