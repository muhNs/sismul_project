import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/features/auth/types";

interface LearnlyState {
  selectedClassId: string | null;
  selectedChapterId: string | null;
  quizScore: number;
  user: User | null;
  setSelectedClassId: (id: string) => void;
  setSelectedChapterId: (id: string) => void;
  setQuizScore: (score: number) => void;
  resetQuiz: () => void;
  setAuth: (user: User) => void;
  logout: () => void;
}

export const useStore = create<LearnlyState>()(
  persist(
    (set) => ({
      selectedClassId: "3", // Default ke kelas 3
      selectedChapterId: null,
      quizScore: 0,
      user: null,
      setSelectedClassId: (id) => set({ selectedClassId: id }),
      setSelectedChapterId: (id) => set({ selectedChapterId: id }),
      setQuizScore: (score) => set({ quizScore: score }),
      resetQuiz: () => set({ quizScore: 0 }),
      setAuth: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "learnly-storage", // nama key di localStorage
      partialize: (state) => ({ user: state.user, selectedClassId: state.selectedClassId }),
    }
  )
);
