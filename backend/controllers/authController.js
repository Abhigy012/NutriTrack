const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const { getRequiredDiet } = require("../utils/getRequiredDiet");
const { generateToken } = require("../middlewares/generateToken");

const signupUser = async (req, res) => {
  const { email, password, name, height, weight, age, gender, goal, activity } =
    req.body;
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: "Email is already taken" });
  }

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Error hashing password");
    }

    try {
      // Create user first without waiting for AI diet to finish
      const newUser = await userModel.create({
        email,
        password: hash,
        name,
        height,
        weight,
        age,
        gender,
        goal,
        activityLevel: activity,
        // diet will be computed asynchronously after signup
      });

      const token = generateToken(newUser._id);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 24 * 60 * 60 * 1000,
      });
      // Respond immediately; compute diet in background
      res.status(200).json({ message: "User created successfully. Setting up your plan..." });

      // Fire-and-forget: compute required diet and update user
      setImmediate(async () => {
        try {
          const response = await getRequiredDiet(
            height,
            weight,
            activity,
            goal,
            age
          );
          if (response) {
            const { reqCal, reqCarbs, reqProteins, reqFats } = response;
            await userModel.findByIdAndUpdate(newUser._id, {
              diet: { reqCal, reqCarbs, reqProteins, reqFats },
            });
          }
        } catch (bgErr) {
          console.error("diet background compute error:", bgErr.message);
        }
      });
    } catch (dbError) {
      console.error(dbError.message);
      res.status(500).send("Error creating user");
    }
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const fetchUser = async (req, res) => {
  if (req.user._id) {
    let user = await userModel.findById(req.user._id);
    if (user) {
      res.status(200).json({ message: "User fetched successfully!", user });
    } else {
      res.status(400).json({ message: "User not found!" });
    }
  } else {
    return res.status(300).json({ message: "User not logged in!" });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });
  return res.status(200).json({ message: "Logged out successfully" });
};

const updateProfile = async (req, res) => {
  try {
    const { name, height, weight, age, goal, activityLevel } = req.body;
    const update = {};
    if (name != null) update.name = name;
    if (height != null) update.height = Number(height);
    if (weight != null) update.weight = Number(weight);
    if (age != null) update.age = Number(age);
    if (goal) update.goal = goal;
    if (activityLevel) update.activityLevel = activityLevel;
    const user = await userModel.findByIdAndUpdate(req.user._id, update, { new: true });
    return res.json({ message: "Profile updated", user });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) return res.status(400).json({ error: "Missing fields" });
    const user = await userModel.findById(req.user._id);
    const ok = await bcrypt.compare(oldPassword, user.password);
    if (!ok) return res.status(401).json({ error: "Old password incorrect" });
    const hash = await bcrypt.hash(newPassword, 10);
    user.password = hash;
    await user.save();
    return res.json({ message: "Password changed" });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { signupUser, loginUser, fetchUser, logoutUser, updateProfile, changePassword };
