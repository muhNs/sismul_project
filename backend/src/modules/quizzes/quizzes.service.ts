import { QuestionType } from '../../../generated/prisma/client';
import { prisma } from '../../shared/prisma';

export const getAdminQuizzes = async (material_id: number) => {
  return prisma.quizQuestion.findMany({
    where: { material_id, deleted_at: null },
    orderBy: { created_at: 'desc' },
  });
};

export const getStudentQuizzes = async (material_id: number) => {
  // Ambil semua soal dari material tersebut
  const allQuizzes = await prisma.quizQuestion.findMany({
    where: { material_id, deleted_at: null },
    select: {
      id: true,
      material_id: true,
      mediaUrl: true,
      questionType: true,
      questionText: true,
      optionA: true,
      optionB: true,
      optionC: true,
      optionD: true,
      missingWordIndex: true,
      // correctAnswer sengaja TIDAK di-select agar tidak bocor ke client
    },
  });

  // Acak soal dan ambil maksimal 10
  const shuffled = allQuizzes.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);
};

export const createQuiz = async (data: {
  material_id: number;
  questionType: QuestionType;
  questionText: string;
  correctAnswer: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  missingWordIndex?: number;
  mediaUrl?: string;
}) => {
  return prisma.quizQuestion.create({ data });
};

export const updateQuiz = async (id: number, data: any) => {
  return prisma.quizQuestion.update({
    where: { id },
    data,
  });
};

export const deleteQuiz = async (id: number) => {
  return prisma.quizQuestion.update({
    where: { id },
    data: { deleted_at: new Date() },
  });
};

export const checkAnswer = async (id: number, studentAnswer: string) => {
  const quiz = await prisma.quizQuestion.findUnique({
    where: { id },
    select: { correctAnswer: true, questionText: true },
  });

  if (!quiz) throw new Error("Soal tidak ditemukan");

  // Validasi case-insensitive
  const isCorrect = quiz.correctAnswer.trim().toLowerCase() === studentAnswer.trim().toLowerCase();
  
  return {
    isCorrect,
    correctAnswer: quiz.correctAnswer, // Kirim jawaban benar jika salah untuk feedback
  };
};
