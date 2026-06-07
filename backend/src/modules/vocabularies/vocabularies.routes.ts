import { Router } from 'express';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { upload } from '../../middlewares/upload.middleware';
import { 
  getVocabulariesController, 
  createVocabularyController, 
  updateVocabularyController, 
  deleteVocabularyController 
} from './vocabularies.controller';

const router = Router();

// Endpoint Publik (Siswa & Guru) - Butuh login
router.get('/', authenticate, getVocabulariesController);

// Endpoint Admin
const uploadFields = upload.fields([
  { name: 'voice', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]);

router.post('/', authenticate, authorize(['ADMIN']), uploadFields, createVocabularyController);
router.put('/:id', authenticate, authorize(['ADMIN']), uploadFields, updateVocabularyController);
router.delete('/:id', authenticate, authorize(['ADMIN']), deleteVocabularyController);

export default router;
