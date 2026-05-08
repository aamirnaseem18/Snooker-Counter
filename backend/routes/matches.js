import express from 'express';
import jwt from 'jsonwebtoken';
import Match from '../models/Match.js';

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
router.post('/save', verifyToken, async (req, res) => {
  try {
    const { players, framesToWin, winner, matchData } = req.body;
    const userId = req.user.id;

    const match = await Match.create({
      user: userId,
      players,
      framesToWin,
      winner,
      matchData
    });

    res.status(201).json({
      success: true,
      message: 'Match saved successfully',
      matchId: match._id
    });
  } catch (error) {
    console.error('Error saving match:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving match'
    });
  }
});

// Get user matches
router.get('/user-matches', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const matches = await Match.find({ user: userId })
                               .sort({ createdAt: -1 })
                               .limit(50);

    res.json({
      success: true,
      matches
    });
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
