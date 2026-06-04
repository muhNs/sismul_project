"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/Card";
import { Mascot } from "@/components/ui/Mascot";
import { useStore } from "@/lib/store";
import { chaptersData, classesData } from "@/lib/dummy-data";

export default function ChooseChapterPage() {
  const router = useRouter();
  const selectedClassId = useStore((state) => state.selectedClassId);
  const setSelectedChapterId = useStore((state) => state.setSelectedChapterId);

  const selectedClass = classesData.find(c => c.id === selectedClassId) || classesData[0];

  const handleStartChapter = (chapterId: string) => {
    setSelectedChapterId(chapterId);
    if (chapterId === "reading") {
      router.push("/quiz/prep");
    } else if (chapterId === "vocabulary") {
      router.push("/vocabulary");
    }
  };

  return (
    <>
      <Header title={`Materi ${selectedClass.name}`} showBack={true} />

      <main className="pt-24 pb-28 px-margin-mobile max-w-[800px] mx-auto w-full flex-1">
        <div className="mb-8">
          <h2 className="font-display text-3xl font-extrabold text-on-surface mb-2">
            Pilih Chapter - {selectedClass.name}
          </h2>
          <p className="text-on-surface-variant text-sm font-medium">
            Pilih topik yang ingin kamu pelajari hari ini!
          </p>
        </div>

        {/* Learning Path - Bento Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {chaptersData.map((chapter, index) => {
            // Logic for spanning: Reading takes full top row (col-span-2/3), others split below
            const isFeatured = index === 0;
            const colSpan = isFeatured ? "col-span-2 md:col-span-3" : "col-span-1 md:col-span-3";
            const bgHover = `hover:bg-${chapter.variant}-container/5`;
            const textClass = `text-${chapter.variant}`;
            const bgClass = `bg-${chapter.variant}-container/20`;
            const borderClass = `border-b-${chapter.variant}`;
            
            return (
              <button
                key={chapter.id}
                onClick={() => handleStartChapter(chapter.id)}
                className={`${colSpan} tactile-button group bg-white p-6 rounded-2xl border-2 border-surface-variant border-b-4 ${borderClass} shadow-sm flex flex-col items-start gap-4 cursor-pointer text-left w-full ${bgHover}`}
              >
                <div className={`w-16 h-16 ${bgClass} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 shine-effect"></div>
                  <span
                    className={`material-symbols-outlined text-[40px] ${textClass}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {chapter.icon}
                  </span>
                </div>
                <div className="w-full">
                  <span className={`font-label text-xs font-bold ${textClass} block mb-1`}>
                    CHAPTER {index + 1}
                  </span>
                  <h3 className="font-display text-xl font-bold text-on-surface">{chapter.title}</h3>
                  {isFeatured && (
                    <p className="text-on-surface-variant text-xs mt-1">{chapter.description}</p>
                  )}
                </div>
                {isFeatured && (
                  <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden mt-2 relative shine-effect">
                    <div className="h-full bg-primary-container rounded-full transition-all" style={{ width: `${chapter.progress}%` }} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Weekly Progress Hint Card */}
        <Card variant="surface" className="mt-8 p-6 bg-secondary-container/10 border-2 border-dashed border-secondary-container flex items-center gap-6">
          <Mascot expression="cheer" size="sm" className="shrink-0" />
          <div>
            <h4 className="font-display text-lg font-bold text-secondary mb-1">
              Kamu Hampir Selesai!
            </h4>
            <p className="text-on-surface-variant text-xs font-medium">
              Selesaikan materi Reading hari ini untuk mempertahankan streak mingguan kamu.
            </p>
            <button
              onClick={() => router.push("/quiz/prep")}
              className="mt-3 px-4 py-2 bg-secondary text-white font-label text-xs font-bold rounded-xl border-b-4 border-on-secondary-fixed-variant tactile-button cursor-pointer"
            >
              Lanjutkan Belajar
            </button>
          </div>
        </Card>
      </main>

      <Navbar />
    </>
  );
}
