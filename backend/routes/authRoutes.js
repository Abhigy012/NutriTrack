const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  fetchUser,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, fetchUser);

module.exports = router;
