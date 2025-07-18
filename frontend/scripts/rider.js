// models/Ride.js
const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
  riderId: String,
  pickup: String,
  destination: String,
  fare: Number,
  status: { type: String, default: 'requested' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ride', RideSchema);
