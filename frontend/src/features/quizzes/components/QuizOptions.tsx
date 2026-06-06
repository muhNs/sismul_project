"use client";

import React from "react";

interface Option {
  id: string;
  label: string;
  text: string;
}

interface QuizOptionsProps {
  question: {
    question: string;
    textContext?: string;
    image?: string;
    options: Option[];
  };
  selectedOption: string | null;
  shakeOption: string | null;
  checked: boolean;
  onSelect: (id: string) => void;
}

export function QuizOptions({
  question,
  selectedOption,
  shakeOption,
  checked,
  onSelect,
}: QuizOptionsProps) {
  return (
    <section
      className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
      key={question.question}
    >
      {question.textContext && (
        <div className="flex flex-col gap-4">
          <h1 className="font-display text-2xl font-extrabold text-primary">Ayo Membaca!</h1>
          <p className="text-sm md:text-base font-medium text-on-surface-variant leading-relaxed">
            {question.textContext}
          </p>
        </div>
      )}

      {question.image && (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-surface-container-highest shadow-[0_4px_0_#e3e2e2]">
          <img alt="Question Illustration" className="w-full h-full object-cover" src={question.image} />
        </div>
      )}

      <div className="mt-4 flex flex-col gap-6">
        <div className="bg-surface-container-low p-4 rounded-xl border-l-4 border-primary">
          <p className="font-display text-base md:text-lg font-bold text-on-surface">
            {question.question}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((opt) => {
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
                onClick={() => onSelect(opt.id)}
                className={btnStyles}
              >
                <span className={indexStyles}>{opt.label}</span>
                <span className="font-sans text-sm font-medium text-on-surface text-left">{opt.text}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
