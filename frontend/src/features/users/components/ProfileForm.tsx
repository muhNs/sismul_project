"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/lib/store";
import api from "@/lib/axios";

export function ProfileForm() {
  const user = useStore((state) => state.user);
  const setAuth = useStore((state) => state.setAuth);

  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

  // Profile Tab States
  const [name, setName] = useState(user?.name || "");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Security Tab States
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEditingSecurity, setIsEditingSecurity] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!name || name.trim().length < 3) {
        showToast("Nama minimal 3 karakter.", "error");
        setIsSubmitting(false);
        return;
      }

      if (name === user?.name) {
        showToast("Tidak ada perubahan data.", "error");
        setIsEditingProfile(false);
        setIsSubmitting(false);
        return;
      }

      const res = await api.put("/api/v1/users/profile", { name });
      const updatedUser = res.data.data || res.data;

      if (user) {
        setAuth({ ...user, ...updatedUser });
      }

      setIsEditingProfile(false);
      showToast("Profil berhasil diperbarui!");
    } catch (err: any) {
      showToast(err.response?.data?.message || "Gagal memperbarui profil.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      showToast("Password saat ini wajib diisi.", "error");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      showToast("Password baru minimal 6 karakter.", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast("Konfirmasi password baru tidak cocok.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      await api.put("/api/v1/users/change-password", {
        currentPassword,
        newPassword,
        confirmPassword
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsEditingSecurity(false);
      showToast("Kata sandi berhasil diperbarui!");
    } catch (err: any) {
      showToast(err.response?.data?.message || "Gagal mengubah kata sandi.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelProfile = () => {
    setName(user?.name || "");
    setIsEditingProfile(false);
  };

  const handleCancelSecurity = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsEditingSecurity(false);
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

      {/* Tab Navigation */}
      <div className="flex border-b-2 border-outline-variant mb-6 select-none">
        <button
          type="button"
          onClick={() => {
            if (!isSubmitting) setActiveTab("profile");
          }}
          className={`flex-1 py-3 text-center font-display text-sm font-bold border-b-4 -mb-[2px] transition-all flex items-center justify-center gap-2 ${
            activeTab === "profile"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">person</span>
          Profil Saya
        </button>
        <button
          type="button"
          onClick={() => {
            if (!isSubmitting) setActiveTab("security");
          }}
          className={`flex-1 py-3 text-center font-display text-sm font-bold border-b-4 -mb-[2px] transition-all flex items-center justify-center gap-2 ${
            activeTab === "security"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">security</span>
          Keamanan & Sandi
        </button>
      </div>

      {/* Profile Form Tab */}
      {activeTab === "profile" && (
        <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4 mb-8">
          <Card variant="surface" className="p-4 bg-white shadow-[0_4px_0_#e3e2e2]">
            <label className="font-label text-xs font-bold text-on-surface-variant block mb-1 uppercase tracking-wider">
              NAMA PENGGUNA
            </label>
            <div className="flex justify-between items-center group">
              {isEditingProfile ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                  className="font-display text-lg font-bold text-on-surface bg-transparent border-b-2 border-primary focus:outline-none w-full mr-2"
                />
              ) : (
                <span className="font-display text-lg font-bold text-on-surface">{name || user?.name}</span>
              )}
              <span className="material-symbols-outlined text-primary-container opacity-0 group-hover:opacity-100 transition-opacity">
                {isEditingProfile ? "edit" : "chevron_right"}
              </span>
            </div>
          </Card>

          <Card variant="surface" className="p-4 bg-white shadow-[0_4px_0_#e3e2e2] opacity-70">
            <label className="font-label text-xs font-bold text-on-surface-variant block mb-1 tracking-wider">
              EMAIL
            </label>
            <div className="flex justify-between items-center group">
              <span className="font-sans text-sm font-bold text-on-surface">{user?.email}</span>
              <span className="material-symbols-outlined text-on-surface-variant">
                lock
              </span>
            </div>
          </Card>

          {isEditingProfile ? (
            <div className="flex gap-2 justify-end mt-2">
              <Button type="button" variant="outline" onClick={handleCancelProfile} disabled={isSubmitting}>
                BATAL
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? "MENYIMPAN..." : "SIMPAN"}
              </Button>
            </div>
          ) : (
            <div className="flex justify-end mt-2">
              <Button type="button" variant="secondary" onClick={() => setIsEditingProfile(true)}>
                EDIT PROFIL
              </Button>
            </div>
          )}
        </form>
      )}

      {/* Security Form Tab */}
      {activeTab === "security" && (
        <form onSubmit={handleChangePassword} className="flex flex-col gap-4 mb-8">
          {isEditingSecurity ? (
            <>
              {/* Current Password */}
              <Card variant="surface" className="p-4 bg-white shadow-[0_4px_0_#e3e2e2] flex flex-col gap-1">
                <label className="font-label text-xs font-bold text-on-surface-variant block uppercase tracking-wider">
                  KATA SANDI SAAT INI
                </label>
                <div className="flex items-center gap-3 relative">
                  <span className="material-symbols-outlined text-outline">lock</span>
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Masukkan sandi saat ini..."
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    disabled={isSubmitting}
                    className="font-sans text-sm bg-transparent border-b-2 border-primary focus:outline-none w-full py-1 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-2 text-outline hover:text-on-surface transition-colors cursor-pointer flex items-center"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showCurrentPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </Card>

              {/* New Password */}
              <Card variant="surface" className="p-4 bg-white shadow-[0_4px_0_#e3e2e2] flex flex-col gap-1">
                <label className="font-label text-xs font-bold text-on-surface-variant block uppercase tracking-wider">
                  KATA SANDI BARU
                </label>
                <div className="flex items-center gap-3 relative">
                  <span className="material-symbols-outlined text-outline">key</span>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Minimal 6 karakter..."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={isSubmitting}
                    className="font-sans text-sm bg-transparent border-b-2 border-primary focus:outline-none w-full py-1 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2 text-outline hover:text-on-surface transition-colors cursor-pointer flex items-center"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showNewPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </Card>

              {/* Confirm New Password */}
              <Card variant="surface" className="p-4 bg-white shadow-[0_4px_0_#e3e2e2] flex flex-col gap-1">
                <label className="font-label text-xs font-bold text-on-surface-variant block uppercase tracking-wider">
                  KONFIRMASI KATA SANDI BARU
                </label>
                <div className="flex items-center gap-3 relative">
                  <span className="material-symbols-outlined text-outline">lock_reset</span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Ulangi sandi baru..."
                    value={confirmPassword}
                    onChange={(e) => confirmPassword !== undefined && setConfirmPassword(e.target.value)}
                    disabled={isSubmitting}
                    className="font-sans text-sm bg-transparent border-b-2 border-primary focus:outline-none w-full py-1 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 text-outline hover:text-on-surface transition-colors cursor-pointer flex items-center"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showConfirmPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </Card>

              <div className="flex gap-2 justify-end mt-2">
                <Button type="button" variant="outline" onClick={handleCancelSecurity} disabled={isSubmitting}>
                  BATAL
                </Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? "MENYIMPAN..." : "SIMPAN"}
                </Button>
              </div>
            </>
          ) : (
            <>
              <Card variant="surface" className="p-4 bg-white shadow-[0_4px_0_#e3e2e2] flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-container/20 rounded-lg flex items-center justify-center border-2 border-primary-container text-primary">
                  <span className="material-symbols-outlined">key</span>
                </div>
                <div className="flex-1">
                  <p className="font-display text-sm font-bold text-on-surface">Ubah Kata Sandi</p>
                  <p className="text-xs text-on-surface-variant font-sans">
                    Amankan akun Anda dengan mengganti kata sandi secara berkala.
                  </p>
                </div>
              </Card>

              <div className="flex justify-end mt-2">
                <Button type="button" variant="secondary" onClick={() => setIsEditingSecurity(true)}>
                  UBAH SANDI
                </Button>
              </div>
            </>
          )}
        </form>
      )}
    </>
  );
}
