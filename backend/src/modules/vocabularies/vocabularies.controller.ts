import { Request, Response } from 'express';
import * as vocabService from './vocabularies.service';
import { createVocabularySchema, updateVocabularySchema } from './vocabularies.schema';
import { ZodError } from 'zod';

export const getVocabulariesController = async (req: Request, res: Response) => {
  try {
    const { gradeLevel } = req.query;
    const grade = gradeLevel ? parseInt(gradeLevel as string, 10) : undefined;
    const vocabularies = await vocabService.getAllVocabularies(grade);
    res.status(200).json({ status: 'success', data: vocabularies });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const createVocabularyController = async (req: Request, res: Response) => {
  try {
    const parsedData = createVocabularySchema.parse(req.body);
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    let voice_path: string | undefined;
    let image_path: string | undefined;

    if (files?.voice && files.voice[0]) {
      voice_path = `/public/uploads/${files.voice[0].filename}`;
    }
    if (files?.image && files.image[0]) {
      image_path = `/public/uploads/${files.image[0].filename}`;
    }

    const newVocab = await vocabService.createVocabulary({
      ...parsedData,
      voice_path,
      image_path,
    });

    res.status(201).json({ status: 'success', message: 'Kosakata berhasil ditambahkan', data: newVocab });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ status: 'error', message: error.issues });
    }
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const updateVocabularyController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) return res.status(400).json({ status: 'error', message: 'ID tidak valid' });

    const parsedData = updateVocabularySchema.parse(req.body);
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    const updateData: any = { ...parsedData };

    if (files?.voice && files.voice[0]) {
      updateData.voice_path = `/public/uploads/${files.voice[0].filename}`;
    }
    if (files?.image && files.image[0]) {
      updateData.image_path = `/public/uploads/${files.image[0].filename}`;
    }

    const updatedVocab = await vocabService.updateVocabulary(id, updateData);
    res.status(200).json({ status: 'success', message: 'Kosakata berhasil diupdate', data: updatedVocab });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ status: 'error', message: error.issues });
    }
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const deleteVocabularyController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) return res.status(400).json({ status: 'error', message: 'ID tidak valid' });

    await vocabService.deleteVocabulary(id);
    res.status(200).json({ status: 'success', message: 'Kosakata berhasil dihapus' });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
