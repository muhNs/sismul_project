"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "processing" | "success">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState("processing");
    setTimeout(() => {
      setSubmitState("success");
      setTimeout(() => router.push("/"), 1000);
    }, 1500);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-margin-mobile py-lg max-w-[800px] mx-auto w-full">
      {/* Hero Section */}
      <div className="flex flex-col items-center mb-8 w-full">
        <img src="/owl-grad.png" alt="Learnly Logo" className="w-52 h-52 object-contain -mb-6 relative z-10" />
        <div className="text-center">
          <h1 className="font-display text-4xl font-extrabold text-primary mb-1">Daftar Akun Baru</h1>
          <p className="text-xl font-bold text-on-surface-variant">
            Ayo mulai petualangan belajarmu sekarang!
          </p>
        </div>
      </div>

      {/* Auth Container Card */}
      <Card variant="surface" className="w-full p-6 bg-white shadow-[0_4px_0_#e3e2e2] border-2 border-surface-container-highest">
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {/* Full Name */}
          <div className="space-y-2">
            <label className="font-label text-sm font-bold text-on-surface-variant block ml-1">
              Nama Lengkap
            </label>
            <div
              className={`relative transition-all duration-200 rounded-xl border-2 bg-surface-container-low overflow-hidden ${
                focusedField === "fullName"
                  ? "border-secondary scale-[1.01] ring-4 ring-secondary/10"
                  : "border-surface-container-highest"
              }`}
            >
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                person
              </span>
              <input
                type="text"
                required
                placeholder="Masukkan nama lengkap"
                onFocus={() => setFocusedField("fullName")}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-12 pr-4 py-4 font-sans text-sm bg-transparent outline-none border-none focus:ring-0"
              />
            </div>
          </div>

          {/* Username */}
          <div className="space-y-2">
            <label className="font-label text-sm font-bold text-on-surface-variant block ml-1">
              Nama Pengguna
            </label>
            <div
              className={`relative transition-all duration-200 rounded-xl border-2 bg-surface-container-low overflow-hidden ${
                focusedField === "username"
                  ? "border-secondary scale-[1.01] ring-4 ring-secondary/10"
                  : "border-surface-container-highest"
              }`}
            >
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                alternate_email
              </span>
              <input
                type="text"
                required
                placeholder="Pilih username unik"
                onFocus={() => setFocusedField("username")}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-12 pr-4 py-4 font-sans text-sm bg-transparent outline-none border-none focus:ring-0"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="font-label text-sm font-bold text-on-surface-variant block ml-1">
              Email
            </label>
            <div
              className={`relative transition-all duration-200 rounded-xl border-2 bg-surface-container-low overflow-hidden ${
                focusedField === "email"
                  ? "border-secondary scale-[1.01] ring-4 ring-secondary/10"
                  : "border-surface-container-highest"
              }`}
            >
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                mail
              </span>
              <input
                type="email"
                required
                placeholder="contoh@email.com"
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-12 pr-4 py-4 font-sans text-sm bg-transparent outline-none border-none focus:ring-0"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="font-label text-sm font-bold text-on-surface-variant block ml-1">
              Kata Sandi
            </label>
            <div
              className={`relative transition-all duration-200 rounded-xl border-2 bg-surface-container-low overflow-hidden ${
                focusedField === "password"
                  ? "border-secondary scale-[1.01] ring-4 ring-secondary/10"
                  : "border-surface-container-highest"
              }`}
            >
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                lock
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Minimal 8 karakter"
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-12 pr-12 py-4 font-sans text-sm bg-transparent outline-none border-none focus:ring-0"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          {submitState === "idle" && (
            <Button type="submit" variant="primary" className="mt-4 w-full">
              Daftar Sekarang
              <span className="material-symbols-outlined ml-2">arrow_forward</span>
            </Button>
          )}
          {submitState === "processing" && (
            <Button type="button" variant="primary" className="mt-4 w-full opacity-80 cursor-not-allowed" disabled>
              <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
              Memproses...
            </Button>
          )}
          {submitState === "success" && (
            <Button type="button" variant="secondary" className="mt-4 w-full cursor-default">
              <span className="material-symbols-outlined mr-2">check_circle</span>
              Berhasil!
            </Button>
          )}
        </form>
      </Card>

      {/* Login Link */}
      <div className="mt-6 text-center">
        <p className="font-label text-sm font-bold text-on-surface-variant">
          Sudah punya akun?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-primary hover:underline cursor-pointer font-extrabold flex items-center justify-center gap-1 mt-1"
          >
            Masuk <span className="material-symbols-outlined text-sm">login</span>
          </span>
        </p>
      </div>

      {/* Terms */}
      <div className="mt-4 text-center px-2">
        <p className="font-label text-[10px] font-bold text-outline">
          Dengan mendaftar, kamu menyetujui{" "}
          <a className="text-secondary hover:underline cursor-pointer">Ketentuan Layanan</a> dan{" "}
          <a className="text-secondary hover:underline cursor-pointer">Kebijakan Privasi</a> kami.
        </p>
      </div>
    </main>
  );
}
