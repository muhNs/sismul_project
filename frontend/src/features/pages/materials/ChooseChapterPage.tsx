"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";
import { useStore } from "@/lib/store";
import { ChapterCard, ProgressHint } from "@/features/materials/components/StudentMaterialCard";
import { useMaterials } from "@/features/materials/hooks/useMaterials";

export default function ChooseChapterPage() {
  const selectedClassId = useStore((state) => state.selectedClassId) || "3";
  const gradeLevel = parseInt(selectedClassId.replace(/\D/g, ""), 10) || 3;
  const className = `KELAS ${gradeLevel}`;

  const { materials, loading, error } = useMaterials(gradeLevel);

  return (
    <>
      <Header title={`Materi ${className}`} showBack={true} />
      <main className="pt-24 pb-28 px-margin-mobile max-w-[800px] mx-auto w-full flex-1">
        <div className="mb-8">
          <h2 className="font-display text-3xl font-extrabold text-on-surface mb-2">
            Pilih Chapter - {className}
          </h2>
          <p className="text-on-surface-variant text-sm font-medium">
            Pilih topik yang ingin kamu pelajari hari ini!
          </p>
        </div>

        {loading ? (
          <div className="w-full py-12 text-center text-on-surface-variant">Memuat materi...</div>
        ) : error ? (
          <div className="w-full py-12 text-center text-error font-bold">{error}</div>
        ) : (
          <ChapterCard materials={materials} />
        )}

        <ProgressHint materials={materials} />
      </main>
      <Navbar />
    </>
  );
}
