const mongoose = require('mongoose');

const GuideSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bio: {
    type: String,
    trim: true
  },
  languages: [{
    type: String,
    trim: true
  }],
  experienceYears: {
    type: Number,
    default: 0
  },
  ratings: {
    type: Number,
    default: 0
  },
  earnings: {
    type: Number,
    default: 0
  },
  approved: {
    type: Boolean,
    default: false
  },
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }],
  travelogues: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Travelogue'
  }],
  phone: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Guide', GuideSchema);
