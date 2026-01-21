const express = require('express');
const Travelogue = require('../models/Travelogue');
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

// Admin approves or rejects travelogue
router.post('/action/:id', verifyToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { action } = req.body; // 'approve' or 'reject'
    const travelogueId = req.params.id;
    const travelogue = await Travelogue.findById(travelogueId);
    if (!travelogue) return res.status(404).json({ message: 'Travelogue not found' });
    let statusUpdate;
    let emailSubject;
    let emailText;
    if (action === 'approve') {
      travelogue.status = 'approved';
      statusUpdate = 'Travelogue approved';
      emailSubject = 'Travelogue Approved';
      emailText = 'Your travelogue has been approved by the admin.';
    } else if (action === 'reject') {
      travelogue.status = 'rejected';
      statusUpdate = 'Travelogue rejected';
      emailSubject = 'Travelogue Rejected';
      emailText = 'Your travelogue has been rejected by the admin.';
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }
    await travelogue.save();
    // Notify guide
    const guide = await User.findById(travelogue.guideId);
    if (guide && guide.email) {
      await sendEmail(guide.email, emailSubject, emailText);
    }
    res.json({ message: statusUpdate, travelogue });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
