"use client";

import React, { useEffect } from "react";
import { useQuiz } from "@/features/quizzes/hooks/useQuiz";
import { QuizHeader } from "@/features/quizzes/components/QuizHeader";
import { QuizOptions } from "@/features/quizzes/components/QuizOptions";
import { QuizFeedback } from "@/features/quizzes/components/QuizFeedback";

export default function ArenaPage() {
  const {
    currentQuestion,
    selectedOption,
    checked,
    showScorePopup,
    shakeOption,
    progressPercent,
    totalPoints,
    resetQuiz,
    handleSelectOption,
    handleCheckAnswer,
    handleNext,
    handleClose,
    loading,
    error,
  } = useQuiz();

  useEffect(() => {
    resetQuiz();
  }, [resetQuiz]);

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col font-sans overflow-x-hidden">
      <QuizHeader
        progressPercent={progressPercent}
        totalPoints={totalPoints}
        onClose={handleClose}
      />

      <main className="flex-1 w-full max-w-[800px] mx-auto px-margin-mobile py-8 flex flex-col relative">
        {loading && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-lg font-bold text-on-surface-variant">Memuat soal...</p>
          </div>
        )}

        {error && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-lg font-bold text-error">{error}</p>
          </div>
        )}

        {!loading && !error && currentQuestion && (
          <>
            {/* Score Popup */}
        {showScorePopup && (
          <div
            id="score-popup"
            className="fixed top-20 right-8 bg-primary-container text-white px-4 py-2 rounded-xl shadow-[0_4px_0_#1e5000] font-label text-xs font-bold flex items-center gap-2 animate-bounce z-40"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              add_circle
            </span>
            +10 Poin
          </div>
        )}

        <QuizOptions
          question={currentQuestion}
          selectedOption={selectedOption}
          shakeOption={shakeOption}
          checked={checked}
          onSelect={handleSelectOption}
        />
        </>
        )}
        <div className="h-32" />
      </main>

      <QuizFeedback
        checked={checked}
        selectedOption={selectedOption}
        onCheck={handleCheckAnswer}
        onNext={handleNext}
      />
    </div>
  );
}
