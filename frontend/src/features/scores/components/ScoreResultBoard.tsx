"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { dummyUser } from "@/lib/dummy-data";
import { LeaderboardEntry } from "@/features/scores/constants/leaderboardData";

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
}

export function LeaderboardRow({ entry }: LeaderboardRowProps) {
  const isTop3 = entry.rank <= 3;

  return (
    <Card
      variant="surface"
      className={`p-4 flex items-center gap-4 ${
        entry.isUser
          ? "bg-primary-container/10 border-2 border-primary-container"
          : "bg-white shadow-[0_2px_0_#e3e2e2]"
      }`}
    >
      <div className="w-8 text-center font-display text-xl font-bold text-on-surface-variant">
        {entry.rank}
      </div>

      <div className="w-12 h-12 rounded-full bg-surface-container-highest overflow-hidden flex items-center justify-center flex-shrink-0 relative">
        {entry.isUser ? (
          <img src={dummyUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="material-symbols-outlined text-surface-dim">person</span>
        )}
        {isTop3 && (
          <div className="absolute -bottom-1 -right-1 text-tertiary-container drop-shadow-sm">
            <span
              className="material-symbols-outlined text-lg"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              stars
            </span>
          </div>
        )}
      </div>

      <div className="flex-1">
        <h3
          className={`font-display text-lg font-bold ${
            entry.isUser ? "text-primary" : "text-on-surface"
          }`}
        >
          {entry.name}
        </h3>
      </div>

      <div className="text-right">
        <span className="font-display text-xl font-extrabold text-on-surface">{entry.points}</span>
        <span className="font-label text-[10px] font-bold text-on-surface-variant block uppercase">
          XP
        </span>
      </div>
    </Card>
  );
}
