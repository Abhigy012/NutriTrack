const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const userModel = require("../models/user");
const router = express.Router();
const {
  addFoodLog,
  getTodayFoodLogs,
  deleteFoodLog,
} = require("../controllers/foodController");

router.get("/dashboard", authMiddleware, async (req, res) => {
  const user = await userModel.findById(req.user._id);
  if (user) {
    res.status(200).json({ message: "Welcome", user: user.name });
  }
  res.status(400).json({ message: "Unable to load the reuqired resources!" });
});

router.post("/addFoodLog", authMiddleware, addFoodLog);
router.get("/getTodayFoodLogs", authMiddleware, getTodayFoodLogs);
router.post("/deleteFoodLog", authMiddleware, deleteFoodLog);
module.exports = router;
