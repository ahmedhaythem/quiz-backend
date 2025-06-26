const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  level: Number,
  question: String,
  choices: {
    A: String,
    B: String,
    C: String,
    D: String,
  },
  correct_answer: String,
});

module.exports = mongoose.models.Question || mongoose.model('Question', questionSchema);
