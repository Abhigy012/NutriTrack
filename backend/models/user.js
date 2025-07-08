const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  password: String,
  height: Number,
  weight: Number,
  age: Number,
  gender: { type: String, enum: ["male", "female", "other"] },
  goal: { type: String, enum: ["gain", "lose", "maintain"] },
  activityLevel: { type: String, enum: ["sedentary", "moderate", "active"] },
  isPro: { type: Boolean, default: false },
});

module.exports = mongoose.model("user", userSchema);
