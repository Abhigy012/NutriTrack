const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  timestamp: Date,
  quantity: Number,
  foodName: String,
  macros: { protein: Number, carbs: Number, fats: Number },
});

module.exports = mongoose.model("food", foodSchema);
