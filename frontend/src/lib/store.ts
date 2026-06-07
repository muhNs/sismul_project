import { create } from "zustand";

interface LearnlyState {
  selectedClassId: string | null;
  selectedChapterId: string | null;
  quizScore: number;
  setSelectedClassId: (id: string) => void;
  setSelectedChapterId: (id: string) => void;
  setQuizScore: (score: number) => void;
  resetQuiz: () => void;
}

export const useStore = create<LearnlyState>((set) => ({
  selectedClassId: "3", // Default ke kelas 3
  selectedChapterId: null,
  quizScore: 0,
  setSelectedClassId: (id) => set({ selectedClassId: id }),
  setSelectedChapterId: (id) => set({ selectedChapterId: id }),
  setQuizScore: (score) => set({ quizScore: score }),
  resetQuiz: () => set({ quizScore: 0 }),
}));
