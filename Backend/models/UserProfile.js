const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  height: { type: Number, required: true }, // in cm
  weight: { type: Number, required: true }, // in kg
  photoUrl: { type: String, default: null },
  photoUploadedAt: { type: Date, default: null },
  photoConsent: { type: Boolean, default: false },
  selectedAreas: [{
    type: String,
    enum: ['skincare', 'haircut', 'fashion', 'diet', 'body-confidence', 'communication'],
    default: []
  }],
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
