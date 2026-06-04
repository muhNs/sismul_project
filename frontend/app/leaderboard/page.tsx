"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/Card";
import { dummyUser } from "@/lib/dummy-data";

export default function LeaderboardPage() {
  const dummyLeaderboard = [
    { rank: 1, name: "Siti K.", points: 3450, isUser: false },
    { rank: 2, name: "Budi Santoso", points: dummyUser.points, isUser: true },
    { rank: 3, name: "Ahmad F.", points: 1100, isUser: false },
    { rank: 4, name: "Dina R.", points: 950, isUser: false },
    { rank: 5, name: "Bima S.", points: 800, isUser: false },
  ];

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
          {dummyLeaderboard.map((user) => {
            const isTop3 = user.rank <= 3;
            return (
              <Card 
                key={user.name} 
                variant="surface"
                className={`p-4 flex items-center gap-4 ${
                  user.isUser ? "bg-primary-container/10 border-2 border-primary-container" : "bg-white shadow-[0_2px_0_#e3e2e2]"
                }`}
              >
                <div className="w-8 text-center font-display text-xl font-bold text-on-surface-variant">
                  {user.rank}
                </div>
                
                <div className="w-12 h-12 rounded-full bg-surface-container-highest overflow-hidden flex items-center justify-center flex-shrink-0 relative">
                   {user.isUser ? (
                     <img src={dummyUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
                   ) : (
                     <span className="material-symbols-outlined text-surface-dim">person</span>
                   )}
                   {isTop3 && (
                      <div className="absolute -bottom-1 -right-1 text-tertiary-container drop-shadow-sm">
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                      </div>
                   )}
                </div>
                
                <div className="flex-1">
                  <h3 className={`font-display text-lg font-bold ${user.isUser ? "text-primary" : "text-on-surface"}`}>
                    {user.name}
                  </h3>
                </div>
                
                <div className="text-right">
                  <span className="font-display text-xl font-extrabold text-on-surface">
                    {user.points}
                  </span>
                  <span className="font-label text-[10px] font-bold text-on-surface-variant block uppercase">XP</span>
                </div>
              </Card>
            );
          })}
        </div>
      </main>

      <Navbar />
    </>
  );
}
