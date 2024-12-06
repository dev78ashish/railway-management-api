const express = require('express');
const { bookSeat, getUserBookings } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/book', authMiddleware, bookSeat);
router.get('/my-bookings', authMiddleware, getUserBookings);

module.exports = router;