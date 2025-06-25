const mongoose = require('mongoose');

const LevelSchema = new mongoose.Schema({
  level: { type: Number, required: true, unique: true },
  name: { type: String, required: true }
});

module.exports = mongoose.model('Level', LevelSchema);