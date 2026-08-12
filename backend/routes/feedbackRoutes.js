const express = require("express");
const {
  createFeedback,
  getMyFeedback,
  getFeedbackById,
} = require("../controllers/feedbackController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, createFeedback);
router.get("/", protect, getMyFeedback);
router.get("/:id", protect, getFeedbackById);

module.exports = router;
