const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Add a question (for testing)
router.post("/add", async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json({ message: "Question added" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all questions
router.get("/", async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});
// BULK ADD QUESTIONS
router.post("/bulk-add", async (req, res) => {
  try {
    const questions = req.body;

    if (!Array.isArray(questions)) {
      return res.status(400).json({
        error: "Request body must be an array of questions"
      });
    }

    await Question.insertMany(questions);

    res.status(201).json({
      message: "Questions added successfully",
      count: questions.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to add questions"
    });
  }
});


module.exports = router;
