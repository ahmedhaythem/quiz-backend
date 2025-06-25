// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/levels', require('./routes/levels'));
app.use('/questions', require('./routes/questions'));

// Serve static frontend files if needed (optional)
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection (environment variable for Render)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/quiz_game', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
