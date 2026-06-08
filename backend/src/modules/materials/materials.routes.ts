import { Router } from 'express';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { upload } from '../../middlewares/upload.middleware';
import { 
  getMaterialsController, 
  createMaterialController, 
  updateMaterialController, 
  deleteMaterialController 
} from './materials.controller';

const router = Router();

// Endpoint Publik (Siswa & Guru) - Butuh login
router.get('/', authenticate, getMaterialsController);

// Endpoint Admin
const uploadFields = upload.fields([
  { name: 'media', maxCount: 1 }
]);

router.post('/', authenticate, authorize(['ADMIN']), uploadFields, createMaterialController);
router.put('/:id', authenticate, authorize(['ADMIN']), uploadFields, updateMaterialController);
router.delete('/:id', authenticate, authorize(['ADMIN']), deleteMaterialController);

export default router;
