const db = require('../config/db');
const sendEmail = require('../utils/emailService');

exports.createBooking = (req, res) => {
    const { userId, showtimeId, seats, totalPrice, userEmail } = req.body;

    // 1. Start Transaction (Check availability logic can be added here)
    
    // 2. Simulate Payment Process (Mock Payment)
    const paymentStatus = 'Success'; // Maan lete hain payment ho gayi
    if (paymentStatus !== 'Success') {
        return res.status(400).json({ error: "Payment Failed" });
    }

    // 3. Save Booking to Database
    const sql = "INSERT INTO bookings (user_id, showtime_id, seats, total_amount, booking_date) VALUES (?, ?, ?, ?, NOW())";
    
    // Note: 'seats' array ko string mein convert kar rahe hain (e.g., "A1,A2")
    const seatString = seats.join(','); 

    db.query(sql, [userId, showtimeId, seatString, totalPrice], async (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }

        // 4. Send Confirmation Email
        const emailSubject = "Booking Confirmed!";
        const emailBody = `Hello,\n\nYour booking for seats ${seatString} is confirmed.\nTotal Price: $${totalPrice}\n\nEnjoy the movie!`;
        
        // Yeh background mein chalega (await nahi lagaya taaki response fast mile)
        sendEmail(userEmail, emailSubject, emailBody);

        res.status(201).json({ message: "Booking successful & Email sent!", bookingId: result.insertId });
    });
};

exports.getUserBookings = (req, res) => {
    // User ki purani bookings dekhne ke liye
    const { userId } = req.params;
    const sql = "SELECT * FROM bookings WHERE user_id = ?";
    
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};