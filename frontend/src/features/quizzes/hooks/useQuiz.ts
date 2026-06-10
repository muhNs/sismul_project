"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { getStudentQuiz, checkAnswerApi, saveStudentScore, QuizQuestion } from "../api/getStudentQuiz";

export function useQuiz() {
  const router = useRouter();
  const selectedChapterId = useStore((state) => state.selectedChapterId);
  const setQuizScore = useStore((state) => state.setQuizScore);
  const resetQuiz = useStore((state) => state.resetQuiz);
  const user = useStore((state) => state.user);
  const updateUserPoints = useStore((state) => state.updateUserPoints);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [shakeOption, setShakeOption] = useState<string | null>(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [studentAnswers, setStudentAnswers] = useState<{ quiz_id: number; answer: string }[]>([]);

  const materialId = selectedChapterId ? parseInt(selectedChapterId, 10) : null;

  useEffect(() => {
    let mounted = true;
    const fetchQuestions = async () => {
      if (!materialId || isNaN(materialId)) {
        setLoading(false);
        setError("Materi tidak valid.");
        return;
      }

      setError(null);

      try {
        setLoading(true);
        const mappedQuestions = await getStudentQuiz(materialId);

        if (mounted) {
          setQuestions(mappedQuestions);
        }
      } catch (err: any) {
        console.error(err);
        if (mounted) setError("Gagal mengambil soal dari server.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchQuestions();

    return () => {
      mounted = false;
    };
  }, [materialId]);

  const currentQuestion = questions[currentQIndex];
  const progressPercent = questions.length > 0 ? (currentQIndex / questions.length) * 100 : 0;
  const totalPoints = (user?.points || 0) + currentScore;

  const handleSelectOption = useCallback(
    (optionId: string) => {
      if (checked) return;
      setSelectedOption(optionId);
    },
    [checked]
  );

  const handleCheckAnswer = useCallback(async () => {
    if (!selectedOption || checked || !currentQuestion) return;

    try {
      const data = await checkAnswerApi(currentQuestion.id, selectedOption);

      setStudentAnswers((prev) => {
        const alreadyAnswered = prev.some(a => a.quiz_id === currentQuestion.id);
        if (!alreadyAnswered) {
          return [...prev, { quiz_id: currentQuestion.id, answer: selectedOption }];
        }
        return prev;
      });

      if (data.isCorrect) {
        setIsCorrect(true);
        setChecked(true);
        const newScore = currentScore + 20;
        setCurrentScore(newScore);
        setQuizScore(newScore);
        setShowScorePopup(true);
        setTimeout(() => setShowScorePopup(false), 2000);
      } else {
        setShakeOption(selectedOption);
        setTimeout(() => setShakeOption(null), 500);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengecek jawaban");
    }
  }, [selectedOption, checked, currentQuestion, currentScore, setQuizScore]);

  const handleNext = useCallback(async () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedOption(null);
      setChecked(false);
      setIsCorrect(false);
    } else {
      if (materialId) {
        try {
          const res = await saveStudentScore(materialId, studentAnswers);
          if (res?.data?.totalPoints !== undefined) {
            updateUserPoints(res.data.totalPoints);
          }
        } catch (err) {
          console.error("Gagal menyimpan skor kuis ke backend:", err);
        }
      }
      router.push("/quiz/complete");
    }
  }, [currentQIndex, questions.length, router, materialId, currentScore, studentAnswers, updateUserPoints]);

  const handleClose = useCallback(() => {
    if (window.confirm("Yakin keluar dari sesi? Semua progress akan hilang.")) {
      router.push("/quiz/prep");
    }
  }, [router]);

  return {
    questions,
    currentQIndex,
    currentQuestion,
    selectedOption,
    checked,
    isCorrect,
    showScorePopup,
    shakeOption,
    currentScore,
    progressPercent,
    totalPoints,
    resetQuiz,
    handleSelectOption,
    handleCheckAnswer,
    handleNext,
    handleClose,
    loading,
    error,
  };
}
