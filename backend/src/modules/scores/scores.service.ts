import { prisma } from '../../shared/prisma';
import { SaveScoreInput } from './scores.schema';

export const saveScore = async (user_id: number, data: SaveScoreInput) => {
  const { material_id, answers } = data;

  // --- TAMBAHAN: Hapus duplikat quiz_id dari input murid agar tidak bisa dicurangi ---
  const uniqueAnswers = Array.from(new Map(answers.map(a => [a.quiz_id, a])).values());
  // ---------------------------------------------------------------------------------

  const quizIds = uniqueAnswers.map((a) => a.quiz_id);
  const realQuizzes = await prisma.quizQuestion.findMany({
    where: { id: { in: quizIds }, material_id: material_id, deleted_at: null },
    select: { id: true, correctAnswer: true }
  });

  if (realQuizzes.length === 0) throw new Error("Soal tidak ditemukan pada materi ini");

  // 2. BACKEND RECOUNT (Hitung nilai asli)
  let correctCount = 0;
  const totalQuestions = uniqueAnswers.length; // Gunakan panjang array yang sudah difilter

  uniqueAnswers.forEach((studentAns) => {
    const realQuiz = realQuizzes.find((q) => q.id === studentAns.quiz_id);
    if (realQuiz) {
      const isCorrect = realQuiz.correctAnswer.trim().toLowerCase() === studentAns.answer.trim().toLowerCase();
      if (isCorrect) correctCount++;
    }
  });

  // Bulatkan angka agar tidak terjadi error desimal (misal 66.666 -> 67) ---
  const finalScore = Math.round((correctCount / totalQuestions) * 100);
  // ------------------------------------------------------------------------------------

  // 3. UPSERT DATA (Simpan Highest Score saja)
  const existingScore = await prisma.studentScore.findFirst({
    where: { user_id, material_id }
  });
  
  let savedScore;
  let isNewHighScore = false;

  if (!existingScore) {
    savedScore = await prisma.studentScore.create({
      data: { user_id, material_id, score: finalScore }
    });
    isNewHighScore = true;
  } else {
    if (finalScore > existingScore.score) {
      savedScore = await prisma.studentScore.update({
        where: { id: existingScore.id },
        data: { score: finalScore }
      });
      isNewHighScore = true;
    } else {
      savedScore = existingScore;
    }
  }

  return {
    score: finalScore,
    correctCount,
    totalQuestions,
    isNewHighScore
  };
};

export const getStudentScores = async (user_id: number) => {
  return prisma.studentScore.findMany({
    where: { user_id },
    include: {
      material: true,
    },
    orderBy: { created_at: 'desc' }
  });
};

export const getScoresByMaterial = async (material_id: number) => {
  return prisma.studentScore.findMany({
    where: { material_id },
    include: {
      user: {
        select: { id: true, name: true, email: true }
      }
    },
    orderBy: { score: 'desc' }
  });
};

export const getAllScores = async () => {
  return prisma.studentScore.findMany({
    include: {
      user: { select: { name: true, email: true } },
      material: { select: { chapter: true, gradeLevel: true, skillCategory: true } }
    },
    orderBy: { created_at: 'desc' }
  });
};
