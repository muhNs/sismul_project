import { Router } from 'express';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { saveScoreController, getStudentScoresController, getScoresByMaterialController, getLeaderboardController, getAllScoresController } from './scores.controller';

const router: Router = Router();

// Student can save their score and see their score history
router.post('/', authenticate, saveScoreController);
router.get('/my-scores', authenticate, getStudentScoresController);

// Teacher/Admin can view all scores
router.get('/', authenticate, authorize(['ADMIN', 'TEACHER']), getAllScoresController);

// Leaderboard route
router.get('/leaderboard', authenticate, getLeaderboardController);

// Teacher/Admin can view scores by material
router.get('/material/:materialId', authenticate, authorize(['ADMIN', 'TEACHER']), getScoresByMaterialController);

export default router;

