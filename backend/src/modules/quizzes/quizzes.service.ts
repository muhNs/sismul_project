import { QuestionType } from "../../../generated/prisma/client";
import { prisma } from "../../shared/prisma";

export const getAdminQuizzes = async (material_id: number) => {
  return prisma.quizQuestion.findMany({
    where: { material_id, deleted_at: null },
    orderBy: { created_at: "desc" },
  });
};

// quizes.service.ts
export const getStudentQuizzes = async (material_id: number) => {
  // 1. Ambil semua soal dari material tersebut (TERMASUK correctAnswer)
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
      correctAnswer: true, // <-- WAJIB DI-SELECT UNTUK DI-ENCODE NANTI
    },
  });

  if (allQuizzes.length === 0) {
    throw new Error("Belum ada soal untuk materi ini");
  }

  // 2. Acak soal dan ambil maksimal 10
  const shuffled = allQuizzes.sort(() => 0.5 - Math.random());
  const selectedQuizzes = shuffled.slice(0, 10);

  // 3. ENKRIPSI JAWABAN (Ubah correctAnswer menjadi Base64)
  const encodedQuizzes = selectedQuizzes.map((quiz) => {
    return {
      ...quiz,
      // Di Node.js, mengubah teks ke Base64 menggunakan Buffer
      correctAnswer: Buffer.from(quiz.correctAnswer).toString("base64"),
    };
  });

  // 4. Return soal yang jawabannya sudah disamarkan
  return encodedQuizzes;
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

  // Validasi case-insensitive dan hapus tanda baca
  const normalize = (str: string) => str.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim();
  
  const isCorrect = normalize(quiz.correctAnswer) === normalize(studentAnswer);

  return {
    isCorrect,
    correctAnswer: quiz.correctAnswer, // Kirim jawaban benar jika salah untuk feedback
  };
};
