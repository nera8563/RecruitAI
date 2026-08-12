require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");
const Feedback = require("./models/Feedback");

const sampleUser = {
  name: "Seed User",
  email: "seeduser@example.com",
  password: "password123",
};

const sampleFeedback = {
  name: "Seed Candidate",
  email: "candidate@example.com",
  role: "Software Engineer",
  communication: "4",
  technical: "5",
  problem_solving: "4",
  cultural_fit: "5",
  confidence: "4",
  summary: "Strong technical knowledge with clear communication.",
  suggestions: "Continue practicing system design questions.",
};

const seedDatabase = async () => {
  try {
    await connectDB();

    await Feedback.deleteMany();
    await User.deleteMany();

    const hashedPassword = await bcrypt.hash(sampleUser.password, 10);
    const user = await User.create({
      ...sampleUser,
      password: hashedPassword,
    });

    await Feedback.create({
      ...sampleFeedback,
      userId: user._id,
    });

    console.log("✅ Seed data inserted successfully.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
};

seedDatabase();
