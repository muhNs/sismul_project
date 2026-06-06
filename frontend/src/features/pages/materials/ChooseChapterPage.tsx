"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";
import { useStore } from "@/lib/store";
import { classesData } from "@/lib/dummy-data";
import { ChapterCard, ProgressHint } from "@/features/materials/components/StudentMaterialCard";

export default function ChooseChapterPage() {
  const selectedClassId = useStore((state) => state.selectedClassId);
  const selectedClass = classesData.find((c) => c.id === selectedClassId) || classesData[0];

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
        <ChapterCard />
        <ProgressHint />
      </main>
      <Navbar />
    </>
  );
}
