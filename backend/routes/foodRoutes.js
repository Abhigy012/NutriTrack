const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  addFoodLog,
  getTodayFoodLogs,
  deleteFoodLog,
} = require("../controllers/foodController");

router.get("/dashboard", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Shuuuu", user: req.user });
});

router.post("/addFoodLog", authMiddleware, addFoodLog);
router.get("/getTodayFoodLogs", authMiddleware, getTodayFoodLogs);
router.post("/deleteFoodLog", authMiddleware, deleteFoodLog);
module.exports = router;
