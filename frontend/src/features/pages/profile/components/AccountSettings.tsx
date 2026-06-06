"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { dummyUser } from "@/lib/dummy-data";

export function AccountSettings() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <Card variant="surface" className="p-4 bg-white shadow-[0_4px_0_#e3e2e2]">
        <label className="font-label text-xs font-bold text-on-surface-variant block mb-1 uppercase tracking-wider">
          NAMA PENGGUNA
        </label>
        <div className="flex justify-between items-center group">
          <span className="font-display text-lg font-bold text-on-surface">{dummyUser.username}</span>
          <span className="material-symbols-outlined text-primary-container opacity-0 group-hover:opacity-100 transition-opacity">
            chevron_right
          </span>
        </div>
      </Card>

      <Card variant="surface" className="p-4 bg-white shadow-[0_4px_0_#e3e2e2]">
        <label className="font-label text-xs font-bold text-on-surface-variant block mb-1 uppercase tracking-wider">
          EMAIL ORANG TUA
        </label>
        <div className="flex justify-between items-center group">
          <span className="font-sans text-sm font-bold text-on-surface">{dummyUser.email}</span>
          <span className="material-symbols-outlined text-primary-container opacity-0 group-hover:opacity-100 transition-opacity">
            lock
          </span>
        </div>
      </Card>

      <Card
        variant="surface"
        className="md:col-span-2 p-4 bg-white shadow-[0_4px_0_#e3e2e2] flex justify-between items-center"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-error-container/20 rounded-lg flex items-center justify-center border-2 border-error-container text-error">
            <span className="material-symbols-outlined">key</span>
          </div>
          <div>
            <p className="font-display text-sm font-bold text-on-surface">Kata Sandi</p>
            <p className="text-xs text-on-surface-variant font-sans">Terakhir diubah 2 bulan lalu</p>
          </div>
        </div>
        <button className="bg-surface-container-low hover:bg-surface-container px-4 py-2 rounded-lg font-label text-xs font-bold text-primary transition-colors cursor-pointer border-b-2 border-surface-dim">
          Ubah
        </button>
      </Card>
    </section>
  );
}
