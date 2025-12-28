const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// memory storage (cloud safe)
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const data = await pdfParse(req.file.buffer);

      res.json({
        message: "Resume processed successfully",
        extractedTextPreview: data.text.substring(0, 500)
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Resume processing failed" });
    }
  }
);

module.exports = router;
