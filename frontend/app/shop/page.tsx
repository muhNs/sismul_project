"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/lib/store";
import { dummyUser } from "@/lib/dummy-data";

export default function ShopPage() {
  const quizScore = useStore((state) => state.quizScore);
  const totalPoints = dummyUser.points + quizScore;

  const shopItems = [
    {
      id: "freeze",
      title: "Pembeku Streak",
      desc: "Lindungi streak belajarmu dari 1 hari kosong.",
      price: 200,
      icon: "ac_unit",
      color: "secondary"
    },
    {
      id: "double",
      title: "XP Ganda",
      desc: "Dapatkan poin 2x lipat selama 15 menit.",
      price: 450,
      icon: "bolt",
      color: "tertiary"
    },
    {
      id: "outfit",
      title: "Kacamata Pintar",
      desc: "Aksesoris keren untuk avatarmu.",
      price: 1500,
      icon: "eyeglasses",
      color: "primary"
    }
  ];

  return (
    <>
      <Header title="Toko" showBack={false} />
      
      <main className="pt-24 pb-28 px-margin-mobile max-w-[800px] mx-auto w-full flex-1">
        {/* Points Display */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 bg-tertiary-container/10 px-6 py-3 rounded-2xl border-2 border-tertiary-container/20">
            <span className="material-symbols-outlined text-tertiary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            <span className="font-display text-2xl font-extrabold text-tertiary">
              {totalPoints}
            </span>
          </div>
        </div>

        <h2 className="font-display text-xl font-bold text-on-surface mb-4">Power-Ups</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shopItems.map((item) => (
            <Card key={item.id} variant="surface" className="p-4 bg-white shadow-[0_4px_0_#e3e2e2] flex flex-col">
              <div className="flex gap-4 mb-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-${item.color}-container/20 text-${item.color} flex-shrink-0`}>
                  <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-on-surface">{item.title}</h3>
                  <p className="text-on-surface-variant text-sm font-medium">{item.desc}</p>
                </div>
              </div>
              <div className="mt-auto pt-2 border-t-2 border-surface-container-highest">
                 <Button 
                   variant={totalPoints >= item.price ? "primary" : "outline"} 
                   className={`w-full ${totalPoints < item.price ? "opacity-50 cursor-not-allowed" : ""}`}
                 >
                   Beli - {item.price} Poin
                 </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Navbar />
    </>
  );
}
