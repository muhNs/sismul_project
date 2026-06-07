"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mascot } from "@/components/ui/Mascot";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { loginUser } from "@/features/auth/api/loginUser";
import { useStore } from "@/lib/store";

export function LoginForm() {
  const router = useRouter();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const setAuth = useStore((state) => state.setAuth);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      // In this system we support login with username/email and password
      const response = await loginUser({ email: username, password });
      
      if (response.data) {
        setAuth(response.data);
        router.push("/home");
      } else {
        setErrorMsg("Gagal masuk. Silakan periksa kembali email dan password Anda.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || "Login gagal. Periksa kembali kredensial Anda.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-margin-mobile py-lg max-w-[800px] mx-auto w-full">
      {/* Hero / Mascot Section */}
      <div className="flex flex-col items-center mb-8 w-full">
        <Mascot expression="happy" speechBubble="Halo!" size="lg" className="mb-4" />
        <div className="text-center">
          <h1 className="font-display text-4xl font-extrabold text-primary mb-1">Learnly</h1>
          <p className="text-xl font-bold text-on-surface-variant">
            Siap untuk belajar hari ini?
          </p>
        </div>
      </div>

      {/* Auth Container Card */}
      <Card variant="surface" className="w-full p-6 bg-white shadow-[0_4px_0_#e3e2e2] border-2 border-surface-container-highest">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="font-label text-sm font-bold text-on-surface-variant block ml-1">
              Email atau Username
            </label>
            <div
              className={`relative transition-all duration-200 rounded-xl border-2 bg-surface-container-low overflow-hidden ${
                focusedField === "email"
                  ? "border-secondary scale-[1.01] ring-4 ring-secondary/10"
                  : "border-surface-container-highest"
              }`}
            >
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                person
              </span>
              <input
                type="text"
                name="username"
                required
                placeholder="Masukkan namamu..."
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-12 pr-4 py-4 font-sans text-sm bg-transparent outline-none border-none focus:ring-0"
              />
            </div>
          </div>

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
                type="password"
                name="password"
                required
                placeholder="Rahasia ssttt..."
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-12 pr-12 py-4 font-sans text-sm bg-transparent outline-none border-none focus:ring-0"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">visibility</span>
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="text-error text-sm font-bold text-center mt-2">
              {errorMsg}
            </div>
          )}

          <Button type="submit" variant="primary" className="mt-4">
            Masuk
          </Button>
        </form>

        {/* Social Logins */}
        <div className="text-center space-y-3 pt-6 mt-4 border-t border-surface-container">
          <p className="font-label text-xs font-bold text-on-surface-variant">Atau masuk dengan</p>
          <div className="flex gap-4 justify-center">
            <button
              type="button"
              className="p-3 bg-white border-2 border-surface-container-highest rounded-xl tactile-card hover:bg-surface-container-low transition-colors cursor-pointer"
            >
              <img
                alt="Google"
                className="w-6 h-6"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1ApkXKi5sMYQPWwk3LyGPxhdQISVJsLbW_1cAwa5LQyNBkflEezl_fSZX5a_9biGtRRxiv_MwQaGpUwiaKQMLGzuZMbTviDoyKIucjVk-gytwD84MK_A2ymWyMSyM2hbMOExgKGe_prgKnhYzTJDDacaum2TCyiJoySz1_i4rM-T2lja51kKUVXgK80bkmvD_hKGsiA40KMC-a2Qq9AN_hULcAMBzoRwP8C6iBDZbdbsL8P4uSEF0IGNooIb-k4p8QyRNE167tyk"
              />
            </button>
            <button
              type="button"
              className="p-3 bg-white border-2 border-surface-container-highest rounded-xl tactile-card hover:bg-surface-container-low transition-colors flex items-center justify-center cursor-pointer text-secondary"
            >
              <span className="material-symbols-outlined">face_nod</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Register Link */}
      <div className="mt-6 text-center">
        <p className="font-label text-sm font-bold text-on-surface-variant">
          Belum punya akun?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-primary hover:underline cursor-pointer font-extrabold"
          >
            Daftar di sini
          </span>
        </p>
      </div>

      {/* Forgot Password */}
      <div className="mt-2 text-center">
        <p className="font-label text-xs font-bold text-outline">
          Lupa kata sandi?{" "}
          <a className="text-secondary hover:underline cursor-pointer">Klik di sini</a>
        </p>
      </div>
    </main>
  );
}
