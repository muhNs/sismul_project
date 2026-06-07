import { Request, Response } from 'express';
import * as scoresService from './scores.service';
import { saveScoreSchema } from './scores.schema';
import { ZodError } from 'zod';

export const saveScoreController = async (req: Request, res: Response) => {
  try {
    const user_id = req.user?.userId;
    if (!user_id) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

    const parsedData = saveScoreSchema.parse(req.body);
    const newScore = await scoresService.saveScore(user_id, parsedData.material_id, parsedData.score);

    res.status(201).json({ status: 'success', message: 'Skor berhasil disimpan', data: newScore });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ status: 'error', message: error.issues });
    }
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getStudentScoresController = async (req: Request, res: Response) => {
  try {
    const user_id = req.user?.userId;
    if (!user_id) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

    const scores = await scoresService.getStudentScores(user_id);
    res.status(200).json({ status: 'success', data: scores });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getScoresByMaterialController = async (req: Request, res: Response) => {
  try {
    const material_id = parseInt(req.params.materialId as string, 10);
    if (isNaN(material_id)) return res.status(400).json({ status: 'error', message: 'ID material tidak valid' });

    const scores = await scoresService.getScoresByMaterial(material_id);
    res.status(200).json({ status: 'success', data: scores });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
