const Analysis = require('../models/Analysis');
const UserProfile = require('../models/UserProfile');
const User = require('../models/User');
const { generateMockAnalysis } = require('../utils/helpers');

exports.analyzePhoto = async (req, res) => {
  try {
    const userId = req.userId;
    const { photoUrl, photoData } = req.body;

    if (!photoUrl && !photoData) {
      return res.status(400).json({ error: 'Photo is required' });
    }

    // Generate mock analysis
    const mockAnalysis = generateMockAnalysis(true);

    // Save analysis
    const analysis = new Analysis({
      userId,
      photoUrl: photoUrl || `photo_${userId}_${Date.now()}`,
      faceShape: mockAnalysis.faceShape,
      skinType: mockAnalysis.skinType,
      skinCondition: mockAnalysis.skinCondition,
      skinTone: mockAnalysis.skinTone,
      insights: mockAnalysis.insights
    });

    await analysis.save();

    res.status(201).json({
      message: 'Analysis completed',
      analysis: {
        faceShape: analysis.faceShape,
        skinType: analysis.skinType,
        skinCondition: analysis.skinCondition,
        skinTone: analysis.skinTone,
        insights: analysis.insights,
        disclaimer: 'This analysis provides general guidance only. It is not a medical diagnosis or professional recommendation.'
      }
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Analysis failed: ' + error.message });
  }
};

exports.getLatestAnalysis = async (req, res) => {
  try {
    const userId = req.userId;

    const analysis = await Analysis.findOne({ userId }).sort({ analyzedAt: -1 });

    if (!analysis) {
      return res.status(404).json({ error: 'No analysis found' });
    }

    res.json({
      analysis: {
        faceShape: analysis.faceShape,
        skinType: analysis.skinType,
        skinCondition: analysis.skinCondition,
        skinTone: analysis.skinTone,
        insights: analysis.insights,
        analyzedAt: analysis.analyzedAt,
        disclaimer: 'This analysis provides general guidance only. It is not a medical diagnosis or professional recommendation.'
      }
    });
  } catch (error) {
    console.error('Get analysis error:', error);
    res.status(500).json({ error: 'Failed to get analysis' });
  }
};

exports.skipPhotoAnalysis = async (req, res) => {
  try {
    const userId = req.userId;

    // Generate generic analysis without photo
    const mockAnalysis = generateMockAnalysis(false);

    const analysis = new Analysis({
      userId,
      photoUrl: null,
      faceShape: mockAnalysis.faceShape,
      skinType: mockAnalysis.skinType,
      skinCondition: mockAnalysis.skinCondition,
      skinTone: mockAnalysis.skinTone,
      insights: mockAnalysis.insights
    });

    await analysis.save();

    res.json({
      message: 'Proceeding without photo analysis',
      analysis: {
        insights: mockAnalysis.insights,
        disclaimer: 'Generic guidance will be provided. Upload a photo for personalized recommendations.'
      }
    });
  } catch (error) {
    console.error('Skip analysis error:', error);
    res.status(500).json({ error: 'Failed to skip analysis' });
  }
};
