import { z } from 'zod';

export const createMaterialSchema = z.object({
  chapter: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val)),
  gradeLevel: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val) && val >= 3 && val <= 6),
  skillCategory: z.enum(['READING', 'SPEAKING', 'LISTENING', 'WRITING']),
  content: z.string().optional(),
});

export const updateMaterialSchema = z.object({
  chapter: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val)).optional(),
  gradeLevel: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val) && val >= 3 && val <= 6).optional(),
  skillCategory: z.enum(['READING', 'SPEAKING', 'LISTENING', 'WRITING']).optional(),
  content: z.string().optional(),
});
