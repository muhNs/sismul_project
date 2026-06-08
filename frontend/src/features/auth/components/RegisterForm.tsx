"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mascot } from "@/components/ui/Mascot";
import { AuthField } from "./AuthField";
import { registerUser } from "@/features/auth/api/registerUser";

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "processing" | "success">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitState("processing");

    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("full_name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await registerUser({ name, email, password });
      setSubmitState("success");
      setTimeout(() => router.push("/login"), 1000);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || "Pendaftaran gagal. Silakan coba lagi.");
      setSubmitState("idle");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#faf9f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "var(--font-plus-jakarta, sans-serif)",
      }}
    >
      {/* Ambient blobs */}
      <div
        style={{
          position: "absolute", top: -60, left: -80, width: 280, height: 280,
          borderRadius: "50%", background: "#87fe45", filter: "blur(60px)",
          opacity: 0.25, zIndex: 0, pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute", bottom: "5%", right: -60, width: 240, height: 240,
          borderRadius: "50%", background: "#2fb8ff", filter: "blur(60px)",
          opacity: 0.2, zIndex: 0, pointerEvents: "none",
        }}
      />

      <div style={{ width: "100%", maxWidth: 400, position: "relative", zIndex: 1 }}>
        {/* Mascot */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div style={{ position: "relative", width: 160, height: 160, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Mascot expression="grad" size="lg" className="drop-shadow-xl" />
          </div>
        </div>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h1
            style={{ fontSize: 30, fontWeight: 800, color: "#2b6c00", margin: 0, marginBottom: 6, lineHeight: 1.2 }}
          >
            Daftar Akun Baru
          </h1>
          <p style={{ fontSize: 14, color: "#6f7b64", margin: 0 }}>
            Ayo mulai petualangan belajarmu sekarang!
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            backgroundColor: "#ffffff", borderRadius: 24, border: "2px solid #e3e2e2",
            boxShadow: "0 6px 0 #c8c6c6", padding: "28px 24px",
          }}
        >
          <form style={{ display: "flex", flexDirection: "column", gap: 16 }} onSubmit={handleSubmit}>
            {errorMsg && (
              <div style={{ color: "red", fontSize: 14, textAlign: "center", fontWeight: "bold" }}>
                {errorMsg}
              </div>
            )}
            <AuthField
              id="full_name" label="Nama Lengkap" icon="person" type="text"
              placeholder="Masukkan nama lengkap" focused={focusedField === "fullName"}
              onFocus={() => setFocusedField("fullName")} onBlur={() => setFocusedField(null)}
            />
            <AuthField
              id="username" label="Nama Pengguna" icon="alternate_email" type="text"
              placeholder="Pilih username unik" focused={focusedField === "username"}
              onFocus={() => setFocusedField("username")} onBlur={() => setFocusedField(null)}
            />
            <AuthField
              id="email" label="Email" icon="mail" type="email"
              placeholder="contoh@email.com" focused={focusedField === "email"}
              onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)}
            />

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#1a1c1c", marginBottom: 6, marginLeft: 4 }}
              >
                Kata Sandi
              </label>
              <div
                style={{
                  position: "relative", display: "flex", alignItems: "center",
                  transition: "transform 0.2s",
                  transform: focusedField === "password" ? "scale(1.01)" : "scale(1)",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#6f7b64", fontSize: 20, userSelect: "none", pointerEvents: "none" }}
                >
                  lock
                </span>
                <input
                  id="password" name="password" type={showPassword ? "text" : "password"} required
                  placeholder="Minimal 8 karakter"
                  onFocus={() => setFocusedField("password")} onBlur={() => setFocusedField(null)}
                  style={{
                    width: "100%", paddingTop: 14, paddingBottom: 14, paddingLeft: 48, paddingRight: 48,
                    backgroundColor: "#ffffff",
                    border: `2px solid ${focusedField === "password" ? "#2b6c00" : "#e3e2e2"}`,
                    borderBottom: `4px solid ${focusedField === "password" ? "#2b6c00" : "#e3e2e2"}`,
                    borderRadius: 12, fontSize: 14, fontWeight: 500, color: "#1a1c1c",
                    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
                  }}
                />
                <button
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#6f7b64", padding: 0, display: "flex", alignItems: "center" }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            {submitState === "idle" && (
              <button
                type="submit"
                style={{
                  width: "100%", padding: "15px 24px", backgroundColor: "#58cc02", color: "#ffffff",
                  fontSize: 16, fontWeight: 800, borderRadius: 16, border: "none",
                  borderBottom: "4px solid #46a302", cursor: "pointer", display: "flex",
                  alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8,
                  transition: "all 0.1s", position: "relative", overflow: "hidden",
                }}
                onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(3px)"; (e.currentTarget as HTMLButtonElement).style.borderBottomWidth = "1px"; }}
                onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.borderBottomWidth = "4px"; }}
              >
                Daftar Sekarang
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span>
              </button>
            )}
            {submitState === "processing" && (
              <button disabled style={{ width: "100%", padding: "15px 24px", backgroundColor: "#58cc02", color: "#ffffff", fontSize: 16, fontWeight: 800, borderRadius: 16, border: "none", borderBottom: "4px solid #46a302", opacity: 0.8, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8, cursor: "not-allowed" }}>
                <span className="material-symbols-outlined animate-spin" style={{ fontSize: 20 }}>progress_activity</span>
                Memproses...
              </button>
            )}
            {submitState === "success" && (
              <button disabled style={{ width: "100%", padding: "15px 24px", backgroundColor: "#006590", color: "#ffffff", fontSize: 16, fontWeight: 800, borderRadius: 16, border: "none", borderBottom: "4px solid #004c6e", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>check_circle</span>
                Berhasil!
              </button>
            )}
          </form>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <p style={{ fontSize: 14, color: "#6f7b64", margin: 0 }}>
            Sudah punya akun?{" "}
            <a onClick={() => router.push("/login")} style={{ color: "#2b6c00", fontWeight: 700, cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
              Masuk <span className="material-symbols-outlined" style={{ fontSize: 18 }}>login</span>
            </a>
          </p>
        </div>
        <div style={{ marginTop: 16, textAlign: "center", padding: "0 8px" }}>
          <p style={{ fontSize: 10, color: "#becbb1", lineHeight: 1.6, margin: 0 }}>
            Dengan mendaftar, kamu menyetujui{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer" }}>Ketentuan Layanan</span> dan{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer" }}>Kebijakan Privasi</span> kami.
          </p>
        </div>
      </div>
    </div>
  );
}
