const express = require('express');
const router = express.Router();
const speakingController = require('../controllers/speakingController');
// const authMiddleware = require('../middleware/authMiddleware'); // Uncomment when JWT is implemented

// Get speaking questions for a specific kelas
router.get('/questions', speakingController.getQuestions);

// Save highest score
// router.post('/save-score', authMiddleware.verifyToken, speakingController.saveScore); // With auth
router.post('/save-score', speakingController.saveScore); // Without auth (for development)

// Get student's speaking scores
// router.get('/scores/:studentId', authMiddleware.verifyToken, speakingController.getScores); // With auth
router.get('/scores/:studentId', speakingController.getScores); // Without auth (for development)

module.exports = router;
