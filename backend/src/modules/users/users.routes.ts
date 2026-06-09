import { Router } from 'express';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { getAllUsersController, getProfileController, updateProfileController, deleteUserController, updateUserController, createUserController } from './users.controller';

const router = Router();

// Endpoint Profil Siswa / Guru (bisa diakses oleh semua yang sudah login)
router.get('/profile', authenticate, getProfileController);
router.put('/profile', authenticate, updateProfileController);

// Endpoint Admin (Manajemen Pengguna)
router.get('/', authenticate, authorize(['ADMIN']), getAllUsersController);
router.post('/', authenticate, authorize(['ADMIN']), createUserController);
router.patch('/:id', authenticate, authorize(['ADMIN']), updateUserController);
router.delete('/:id', authenticate, authorize(['ADMIN']), deleteUserController);

export default router;
