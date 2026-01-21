const express = require('express');
const Guide = require('../models/Guide');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// View guide profile
router.get('/', verifyToken, authorizeRoles('guide'), async (req, res) => {
  try {
    const guide = await Guide.findOne({ userId: req.user.userId })
      .populate('travelogues')
      .populate('bookings');
    if (!guide) return res.status(404).json({ message: 'Guide profile not found' });
    res.json({ guide });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update guide profile
router.put('/', verifyToken, authorizeRoles('guide'), async (req, res) => {
  try {
    const { bio, languages, experienceYears, earnings, ratings, phone } = req.body;
    const guide = await Guide.findOne({ userId: req.user.userId });
    if (!guide) return res.status(404).json({ message: 'Guide profile not found' });
    if (bio !== undefined) guide.bio = bio;
    if (languages !== undefined) guide.languages = languages;
    if (experienceYears !== undefined) guide.experienceYears = experienceYears;
    if (earnings !== undefined) guide.earnings = earnings;
    if (ratings !== undefined) guide.ratings = ratings;
    if (phone !== undefined) guide.phone = phone;
    await guide.save();
    res.json({ message: 'Profile updated', guide });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
