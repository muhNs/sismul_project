import { z } from 'zod';

export const createVocabularySchema = z.object({
  english: z.string().min(1, 'Kosakata bahasa Inggris tidak boleh kosong'),
  indonesian: z.string().min(1, 'Arti bahasa Indonesia tidak boleh kosong'),
  gradeLevel: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val) && val >= 3 && val <= 6, {
    message: 'Grade level harus antara 3 dan 6',
  }),
});

export const updateVocabularySchema = z.object({
  english: z.string().min(1).optional(),
  indonesian: z.string().min(1).optional(),
  gradeLevel: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val) && val >= 3 && val <= 6).optional(),
});
