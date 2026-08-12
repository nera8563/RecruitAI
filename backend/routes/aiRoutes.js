const express = require("express");
const { evaluateConversation } = require("../controllers/aiController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/evaluate", protect, evaluateConversation);

module.exports = router;
