const express = require("express");
const router = express.Router();
const UserProfile = require("../models/UserProfile");
const authMiddleware = require("../middleware/authMiddleware");

// Create or fetch user profile
router.get("/", authMiddleware, async (req, res) => {
  try {
    const email = req.user.email;

    let profile = await UserProfile.findOne({ email });

    if (!profile) {
      profile = await UserProfile.create({ email });
    }

    res.json({
      message: "Profile fetched successfully",
      profile
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
