const express = require('express');
const { createProfile, getProfile, updateSelectedAreas, uploadPhoto, deletePhoto } = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/profile', authMiddleware, createProfile);
router.get('/profile', authMiddleware, getProfile);
router.put('/selected-areas', authMiddleware, updateSelectedAreas);
router.post('/upload-photo', authMiddleware, uploadPhoto);
router.delete('/delete-photo', authMiddleware, deletePhoto);

module.exports = router;
