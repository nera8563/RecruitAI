const Feedback = require("../models/Feedback");

// POST /api/feedback  (create a new feedback record for the logged-in user)
const createFeedback = async (req, res) => {
  try {
    const {
      role,
      communication,
      technical,
      problemSolving,
      culturalFit,
      confidence,
      summary,
      suggestions,
    } = req.body;

    const feedback = await Feedback.create({
      userId: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: role || "Unknown",
      communication: String(communication ?? 0),
      technical: String(technical ?? 0),
      problem_solving: String(problemSolving ?? 0),
      cultural_fit: String(culturalFit ?? 0),
      confidence: String(confidence ?? 0),
      summary: summary || "",
      suggestions: Array.isArray(suggestions) ? suggestions.join(", ") : suggestions || "",
    });

    return res.status(201).json({ success: true, feedback });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/feedback  (list all feedback for the logged-in user, newest first)
const getMyFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ email: req.user.email }).sort({ created_at: -1 });
    return res.status(200).json({ success: true, feedbacks });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/feedback/:id
const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ success: false, message: "Feedback not found." });
    }
    return res.status(200).json({ success: true, feedback });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createFeedback, getMyFeedback, getFeedbackById };
