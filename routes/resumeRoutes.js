const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// cloud-safe memory storage
const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {
      console.log("▶ Resume upload route hit");

      if (!req.file) {
        console.log("❌ No file received");
        return res.status(400).json({ message: "No file uploaded" });
      }

      console.log("📄 File name:", req.file.originalname);
      console.log("📦 File size:", req.file.size);

      const data = await pdfParse(req.file.buffer);

      console.log("✅ PDF parsed");

      res.json({
        message: "Resume processed successfully",
        preview: data.text.substring(0, 300),
      });

    } catch (error) {
      console.error("🔥 RESUME ERROR:", error.message);

      res.status(500).json({
        message: "Resume processing failed",
        error: error.message,
      });
    }
  }
);

module.exports = router;
