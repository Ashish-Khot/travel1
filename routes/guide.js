const express = require('express');
const Guide = require('../models/Guide');
const User = require('../models/User');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Guide application route
router.post('/apply', verifyToken, authorizeRoles('guide'), async (req, res) => {
  try {
    const { bio, languages, experienceYears } = req.body;
    const userId = req.user.userId;
    // Save guide profile with approved=false
    const guide = new Guide({
      userId,
      bio,
      languages,
      experienceYears,
      approved: false
    });
    await guide.save();
    // Simulate notification to admin (replace with actual notification logic)
    // e.g., send email, push notification, or create a DB entry
    console.log(`Admin notification: New guide application from user ${userId}`);
    res.status(201).json({ message: 'Guide application submitted. Awaiting admin approval.', guide });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get guide profile by userId (for dashboard)
router.get('/profile/:userId', async (req, res) => {
  try {
    const guide = await Guide.findOne({ userId: req.params.userId })
      .populate('travelogues')
      .populate('bookings');
    if (!guide) return res.status(404).json({ message: 'Guide profile not found' });
    res.json({ guide });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;

// Get all approved guides (for tourists to explore)
router.get('/', async (req, res) => {
  try {
    const guides = await Guide.find({ approved: true })
      .populate('userId', 'name email avatar country languages bio');
    res.json({ guides });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
