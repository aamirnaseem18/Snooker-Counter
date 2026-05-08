import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../database.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production';

// Register user
router.post('/register', async (req, res) => {
  try {
    const { userId, email, fullName, password } = req.body;

    // Validation
    if (!userId || !email || !fullName || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    db.run(
      `INSERT INTO users (userId, email, fullName, password) VALUES (?, ?, ?, ?)`,
      [userId, email, fullName, hashedPassword],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({
              success: false,
              message: 'User ID or email already exists'
            });
          }
          console.error('Database error:', err);
          return res.status(500).json({
            success: false,
            message: 'Error creating user'
          });
        }

        // Create JWT token
        const user = {
          id: this.lastID,
          userId,
          email,
          fullName
        };

        const token = jwt.sign(user, JWT_SECRET, { expiresIn: '30d' });

        res.status(201).json({
          success: true,
          user,
          token,
          message: 'User registered successfully'
        });
      }
    );
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

// Login user
router.post('/login', (req, res) => {
  try {
    const { userId, password } = req.body;

    // Validation
    if (!userId || !password) {
      return res.status(400).json({
        success: false,
        message: 'User ID and password are required'
      });
    }

    // Find user in database
    db.get(
      `SELECT * FROM users WHERE userId = ?`,
      [userId],
      async (err, user) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({
            success: false,
            message: 'Server error'
          });
        }

        if (!user) {
          return res.status(401).json({
            success: false,
            message: 'Invalid user ID or password'
          });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(401).json({
            success: false,
            message: 'Invalid user ID or password'
          });
        }

        // Create JWT token
        const userData = {
          id: user.id,
          userId: user.userId,
          email: user.email,
          fullName: user.fullName
        };

        const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '30d' });

        res.json({
          success: true,
          user: userData,
          token,
          message: 'Login successful'
        });
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// Verify token
router.post('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({
      success: true,
      user: decoded
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

export default router;
