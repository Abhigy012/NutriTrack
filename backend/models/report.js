const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  createdAt: { type: Date, default: () => new Date() },
  cloudinaryPublicId: String,
  cloudinaryUrl: String,
  comment: String,
  avoidList: { type: [String], default: [] },
  notes: String,
});

module.exports = mongoose.model("report", reportSchema);


