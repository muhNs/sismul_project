"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterInput,
} from "@/features/auth/types/studentAuth.schema";
import { useStudentRegister } from "@/features/auth/hooks/useStudentAuth";
import { Mascot } from "@/components/ui/Mascot";
import { AuthField } from "./AuthField";

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Hook Mutasi Register
  const {
    mutate: registerAccount,
    isPending,
    isSuccess,
    error,
  } = useStudentRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterInput) => {
    registerAccount(data);
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
      }}
    >
      {/* Ambient blobs tetap sama */}

      <div
        style={{
          width: "100%",
          maxWidth: 400,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <Mascot expression="grad" size="lg" className="drop-shadow-xl" />
        </div>

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: "#2b6c00" }}>
            Daftar Akun Baru
          </h1>
          <p style={{ fontSize: 14, color: "#6f7b64" }}>
            Ayo mulai petualangan belajarmu sekarang!
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 24,
            border: "2px solid #e3e2e2",
            boxShadow: "0 6px 0 #c8c6c6",
            padding: "28px 24px",
          }}
        >
          <form
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Error Message dari API */}
            {error && (
              <div
                style={{
                  color: "red",
                  fontSize: 14,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {(error as any)?.response?.data?.message ||
                  "Pendaftaran gagal."}
              </div>
            )}

            <AuthField
              {...register("name")}
              label="Nama Lengkap"
              icon="person"
              type="text"
              placeholder="Masukkan nama"
              focused={focusedField === "name"}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
            />
            {errors.name && (
              <p style={{ color: "red", fontSize: 10 }}>
                {errors.name.message}
              </p>
            )}

            <AuthField
              {...register("email")}
              label="Email"
              icon="mail"
              type="email"
              placeholder="contoh@email.com"
              focused={focusedField === "email"}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
            />
            {errors.email && (
              <p style={{ color: "red", fontSize: 10 }}>
                {errors.email.message}
              </p>
            )}

            {/* Password Field */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#1a1c1c",
                  marginBottom: 6,
                  marginLeft: 4,
                }}
              >
                Kata Sandi
              </label>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimal 6 karakter"
                  className="w-full pl-12 pr-12 py-4 rounded-xl border-2 focus:border-primary outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 14,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              {errors.password && (
                <p style={{ color: "red", fontSize: 10 }}>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button (Menggunakan state dari React Query) */}
            <button
              type="submit"
              disabled={isPending || isSuccess}
              style={{
                width: "100%",
                padding: "15px 24px",
                backgroundColor: isSuccess ? "#006590" : "#58cc02",
                color: "#ffffff",
                fontSize: 16,
                fontWeight: 800,
                borderRadius: 16,
                border: "none",
                cursor: "pointer",
              }}
            >
              {isPending
                ? "Memproses..."
                : isSuccess
                  ? "Berhasil!"
                  : "Daftar Sekarang"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
