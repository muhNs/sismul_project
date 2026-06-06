"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ShopItemData } from "../constants/shopItems";

interface ShopItemProps {
  item: ShopItemData;
  totalPoints: number;
}

export function ShopItem({ item, totalPoints }: ShopItemProps) {
  const canAfford = totalPoints >= item.price;
  return (
    <Card variant="surface" className="p-4 bg-white shadow-[0_4px_0_#e3e2e2] flex flex-col">
      <div className="flex gap-4 mb-4">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-${item.color}-container/20 text-${item.color} flex-shrink-0`}
        >
          <span className="material-symbols-outlined text-3xl">{item.icon}</span>
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-on-surface">{item.title}</h3>
          <p className="text-on-surface-variant text-sm font-medium">{item.desc}</p>
        </div>
      </div>
      <div className="mt-auto pt-2 border-t-2 border-surface-container-highest">
        <Button
          variant={canAfford ? "primary" : "outline"}
          className={`w-full ${!canAfford ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Beli - {item.price} Poin
        </Button>
      </div>
    </Card>
  );
}
