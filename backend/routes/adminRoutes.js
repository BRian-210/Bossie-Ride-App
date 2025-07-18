const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ GET /api/admin/history - Fetch all rides (admin only)
router.get('/admin/history', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const rides = await Ride.find().sort({ createdAt: -1 });
    res.json(rides);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch ride history' });
  }
});

// ✅ DELETE /api/admin/rides/:id - Delete a specific ride (admin only)
router.delete('/admin/rides/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const rideId = req.params.id;
    const deletedRide = await Ride.findByIdAndDelete(rideId);

    if (!deletedRide) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    res.json({ message: 'Ride deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete ride' });
  }
});

// ✅ DELETE /api/admin/users/:id - Delete a user (admin only)
router.delete('/admin/users/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

module.exports = router;
