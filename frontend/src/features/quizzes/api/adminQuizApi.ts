import api from "@/lib/axios";

// Definisi Tipe Data (Sesuaikan dengan field di database Anda)
export interface Quiz {
  id: string;
  title: string;
  description: string;
  materials_id: string;
  is_active: boolean;
}

export const getQuizzes = async () => {
  const response = await api.get("/api/v1/quizzes/admin/allQuizzes");
  return response.data;
};

export const createQuiz = async (data: Omit<Quiz, 'id'>) => {
  const response = await api.post("/api/v1/quizzes/admin", data);
  return response.data;
};

export const updateQuiz = async ({ id, data }: { id: string; data: Partial<Quiz> }) => {
  const response = await api.put(`/api/v1/quizzes/admin/${id}`, data);
  return response.data;
};

export const deleteQuiz = async (id: string) => {
  const response = await api.delete(`/api/v1/quizzes/admin/${id}`);
  return response.data;
};