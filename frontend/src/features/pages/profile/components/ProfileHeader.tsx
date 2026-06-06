"use client";

import React from "react";
import { dummyUser } from "@/lib/dummy-data";

export function ProfileHeader() {
  const dicebearUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${dummyUser.username}`;

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
            Halo, {dummyUser.name}!
          </h1>
        </div>
      </div>
    </section>
  );
}
