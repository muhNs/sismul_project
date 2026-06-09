"use client";

import React, { useState } from "react";

interface Option {
  id: string;
  label: string;
  text: string;
}

interface QuizOptionsProps {
  question: {
    question: string;
    questionType?: string;
    textContext?: string;
    mediaUrl?: string;
    ttsWord?: string;
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
  const [isListening, setIsListening] = useState(false);

  if (!question) return null;

  const handleListen = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Browser Anda tidak mendukung fitur pengenalan suara.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onSelect(transcript);
    };
    recognition.onerror = (event: any) => {
      console.warn("Speech recognition error:", event.error);
      if (event.error === 'network') {
        alert("Gagal menghubungi server suara. Pastikan Anda menggunakan Google Chrome dan terhubung ke internet, atau matikan VPN jika ada.");
      } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        alert("Akses mikrofon ditolak. Silakan izinkan akses mikrofon di pengaturan browser Anda.");
      } else if (event.error !== 'no-speech') {
        alert("Gagal mengenali suara: " + event.error);
      }
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

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

      {question.mediaUrl && (
        <div className="relative w-full rounded-2xl overflow-hidden border-2 border-surface-container-highest shadow-[0_4px_0_#e3e2e2] flex items-center justify-center bg-surface-container-low p-4">
          {question.mediaUrl.match(/\.(mp3|wav|m4a|ogg|aac)$/i) ? (
            <audio controls className="w-full" src={question.mediaUrl} />
          ) : (
            <img alt="Question Media" className="w-full aspect-video object-cover rounded-xl" src={question.mediaUrl} />
          )}
        </div>
      )}

      {question.ttsWord && !question.mediaUrl && (
        <div className="relative w-full rounded-2xl overflow-hidden border-2 border-surface-container-highest shadow-[0_4px_0_#e3e2e2] flex items-center justify-center bg-surface-container-low p-8">
          <button
            onClick={() => {
              if ("speechSynthesis" in window) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(question.ttsWord);
                utterance.lang = "en-US";
                window.speechSynthesis.speak(utterance);
              }
            }}
            className="flex flex-col items-center gap-3 group cursor-pointer transition-transform active:scale-95"
          >
            <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_6px_0_#1e5000] active:translate-y-1.5 active:shadow-[0_0px_0_#1e5000] transition-all group-hover:bg-primary-container group-hover:text-primary">
              <span className="material-symbols-outlined text-5xl">volume_up</span>
            </div>
            <span className="font-label text-base font-bold text-on-surface-variant group-hover:text-primary transition-colors">
              Putar Suara
            </span>
          </button>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-6">
        <div className="bg-surface-container-low p-4 rounded-xl border-l-4 border-primary">
          <p className="font-display text-base md:text-lg font-bold text-on-surface">
            {question.question}
          </p>
        </div>

        {question.questionType === "SPEAKING" ? (
          <div className="flex flex-col items-center justify-center gap-6 p-8 bg-surface-container-low rounded-2xl border-2 border-surface-container-highest">
            <button
              onClick={handleListen}
              disabled={checked}
              className={`w-28 h-28 rounded-full flex items-center justify-center transition-all ${
                isListening
                  ? "bg-error text-white animate-pulse shadow-[0_0_20px_rgba(186,26,26,0.6)]"
                  : "bg-primary text-white shadow-[0_6px_0_#1e5000] active:translate-y-1.5 active:shadow-[0_0_0_#1e5000] hover:bg-primary-container hover:text-primary"
              }`}
            >
              <span className="material-symbols-outlined text-5xl">
                {isListening ? "mic" : "mic_none"}
              </span>
            </button>
            <p className="font-label text-base font-bold text-on-surface-variant">
              {isListening ? "Mendengarkan..." : "Tekan untuk bicara"}
            </p>
            {selectedOption && (
              <div className="mt-4 px-6 py-3 bg-white border-2 border-primary rounded-xl">
                <p className="font-sans text-lg font-medium text-on-surface">"{selectedOption}"</p>
              </div>
            )}
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
}
