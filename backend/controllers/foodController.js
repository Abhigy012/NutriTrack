const foodModel = require("../models/food");
const { getMacros } = require("../utils/getMacros");
const userModel = require("../models/user");
const { checkFoodAgainstAvoids } = require("../utils/checkAvoids");
const addFoodLog = async (req, res) => {
  let { quantity, foodName, foodRecipe } = req.body;
  try {
    let response = await getMacros(foodName, quantity, foodRecipe);
    if (!response) {
      return res.status(300).json({ error: "macros not fetched!" });
    }

    // Fetch user to get latest avoid list and run Gemini-based check
    let matchedAvoids = [];
    try {
      const dbUser = await userModel.findById(req.user._id).lean();
      const avoidList = dbUser?.avoidList || [];
      matchedAvoids = await checkFoodAgainstAvoids(foodName, foodRecipe, avoidList);
    } catch (_) {}

    let newFood = await foodModel.create({
      timestamp: new Date(),
      calories: response.calories,
      foodName,
      macros: {
        proteins: response.proteins,
        carbs: response.carbs,
        fats: response.fats,
      },
      user: req.user._id,
    });
    if (!newFood) {
      res.status(400).json({ error: "Unable to log the provided food!" });
    }
    res.status(200).json({
      message: "Food logged successfully",
      alerts: matchedAvoids.length
        ? matchedAvoids.map((a) => `This food may contain ${a}, which you should avoid.`)
        : [],
    });
  } catch (error) {
    res.status(500).json({ error: "Unknown error occured!" });
  }
};

const getTodayFoodLogs = async (req, res) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  try {
    let userFoods = await foodModel.find({
      user: req.user._id,
      timestamp: { $gte: startOfDay, $lte: endOfDay },
    });
    if (userFoods) {
      res.status(200).send(userFoods);
    } else {
      res.status(400).json({ message: "food not logged" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTodayNutrition = async (req, res) => {
  try {
    const raw = req.body.date;
    const base = raw ? new Date(raw) : new Date();
    if (isNaN(base.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const start = new Date(base);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    const foods = await foodModel.find({
      user: req.user._id,
      timestamp: { $gte: start, $lt: end },
    });

    let totalCalories = 0;
    let totalProtein = 0;
    let totalFat = 0;
    let totalCarbs = 0;

    for (const f of foods) {
      totalCalories += f.calories || 0;
      totalProtein += f.macros?.proteins || 0;
      totalFat += f.macros?.fats || 0;
      totalCarbs += f.macros?.carbs || 0;
    }

    return res.json({
      date: start.toISOString().slice(0, 10),
      calories: totalCalories,
      macros: {
        proteins: totalProtein,
        fats: totalFat,
        carbs: totalCarbs,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteFoodLog = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "Missing id" });
    }
    const deleted = await foodModel.deleteOne({ _id: id, user: req.user._id });
    if (deleted.deletedCount === 0) {
      return res.status(404).json({ error: "Food log not found" });
    }
    return res.status(200).json({ message: "Food log deleted" });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  addFoodLog,
  getTodayFoodLogs,
  deleteFoodLog,
  getTodayNutrition,
};
