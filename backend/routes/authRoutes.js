
const express = require("express");

const router = express.Router();

const {
  registerAdmin,
  loginAdmin,
  getMe,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

// Register first admin
router.post("/register", registerAdmin);

// Admin login
router.post("/login", loginAdmin);

// Get admin profile
router.get("/me", protect, getMe);

module.exports = router;
