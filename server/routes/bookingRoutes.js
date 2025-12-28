const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Route to create a booking (POST)
router.post('/book', bookingController.createBooking);

// Route to get bookings for a user (GET)
router.get('/user/:userId', bookingController.getUserBookings);

module.exports = router;