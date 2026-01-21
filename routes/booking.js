const express = require('express');
const Booking = require('../models/Booking');
const Guide = require('../models/Guide');
const User = require('../models/User');
const { verifyToken, authorizeRoles } = require('../middleware/auth');
const nodemailer = require('nodemailer');

const router = express.Router();
// Get all bookings for a specific tourist
router.get('/tourist/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ touristId: req.params.userId })
      .populate('guideId', 'name email country avatar');
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Helper: send email notification
async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
}

// Tourist creates a booking
router.post('/book', verifyToken, authorizeRoles('tourist'), async (req, res) => {
  try {
    const { guideId, date } = req.body;
    const touristId = req.user.userId;
    // Create booking
    const booking = new Booking({
      touristId,
      guideId,
      date,
      status: 'pending',
      messages: []
    });
    await booking.save();
    // Add booking to guide profile
    await Guide.findOneAndUpdate(
      { userId: guideId },
      { $push: { bookings: booking._id } }
    );
    res.status(201).json({ message: 'Booking created.', booking });

    // Notify guide (email) - do NOT block booking response
    (async () => {
      try {
        const guideUser = await User.findById(guideId);
        if (guideUser && guideUser.email) {
          await sendEmail(
            guideUser.email,
            'New Booking Request',
            `You have a new booking request from a tourist for ${date}.`
          );
        }
      } catch (emailErr) {
        console.warn('Booking created, but failed to send email:', emailErr.message);
      }
    })();
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all bookings for a specific guide
router.get('/guide/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ guideId: req.params.userId })
      .populate('touristId', 'name email')
      .populate('guideId', 'name email');
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
