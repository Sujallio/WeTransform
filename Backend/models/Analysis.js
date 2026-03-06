const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  photoUrl: { type: String, default: null },
  faceShape: { type: String, enum: ['round', 'oval', 'square', 'heart', 'oblong', 'unknown'], default: 'unknown' },
  skinType: { type: String, enum: ['oily', 'dry', 'normal', 'combination', 'sensitive', 'unknown'], default: 'unknown' },
  skinCondition: {
    type: String,
    enum: ['clear', 'acne-prone', 'dull', 'sensitive', 'oily', 'dry-patches', 'mixed', 'unknown'],
    default: 'unknown'
  },
  skinTone: { type: String, enum: ['fair', 'light', 'medium', 'tan', 'deep', 'unknown'], default: 'unknown' },
  insights: {
    hairstyleSuggestion: { type: String, default: null },
    colorPalette: [String],
    skincareNotes: { type: String, default: null },
    fashionNotes: { type: String, default: null }
  },
  analyzedAt: { type: Date, default: Date.now },
  confidence: { type: Number, default: 0.5 } // 0-1 scale for analysis confidence
});

module.exports = mongoose.model('Analysis', analysisSchema);
