import { z } from 'zod';

export const saveScoreSchema = z.object({
  material_id: z.number().int().positive('ID material tidak valid'),
  score: z.number().min(0, 'Nilai minimal 0').max(100, 'Nilai maksimal 100'),
});
