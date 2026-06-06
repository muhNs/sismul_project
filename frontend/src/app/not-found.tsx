import React from "react";
import Link from "next/link";
import { Mascot } from "@/components/ui/Mascot";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-8 mt-12">
        <Mascot expression="happy" size="lg" />
        <div className="absolute -top-6 -right-8 bg-white p-4 rounded-2xl shadow-sm border-2 border-surface-container-highest max-w-[200px] z-10">
          <p className="font-label text-xs font-bold text-error">Halaman tidak ditemukan...</p>
          <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white border-b-2 border-r-2 border-surface-container-highest transform rotate-45"></div>
        </div>
      </div>
      
      <h1 className="font-display text-4xl font-extrabold text-on-surface mb-2">Oops! 404</h1>
      <p className="font-sans text-sm font-medium text-on-surface-variant mb-8 w-full max-w-sm px-4">
        Sepertinya kamu tersesat di hutan. Halaman yang kamu cari tidak ada.
      </p>

      <Link
        href="/"
        className="py-4 px-8 bg-primary-container text-white font-display text-lg font-bold rounded-2xl border-b-4 border-[#46a302] hover:brightness-105 active:translate-y-1 active:border-b-0 active:mt-[4px] transition-all flex items-center justify-center gap-2 gummy-shine cursor-pointer"
      >
        <span className="material-symbols-outlined">home</span>
        Kembali ke Beranda
      </Link>
    </div>
  );
}
