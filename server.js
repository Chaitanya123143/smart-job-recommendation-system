const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/ping", (req, res) => {
  res.json({ message: "Backend is reachable" });
});

// AUTH ROUTES
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const profileRoutes = require("./routes/profileRoutes");
app.use("/api", profileRoutes);

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
