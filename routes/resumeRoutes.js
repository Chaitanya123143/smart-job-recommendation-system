const express = require("express");
const multer = require("multer");
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
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // ✅ Dynamic import for pdf-parse (Node 18+ fix)
      const pdfParse = (await import("pdf-parse")).default;

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
