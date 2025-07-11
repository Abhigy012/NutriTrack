const foodModel = require("../models/food");

const addFoodLog = async (req, res) => {
  let { time, quantity, foodName, protein, carbs, fat } = req.body();
  try {
    let newFood = await foodModel.create({
      timeStamp: time,
      quantity,
      foodName,
      user: req.user._id,
      macros: { protein, carbs, fat },
    });
    if (!newFood) {
      res.status(400).json({ error: "Unable to log the provided food!" });
    }
    res.status(200).json({ message: "Food logged successfully" });
  } catch (error) {
    res.status(500).json({ error: "Unknown error occured!" });
  }
};

const getTodayFoodLogs = async (req, res) => {};

const deleteFoodLog = async (req, res) => {};

module.exports = { addFoodLog, getTodayFoodLogs, deleteFoodLog };
