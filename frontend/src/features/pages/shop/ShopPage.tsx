"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";
import { useStore } from "@/lib/store";
import { dummyUser } from "@/lib/dummy-data";
import { ShopItem } from "./components/ShopItem";
import { shopItemsData } from "./constants/shopItems";

export default function ShopPage() {
  const quizScore = useStore((state) => state.quizScore);
  const totalPoints = dummyUser.points + quizScore;

  return (
    <>
      <Header title="Toko" showBack={false} />
      <main className="pt-24 pb-28 px-margin-mobile max-w-[800px] mx-auto w-full flex-1">
        {/* Points Display */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 bg-tertiary-container/10 px-6 py-3 rounded-2xl border-2 border-tertiary-container/20">
            <span
              className="material-symbols-outlined text-tertiary text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="font-display text-2xl font-extrabold text-tertiary">
              {totalPoints}
            </span>
          </div>
        </div>

        <h2 className="font-display text-xl font-bold text-on-surface mb-4">Power-Ups</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shopItemsData.map((item: any) => (
            <ShopItem key={item.id} item={item} totalPoints={totalPoints} />
          ))}
        </div>
      </main>
      <Navbar />
    </>
  );
}
