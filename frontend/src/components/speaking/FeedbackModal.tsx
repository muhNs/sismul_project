'use client';

import { useEffect, useState } from 'react';

interface FeedbackModalProps {
  isCorrect: boolean;
  score: number;
  userAnswer: string;
  correctAnswer: string;
  onNext: () => void;
}

export default function FeedbackModal({
  isCorrect,
  score,
  userAnswer,
  correctAnswer,
  onNext,
}: FeedbackModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleNext = () => {
    setIsVisible(false);
    setTimeout(() => onNext(), 300);
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-white rounded-2xl p-10 max-w-md w-full mx-4 text-center transform transition-all duration-300 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-90 translate-y-8'
        } ${!isCorrect ? 'shake' : ''}`}
      >
        {/* Icon */}
        <div
          className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-6xl mb-6 ${
            isCorrect ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'
          }`}
        >
          {isCorrect ? '✓' : '✗'}
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          {isCorrect ? 'Bagus Sekali!' : 'Hampir Benar!'}
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          {isCorrect
            ? 'Pronunciation Anda sempurna!'
            : 'Jangan menyerah, coba lagi ya!'}
        </p>

        {/* User Answer */}
        {!isCorrect && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Anda mengatakan:</p>
            <p className="text-base font-semibold text-gray-700">{userAnswer}</p>
          </div>
        )}

        {/* Correct Answer */}
        {!isCorrect && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border-2 border-green-200">
            <p className="text-sm text-green-600 mb-1">Jawaban yang benar:</p>
            <p className="text-base font-bold text-green-700">{correctAnswer}</p>
          </div>
        )}

        {/* Score */}
        <p
          className={`text-4xl font-bold mb-8 ${
            isCorrect ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {isCorrect ? '+' : ''}
          {score} Poin
        </p>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-105 active:scale-95"
        >
          Lanjut
        </button>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
          20%, 40%, 60%, 80% { transform: translateX(8px); }
        }
        
        .shake {
          animation: shake 0.5s;
        }
      `}</style>
    </div>
  );
}
