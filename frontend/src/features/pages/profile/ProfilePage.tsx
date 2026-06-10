"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileForm } from "@/features/users/components/ProfileForm";
import { useStore } from "@/lib/store";
import api from "@/lib/axios";

export default function ProfilePage() {
  const router = useRouter();
  const logout = useStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await api.post("/api/v1/auth/logout");
    } catch (err) {
      console.error("Gagal logout di backend:", err);
    } finally {
      logout();
      router.push("/login");
    }
  };

  return (
    <>
      <Header title="Learnly" showBack={false} />
      <main className="pt-24 pb-28 px-margin-mobile max-w-[800px] mx-auto w-full flex-grow">
        <ProfileHeader />
        <ProfileForm />

        <section className="mt-8">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-error text-error shadow-[0_4px_0_#ba1a1a] active:shadow-[0_0px_0_#ba1a1a] hover:bg-red-50"
          >
            KELUAR AKUN
          </Button>
        </section>
      </main>
      <Navbar />
    </>
  );
}
