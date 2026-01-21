const express = require('express');
const Review = require('../models/Review');
const Guide = require('../models/Guide');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.post('/review', verifyToken, authorizeRoles('tourist'), async (req, res) => {
  try {
    const { guideId, place, rating, comment } = req.body;
    const userId = req.user.userId;
    const review = new Review({ userId, guideId, place, rating, comment });
    await review.save();
    // Update guide's average rating
    const reviews = await Review.find({ guideId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Guide.findOneAndUpdate({ userId: guideId }, { ratings: avgRating });
    res.status(201).json({ message: 'Review posted', review });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Tourist posts a review (one per booking, status pending)
router.post('/review', verifyToken, authorizeRoles('tourist'), async (req, res) => {
  try {
    const { guideId, bookingId, place, rating, comment, photo, report } = req.body;
    const userId = req.user.userId;
    // Only allow one review per booking
    const existing = await Review.findOne({ bookingId, userId });
    if (existing) return res.status(400).json({ message: 'Review already exists for this booking.' });
    const review = new Review({ userId, guideId, bookingId, place, rating, comment, photo, report, status: 'pending' });
    await review.save();
    res.status(201).json({ message: 'Review submitted for moderation', review });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Edit review (within 24h, only if pending)
router.put('/review/:id', verifyToken, authorizeRoles('tourist'), async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.userId.toString() !== req.user.userId) return res.status(403).json({ message: 'Forbidden' });
    const now = new Date();
    const created = new Date(review.createdAt);
    if ((now - created) > 24 * 60 * 60 * 1000) return res.status(400).json({ message: 'Edit window expired' });
    if (review.status !== 'pending') return res.status(400).json({ message: 'Cannot edit after moderation' });
    const { rating, comment, photo, report } = req.body;
    review.rating = rating;
    review.comment = comment;
    review.photo = photo;
    review.report = report;
    await review.save();
    res.json({ message: 'Review updated', review });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Fetch all reviews for a guide (only approved)
router.get('/guide/:id/reviews', async (req, res) => {
  try {
    const guideId = req.params.id;
    const reviews = await Review.find({ guideId, status: 'approved' }).populate('userId', 'name avatar');
    res.json({ reviews });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Fetch all reviews by a user
router.get('/user/:id', verifyToken, async (req, res) => {
  try {
    if (req.user.userId !== req.params.id) return res.status(403).json({ message: 'Forbidden' });
    const reviews = await Review.find({ userId: req.params.id });
    res.json({ reviews });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Fetch all reviews for a guide
router.get('/guide/:id/reviews', async (req, res) => {
  try {
    const guideId = req.params.id;
    const reviews = await Review.find({ guideId }).populate('userId', 'name avatar');
    res.json({ reviews });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
