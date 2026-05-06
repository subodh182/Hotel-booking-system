const Booking = require('../models/Booking');
const Room = require('../models/Room');

// Create a booking
exports.createBooking = async (req, res) => {
  const { roomId, guestName, guestEmail, checkIn, checkOut } = req.body;
  try {
    const room = await Room.findById(roomId);
    if (!room || !room.isAvailable)
      return res.status(400).json({ error: 'Room not available' });

    const booking = await Booking.create({
      room: roomId, guestName, guestEmail, checkIn, checkOut
    });

    room.isAvailable = false;
    await room.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find().populate('room');
  res.json(bookings);
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    booking.status = 'cancelled';
    await booking.save();

    await Room.findByIdAndUpdate(booking.room, { isAvailable: true });

    res.json({ message: 'Booking cancelled', booking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};