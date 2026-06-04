"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";
import { Mascot } from "@/components/ui/Mascot";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/lib/store";
import { chaptersData } from "@/lib/dummy-data";

export default function QuizPrepPage() {
  const router = useRouter();
  const selectedChapterId = useStore((state) => state.selectedChapterId);
  const chapter = chaptersData.find(c => c.id === selectedChapterId) || chaptersData[0];

  const handleStartQuiz = () => {
    router.push("/quiz/arena");
  };

  const handleCancel = () => {
    router.push("/choose-chapter");
  };

  return (
    <>
      <Header title="Learnly" showBack={true} />

      <main className="pt-24 pb-28 px-margin-mobile max-w-[800px] mx-auto w-full flex-grow flex flex-col items-center justify-center">
        {/* Mascot Section with Custom Speech bubble */}
        <div className="relative mb-8 mt-4">
          <Mascot expression="happy" size="lg" />
          <div className="absolute -top-4 -right-4 md:-right-8 bg-white p-4 rounded-2xl shadow-[0_4px_0_#e3e2e2] border-2 border-surface-container-highest max-w-[180px] select-none">
            <p className="font-label text-xs font-bold text-primary">Ayo, kamu pasti bisa!</p>
            <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white border-b-2 border-r-2 border-surface-container-highest transform rotate-45"></div>
          </div>
        </div>

        {/* Info Content */}
        <div className="text-center space-y-4 mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-on-surface">
            Sudah siap belajar {chapter.title}?
          </h2>
          <p className="text-sm md:text-base font-medium text-on-surface-variant">
            {chapter.description}. Ada {chapter.totalQuestions} soal di chapter ini.
          </p>
        </div>

        {/* Chapter Stats Grid */}
        <div className="w-full grid grid-cols-2 gap-4 mb-8">
          <Card
            variant="surface"
            className="p-4 flex flex-col items-center text-center bg-white shadow-[0_4px_0_#e3e2e2]"
          >
            <span
              className="material-symbols-outlined text-secondary mb-2"
              style={{ fontVariationSettings: "'FILL' 1", fontSize: "32px" }}
            >
              quiz
            </span>
            <p className="text-xs font-label font-bold text-on-surface-variant uppercase tracking-wider">
              Total Soal
            </p>
            <p className="font-display text-xl font-bold text-on-surface">{chapter.totalQuestions}</p>
          </Card>
          <Card
            variant="surface"
            className="p-4 flex flex-col items-center text-center bg-white shadow-[0_4px_0_#e3e2e2]"
          >
            <span
              className="material-symbols-outlined text-tertiary-container mb-2"
              style={{ fontVariationSettings: "'FILL' 1", fontSize: "32px" }}
            >
              schedule
            </span>
            <p className="text-xs font-label font-bold text-on-surface-variant uppercase tracking-wider">
              Estimasi
            </p>
            <p className="font-display text-xl font-bold text-on-surface">{chapter.estimatedMinutes} Menit</p>
          </Card>
        </div>

        {/* Action Button */}
        <div className="w-full space-y-4 mt-auto">
          <Button onClick={handleStartQuiz} variant="primary">
            Mulai Belajar!
            <span className="material-symbols-outlined">arrow_forward</span>
          </Button>
          <p
            onClick={handleCancel}
            className="text-center text-sm font-label font-bold text-on-surface-variant cursor-pointer hover:text-primary transition-colors"
          >
            Nanti saja
          </p>
        </div>
      </main>

      <Navbar />
    </>
  );
}
