import { Router } from 'express';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { upload } from '../../middlewares/upload.middleware';
import {
  getAdminQuizzesController,
  getStudentQuizzesController,
  createQuizController,
  updateQuizController,
  deleteQuizController,
  // checkAnswerController
} from './quizzes.controller';

const router: Router = Router();

// Routes for ADMIN (CRUD)
router.get('/admin/:materialId', authenticate, authorize(['ADMIN', 'TEACHER']), getAdminQuizzesController);
router.post('/', authenticate, authorize(['ADMIN', 'TEACHER']), upload.fields([{ name: 'media', maxCount: 1 }]), createQuizController);
router.put('/:id', authenticate, authorize(['ADMIN', 'TEACHER']), upload.fields([{ name: 'media', maxCount: 1 }]), updateQuizController);
router.delete('/:id', authenticate, authorize(['ADMIN', 'TEACHER']), deleteQuizController);

// Routes for STUDENTS
router.get('/student/:materialId', authenticate, getStudentQuizzesController);
// router.post('/:id/check', authenticate, checkAnswerController);

export default router;
