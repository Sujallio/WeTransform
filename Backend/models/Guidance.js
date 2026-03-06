const mongoose = require('mongoose');

const guidanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  areas: [{
    areaType: { type: String, enum: ['skincare', 'haircut', 'fashion', 'diet', 'body-confidence', 'communication'] },
    routine: {
      morning: [String],
      evening: [String]
    },
    recommendations: [String],
    productSuggestions: [String],
    tips: [String]
  }],
  dietChart: {
    foodsForSkinHealth: [String],
    foodsForEnergyGrowth: [String],
    hydrationTips: [String]
  },
  confidenceTips: {
    bodyPosture: [String],
    eyeContact: [String],
    conversationStarters: [String],
    dailyExercises: [String]
  },
  hairstyleRecommendation: {
    faceShapeMatch: String,
    suggestedStyles: [String],
    careInstructions: [String]
  },
  fashionGuidance: {
    colorPalette: [String],
    clothingTypes: [String],
    styleNotes: String
  },
  generatedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Guidance', guidanceSchema);
