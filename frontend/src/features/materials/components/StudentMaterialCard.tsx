"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Mascot } from "@/components/ui/Mascot";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/lib/store";
import { Material } from "../api/getStudentMaterials";

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

interface ChapterCardProps {
  materials: Material[];
}

export function ChapterCard({ materials }: ChapterCardProps) {
  const router = useRouter();
  const setSelectedChapterId = useStore((state) => state.setSelectedChapterId);

  const handleStartChapter = (material: Material) => {
    setSelectedChapterId(material.id.toString());
    if (material.skillCategory === "READING" || material.skillCategory === "LISTENING") {
      router.push("/quiz/prep");
    } else if (material.skillCategory === "SPEAKING") {
      router.push("/vocabulary");
    } else {
      router.push("/quiz/prep");
    }
  };

  const getCategoryDetails = (category: string) => {
    switch (category) {
      case "READING": return { icon: "menu_book", variant: "primary", title: "Membaca", desc: "Ayo belajar membaca teks bahasa Inggris!" };
      case "LISTENING": return { icon: "headphones", variant: "tertiary", title: "Mendengar", desc: "Dengarkan audio dan jawab pertanyaannya." };
      case "SPEAKING": return { icon: "mic", variant: "secondary", title: "Berbicara", desc: "Latih pengucapan bahasa Inggrismu." };
      case "WRITING": return { icon: "edit", variant: "error", title: "Menulis", desc: "Ayo berlatih menyusun kata dan kalimat." };
      default: return { icon: "book", variant: "primary", title: "Pelajaran", desc: "Materi baru untuk dipelajari." };
    }
  };

  if (materials.length === 0) {
    return (
      <div className="w-full p-8 text-center bg-surface-container rounded-2xl border-2 border-dashed border-outline-variant">
        <p className="text-on-surface-variant font-medium">Belum ada materi untuk kelas ini.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
      {materials.map((material, index) => {
        const isFeatured = index === 0;
        const colSpan = isFeatured ? "col-span-2 md:col-span-3" : "col-span-1 md:col-span-3";
        const details = getCategoryDetails(material.skillCategory);
        const textClass = `text-${details.variant}`;
        const bgClass = `bg-${details.variant}-container/20`;
        const borderClass = `border-b-${details.variant}`;

        return (
          <button
            key={material.id}
            onClick={() => handleStartChapter(material)}
            className={`${colSpan} tactile-button group bg-white p-6 rounded-2xl border-2 border-surface-variant border-b-4 ${borderClass} shadow-sm flex flex-col items-start gap-4 cursor-pointer text-left w-full hover:bg-surface-container/5`}
          >
            <div className={`w-16 h-16 ${bgClass} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 shine-effect"></div>
              <span
                className={`material-symbols-outlined text-[40px] ${textClass}`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {details.icon}
              </span>
            </div>
            <div className="w-full">
              <span className={`font-label text-xs font-bold ${textClass} block mb-1 uppercase`}>
                CHAPTER {material.chapter} - {material.skillCategory}
              </span>
              <h3 className="font-display text-xl font-bold text-on-surface">{details.title}</h3>
              {isFeatured && (
                <p className="text-on-surface-variant text-xs mt-1">{material.content || details.desc}</p>
              )}
            </div>
            {isFeatured && (
              <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden mt-2 relative shine-effect">
                <div
                  className="h-full bg-primary-container rounded-full transition-all"
                  style={{ width: `0%` }}
                />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
