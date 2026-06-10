import api from "@/lib/axios";

// Definisi Tipe Data (Sesuai dengan Prisma Schema dan Controller di Backend)
export interface Quiz {
  id: number;
  material_id: number;
  questionType: "MULTIPLE_CHOICE" | "WRITING" | "SPEAKING";
  questionText: string;
  correctAnswer: string;
  optionA?: string | null;
  optionB?: string | null;
  optionC?: string | null;
  optionD?: string | null;
  missingWordIndex?: number | null;
  mediaUrl?: string | null;
  material?: {
    chapter: number;
    gradeLevel: number;
    skillCategory: string;
  };
}

export const getQuizzes = async (): Promise<Quiz[]> => {
  const response = await api.get<{ status: string; data: Quiz[] }>("/api/v1/quizzes");
  return response.data.data || response.data;
};

export const createQuiz = async (formData: FormData): Promise<Quiz> => {
  const response = await api.post<{ status: string; data: Quiz }>("/api/v1/quizzes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data || response.data;
};

export const updateQuiz = async ({ id, formData }: { id: number; formData: FormData }): Promise<Quiz> => {
  const response = await api.put<{ status: string; data: Quiz }>(`/api/v1/quizzes/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data || response.data;
};

export const deleteQuiz = async (id: number): Promise<void> => {
  await api.delete(`/api/v1/quizzes/${id}`);
};