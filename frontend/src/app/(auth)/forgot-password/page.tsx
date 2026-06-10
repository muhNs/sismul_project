"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import api from "@/lib/axios";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [demoToken, setDemoToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setDemoToken(null);
    setIsSubmitting(true);

    try {
      const response = await api.post("/api/v1/auth/forgot-password", { email });
      if (response.data?.status === "success") {
        setSuccessMsg("Kode reset password telah dikirim!");
        // Capture demo token for development convenience
        if (response.data.data?.token) {
          setDemoToken(response.data.data.token);
        }
      } else {
        setErrorMsg("Gagal memproses permintaan reset password.");
      }
    } catch (err: any) {
      console.warn(err);
      setErrorMsg(err.response?.data?.message || "Terjadi kesalahan. Pastikan email Anda benar.");
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
          <h1 className="font-display text-3xl font-extrabold text-primary mb-1">Lupa Kata Sandi</h1>
          <p className="text-base font-bold text-on-surface-variant max-w-[400px]">
            Masukkan email terdaftar Anda untuk menerima token reset password.
          </p>
        </div>
      </div>

      {/* Auth Container Card */}
      <Card variant="surface" className="w-full p-6 bg-white shadow-[0_4px_0_#e3e2e2] border-2 border-surface-container-highest">
        {!successMsg ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
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
                  placeholder="Masukkan email terdaftar..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-4 font-sans text-sm bg-transparent outline-none border-none focus:ring-0"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="text-error text-sm font-bold text-center mt-2">
                {errorMsg}
              </div>
            )}

            <Button type="submit" variant="primary" disabled={isSubmitting} className="mt-4">
              {isSubmitting ? "Mengirim..." : "Kirim Token Reset"}
            </Button>
          </form>
        ) : (
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 bg-success-container/20 rounded-full flex items-center justify-center border-2 border-primary text-primary mx-auto">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-display text-xl font-bold text-on-surface">Permintaan Berhasil!</h3>
              <p className="text-sm text-on-surface-variant max-w-[400px] mx-auto">
                Silakan periksa log server untuk token keamanan Anda.
              </p>
            </div>

            {demoToken && (
              <div className="p-4 bg-primary-container/20 border-2 border-primary/20 rounded-2xl max-w-[400px] mx-auto">
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                  KODE RESET PASSWORD (DEV MODE)
                </p>
                <p className="font-mono text-3xl font-black text-primary tracking-widest my-2 select-all">
                  {demoToken}
                </p>
                <p className="text-[11px] text-on-surface-variant font-medium">
                  Salin token di atas untuk melengkapi proses reset password.
                </p>
              </div>
            )}

            <div className="pt-4 flex flex-col gap-2">
              <Button 
                onClick={() => router.push("/reset-password")}
                variant="primary"
              >
                Lanjutkan ke Reset Password
              </Button>
              <Button 
                onClick={() => setSuccessMsg(null)}
                variant="outline"
              >
                Kirim Ulang Token
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Back to Login Link */}
      <div className="mt-6 text-center">
        <p className="font-label text-sm font-bold text-on-surface-variant">
          Ingat password Anda?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-primary hover:underline cursor-pointer font-extrabold"
          >
            Masuk kembali
          </span>
        </p>
      </div>
    </main>
  );
}
