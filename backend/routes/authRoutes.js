const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

// POST - Register
router.post('/register', registerUser);

// POST - Login
router.post('/login', loginUser);

// DELETE - Delete user account
router.delete("object/:id", authMiddleware, async (req, res) => {
  const userId = req.params.id;

  // Only the user themselves or admin can delete
  if (req.user._id.toString() !== userId && req.user.role !== 'admin') {
    return res.status(403).json({ message: "Unauthorized" });
  }

  try {
    await User.findByIdAndDelete(userId);
    res.json({ message: "Account deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting account" });
  }
});

module.exports = router;
