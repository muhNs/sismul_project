import { Request, Response } from 'express';
import * as quizzesService from './quizzes.service';
import { createQuizSchema, updateQuizSchema } from './quizzes.schema';
import { ZodError } from 'zod';

export const getAdminQuizzesController = async (req: Request, res: Response) => {
  try {
    const material_id = parseInt(req.params.materialId as string, 10);
    if (isNaN(material_id)) return res.status(400).json({ status: 'error', message: 'ID material tidak valid' });

    const quizzes = await quizzesService.getAdminQuizzes(material_id);
    res.status(200).json({ status: 'success', data: quizzes });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getStudentQuizzesController = async (req: Request, res: Response) => {
  try {
    const material_id = parseInt(req.params.materialId as string, 10);
    if (isNaN(material_id)) return res.status(400).json({ status: 'error', message: 'ID material tidak valid' });

    const quizzes = await quizzesService.getStudentQuizzes(material_id);
    res.status(200).json({ status: 'success', data: quizzes });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const createQuizController = async (req: Request, res: Response) => {
  try {
    const parsedData = createQuizSchema.parse(req.body);
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    let mediaUrl: string | undefined;
    if (files?.media && files.media[0]) {
      mediaUrl = `/public/uploads/${files.media[0].filename}`;
    }

    const missingWordIndex = parsedData.missingWordIndex === '' ? undefined : parsedData.missingWordIndex;

    const newQuiz = await quizzesService.createQuiz({
      ...parsedData,
      missingWordIndex: missingWordIndex as number | undefined,
      mediaUrl,
    });

    res.status(201).json({ status: 'success', message: 'Soal berhasil ditambahkan', data: newQuiz });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ status: 'error', message: error.issues });
    }
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const updateQuizController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) return res.status(400).json({ status: 'error', message: 'ID soal tidak valid' });

    const parsedData = updateQuizSchema.parse(req.body);
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    const updateData: any = { ...parsedData };
    if (updateData.missingWordIndex === '') updateData.missingWordIndex = null;

    if (files?.media && files.media[0]) {
      updateData.mediaUrl = `/public/uploads/${files.media[0].filename}`;
    }

    const updatedQuiz = await quizzesService.updateQuiz(id, updateData);
    res.status(200).json({ status: 'success', message: 'Soal berhasil diupdate', data: updatedQuiz });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ status: 'error', message: error.issues });
    }
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const deleteQuizController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) return res.status(400).json({ status: 'error', message: 'ID soal tidak valid' });

    await quizzesService.deleteQuiz(id);
    res.status(200).json({ status: 'success', message: 'Soal berhasil dihapus' });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// export const checkAnswerController = async (req: Request, res: Response) => {
//   try {
//     const id = parseInt(req.params.id as string, 10);
//     if (isNaN(id)) return res.status(400).json({ status: 'error', message: 'ID soal tidak valid' });

//     const { answer } = checkAnswerSchema.parse(req.body);
//     const result = await quizzesService.checkAnswer(id, answer);

//     res.status(200).json({ status: 'success', data: result });
//   } catch (error: any) {
//     if (error instanceof ZodError) {
//       return res.status(400).json({ status: 'error', message: error.issues });
//     }
//     res.status(404).json({ status: 'error', message: error.message });
//   }
// };
