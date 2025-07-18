const Ride = require('../models/Ride');

exports.createRide = async (req, res) => {
  try {
    const ride = new Ride(req.body);
    await ride.save();
    res.status(201).json(ride);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRides = async (req, res) => {
  try {
    const rides = await Ride.find().populate('riderId driverId');
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRideStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, driverId } = req.body;
    const ride = await Ride.findByIdAndUpdate(id, { status, driverId }, { new: true });
    res.json(ride);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
