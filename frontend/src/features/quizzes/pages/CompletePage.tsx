"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useStore } from "@/lib/store";

interface ConfettiItem {
  id: number;
  left: string;
  delay: string;
  color: string;
}

export default function CompletePage() {
  const router = useRouter();
  const quizScore = useStore((state) => state.quizScore);
  const confetti = useMemo(() => {
    const colors = ["#58cc02", "#2fb8ff", "#ff9c27", "#ffdcbf", "#87fe45"];
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      delay: `${Math.random() * 2}s`,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, []);

  return (
    <>
      <Header title="Learnly" showBack={false} />
      <main className="flex-grow pt-24 pb-32 px-margin-mobile flex flex-col items-center max-w-[800px] mx-auto w-full relative">
        {/* Confetti */}
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
          {confetti.map((c) => (
            <div
              key={c.id}
              className="absolute w-3 h-3 rounded-sm opacity-0 animate-[confetti_3s_linear_forwards]"
              style={{
                left: c.left,
                backgroundColor: c.color,
                animationDelay: c.delay,
                top: "-20px",
              }}
            />
          ))}
        </div>


        {/* Header */}
        <div className="text-center mb-8 space-y-2">
          <h1 className="font-display text-3xl font-extrabold text-primary tracking-tight">
            Chapter Selesai!
          </h1>
          <p className="text-on-surface-variant text-sm font-medium">
            Kamu melakukannya dengan hebat!
          </p>
        </div>

        {/* Hero */}
        <div className="relative w-full max-w-xs mb-8 flex justify-center">
          <div className="absolute -top-6 -left-4 text-tertiary-container animate-pulse z-0">
            <span
              className="material-symbols-outlined text-[48px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
          </div>
          <div className="absolute top-10 -right-2 text-secondary-container animate-bounce z-0">
            <span
              className="material-symbols-outlined text-[40px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
          </div>
          <div className="absolute -bottom-4 left-6 text-primary-container animate-float z-0">
            <span
              className="material-symbols-outlined text-[32px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
          </div>
          <div className="relative z-10 animate-float">
            <div className="bg-white rounded-full p-2 border-4 border-surface-container-highest shadow-xl">
              <img
                alt="Celebrating Mascot"
                className="w-52 h-52 object-contain rounded-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD30A-CsMsJs5ASw4s-5QvvbymzzCbEYiOiRSv7F7ld-5CJwG-aWRBc_qa00bQIAYzKTVviNfSZuHh6ZpUeE9reGsLtyegJ_2RdQx55ju00q3f687k5KYvbZffp8QlaE-qMC-mlSW8gtjxO60sDOZxcFoDZxKUEqMZCu78StSUomSo3WCCSDIooby2XUNk4dB_DD7KFiDW-5JesbUV2oBg8D35PQATItzMnR3hLCpfK1xt9XzRgSeSY_CX20_qe-FHCUjO9F28hhTA"
              />
            </div>
          </div>
          <div className="absolute -bottom-4 right-2 z-20 bg-tertiary-container p-3.5 rounded-xl border-b-4 border-tertiary shadow-lg transform rotate-12 flex items-center justify-center">
            <span
              className="material-symbols-outlined text-white text-[40px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              emoji_events
            </span>
          </div>
        </div>

        {/* Score Card */}
        <Card
          variant="surface"
          className="w-full p-6 mb-8 bg-white text-center"
        >
          <span className="font-label text-xs font-bold text-on-surface-variant block mb-2 tracking-wider">
            HASIL AKHIR
          </span>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="font-display text-2xl font-bold text-on-surface">
              Total Skor:
            </span>
            <span className="font-display text-3xl font-extrabold text-primary">
              {quizScore} Poin
            </span>
          </div>
          <ProgressBar value={quizScore} color="primary" />
          <p className="mt-4 font-label text-sm font-bold text-primary">
            {quizScore >= 60
              ? "Hampir Sempurna! Tingkatkan lagi ya!"
              : "Jangan menyerah, coba lagi!"}
          </p>
        </Card>

        {/* Actions */}
        <div className="w-full space-y-4">
          <Button
            onClick={() => router.push("/quiz/prep")}
            variant="primary"
            className="py-4"
          >
            <span className="material-symbols-outlined">play_arrow</span>
            MAIN LAGI
          </Button>
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => router.push("/choose-chapter")}
              variant="outline"
              className="py-4"
            >
              <span className="material-symbols-outlined">grid_view</span>
              CHAPTER
            </Button>
            <Button
              onClick={() => router.push("/")}
              variant="secondary"
              className="py-4"
            >
              <span className="material-symbols-outlined">home</span>
              HOME
            </Button>
          </div>
        </div>
      </main>
      <Navbar />
    </>
  );
}
