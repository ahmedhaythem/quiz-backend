const connectDB = require('../lib/connectDB');
const Question = require('../models/question');

module.exports = async (req, res) => {
  await connectDB();

  if (req.method === 'GET') {
    const level = parseInt(req.query.level);
    const questions = await Question.find({ level }).limit(20);
    return res.status(200).json(questions);
  }

  if (req.method === 'POST') {
    const { questionId, userAnswer } = req.body;
    const q = await Question.findById(questionId);
    if (!q) return res.status(404).json({ error: 'Question not found' });

    const isCorrect = q.correct_answer === userAnswer.toUpperCase();
    return res.status(200).json({ isCorrect, correct_answer: q.correct_answer });
  }

  res.status(405).json({ error: 'Method not allowed' });
};
