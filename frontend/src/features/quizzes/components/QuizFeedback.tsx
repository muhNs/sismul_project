"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

interface QuizFeedbackProps {
  checked: boolean;
  isCorrect: boolean;
  selectedOption: string | null;
  onCheck: () => void;
  onNext: () => void;
}

export function QuizFeedback({ checked, isCorrect, selectedOption, onCheck, onNext }: QuizFeedbackProps) {
  return (
    <>
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
            <Button onClick={onCheck} variant="primary" className="md:w-64 h-14">
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

      {/* Result Overlay */}
      {checked && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/10 transition-opacity">
          <div className={`w-full ${isCorrect ? 'bg-primary-container/95' : 'bg-error/95'} backdrop-blur-sm p-8 flex flex-col md:flex-row items-center justify-between gap-6`}>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span
                  className={`material-symbols-outlined ${isCorrect ? 'text-primary' : 'text-error'} text-5xl`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {isCorrect ? 'check_circle' : 'cancel'}
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl md:text-2xl font-extrabold text-white">
                  {isCorrect ? 'Luar Biasa!' : 'Yah, Kurang Tepat'}
                </h3>
                <p className="text-white/90 text-sm font-sans font-medium">
                  {isCorrect ? 'Kamu menjawab dengan benar.' : 'Ayo coba lagi di soal berikutnya!'}
                </p>
              </div>
            </div>
            <Button
              onClick={onNext}
              variant="outline"
              className={`md:w-48 h-14 bg-white ${isCorrect ? 'text-primary' : 'text-error'} font-bold border-none shadow-[0_4px_0_#d1d5db] hover:bg-gray-100`}
            >
              Lanjut
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
