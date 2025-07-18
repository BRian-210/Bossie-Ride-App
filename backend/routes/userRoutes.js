// routes/userRoutes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// DELETE /api/users/:id
router.delete('/users/:id', authMiddleware, async (req, res) => {
    try {
  const { Id }= req.params.id;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(Id)) {
  return res.status(400).json({ message: "Invalid ID format" });
}
    const deletedUser = await User.findByIdAndDelete(Id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting account' });
  }
});

module.exports = router;