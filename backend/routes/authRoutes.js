const express = require("express");
const { signUp, signIn, getCurrentUser, signOut } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.get("/me", protect, getCurrentUser);

module.exports = router;
