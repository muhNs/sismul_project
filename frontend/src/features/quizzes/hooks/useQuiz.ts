"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { quizQuestions } from "@/lib/dummy-data";
import { dummyUser } from "@/lib/dummy-data";

export function useQuiz() {
  const router = useRouter();
  const selectedChapterId = useStore((state) => state.selectedChapterId);
  const setQuizScore = useStore((state) => state.setQuizScore);
  const resetQuiz = useStore((state) => state.resetQuiz);

  const questions =
    quizQuestions[selectedChapterId as keyof typeof quizQuestions] || quizQuestions.reading;

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [shakeOption, setShakeOption] = useState<string | null>(null);
  const [currentScore, setCurrentScore] = useState(0);

  const currentQuestion = questions[currentQIndex];
  const progressPercent = ((currentQIndex + 1) / questions.length) * 100;
  const totalPoints = dummyUser.points + currentScore;

  const handleSelectOption = useCallback(
    (optionId: string) => {
      if (checked) return;
      setSelectedOption(optionId);
    },
    [checked]
  );

  const handleCheckAnswer = useCallback(() => {
    if (!selectedOption || checked) return;

    if (selectedOption === currentQuestion.correctAnswer) {
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
  }, [selectedOption, checked, currentQuestion, currentScore, setQuizScore]);

  const handleNext = useCallback(() => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedOption(null);
      setChecked(false);
      setIsCorrect(false);
    } else {
      router.push("/quiz/complete");
    }
  }, [currentQIndex, questions.length, router]);

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
  };
}
