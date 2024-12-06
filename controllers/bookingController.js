const Booking = require('../models/Booking');

exports.bookSeat = async (req, res) => {
  const { trainId } = req.body;
  const userId = req.user.id;

  try {
    const bookingId = await Booking.create(userId, trainId);
    
    if (!bookingId) {
      return res.status(400).json({ message: 'No seats available' });
    }

    res.status(201).json({ message: 'Seat booked successfully', bookingId });
  } catch (error) {
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  const userId = req.user.id;

  try {
    const bookings = await Booking.getUserBookings(userId);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
  }
};