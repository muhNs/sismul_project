"use client";

import React from "react";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface QuizHeaderProps {
  progressPercent: number;
  totalPoints: number;
  onClose: () => void;
}

export function QuizHeader({ progressPercent, totalPoints, onClose }: QuizHeaderProps) {
  return (
    <header className="bg-background border-b-4 border-surface-container-highest flex justify-between items-center px-margin-mobile h-16 w-full sticky top-0 z-50">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onClose}
          className="hover:bg-surface-container-low p-2 rounded-xl transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-on-surface-variant">close</span>
        </button>
        <div className="flex-1 max-w-md">
          <ProgressBar value={progressPercent > 0 ? progressPercent : 5} color="primary" />
        </div>
      </div>
      <div className="flex items-center gap-2 ml-4">
        <div className="flex items-center gap-1 bg-tertiary-container/10 px-3 py-1 rounded-full border border-tertiary-container/20">
          <span
            className="material-symbols-outlined text-tertiary text-sm"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          <span className="font-label text-xs font-bold text-tertiary">{totalPoints} pts</span>
        </div>
      </div>
    </header>
  );
}
