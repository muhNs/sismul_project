"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import api from "@/lib/axios";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (newPassword !== confirmPassword) {
      setErrorMsg("Konfirmasi password baru tidak cocok.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg("Password baru minimal 6 karakter.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post("/api/v1/auth/reset-password", {
        token,
        newPassword
      });

      if (response.data?.status === "success") {
        setSuccessMsg("Password Anda berhasil diperbarui!");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setErrorMsg("Gagal meriset password. Silakan periksa token Anda.");
      }
    } catch (err: any) {
      console.warn(err);
      setErrorMsg(err.response?.data?.message || "Terjadi kesalahan. Pastikan token Anda benar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-margin-mobile py-lg max-w-[800px] mx-auto w-full">
      {/* Hero / Mascot Section */}
      <div className="flex flex-col items-center mb-8 w-full">
        <img src="/owl-grad.png" alt="Learnly Logo" className="w-40 h-40 object-contain -mb-4 relative z-10" />
        <div className="text-center">
          <h1 className="font-display text-3xl font-extrabold text-primary mb-1">Reset Kata Sandi</h1>
          <p className="text-base font-bold text-on-surface-variant max-w-[400px]">
            Lengkapi formulir di bawah dengan token reset dan kata sandi baru Anda.
          </p>
        </div>
      </div>

      {/* Auth Container Card */}
      <Card variant="surface" className="w-full p-6 bg-white shadow-[0_4px_0_#e3e2e2] border-2 border-surface-container-highest">
        {successMsg ? (
          <div className="space-y-4 text-center py-6">
            <div className="w-16 h-16 bg-success-container/20 rounded-full flex items-center justify-center border-2 border-primary text-primary mx-auto">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-xl font-bold text-on-surface">{successMsg}</h3>
              <p className="text-sm text-on-surface-variant">
                Mengalihkan Anda ke halaman masuk dalam beberapa detik...
              </p>
            </div>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Token */}
            <div className="space-y-2">
              <label className="font-label text-sm font-bold text-on-surface-variant block ml-1">
                Token Reset
              </label>
              <div
                className={`relative transition-all duration-200 rounded-xl border-2 bg-surface-container-low overflow-hidden ${
                  focusedField === "token"
                    ? "border-secondary scale-[1.01] ring-4 ring-secondary/10"
                    : "border-surface-container-highest"
                }`}
              >
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                  key
                </span>
                <input
                  type="text"
                  required
                  placeholder="Masukkan 6 digit token..."
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  onFocus={() => setFocusedField("token")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-4 font-sans text-sm bg-transparent outline-none border-none focus:ring-0 tracking-widest font-bold"
                />
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="font-label text-sm font-bold text-on-surface-variant block ml-1">
                Kata Sandi Baru
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
                  required
                  placeholder="Rahasia baru ssttt..."
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-12 py-4 font-sans text-sm bg-transparent outline-none border-none focus:ring-0"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="font-label text-sm font-bold text-on-surface-variant block ml-1">
                Konfirmasi Kata Sandi Baru
              </label>
              <div
                className={`relative transition-all duration-200 rounded-xl border-2 bg-surface-container-low overflow-hidden ${
                  focusedField === "confirmPassword"
                    ? "border-secondary scale-[1.01] ring-4 ring-secondary/10"
                    : "border-surface-container-highest"
                }`}
              >
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                  lock_reset
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Ulangi rahasia barumu..."
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedField("confirmPassword")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-12 py-4 font-sans text-sm bg-transparent outline-none border-none focus:ring-0"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="text-error text-sm font-bold text-center mt-2">
                {errorMsg}
              </div>
            )}

            <Button type="submit" variant="primary" disabled={isSubmitting} className="mt-4">
              {isSubmitting ? "Menyimpan..." : "Simpan Password Baru"}
            </Button>
          </form>
        )}
      </Card>

      {/* Back to Login Link */}
      <div className="mt-6 text-center">
        <p className="font-label text-sm font-bold text-on-surface-variant">
          Batal dan ingin masuk?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-primary hover:underline cursor-pointer font-extrabold"
          >
            Masuk di sini
          </span>
        </p>
      </div>
    </main>
  );
}
