const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const cookieparser = require("cookie-parser");
const userModel = require("../models/user");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middlewares/generateToken");

app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signup",  async (req, res) => {
  let { email, password, name, height, weight, age, gender, goal, activity } =
    req.body;
  let user = await userModel.findOne({ email });
  if (user) {
    return res.status(409).json({ error: "Email is already taken" });
  } else {
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        console.log(err.message);
        return res.status(500).send("Error hashing password");
      }

      try {
        let user = await userModel.create({
          email,
          name,
          password: hash,
          name,
          height,
          weight,
          age,
          gender,
          goal,
          activityLevel: activity,
        });

        console.log("User created successfully");
        let token = generateToken(user.email);
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ message: "User created successsfully" });
      } catch (dbError) {
        console.log(dbError.message);
        return res.status(500).send("Error creating user");
      }
    });
  }
});

app.post("/login", async (req, res) => {
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

    const token = generateToken(user.email);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = app;
