const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true, min: 12, max: 18 },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  parentalConsent: { type: Boolean, required: true, default: false },
  parentEmail: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: null },
  subscriptionStatus: { type: String, enum: ['free-trial', 'active', 'expired'], default: 'free-trial' },
  subscriptionStartDate: { type: Date, default: null },
  subscriptionEndDate: { type: Date, default: Date.now(new Date().getTime() + 3 * 24 * 60 * 60 * 1000) }, // 3 days free trial
  dataConsent: { type: Boolean, default: true },
  emailVerified: { type: Boolean, default: false }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(passwordToCompare) {
  return bcrypt.compare(passwordToCompare, this.password);
};

module.exports = mongoose.model('User', userSchema);
