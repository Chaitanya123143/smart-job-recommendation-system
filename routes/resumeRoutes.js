const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

// Upload resume (protected)
router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  (req, res) => {
    res.json({
      message: "Resume uploaded successfully",
      file: req.file,
      user: req.user,
    });
  }
);

module.exports = router;
