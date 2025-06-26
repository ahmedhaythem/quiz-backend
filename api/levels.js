const connectDB = require('../lib/connectDB');
const Level = require('../models/level');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectDB();
    const levels = await Level.find();
    res.status(200).json(levels);
  } catch (err) {
    console.error('❌ Error fetching levels:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
};
