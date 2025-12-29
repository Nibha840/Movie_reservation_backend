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

// ADD A NEW MOVIE (Admin Only)
exports.createMovie = (req, res) => {
    const { title, description, poster_url, genre } = req.body;

    const sql = "INSERT INTO movies (title, description, poster_url, genre) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [title, description, poster_url, genre], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Movie added successfully!", movieId: result.insertId });
    });
};