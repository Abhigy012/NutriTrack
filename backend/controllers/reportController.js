const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const reportModel = require("../models/report");
const userModel = require("../models/user");
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Simple in-memory multer storage for MVP
const upload = multer({ storage: multer.memoryStorage() });

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || process.env.CLODUINARY_API_KEY; // fallback for common typo
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadMiddleware = upload.single("file");

const uploadReport = async (req, res) => {
  try {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      return res.status(500).json({
        error: "Cloudinary config missing",
        details: {
          CLOUDINARY_CLOUD_NAME: !!CLOUDINARY_CLOUD_NAME,
          CLOUDINARY_API_KEY: !!CLOUDINARY_API_KEY,
          CLOUDINARY_API_SECRET: !!CLOUDINARY_API_SECRET,
        },
      });
    }
    if (!req.file) return res.status(400).json({ error: "No file" });
    // Extract text from the uploaded PDF buffer
    const pdfData = await pdfParse(req.file.buffer);
    const extractedText = (pdfData.text || "").slice(0, 8000);

    // Generate avoid list via Gemini (very simple prompt)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `You will be given a health report text. Produce a JSON object of the form {"comment": string, "avoidList": string[]}.
"comment" should be a short 1-3 sentence summary in plain language for the user.
"avoidList" should include only CRITICAL foods/nutrients explicitly indicated by the report (e.g., allergies, doctor-advised restrictions). Avoid generic or speculative items. Limit to 5.
Reply ONLY with the JSON object, no extra text.

Text:\n${extractedText}`;
    let avoidList = [];
    let comment = "";
    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const cleaned = String(text)
        .replace(/```(?:json)?\s*([\s\S]*?)\s*```/, "$1")
        .trim();
      const parsed = JSON.parse(cleaned);
      if (parsed && typeof parsed === 'object') {
        comment = String(parsed.comment || "").slice(0, 600);
        if (Array.isArray(parsed.avoidList)) {
          avoidList = parsed.avoidList.map((s) => String(s)).slice(0, 12);
        }
      }
    } catch (e) {
      avoidList = [];
      comment = "";
    }

    // Upload file to Cloudinary
    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "reports" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
    const result = await streamUpload();

    const doc = await reportModel.create({
      user: req.user._id,
      cloudinaryPublicId: result.public_id,
      cloudinaryUrl: result.secure_url,
      comment,
      avoidList,
      notes: req.body.notes || "",
    });

    // Merge into user's avoidList
    if (avoidList.length > 0) {
      const user = await userModel.findById(req.user._id);
      const merged = new Set([...(user.avoidList || []), ...avoidList]);
      user.avoidList = Array.from(merged);
      await user.save();
    }

    return res.json(doc);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

const getReports = async (req, res) => {
  try {
    const docs = await reportModel.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json(docs);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { uploadMiddleware, uploadReport, getReports };


