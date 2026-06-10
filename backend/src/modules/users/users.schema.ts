import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter').optional(),
  password: z.string().min(6, 'Password minimal 6 karakter').optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Password saat ini harus diisi'),
  newPassword: z.string().min(6, 'Password baru minimal 6 karakter'),
  confirmPassword: z.string().min(6, 'Konfirmasi password baru minimal 6 karakter'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Konfirmasi password baru tidak cocok",
  path: ["confirmPassword"],
});

export const createUserSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  role: z.enum(['STUDENT', 'TEACHER', 'ADMIN']).optional().default('STUDENT'),
});

export const updateUserSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter').optional(),
  email: z.string().email('Format email tidak valid').optional(),
  password: z.string().min(6, 'Password minimal 6 karakter').optional(),
  role: z.enum(['STUDENT', 'TEACHER', 'ADMIN']).optional(),
});
