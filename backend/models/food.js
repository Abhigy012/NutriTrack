const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  timestamp: Date,
  quantity: Number,
  foodName: String,
  macros: {},
});

module.exports = mongoose.model("food", foodSchema);
