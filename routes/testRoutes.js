const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// protected route
router.get("/dashboard", protect, (req, res) => {
  res.json({
    message: "Welcome to protected dashboard",
    userId: req.user,
  });
});

module.exports = router;
