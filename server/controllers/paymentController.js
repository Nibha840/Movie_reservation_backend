// server/controllers/paymentController.js

exports.processPayment = (req, res) => {
    const { upiId, amount } = req.body;

    // 1. Basic Validation for UPI
    if (!upiId || !amount) {
        return res.status(400).json({ error: "Please provide UPI ID and Amount" });
    }

    // Check if it looks like a valid UPI ID (must have '@')
    if (!upiId.includes('@')) {
        return res.status(400).json({ error: "Invalid UPI ID format (e.g., user@upi)" });
    }

    // SIMULATION LOGIC:
    // If UPI ID is 'fail@upi', we simulate a FAILED transaction.
    if (upiId === 'fail@upi') {
        return res.status(400).json({ 
            success: false, 
            error: "Payment Failed: Bank Server Timeout" 
        });
    }

    // 2. Generate a Fake UPI Transaction ID
    // UPI Reference IDs usually look like this: 3120XXXXXXXX
    const transactionId = 'UPI-' + Math.floor(100000000000 + Math.random() * 900000000000);

    // 3. Simulate Network Delay (PhonePe/GPay style processing...)
    setTimeout(() => {
        res.status(200).json({
            success: true,
            message: "Payment Successful",
            transactionId: transactionId,
            method: "UPI",
            amount: amount
        });
    }, 2000); // 2 second delay to mimic "Processing..."
};