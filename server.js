const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Log every request (for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/quiz_game', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Routes
app.use('/levels', require('./routes/levels'));
app.use('/questions', require('./routes/questions'));

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Express Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
