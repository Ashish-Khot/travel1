const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Google OAuth Login Route
router.post('/google-login', async (req, res) => {
  try {
    const { name, email, avatar, role } = req.body; // Assume Google profile info is sent from frontend
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name,
        email,
        avatar,
        role: role === 'guide' ? 'guide' : 'tourist',
        isVerified: true,
        password: null // No password for Google login
      });
      await user.save();
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '7d' }
    );
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isVerified: user.isVerified
      },
      token
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
