const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.MONGODB_URI;
const db = () => {
  mongoose.connect(uri).catch((err) => {
    console.log(err.message);
  });

  mongoose.connection.on("connected", () => console.log("database connected"));
  mongoose.connection.on("open", () => console.log("database open"));
  mongoose.connection.on("disconnected", () => console.log("database disconnected"));
  mongoose.connection.on("reconnected", () => console.log("database reconnected"));
  mongoose.connection.on("disconnecting", () => console.log("database disconnecting"));
  mongoose.connection.on("close", () => console.log("database close"));
};

module.exports = db;
