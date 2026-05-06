const express = require('express');
const router = express.Router();
const { createBooking, getAllBookings, cancelBooking } = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', protect, adminOnly, getAllBookings); // admin only
router.post('/', protect, createBooking); // logged in users
router.patch('/:id/cancel', protect, cancelBooking); // logged in users

module.exports = router;