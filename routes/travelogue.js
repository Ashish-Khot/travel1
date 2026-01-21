const express = require('express');
const Travelogue = require('../models/Travelogue');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Guide submits a travelogue
router.post('/submit', verifyToken, authorizeRoles('guide'), async (req, res) => {
  try {
    const { title, description, images, location } = req.body;
    const guideId = req.user.userId;
    const travelogue = new Travelogue({
      title,
      description,
      images,
      guideId,
      location,
      status: 'pending'
    });
    await travelogue.save();
    res.status(201).json({ message: 'Travelogue submitted and pending approval.', travelogue });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all travelogues for a specific guide
router.get('/guide/:userId', async (req, res) => {
  try {
    const travelogues = await Travelogue.find({ guideId: req.params.userId });
    res.json({ tours: travelogues });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
