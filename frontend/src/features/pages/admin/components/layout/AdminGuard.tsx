"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAdminStore } from "@/lib/adminStore";

export const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const user = useAdminStore((state) => state.adminUser);
  const hasHydrated = useAdminStore((state) => state._hasHydrated);

  useEffect(() => {
    // Tunggu sampai Zustand selesai membaca data dari localStorage
    // Tanpa ini, tab baru selalu redirect ke login karena user masih null saat pertama render
    if (!hasHydrated) return;

    const role = user?.role;

    // Jika sudah login sebagai admin dan mencoba buka halaman login, redirect ke dashboard
    if (pathname === "/admin/login") {
      if (role === "ADMIN" || role === "TEACHER") {
        router.replace("/admin");
      } else {
        setIsAuthorized(true); // Belum login, boleh lihat halaman login
      }
      return;
    }

    // Jika belum login sebagai admin, lempar ke halaman login admin
    if (!role) {
      router.replace("/admin/login");
    }
    // Jika role ADMIN atau TEACHER, izinkan akses
    else if (role === "ADMIN" || role === "TEACHER") {
      setIsAuthorized(true);
    } else {
      router.replace("/admin/login");
    }
  }, [router, pathname, user, hasHydrated]);

  // Selama belum terhidrasi atau belum terotorisasi, tampilkan loading
  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-surface">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-on-surface-variant font-medium animate-pulse">Memverifikasi otorisasi sesi...</p>
      </div>
    );
  }

  return <>{children}</>;
};
