import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter').optional(),
  password: z.string().min(6, 'Password minimal 6 karakter').optional(),
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
