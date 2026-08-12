const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true, default: "Unknown" },
    communication: { type: String, default: "0" },
    technical: { type: String, default: "0" },
    problem_solving: { type: String, default: "0" },
    cultural_fit: { type: String, default: "0" },
    confidence: { type: String, default: "0" },
    summary: { type: String, default: "" },
    suggestions: { type: String, default: "" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
