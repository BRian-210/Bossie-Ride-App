// backend/models/Ride.js
const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  riderId: {
    type: String,
    required:true,
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['requested', 'assigned', 'completed'],
    default: 'requested',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Ride = mongoose.model('Ride', rideSchema);
module.exports = Ride;
