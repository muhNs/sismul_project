"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";
import { LeaderboardRow } from "@/features/scores/components/ScoreResultBoard";
import { LeaderboardEntry } from "@/features/scores/constants/leaderboardData";
import api from "@/lib/axios";
import { useStore } from "@/lib/store";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useStore((state) => state.user);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await api.get("/api/v1/scores/leaderboard");
        const rawData: any[] = res.data.data || res.data;

        const entries: LeaderboardEntry[] = rawData.map((entry: any, idx: number) => ({
          rank: entry.rank ?? idx + 1,
          name: entry.name ?? entry.studentName ?? "Unknown",
          points: entry.points ?? entry.totalScore ?? 0,
          isUser: user ? (entry.userId === user.id || entry.name === user.name) : false,
        }));

        setLeaderboard(entries);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data leaderboard.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeaderboard();
  }, [user]);

  return (
    <>
      <Header title="Leaderboard" showBack={false} />
      <main className="pt-24 pb-28 px-margin-mobile max-w-[800px] mx-auto w-full flex-1">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-extrabold text-on-surface mb-2">Liga Perunggu</h1>
          <p className="font-sans text-sm font-medium text-on-surface-variant">
            Peringkat 3 teratas akan naik ke Liga Perak!
          </p>
        </div>

        {isLoading && (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-20 w-full bg-surface-container-highest rounded-2xl animate-pulse"></div>
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div className="flex flex-col items-center justify-center h-40 gap-3 text-center">
            <span className="material-symbols-outlined text-4xl text-error">wifi_off</span>
            <p className="text-on-surface-variant font-semibold text-sm">{error}</p>
          </div>
        )}

        {!isLoading && !error && leaderboard.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 gap-3 text-center">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant">emoji_events</span>
            <p className="text-on-surface-variant font-semibold text-sm">Belum ada data leaderboard.</p>
          </div>
        )}

        {!isLoading && !error && leaderboard.length > 0 && (
          <div className="space-y-3">
            {leaderboard.map((entry) => (
              <LeaderboardRow key={`${entry.rank}-${entry.name}`} entry={entry} />
            ))}
          </div>
        )}
      </main>
      <Navbar />
    </>
  );
}
