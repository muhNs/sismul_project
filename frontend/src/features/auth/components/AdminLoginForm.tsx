"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAdminAuth } from "@/features/auth/hooks/useAdminAuth"; // Hook kita
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminLoginSchema, AdminLoginInput } from "@/features/auth/types/adminAuth.schema";

export function AdminLoginForm() {
  const router = useRouter();
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Menggunakan Hook yang sudah kita buat sebelumnya
  const { mutate: login, isPending } = useAdminAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<AdminLoginInput>({
    resolver: zodResolver(adminLoginSchema)
  });

  const onSubmit = (data: AdminLoginInput) => {
    login(data);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-6 py-12">
      <div className="w-full max-w-[450px] mx-auto flex flex-col items-center">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8 w-full text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-4 border-2 border-primary/20 shadow-sm">
            <span className="material-symbols-outlined text-5xl text-primary">
              admin_panel_settings
            </span>
          </div>
          <h1 className="font-display text-4xl font-extrabold text-primary mb-1 tracking-tight">
            Portal Admin
          </h1>
          <p className="text-lg font-bold text-on-surface-variant">
            Sistem Manajemen Learnly
          </p>
        </div>

        <Card variant="surface" className="w-full p-6 sm:p-8 bg-white shadow-[0_6px_0_#e3e2e2] border-2 border-surface-container-highest rounded-2xl">
          <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Email Field */}
            <div className="space-y-2 w-full">
              <label className="font-label text-sm font-extrabold text-on-surface-variant block uppercase tracking-wider">
                Email Administrator
              </label>
              <div className={`relative transition-all duration-300 rounded-xl border-2 bg-surface-container-low overflow-hidden w-full ${focusedField === "email" ? "border-primary scale-[1.02] shadow-[0_0_0_4px_rgba(var(--color-primary),0.1)] bg-white" : "border-surface-container-highest"}`}>
                <span className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === "email" ? "text-primary" : "text-outline"}`}>
                  shield_person
                </span>
                <input
                  {...register("email")}
                  type="email"
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-4 font-sans text-base font-medium bg-transparent outline-none border-none placeholder:text-outline/70"
                  placeholder="admin@learnly.com"
                />
              </div>
              {errors.email && <p className="text-error text-xs font-bold">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2 w-full">
              <label className="font-label text-sm font-extrabold text-on-surface-variant block uppercase tracking-wider">
                Kata Sandi
              </label>
              <div className={`relative transition-all duration-300 rounded-xl border-2 bg-surface-container-low overflow-hidden w-full ${focusedField === "password" ? "border-primary scale-[1.02] shadow-[0_0_0_4px_rgba(var(--color-primary),0.1)] bg-white" : "border-surface-container-highest"}`}>
                <span className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === "password" ? "text-primary" : "text-outline"}`}>
                  key
                </span>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-12 py-4 font-sans text-base font-medium bg-transparent outline-none border-none placeholder:text-outline/70"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-error text-xs font-bold">{errors.password.message}</p>}
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={isPending}
              className="mt-8 w-full py-4 text-base font-bold shadow-[0_4px_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-1 transition-all"
            >
              {isPending ? "Memproses..." : "Masuk ke Dasbor"}
            </Button>
          </form>
        </Card>

        {/* Footer Links (Sama dengan kode Anda) */}
        ...
      </div>
    </main>
  );
}