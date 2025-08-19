const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  height: Number,
  weight: Number,
  age: Number,
  gender: { type: String, enum: ["male", "female", "other"] },
  goal: { type: String, enum: ["gain", "lose", "maintain"] },
  activityLevel: { type: String, enum: ["sedentary", "moderate", "active"] },
  diet: {
    reqCal: Number,
    reqCarbs: Number,
    reqProteins: Number,
    reqFats: Number,
  },
  // Simple list of terms/nutrients to avoid (populated from reports)
  avoidList: { type: [String], default: [] },
  isPro: { type: Boolean, default: false },
});

module.exports = mongoose.model("user", userSchema);
