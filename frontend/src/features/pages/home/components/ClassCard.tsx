"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/lib/store";
import { classesData, dummyUser } from "@/lib/dummy-data";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function ClassCard() {
  const router = useRouter();
  const setSelectedClassId = useStore((state) => state.setSelectedClassId);

  const handleSelectClass = (classId: string) => {
    setSelectedClassId(classId);
    router.push(`/materials/${classId}`);
  };

  return (
    <>
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold text-on-surface mb-2">
          Halo, {dummyUser.name.split(" ")[0]}! 👋
        </h1>
        <p className="font-sans text-sm font-medium text-on-surface-variant">
          Pilih kelasmu untuk mulai belajar hari ini
        </p>
      </div>

      {/* Grade Selection Grid */}
      <div className="grid grid-cols-2 gap-4">
        {classesData.map((item) => (
          <Card
            key={item.id}
            variant={item.variant}
            clickable={true}
            onClick={() => handleSelectClass(item.id)}
            className="flex flex-col items-center justify-center p-6 h-48 w-full group"
          >
            <div
              className={`w-20 h-20 mb-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${
                item.variant === "green"
                  ? "bg-primary-container/20 text-primary"
                  : item.variant === "blue"
                  ? "bg-secondary-container/20 text-secondary"
                  : "bg-tertiary-container/20 text-tertiary"
              }`}
            >
              <span
                className="material-symbols-outlined text-[48px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {item.icon}
              </span>
            </div>
            <span className="font-display text-lg font-bold text-on-surface">{item.name}</span>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Weekly Progress Card */}
      <Card variant="surface" className="mt-8 p-6 bg-surface-container-lowest">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-label text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            PROGRES MINGGU INI
          </h3>
          <span className="text-primary font-label font-bold">75%</span>
        </div>
        <ProgressBar value={75} color="primary" />
        <p className="mt-4 font-sans text-sm font-medium text-on-surface-variant text-center">
          Selesaikan 2 materi lagi untuk mencapai target! 🎯
        </p>
      </Card>
    </>
  );
}
