const connectDB = require('../lib/connectDB');
const Question = require('../models/question');

module.exports = async (req, res) => {
  // ✅ Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ✅ Handle preflight (OPTIONS) request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectDB();

    if (req.method === 'GET') {
      const parts = req.url.split('/');
      const levelStr = parts[parts.length - 1];
      const level = parseInt(levelStr);

      if (isNaN(level)) {
        return res.status(400).json({ error: 'Invalid level in URL' });
      }

      const questions = await Question.find({ level }).limit(20);
      return res.status(200).json(questions);
    }

    if (req.method === 'POST') {
      const { questionId, userAnswer } = req.body;

      if (!questionId || !userAnswer) {
        return res.status(400).json({ error: 'Missing questionId or userAnswer' });
      }

      const q = await Question.findById(questionId);
      if (!q) return res.status(404).json({ error: 'Question not found' });

      const isCorrect = q.correct_answer === userAnswer.toUpperCase();
      return res.status(200).json({ isCorrect, correct_answer: q.correct_answer });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('❌ Server error:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
};