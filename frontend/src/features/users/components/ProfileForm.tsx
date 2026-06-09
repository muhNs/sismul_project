"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/lib/store";
import api from "@/lib/axios";

export function ProfileForm() {
  const user = useStore((state) => state.user);
  const setAuth = useStore((state) => state.setAuth);

  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload: { name?: string; password?: string } = {};
      if (name && name !== user?.name) payload.name = name;
      if (password) payload.password = password;

      if (Object.keys(payload).length === 0) {
        showToast("Tidak ada perubahan data.", "error");
        setIsEditing(false);
        setIsSubmitting(false);
        return;
      }

      const res = await api.put("/api/v1/users/profile", payload);
      const updatedUser = res.data.data || res.data;

      // Update global store dengan data terbaru dari backend
      if (user) {
        setAuth({ ...user, ...updatedUser });
      }

      setPassword("");
      setIsEditing(false);
      showToast("Profil berhasil diperbarui!");
    } catch (err: any) {
      showToast(err.response?.data?.message || "Gagal memperbarui profil.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setName(user?.name || "");
    setPassword("");
    setIsEditing(false);
  };

  return (
    <>
      {/* Toast */}
      {toastMessage && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full shadow-lg border flex items-center gap-2 ${
            toastMessage.type === "success"
              ? "bg-surface-container-high text-on-surface border-outline-variant"
              : "bg-error-container text-on-error-container border-error/30"
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {toastMessage.type === "success" ? "check_circle" : "error"}
          </span>
          <span className="font-semibold text-sm">{toastMessage.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
        <Card variant="surface" className="p-4 bg-white shadow-[0_4px_0_#e3e2e2]">
          <label className="font-label text-xs font-bold text-on-surface-variant block mb-1 uppercase tracking-wider">
            NAMA PENGGUNA
          </label>
          <div className="flex justify-between items-center group">
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="font-display text-lg font-bold text-on-surface bg-transparent border-b-2 border-primary focus:outline-none w-full mr-2"
              />
            ) : (
              <span className="font-display text-lg font-bold text-on-surface">{name || user?.name}</span>
            )}
            <span className="material-symbols-outlined text-primary-container opacity-0 group-hover:opacity-100 transition-opacity">
              {isEditing ? "edit" : "chevron_right"}
            </span>
          </div>
        </Card>

        <Card variant="surface" className="p-4 bg-white shadow-[0_4px_0_#e3e2e2] opacity-70">
          <label className="font-label text-xs font-bold text-on-surface-variant block mb-1 tracking-wider">
            Email
          </label>
          <div className="flex justify-between items-center group">
            <span className="font-sans text-sm font-bold text-on-surface">{user?.email}</span>
            <span className="material-symbols-outlined text-on-surface-variant">
              lock
            </span>
          </div>
        </Card>

        <Card
          variant="surface"
          className="p-4 bg-white shadow-[0_4px_0_#e3e2e2] flex flex-col gap-2"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-error-container/20 rounded-lg flex items-center justify-center border-2 border-error-container text-error">
              <span className="material-symbols-outlined">key</span>
            </div>
            <div className="flex-1">
              <p className="font-display text-sm font-bold text-on-surface">Kata Sandi</p>
              {isEditing ? (
                <input
                  type="password"
                  placeholder="Masukkan sandi baru (opsional)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="font-sans text-sm mt-1 bg-transparent border-b-2 border-primary focus:outline-none w-full"
                />
              ) : (
                <p className="text-xs text-on-surface-variant font-sans">********</p>
              )}
            </div>
          </div>
        </Card>

        {isEditing ? (
          <div className="flex gap-2 justify-end mt-2">
            <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
              BATAL
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? "MENYIMPAN..." : "SIMPAN"}
            </Button>
          </div>
        ) : (
          <div className="flex justify-end mt-2">
            <Button type="button" variant="secondary" onClick={() => setIsEditing(true)}>
              EDIT PROFIL
            </Button>
          </div>
        )}
      </form>
    </>
  );
}
