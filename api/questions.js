const mongoose = require('mongoose');
const Question = require('../models/question');

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = true;
}

module.exports = async (req, res) => {
  await connectDB();

  if (req.method === 'GET') {
    // GET /questions?level=1
    const level = parseInt(req.query.level);
    if (!level) return res.status(400).json({ error: 'Level is required' });

    try {
      const questions = await Question.find({ level }).limit(20);
      return res.status(200).json(questions);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch questions', details: err });
    }

  } else if (req.method === 'POST') {
    // POST /questions/check
    const { questionId, userAnswer } = req.body;

    if (!questionId || !userAnswer)
      return res.status(400).json({ error: 'Missing questionId or userAnswer' });

    try {
      const question = await Question.findById(questionId);
      if (!question) return res.status(404).json({ error: 'Question not found' });

      const isCorrect = question.correct_answer === userAnswer.toUpperCase();
      return res.status(200).json({ isCorrect, correct_answer: question.correct_answer });

    } catch (err) {
      return res.status(500).json({ error: 'Check failed', details: err });
    }

  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
