const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Verifies the "session" cookie (JWT) and attaches the user to req.user.
// Mirrors the original Firebase session-cookie behaviour, just backed by
// our own MongoDB users instead of Firebase Auth.
const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.session;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired session." });
  }
};

module.exports = { protect };
