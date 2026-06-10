"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/lib/store";
import { classesData } from "@/lib/dummy-data";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function ClassCard() {
  const router = useRouter();
  const setSelectedClassId = useStore((state) => state.setSelectedClassId);
  const user = useStore((state) => state.user);

  const handleSelectClass = (classId: string) => {
    setSelectedClassId(classId);
    router.push(`/materials/${classId}`);
  };

  return (
    <>
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold text-on-surface mb-2">
          Halo, {user?.name ? user.name.split(" ")[0] : "Siswa"}! 👋
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
    </>
  );
}
