const Guidance = require('../models/Guidance');
const User = require('../models/User');
const Analysis = require('../models/Analysis');
const { generateMockGuidance } = require('../utils/helpers');

exports.generateGuidance = async (req, res) => {
  try {
    const userId = req.userId;
    const { selectedAreas } = req.body;

    if (!selectedAreas || selectedAreas.length === 0) {
      return res.status(400).json({ error: 'Please select at least one area' });
    }

    // Get latest analysis
    const analysis = await Analysis.findOne({ userId }).sort({ analyzedAt: -1 });

    // Generate mock guidance
    const mockGuidance = generateMockGuidance(selectedAreas, analysis);

    // Save guidance
    const guidance = new Guidance({
      userId,
      areas: mockGuidance.areas,
      dietChart: mockGuidance.dietChart,
      confidenceTips: mockGuidance.confidenceTips
    });

    await guidance.save();

    res.status(201).json({
      message: 'Personalized guidance generated',
      guidance: {
        areas: guidance.areas,
        dietChart: guidance.dietChart,
        confidenceTips: guidance.confidenceTips,
        disclaimer: 'This guidance is educational and not a substitute for professional medical or nutritional advice.'
      }
    });
  } catch (error) {
    console.error('Generate guidance error:', error);
    res.status(500).json({ error: 'Failed to generate guidance' });
  }
};

exports.getGuidance = async (req, res) => {
  try {
    const userId = req.userId;

    const guidance = await Guidance.findOne({ userId }).sort({ generatedAt: -1 });

    if (!guidance) {
      return res.status(404).json({ error: 'No guidance found. Please generate guidance first.' });
    }

    res.json({
      guidance: {
        areas: guidance.areas,
        dietChart: guidance.dietChart,
        confidenceTips: guidance.confidenceTips,
        generatedAt: guidance.generatedAt,
        disclaimer: 'This guidance is educational and not a substitute for professional medical or nutritional advice.'
      }
    });
  } catch (error) {
    console.error('Get guidance error:', error);
    res.status(500).json({ error: 'Failed to get guidance' });
  }
};

exports.getSubscriptionStatus = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const now = new Date();
    let subscriptionStatus = user.subscriptionStatus;

    // Check if free trial has expired
    if (subscriptionStatus === 'free-trial' && now > user.subscriptionEndDate) {
      subscriptionStatus = 'expired';
      user.subscriptionStatus = 'expired';
      await user.save();
    }

    res.json({
      subscriptionStatus,
      subscriptionEndDate: user.subscriptionEndDate,
      daysRemaining: Math.ceil((user.subscriptionEndDate - now) / (1000 * 60 * 60 * 24))
    });
  } catch (error) {
    console.error('Get subscription status error:', error);
    res.status(500).json({ error: 'Failed to get subscription status' });
  }
};

exports.upgradeSubscription = async (req, res) => {
  try {
    const userId = req.userId;
    const { plan } = req.body; // 1month, 2months, 3months, 6months

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const daysToAdd = {
      '1month': 30,
      '2months': 60,
      '3months': 90,
      '6months': 180
    };

    if (!daysToAdd[plan]) {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    const newEndDate = new Date();
    newEndDate.setDate(newEndDate.getDate() + daysToAdd[plan]);

    user.subscriptionStatus = 'active';
    user.subscriptionEndDate = newEndDate;
    await user.save();

    res.json({
      message: 'Subscription upgraded successfully',
      plan,
      subscriptionEndDate: user.subscriptionEndDate,
      subscriptionStatus: user.subscriptionStatus
    });
  } catch (error) {
    console.error('Upgrade subscription error:', error);
    res.status(500).json({ error: 'Failed to upgrade subscription' });
  }
};
