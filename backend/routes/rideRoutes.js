// routes/rides.js
const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');

// POST a new ride
router.post('/', async (req, res) => {
  const { pickup, destination } = req.body;
  const fare = Math.floor(Math.random() * 500) + 100; // Random fare
  const ride = new Ride({ pickup, destination, fare });
  await ride.save();
  res.json(ride);
});

// GET all rides
router.get('/', async (req, res) => {
  const rides = await Ride.find().sort({ createdAt: -1 });
  res.json(rides);
});

module.exports = router;
