require('dotenv').config();
const mongoose = require('mongoose');
const Level = require('./models/level');
const Question = require('./models/question');

async function seed() {
  try {
    // Use await here to ensure connection is established first
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    await Level.deleteMany();
    await Question.deleteMany();

    await Level.insertMany([
      { level: 1, name: 'Beginner' },
      { level: 2, name: 'Intermediate' },
    ]);

    await Question.insertMany([
      {
        level: 1,
        question: "What is the capital of France?",
        choices: { A: "Paris", B: "Berlin", C: "Madrid", D: "Rome" },
        correct_answer: "A"
      },
      {
        level: 1,
        question: "Which planet is known as the Red Planet?",
        choices: { A: "Earth", B: "Mars", C: "Jupiter", D: "Venus" },
        correct_answer: "B"
      }
    ]);

    console.log("✅ Seeding complete");
  } catch (err) {
    console.error("❌ Error during seeding:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected");
  }
}

seed();
