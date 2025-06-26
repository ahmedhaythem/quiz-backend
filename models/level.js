const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
  level: Number,
  name: String,
});

module.exports = mongoose.models.Level || mongoose.model('Level', levelSchema);
