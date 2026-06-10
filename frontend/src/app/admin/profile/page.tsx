"use client";

import React from "react";
import { ProfileForm } from "@/features/users/components/ProfileForm";

export default function AdminProfilePage() {
  return (
    <div className="max-w-[600px] mx-auto space-y-6 py-6 px-4">
      <div>
        <h1 className="text-2xl font-black text-on-surface">Profil Saya</h1>
        <p className="text-on-surface-variant text-sm mt-1">
          Ubah nama profil dan kata sandi administrator Anda di bawah ini.
        </p>
      </div>
      <ProfileForm />
    </div>
  );
}
