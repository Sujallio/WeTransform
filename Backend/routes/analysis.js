const express = require('express');
const { analyzePhoto, getLatestAnalysis, skipPhotoAnalysis } = require('../controllers/analysisController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/analyze', authMiddleware, analyzePhoto);
router.get('/latest', authMiddleware, getLatestAnalysis);
router.post('/skip', authMiddleware, skipPhotoAnalysis);

module.exports = router;
