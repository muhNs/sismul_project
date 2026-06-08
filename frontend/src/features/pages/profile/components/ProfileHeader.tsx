"use client";

import React from "react";
import { useStore } from "@/lib/store";

export function ProfileHeader() {
  const user = useStore((state) => state.user);
  const dicebearUrl = user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || "User"}`;

  return (
    <section className="mb-8">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-primary-container p-1 bg-white shadow-lg overflow-hidden select-none">
            <img className="w-full h-full object-cover" alt="User Avatar" src={dicebearUrl} />
          </div>
        </div>
        <div className="text-center">
          <h1 className="font-display text-2xl font-extrabold text-on-surface">
            Halo, {user?.name || "Siswa"}!
          </h1>
        </div>
      </div>
    </section>
  );
}
