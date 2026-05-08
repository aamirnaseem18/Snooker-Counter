import express from 'express';
import db from '../database.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production';

// Middleware to verify token
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

// Save match
router.post('/save', verifyToken, (req, res) => {
  try {
    const { players, framesToWin, winner, matchData } = req.body;
    const userId = req.user.id;

    db.run(
      `INSERT INTO matches (userId, players, framesToWin, winner, matchData) VALUES (?, ?, ?, ?, ?)`,
      [userId, JSON.stringify(players), framesToWin, winner, JSON.stringify(matchData)],
      function(err) {
        if (err) {
          console.error('Error saving match:', err);
          return res.status(500).json({
            success: false,
            message: 'Error saving match'
          });
        }

        res.status(201).json({
          success: true,
          message: 'Match saved successfully',
          matchId: this.lastID
        });
      }
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get user matches
router.get('/user-matches', verifyToken, (req, res) => {
  try {
    const userId = req.user.id;

    db.all(
      `SELECT * FROM matches WHERE userId = ? ORDER BY createdAt DESC LIMIT 50`,
      [userId],
      (err, matches) => {
        if (err) {
          console.error('Error fetching matches:', err);
          return res.status(500).json({
            success: false,
            message: 'Error fetching matches'
          });
        }

        res.json({
          success: true,
          matches: matches || []
        });
      }
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
