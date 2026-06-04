"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";
import { LeaderboardRow } from "../components/LeaderboardRow";
import { leaderboardData } from "../constants/leaderboardData";

export default function LeaderboardPage() {
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

        <div className="space-y-3">
          {leaderboardData.map((entry) => (
            <LeaderboardRow key={entry.name} entry={entry} />
          ))}
        </div>
      </main>
      <Navbar />
    </>
  );
}
