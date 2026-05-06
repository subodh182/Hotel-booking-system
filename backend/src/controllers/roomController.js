const Room = require('../models/Room');

exports.getAllRooms = async (req, res) => {
  const rooms = await Room.find({ isAvailable: true });
  res.json(rooms);
};

exports.addRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};