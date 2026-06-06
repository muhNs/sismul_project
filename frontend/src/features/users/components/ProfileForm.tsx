"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { dummyUser } from "@/lib/dummy-data";

export function ProfileForm() {
  const [name, setName] = useState(dummyUser.name);
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
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
            <span className="font-display text-lg font-bold text-on-surface">{name}</span>
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
          <span className="font-sans text-sm font-bold text-on-surface">{dummyUser.email}</span>
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
                placeholder="Masukkan sandi baru"
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
          <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
            BATAL
          </Button>
          <Button type="submit" variant="primary">
            SIMPAN
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
  );
}
