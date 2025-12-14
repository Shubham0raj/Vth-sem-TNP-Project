const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Save user score
router.post("/submit", async (req, res) => {
  try {
    const { name, score, totalQuestions } = req.body;

    const user = new User({
      name,
      score,
      totalQuestions
    });

    await user.save();
    res.status(201).json({ message: "Score saved" });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all results
router.get("/", async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

module.exports = router;
