const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { uploadMiddleware, uploadReport, getReports } = require("../controllers/reportController");

router.post("/upload", authMiddleware, uploadMiddleware, uploadReport);
router.get("/list", authMiddleware, getReports);

module.exports = router;


