const foodModel = require("../models/food");

const addFoodLog = async (req, res) => {
  let { quantity, foodName } = req.body;
  try {
    let newFood = await foodModel.create({
      timestamp: Date.now(),
      quantity,
      foodName,
      
      user: req.user._id,
    });
    if (!newFood) {
      res.status(400).json({ error: "Unable to log the provided food!" });
    }
    res.status(200).json({ message: "Food logged successfully" });
  } catch (error) {
    res.status(500).json({ error: "Unknown error occured!" });
  }
};

const getTodayFoodLogs = async (req, res) => {
  const now = Date.now();

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const startMillis = startOfDay.getTime();

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  const endMillis = endOfDay.getTime();
  try {
    let userFoods = await foodModel.find({
      user: req.user._id,
      timestamp: { $gte: startMillis, $lte: endMillis },
    });
    if (userFoods) {
      console.log(userFoods);
      res.status(200).send(userFoods);
    } else {
      res.status(400).json({ message: "food not logged" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFoodLog = async (req, res) => {};

module.exports = { addFoodLog, getTodayFoodLogs, deleteFoodLog };
