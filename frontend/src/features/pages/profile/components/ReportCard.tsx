"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useStore } from "@/lib/store";
import { dummyUser } from "@/lib/dummy-data";

const reportCard = [
  { subject: "Reading Comprehension", points: 100, percentage: 100, stars: 5 },
  { subject: "Mental Math", points: 85, percentage: 85, stars: 4 },
  { subject: "Science Explorers", points: 42, percentage: 42, stars: 2 },
];

export function ReportCard() {
  const quizScore = useStore((state) => state.quizScore);

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-bold text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary">menu_book</span>
          Buku Rapor
        </h2>
        <span className="font-label text-xs font-bold text-secondary cursor-pointer hover:underline">
          Lihat Semua
        </span>
      </div>

      <div className="space-y-4">
        {reportCard.map((item) => (
          <Card
            key={item.subject}
            variant="surface"
            className="p-4 bg-white shadow-[0_4px_0_#e3e2e2] flex flex-col gap-2"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="font-label text-[10px] font-bold text-secondary uppercase tracking-wider">
                  Kelas {dummyUser.level}
                </span>
                <h3 className="font-display text-base font-bold text-on-surface">{item.subject}</h3>
              </div>
              <div className="text-right">
                <p className="font-display text-xl font-bold text-primary leading-none">
                  {item.subject === "Reading Comprehension"
                    ? quizScore > 0 ? quizScore : item.points
                    : item.points}
                </p>
                <p className="font-label text-[10px] font-bold text-on-surface-variant uppercase">Poin</p>
              </div>
            </div>

            <ProgressBar value={item.percentage} color="primary" />

            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => {
                const filled = index < item.stars;
                return (
                  <span
                    key={index}
                    className="material-symbols-outlined text-lg"
                    style={{
                      color: filled ? "var(--color-tertiary-container)" : "var(--color-surface-container-highest)",
                      fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0",
                    }}
                  >
                    star
                  </span>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
