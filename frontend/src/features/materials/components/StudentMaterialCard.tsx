"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Mascot } from "@/components/ui/Mascot";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/lib/store";
import { chaptersData } from "@/lib/dummy-data";

export function ProgressHint() {
  const router = useRouter();

  return (
    <Card
      variant="surface"
      className="mt-8 p-6 bg-secondary-container/10 border-2 border-dashed border-secondary-container flex items-center gap-6"
    >
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
  );
}

export function ChapterCard() {
  const router = useRouter();
  const setSelectedChapterId = useStore((state) => state.setSelectedChapterId);

  const handleStartChapter = (chapterId: string) => {
    setSelectedChapterId(chapterId);
    if (chapterId === "vocabulary") {
      router.push("/vocabulary");
    } else {
      // reading, listening, writing, speaking → semua ke quiz/prep
      router.push("/quiz/prep");
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
      {chaptersData.map((chapter, index) => {
        const isFeatured = index === 0;
        const colSpan = isFeatured ? "col-span-2 md:col-span-3" : "col-span-1 md:col-span-3";
        const textClass = `text-${chapter.variant}`;
        const bgClass = `bg-${chapter.variant}-container/20`;
        const borderClass = `border-b-${chapter.variant}`;

        return (
          <button
            key={chapter.id}
            onClick={() => handleStartChapter(chapter.id)}
            className={`${colSpan} tactile-button group bg-white p-6 rounded-2xl border-2 border-surface-variant border-b-4 ${borderClass} shadow-sm flex flex-col items-start gap-4 cursor-pointer text-left w-full hover:bg-surface-container/5`}
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
                <div
                  className="h-full bg-primary-container rounded-full transition-all"
                  style={{ width: `${chapter.progress}%` }}
                />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
