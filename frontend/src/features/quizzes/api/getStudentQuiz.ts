import api from "@/lib/axios";

export interface Option {
  id: string;
  label: string;
  text: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  image?: string;
  options: Option[];
}

export const getStudentQuiz = async (materialId: number): Promise<QuizQuestion[]> => {
  const response = await api.get(`/api/v1/quizzes/student/${materialId}`);
  const data = response.data.data;
  
  if (!data) return [];

  return data.map((q: any) => ({
    id: q.id,
    question: q.questionText,
    image: q.mediaUrl,
    options: [
      { id: "A", label: "A", text: q.optionA },
      { id: "B", label: "B", text: q.optionB },
      { id: "C", label: "C", text: q.optionC },
      { id: "D", label: "D", text: q.optionD },
    ].filter((o) => o.text), // remove empty options
  }));
};

export const checkAnswerApi = async (quizId: number, studentAnswer: string) => {
  const response = await api.post(`/api/v1/quizzes/${quizId}/check`, { studentAnswer });
  return response.data.data;
};

export const saveStudentScore = async (materialId: number, score: number) => {
  const response = await api.post("/api/v1/scores", { material_id: materialId, score });
  return response.data;
};
