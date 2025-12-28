// server/controllers/movieController.js
const db = require('../config/db');

// GET ALL MOVIES
exports.getAllMovies = (req, res) => {
    const sql = "SELECT * FROM movies";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};