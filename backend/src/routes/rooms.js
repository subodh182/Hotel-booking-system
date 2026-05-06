const express = require('express');
const router = express.Router();
const { getAllRooms, addRoom } = require('../controllers/roomController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getAllRooms);
router.post('/', protect, adminOnly, addRoom); // only admin can add rooms

module.exports = router;