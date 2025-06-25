const mongoose = require('mongoose');
const Level = require('../models/level');

mongoose.connect(process.env.MONGO_URI);

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const levels = await Level.find();
    res.status(200).json(levels);
  }
};
