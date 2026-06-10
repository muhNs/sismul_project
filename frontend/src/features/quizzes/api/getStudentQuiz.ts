import api from "@/lib/axios";

export interface Option {
  id: string;
  label: string;
  text: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  questionType: string;
  mediaUrl?: string;
  ttsWord?: string;
  options: Option[];
}

export const getStudentQuiz = async (materialId: number): Promise<QuizQuestion[]> => {
  const response = await api.get(`/api/v1/quizzes/student/${materialId}`);
  const data = response.data.data;
  
  if (!data) return [];

  return data.map((q: any) => {
    let questionText = q.questionText || "";
    let extractedUrl = q.mediaUrl;
    let ttsWord: string | undefined;

    // Cari [TTS: word] di dalam teks untuk dibacakan oleh Text-To-Speech
    const ttsRegex = /\[TTS:\s*(.+?)\]/i;
    const ttsMatch = questionText.match(ttsRegex);
    if (ttsMatch) {
      ttsWord = ttsMatch[1];
      questionText = questionText.replace(ttsMatch[0], "").trim();
    }

    // Cari URL di dalam teks (jika admin memasukkan link secara manual)
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = questionText.match(urlRegex);
    if (urls && urls.length > 0) {
      extractedUrl = urls[0];
      // Hapus URL dari teks pertanyaan
      questionText = questionText.replace(extractedUrl, "").trim();
    }

    return {
      id: q.id,
      question: questionText,
      questionType: q.questionType,
      mediaUrl: extractedUrl,
      ttsWord,
      options: [
        { id: "A", label: "A", text: q.optionA },
        { id: "B", label: "B", text: q.optionB },
        { id: "C", label: "C", text: q.optionC },
        { id: "D", label: "D", text: q.optionD },
      ].filter((o) => o.text), // remove empty options
    };
  });
};

export const checkAnswerApi = async (quizId: number, studentAnswer: string) => {
  const response = await api.post(`/api/v1/quizzes/${quizId}/check`, { answer: studentAnswer });
  return response.data.data;
};

export const saveStudentScore = async (materialId: number, answers: { quiz_id: number; answer: string }[]) => {
  const response = await api.post("/api/v1/scores", { material_id: materialId, answers });
  return response.data;
};
