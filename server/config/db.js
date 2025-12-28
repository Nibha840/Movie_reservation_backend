// server/config/db.js
const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,      // Replace with your actual user
    password: process.env.DB_PASSWORD, // Replace with your actual password
    database: process.env.DB_NAME 
});

db.connect((err) => {
    if (err) {
        console.error('❌ Error connecting to MySQL:', err.message);
    } else {
        console.log('✅ Connected to MySQL database');
    }
});


module.exports = db;