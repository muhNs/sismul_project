"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function AdminLoginForm() {
  const router = useRouter();
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-6 py-12">
      <div className="w-full max-w-[450px] mx-auto flex flex-col items-center">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8 w-full text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-4 border-2 border-primary/20 shadow-sm">
            <span className="material-symbols-outlined text-5xl text-primary">admin_panel_settings</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold text-primary mb-1 tracking-tight">Portal Admin</h1>
          <p className="text-lg font-bold text-on-surface-variant">
            Sistem Manajemen Learnly
          </p>
        </div>

        {/* Auth Container Card */}
        <Card variant="surface" className="w-full p-6 sm:p-8 bg-white shadow-[0_6px_0_#e3e2e2] border-2 border-surface-container-highest rounded-2xl">
          <form className="space-y-6 w-full" onSubmit={handleSubmit}>
            
            {/* Email Field */}
            <div className="space-y-2 w-full">
              <label className="font-label text-sm font-extrabold text-on-surface-variant block uppercase tracking-wider">
                Email Administrator
              </label>
              <div
                className={`relative transition-all duration-300 rounded-xl border-2 bg-surface-container-low overflow-hidden w-full ${
                  focusedField === "email"
                    ? "border-primary scale-[1.02] shadow-[0_0_0_4px_rgba(var(--color-primary),0.1)] bg-white"
                    : "border-surface-container-highest"
                }`}
              >
                <span className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === "email" ? "text-primary" : "text-outline"}`}>
                  shield_person
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="admin@learnly.com"
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-4 font-sans text-base font-medium bg-transparent outline-none border-none focus:ring-0 placeholder:font-normal placeholder:text-outline/70"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2 w-full">
              <label className="font-label text-sm font-extrabold text-on-surface-variant block uppercase tracking-wider">
                Kata Sandi
              </label>
              <div
                className={`relative transition-all duration-300 rounded-xl border-2 bg-surface-container-low overflow-hidden w-full ${
                  focusedField === "password"
                    ? "border-primary scale-[1.02] shadow-[0_0_0_4px_rgba(var(--color-primary),0.1)] bg-white"
                    : "border-surface-container-highest"
                }`}
              >
                <span className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === "password" ? "text-primary" : "text-outline"}`}>
                  key
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-12 py-4 font-sans text-base font-medium bg-transparent outline-none border-none focus:ring-0 placeholder:font-normal placeholder:text-outline/70"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <Button type="submit" variant="primary" className="mt-8 w-full py-4 text-base font-bold shadow-[0_4px_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-1 transition-all">
              Masuk ke Dasbor
            </Button>
          </form>
        </Card>

        {/* Footer Links */}
        <div className="mt-10 flex flex-col items-center space-y-4 w-full">
          <p className="font-label text-sm font-bold text-outline text-center">
            Ada masalah akses?{" "}
            <a className="text-primary hover:underline cursor-pointer">Hubungi Superadmin</a>
          </p>
          <button 
            onClick={() => router.push("/")}
            className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary/5"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </main>
  );
}
