"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/lib/store";
import { quizQuestions, dummyUser } from "@/lib/dummy-data";

interface Option {
  id: string;
  label: string;
  text: string;
}

export default function QuizArenaPage() {
  const router = useRouter();
  
  const selectedChapterId = useStore((state) => state.selectedChapterId);
  const setQuizScore = useStore((state) => state.setQuizScore);
  const resetQuiz = useStore((state) => state.resetQuiz);
  
  // Safe fallback if not found
  const questions = quizQuestions[selectedChapterId as keyof typeof quizQuestions] || quizQuestions.reading;
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [shakeOption, setShakeOption] = useState<string | null>(null);
  const [currentScore, setCurrentScore] = useState(0);

  const currentQuestion = questions[currentQIndex];
  const progressPercent = ((currentQIndex) / questions.length) * 100;

  useEffect(() => {
    resetQuiz(); // reset on mount
  }, [resetQuiz]);

  const handleSelectOption = (optionId: string) => {
    if (checked) return;
    setSelectedOption(optionId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || checked) return;

    if (selectedOption === currentQuestion.correctAnswer) {
      setIsCorrect(true);
      setChecked(true);
      const newScore = currentScore + 20;
      setCurrentScore(newScore);
      setQuizScore(newScore); // save to store
      
      setShowScorePopup(true);
      setTimeout(() => setShowScorePopup(false), 2000);
    } else {
      // Trigger error shake on incorrect option
      setShakeOption(selectedOption);
      setTimeout(() => {
        setShakeOption(null);
      }, 500);
    }
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedOption(null);
      setChecked(false);
      setIsCorrect(false);
    } else {
      router.push("/quiz/complete");
    }
  };

  const handleClose = () => {
    router.push("/choose-chapter");
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col font-sans overflow-x-hidden">
      {/* Top AppBar */}
      <header className="bg-background border-b-4 border-surface-container-highest flex justify-between items-center px-margin-mobile h-16 w-full sticky top-0 z-50">
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={handleClose}
            className="hover:bg-surface-container-low p-2 rounded-xl transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-on-surface-variant">close</span>
          </button>
          {/* Progress Bar Container */}
          <div className="flex-1 max-w-md">
            <ProgressBar value={progressPercent > 0 ? progressPercent : 5} color="primary" animateOnInit={true} />
          </div>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <div className="flex items-center gap-1 bg-tertiary-container/10 px-3 py-1 rounded-full border border-tertiary-container/20">
            <span
              className="material-symbols-outlined text-tertiary text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="font-label text-xs font-bold text-tertiary">{dummyUser.points + currentScore} pts</span>
          </div>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="flex-1 w-full max-w-[800px] mx-auto px-margin-mobile py-8 flex flex-col relative">
        {/* Score Popup Bubble */}
        {showScorePopup && (
          <div
            id="score-popup"
            className="fixed top-20 right-8 bg-primary-container text-white px-4 py-2 rounded-xl shadow-[0_4px_0_#1e5000] font-label text-xs font-bold flex items-center gap-2 animate-bounce z-40 transition-opacity duration-1000"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              add_circle
            </span>
            +10 Poin
          </div>
        )}

        {/* Content Area */}
        <section className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500" key={currentQuestion.id}>
          {currentQuestion.textContext && (
            <div className="flex flex-col gap-4">
              <h1 className="font-display text-2xl font-extrabold text-primary">Ayo Membaca!</h1>
              <p className="text-sm md:text-base font-medium text-on-surface-variant leading-relaxed">
                {currentQuestion.textContext}
              </p>
            </div>
          )}

          {/* Content Image Card */}
          {currentQuestion.image && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-surface-container-highest shadow-[0_4px_0_#e3e2e2]">
              <img
                alt="Question Illustration"
                className="w-full h-full object-cover"
                src={currentQuestion.image}
              />
            </div>
          )}

          {/* Multiple Choice Question */}
          <div className="mt-4 flex flex-col gap-6">
            <div className="bg-surface-container-low p-4 rounded-xl border-l-4 border-primary">
              <p className="font-display text-base md:text-lg font-bold text-on-surface">
                {currentQuestion.question}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                const isIncorrect = shakeOption === opt.id;

                let btnStyles =
                  "group flex items-center p-4 bg-white border-2 border-surface-container-highest rounded-2xl shadow-[0_4px_0_#e3e2e2] transition-all cursor-pointer active:translate-y-[2px] active:shadow-[0_2px_0_#e3e2e2]";
                let indexStyles =
                  "w-10 h-10 flex items-center justify-center rounded-xl border-2 border-surface-container-highest font-label text-sm font-bold text-on-surface-variant group-hover:border-primary-container mr-4 transition-colors";

                if (isSelected) {
                  btnStyles =
                    "group flex items-center p-4 bg-sky-100 border-2 border-secondary-container rounded-2xl shadow-[0_4px_0_#006590] transition-all cursor-pointer active:translate-y-[2px] active:shadow-[0_2px_0_#006590]";
                  indexStyles =
                    "w-10 h-10 flex items-center justify-center rounded-xl border-2 border-primary-container bg-primary-container text-white font-label text-sm font-bold mr-4";
                }

                if (isIncorrect) {
                  btnStyles += " animate-bounce border-error shadow-[0_4px_0_#93000a] bg-red-50";
                }

                return (
                  <button
                    key={opt.id}
                    disabled={checked}
                    onClick={() => handleSelectOption(opt.id)}
                    className={btnStyles}
                  >
                    <span className={indexStyles}>{opt.label}</span>
                    <span className="font-sans text-sm font-medium text-on-surface text-left">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
        <div className="h-32"></div>
      </main>

      {/* Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t-4 border-surface-container-highest p-margin-mobile z-40">
        <div className="max-w-[800px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="hidden md:flex items-center gap-2">
            <span
              className="material-symbols-outlined text-primary-container"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              lightbulb
            </span>
            <span className="text-on-surface-variant font-label text-xs font-bold">
              Tip: Baca teks dengan teliti!
            </span>
          </div>
          {selectedOption ? (
            <Button onClick={handleCheckAnswer} variant="primary" className="md:w-64 h-14">
              Cek Jawaban
            </Button>
          ) : (
            <button
              disabled
              className="w-full md:w-64 h-14 bg-surface-container-highest text-on-surface-variant font-label text-xs font-bold rounded-2xl border-b-4 border-surface-dim uppercase transition-all flex items-center justify-center gap-2 cursor-not-allowed select-none"
            >
              Cek Jawaban
            </button>
          )}
        </div>
      </footer>

      {/* Result Feedback Overlay */}
      {checked && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/10 transition-opacity">
          <div className="w-full bg-primary-container/95 backdrop-blur-sm p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-transform duration-300 transform translate-y-0">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span
                  className="material-symbols-outlined text-primary text-5xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl md:text-2xl font-extrabold text-white">
                  Luar Biasa!
                </h3>
                <p className="text-white/90 text-sm font-sans font-medium">
                  Kamu menjawab dengan benar.
                </p>
              </div>
            </div>
            <Button
              onClick={handleNext}
              variant="outline"
              className="md:w-48 h-14 bg-white text-primary font-bold border-none shadow-[0_4px_0_#d1d5db] hover:bg-gray-100"
            >
              Lanjut
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
