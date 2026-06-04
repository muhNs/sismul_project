"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { dummyUser } from "@/lib/dummy-data";

export function ProfileHeader() {
  return (
    <section className="mb-8">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-primary-container p-1 bg-white shadow-lg overflow-hidden select-none">
            <img className="w-full h-full object-cover" alt="User Avatar" src={dummyUser.avatar} />
          </div>
          <button className="absolute bottom-0 right-0 bg-secondary-container text-white p-2 rounded-full border-4 border-white shadow-md active:scale-95 transition-transform cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
        </div>
        <div className="text-center">
          <h1 className="font-display text-2xl font-extrabold text-on-surface">
            Halo, {dummyUser.name}!
          </h1>
          <p className="text-on-surface-variant text-sm font-sans font-medium">
            Siswa Kelas {dummyUser.level} • Bergabung sejak 2023
          </p>
        </div>
      </div>
    </section>
  );
}
