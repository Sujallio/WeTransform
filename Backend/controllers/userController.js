const UserProfile = require('../models/UserProfile');
const User = require('../models/User');

exports.createProfile = async (req, res) => {
  try {
    const { height, weight, selectedAreas, photoConsent } = req.body;
    const userId = req.userId;

    if (!height || !weight) {
      return res.status(400).json({ error: 'Height and weight are required' });
    }

    // Check if profile exists
    let profile = await UserProfile.findOne({ userId });

    if (profile) {
      // Update existing profile
      profile.height = height;
      profile.weight = weight;
      profile.selectedAreas = selectedAreas || profile.selectedAreas;
      profile.photoConsent = photoConsent !== undefined ? photoConsent : profile.photoConsent;
      profile.updatedAt = new Date();
    } else {
      // Create new profile
      profile = new UserProfile({
        userId,
        height,
        weight,
        selectedAreas: selectedAreas || [],
        photoConsent: photoConsent || false
      });
    }

    await profile.save();

    res.status(201).json({
      message: 'Profile created/updated successfully',
      profile
    });
  } catch (error) {
    console.error('Profile creation error:', error);
    res.status(500).json({ error: 'Failed to create profile' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const profile = await UserProfile.findOne({ userId });
    const user = await User.findById(userId);

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({
      profile,
      user: {
        age: user.age,
        gender: user.gender,
        subscriptionStatus: user.subscriptionStatus
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
};

exports.updateSelectedAreas = async (req, res) => {
  try {
    const { selectedAreas } = req.body;
    const userId = req.userId;

    const profile = await UserProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    profile.selectedAreas = selectedAreas;
    profile.updatedAt = new Date();
    await profile.save();

    res.json({
      message: 'Selected areas updated',
      selectedAreas: profile.selectedAreas
    });
  } catch (error) {
    console.error('Update selected areas error:', error);
    res.status(500).json({ error: 'Failed to update selected areas' });
  }
};

exports.uploadPhoto = async (req, res) => {
  try {
    const userId = req.userId;
    const photoBase64 = req.body.photo; // Mock implementation - in production, use file upload

    if (!photoBase64) {
      return res.status(400).json({ error: 'Photo is required' });
    }

    // Try to find or create profile
    let profile = await UserProfile.findOne({ userId });

    if (!profile) {
      // Create profile if it doesn't exist
      profile = new UserProfile({
        userId,
        height: 0,
        weight: 0,
        selectedAreas: [],
        photoConsent: true
      });
    }

    // Mock storage - storing base64 reference (in production, use cloud storage)
    profile.photoUrl = `photo_${userId}_${Date.now()}`;
    profile.photoUploadedAt = new Date();
    await profile.save();

    res.json({
      message: 'Photo uploaded successfully',
      photoUrl: profile.photoUrl
    });
  } catch (error) {
    console.error('Photo upload error:', error);
    res.status(500).json({ error: 'Failed to upload photo: ' + error.message });
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const userId = req.userId;

    const profile = await UserProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Mock deletion - in production, delete from cloud storage
    profile.photoUrl = null;
    profile.photoUploadedAt = null;
    await profile.save();

    res.json({
      message: 'Photo deleted successfully'
    });
  } catch (error) {
    console.error('Photo deletion error:', error);
    res.status(500).json({ error: 'Failed to delete photo' });
  }
};
