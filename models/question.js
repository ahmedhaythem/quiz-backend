const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  level: { type: Number, required: true },
  question: { type: String, required: true },
  choices: {
    A: String,
    B: String,
    C: String,
    D: String
  },
  correct_answer: { type: String, enum: ['A', 'B', 'C', 'D'], required: true }
});

module.exports = mongoose.model('Question', QuestionSchema);