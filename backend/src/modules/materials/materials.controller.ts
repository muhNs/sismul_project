import { Request, Response } from 'express';
import * as materialsService from './materials.service';
import { createMaterialSchema, updateMaterialSchema } from './materials.schema';
import { ZodError } from 'zod';
import { SkillCategory } from '../../../generated/prisma/client';

export const getMaterialsController = async (req: Request, res: Response) => {
  try {
    const { gradeLevel, skillCategory } = req.query;
    const grade = gradeLevel ? parseInt(gradeLevel as string, 10) : undefined;
    const skill = skillCategory ? (skillCategory as SkillCategory) : undefined;
    
    const materials = await materialsService.getAllMaterials(grade, skill);
    res.status(200).json({ status: 'success', data: materials });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const createMaterialController = async (req: Request, res: Response) => {
  try {
    const parsedData = createMaterialSchema.parse(req.body);
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    let mediaUrl: string | undefined;

    if (files?.media && files.media[0]) {
      mediaUrl = `/public/uploads/${files.media[0].filename}`;
    }

    const newMaterial = await materialsService.createMaterial({
      ...parsedData,
      mediaUrl,
    });

    res.status(201).json({ status: 'success', message: 'Materi berhasil ditambahkan', data: newMaterial });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ status: 'error', message: error.issues });
    }
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const updateMaterialController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) return res.status(400).json({ status: 'error', message: 'ID tidak valid' });

    const parsedData = updateMaterialSchema.parse(req.body);
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    const updateData: any = { ...parsedData };

    if (files?.media && files.media[0]) {
      updateData.mediaUrl = `/public/uploads/${files.media[0].filename}`;
    }

    const updatedMaterial = await materialsService.updateMaterial(id, updateData);
    res.status(200).json({ status: 'success', message: 'Materi berhasil diupdate', data: updatedMaterial });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ status: 'error', message: error.issues });
    }
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const deleteMaterialController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) return res.status(400).json({ status: 'error', message: 'ID tidak valid' });

    await materialsService.deleteMaterial(id);
    res.status(200).json({ status: 'success', message: 'Materi berhasil dihapus' });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
