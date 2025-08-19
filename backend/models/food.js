const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  timestamp: { type: Date, default: () => new Date() },
  calories: Number,
  foodName: String,
  macros: { proteins: Number, carbs: Number, fats: Number },
});

module.exports = mongoose.model("food", foodSchema);
