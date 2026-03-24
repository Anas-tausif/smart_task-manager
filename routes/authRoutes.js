const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// ================= PUBLIC ROUTES =================

// Register User
router.post("/register", authController.register);

// Login User
router.post("/login", authController.login);

// ================= PROTECTED ROUTES =================

// Get Profile
router.get("/profile", authMiddleware, authController.getProfile);

// Update Profile
router.put("/update-profile", authMiddleware, authController.updateProfile);

// Update Password
router.put("/update-password", authMiddleware, authController.updatePassword);

module.exports = router;