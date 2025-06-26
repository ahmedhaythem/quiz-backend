const connectDB = require('../lib/connectDB');
const Level = require('../models/level');

module.exports = async (req, res) => {
  try {
    await connectDB();
    const levels = await Level.find();
    res.status(200).json(levels);
  } catch (err) {
    console.error('❌ Error fetching levels:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
};
