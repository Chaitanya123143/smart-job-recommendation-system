const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  resumeText: {
    type: String,
    default: ""
  },
  skills: {
    type: [String],
    default: []
  },
  experience: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
