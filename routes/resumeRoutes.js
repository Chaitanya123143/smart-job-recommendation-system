const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

// POST /api/resume/upload
router.post("/upload", protect, upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);

    fs.unlinkSync(req.file.path);

    res.json({
      message: "Resume uploaded successfully",
      text: pdfData.text,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
