const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  fetchUser,
  logoutUser,
  updateProfile,
  changePassword,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", authMiddleware, fetchUser);
router.post("/update", authMiddleware, updateProfile);
router.post("/change-password", authMiddleware, changePassword);

module.exports = router;
