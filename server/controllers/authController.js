// server/controllers/authController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // <--- IMPORTANT: Load .env variables

// 1. REGISTER LOGIC
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userRole = role || 'user'; 

        const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
        
        db.query(sql, [name, email, hashedPassword, userRole], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Email already exists or Database error" });
            }
            res.status(201).json({ message: "User registered successfully!" });
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// 2. LOGIN LOGIC
exports.login = (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length === 0) return res.status(400).json({ error: "User not found" });

        const user = results[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // Generate Token
        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_SECRET, // In real app, put this in .env file
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({ 
            message: "Login successful", 
            token: token, 
            user: { id: user.id, name: user.name, role: user.role } 
        });
    });
};