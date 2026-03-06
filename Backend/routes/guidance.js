const express = require('express');
const { generateGuidance, getGuidance, getSubscriptionStatus, upgradeSubscription } = require('../controllers/guidanceController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/generate', authMiddleware, generateGuidance);
router.get('/my-guidance', authMiddleware, getGuidance);
router.get('/subscription-status', authMiddleware, getSubscriptionStatus);
router.post('/upgrade-subscription', authMiddleware, upgradeSubscription);

module.exports = router;
