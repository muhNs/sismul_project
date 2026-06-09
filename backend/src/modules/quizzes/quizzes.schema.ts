import { z } from 'zod';

export const createQuizSchema = z.object({
  material_id: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val)),
  questionType: z.enum(['MULTIPLE_CHOICE', 'WRITING', 'SPEAKING']),
  questionText: z.string().min(1, 'Soal tidak boleh kosong'),
  correctAnswer: z.string().min(1, 'Kunci jawaban tidak boleh kosong'),
  optionA: z.string().optional(),
  optionB: z.string().optional(),
  optionC: z.string().optional(),
  optionD: z.string().optional(),
  missingWordIndex: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val)).optional().or(z.literal('')),
});

export const updateQuizSchema = z.object({
  questionType: z.enum(['MULTIPLE_CHOICE', 'WRITING', 'SPEAKING']).optional(),
  questionText: z.string().min(1).optional(),
  correctAnswer: z.string().min(1).optional(),
  optionA: z.string().optional(),
  optionB: z.string().optional(),
  optionC: z.string().optional(),
  optionD: z.string().optional(),
  missingWordIndex: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val)).optional().or(z.literal('')),
});

export const checkAnswerSchema = z.object({
  answer: z.string(),
});

export const submitScoreSchema = z.object({
  material_id: z.number().int().positive("ID Material tidak valid"),
  answers: z.array(
    z.object({
      quiz_id: z.number().int().positive(),
      answer: z.string()
    })
  ).min(1, "Minimal harus ada 1 jawaban yang dikumpulkan")
});

export type SubmitScoreInput = z.infer<typeof submitScoreSchema>;
