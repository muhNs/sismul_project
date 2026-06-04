"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useStore } from "@/lib/store";
import { dummyUser } from "@/lib/dummy-data";

export default function ProfilePage() {
  const router = useRouter();
  const quizScore = useStore((state) => state.quizScore);

  const handleLogout = () => {
    router.push("/login");
  };

  const reportCard = [
    {
      subject: "Reading Comprehension",
      points: 100,
      percentage: 100,
      stars: 5,
    },
    {
      subject: "Mental Math",
      points: 85,
      percentage: 85,
      stars: 4,
    },
    {
      subject: "Science Explorers",
      points: 42,
      percentage: 42,
      stars: 2,
    },
  ];

  return (
    <>
      <Header title="Learnly" showBack={false} />

      <main className="pt-24 pb-28 px-margin-mobile max-w-[800px] mx-auto w-full flex-grow">
        {/* Profile Header Section */}
        <section className="mb-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-primary-container p-1 bg-white shadow-lg overflow-hidden select-none">
                <img
                  className="w-full h-full object-cover"
                  alt="User Avatar"
                  src={dummyUser.avatar}
                />
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

        {/* Account Settings Bento */}
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
                <p className="text-xs text-on-surface-variant font-sans">
                  Terakhir diubah 2 bulan lalu
                </p>
              </div>
            </div>
            <button className="bg-surface-container-low hover:bg-surface-container px-4 py-2 rounded-lg font-label text-xs font-bold text-primary transition-colors cursor-pointer border-b-2 border-surface-dim">
              Ubah
            </button>
          </Card>
        </section>

        {/* Report Card (Buku Rapor) */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">menu_book</span>
              Buku Rapor
            </h2>
            <span className="font-label text-xs font-bold text-secondary cursor-pointer hover:underline">
              Lihat Semua
            </span>
          </div>

          <div className="space-y-4">
            {reportCard.map((item) => (
              <Card
                key={item.subject}
                variant="surface"
                className="p-4 bg-white shadow-[0_4px_0_#e3e2e2] flex flex-col gap-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-label text-[10px] font-bold text-secondary uppercase tracking-wider">
                      Kelas {dummyUser.level}
                    </span>
                    <h3 className="font-display text-base font-bold text-on-surface">
                      {item.subject}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-xl font-bold text-primary leading-none">
                      {item.subject === "Reading Comprehension" ? (quizScore > 0 ? quizScore : item.points) : item.points}
                    </p>
                    <p className="font-label text-[10px] font-bold text-on-surface-variant uppercase">
                      Poin
                    </p>
                  </div>
                </div>

                <ProgressBar value={item.percentage} color="primary" />

                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const filled = index < item.stars;
                    return (
                      <span
                        key={index}
                        className="material-symbols-outlined text-lg"
                        style={{
                          color: filled ? "var(--color-tertiary-container)" : "var(--color-surface-container-highest)",
                          fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0",
                        }}
                      >
                        star
                      </span>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Danger Zone */}
        <section>
          <Button onClick={handleLogout} variant="outline" className="border-error text-error shadow-[0_4px_0_#ba1a1a] active:shadow-[0_0px_0_#ba1a1a] hover:bg-red-50">
            KELUAR AKUN
          </Button>
        </section>
      </main>

      <Navbar />
    </>
  );
}
