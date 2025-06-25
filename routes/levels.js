// routes/levels.js
const express = require('express');
const router = express.Router();
const Level = require('../models/level');

router.get('/', async (req, res) => {
  try {
    const levels = await Level.find();
    res.json(levels);
  } catch (err) {
    console.error('Error fetching levels:', err);
    res.status(500).json({ error: 'Server error while fetching levels' });
  }
});

module.exports = router;
