const express = require('express');
const router = express.Router();
const Question = require('../models/question');

// Get 20 questions for a level
router.get('/:level', async (req, res) => {
  const level = parseInt(req.params.level);
  const questions = await Question.find({ level }).limit(20);
  res.json(questions);
});

// Check if an answer is correct
router.post('/check', async (req, res) => {
  const { questionId, userAnswer } = req.body;
  const q = await Question.findById(questionId);
  if (!q) return res.status(404).json({ error: 'Question not found' });

  const isCorrect = q.correct_answer === userAnswer.toUpperCase();
  res.json({ isCorrect, correct_answer: q.correct_answer });
});

module.exports = router;