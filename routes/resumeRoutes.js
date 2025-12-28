const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse"); // ✅ WORKS with v1.1.1
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

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
        preview: data.text.substring(0, 300),
      });

    } catch (error) {
      console.error("RESUME ERROR:", error);

      res.status(500).json({
        message: "Resume processing failed",
        error: error.message,
      });
    }
  }
);

module.exports = router;
