"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/features/auth/types/studentAuth.schema";
import { useStudentLogin } from "@/features/auth/hooks/useStudentAuth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function LoginForm() {
  const router = useRouter();
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Hook Mutation dari React Query
  const { mutate: login, isPending, error } = useStudentLogin();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data: LoginInput) => {
    login(data);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-margin-mobile py-lg max-w-[800px] mx-auto w-full">
      <div className="flex flex-col items-center mb-8 w-full">
        <img src="/owl-grad.png" alt="Learnly Logo" className="w-52 h-52 object-contain -mb-6 relative z-10" />
        <div className="text-center">
          <h1 className="font-display text-4xl font-extrabold text-primary mb-1">Learnly</h1>
          <p className="text-xl font-bold text-on-surface-variant">Siap untuk belajar hari ini?</p>
        </div>
      </div>

      <Card variant="surface" className="w-full p-6 bg-white shadow-[0_4px_0_#e3e2e2] border-2 border-surface-container-highest">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="space-y-2">
            <label className="font-label text-sm font-bold text-on-surface-variant block ml-1">Email</label>
            <div className={`relative transition-all duration-200 rounded-xl border-2 bg-surface-container-low overflow-hidden ${focusedField === "email" ? "border-secondary scale-[1.01] ring-4 ring-secondary/10" : "border-surface-container-highest"}`}>
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">mail</span>
              <input
                {...register("email")}
                type="email"
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-12 pr-4 py-4 font-sans text-sm bg-transparent outline-none border-none"
                placeholder="Masukkan emailmu..."
              />
            </div>
            {errors.email && <p className="text-error text-xs font-bold">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="font-label text-sm font-bold text-on-surface-variant block ml-1">Kata Sandi</label>
            <div className={`relative transition-all duration-200 rounded-xl border-2 bg-surface-container-low overflow-hidden ${focusedField === "password" ? "border-secondary scale-[1.01] ring-4 ring-secondary/10" : "border-surface-container-highest"}`}>
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">lock</span>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-12 pr-12 py-4 font-sans text-sm bg-transparent outline-none border-none"
                placeholder="Rahasia ssttt..."
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors cursor-pointer">
                <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
              </button>
            </div>
            {errors.password && <p className="text-error text-xs font-bold">{errors.password.message}</p>}
          </div>

          {/* Error Message dari API */}
          {error && (
            <div className="text-error text-sm font-bold text-center mt-2">
              {(error as any)?.response?.data?.message || "Login gagal, silakan coba lagi."}
            </div>
          )}

          <Button type="submit" variant="primary" className="mt-4 w-full" disabled={isPending}>
            {isPending ? "Memproses..." : "Masuk"}
          </Button>
        </form>

        {/* Social Logins Section tetap sama */}
      </Card>
      
      {/* Footer Links tetap sama */}
    </main>
  );
}