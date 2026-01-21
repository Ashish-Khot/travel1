const express = require('express');
const Booking = require('../models/Booking');
const User = require('../models/User');
const { verifyToken, authorizeRoles } = require('../middleware/auth');
const nodemailer = require('nodemailer');

const router = express.Router();

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

// Guide accepts or rejects a booking
router.post('/booking/:id/action', verifyToken, authorizeRoles('guide'), async (req, res) => {
  try {
    const { action } = req.body; // 'accept' or 'reject'
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.status !== 'pending') return res.status(400).json({ message: 'Booking already processed' });
    let statusUpdate;
    let emailSubject;
    let emailText;
    if (action === 'accept') {
      booking.status = 'confirmed';
      statusUpdate = 'Booking accepted';
      emailSubject = 'Booking Confirmed';
      emailText = 'Your booking has been accepted by the guide.';
    } else if (action === 'reject') {
      booking.status = 'cancelled';
      statusUpdate = 'Booking rejected';
      emailSubject = 'Booking Rejected';
      emailText = 'Your booking has been rejected by the guide.';
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }
    await booking.save();
    // Notify tourist
    const tourist = await User.findById(booking.touristId);
    if (tourist && tourist.email) {
      await sendEmail(tourist.email, emailSubject, emailText);
    }
    res.json({ message: statusUpdate, booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
