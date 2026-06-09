import { z } from 'zod';

export const saveScoreSchema = z.object({
  material_id: z.number().int().positive('ID material tidak valid'),
  answers: z.array(
    z.object({
      quiz_id: z.number().int().positive(),
      answer: z.string()
    })
  ).min(1, "Minimal harus ada 1 jawaban yang dikumpulkan")
});

export type SaveScoreInput = z.infer<typeof saveScoreSchema>;