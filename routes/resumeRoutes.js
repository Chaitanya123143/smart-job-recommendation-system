const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// MEMORY storage (NO uploads folder)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.post("/upload", authMiddleware, upload.single("resume"), async (req, res) => {
  try {
    console.log("Resume upload hit");

    if (!req.file) {
      return res.status(400).json({ message: "No resume file uploaded" });
    }

    const pdfData = await pdfParse(req.file.buffer);

    res.json({
      message: "Resume uploaded and parsed successfully",
      preview: pdfData.text.substring(0, 300),
    });

  } catch (error) {
    console.error("RESUME ERROR:", error);
    res.status(500).json({ message: "Resume processing failed" });
  }
});

module.exports = router;
