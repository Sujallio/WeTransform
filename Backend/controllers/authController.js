const User = require('../models/User');
const { generateToken } = require('../utils/helpers');

exports.signup = async (req, res) => {
  try {
    const { email, password, age, gender, parentalConsent, parentEmail } = req.body;

    // Validation
    if (!email || !password || !age || !gender) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (age < 12 || age > 18) {
      return res.status(400).json({ error: 'Age must be between 12 and 18' });
    }

    if (!parentalConsent) {
      return res.status(400).json({ error: 'Parental consent is mandatory' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create new user
    const user = new User({
      email,
      password,
      age,
      gender,
      parentalConsent,
      parentEmail: parentEmail || null,
      subscriptionStartDate: new Date(),
      subscriptionEndDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000) // 3 days free trial
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Signup successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        age: user.age,
        gender: user.gender,
        subscriptionStatus: user.subscriptionStatus
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        age: user.age,
        gender: user.gender,
        subscriptionStatus: user.subscriptionStatus,
        subscriptionEndDate: user.subscriptionEndDate
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};
