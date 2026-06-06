"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Simulasi proteksi route: mengambil role dari localStorage atau store
    // Jika tidak ada di localStorage, kita default ke null (belum login)
    // Untuk keperluan testing, Anda bisa set localStorage.setItem("userRole", "ADMIN")
    
    const role = typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
    
    // Bypass proteksi jika sedang berada di halaman login admin
    if (pathname === "/admin/login") {
      if (role === "ADMIN" || role === "TEACHER") {
        router.replace("/admin");
      } else if (role === "STUDENT") {
        router.replace("/home");
      } else {
        setIsAuthorized(true);
      }
      return;
    }

    // Jika user mengakses halaman admin, tapi role-nya student, lempar ke /home
    if (role === "STUDENT") {
      router.replace("/home");
    } 
    // Jika user belum login, lempar ke halaman login admin
    else if (!role) {
      router.replace("/admin/login");
    } 
    // Jika role ADMIN atau TEACHER, izinkan akses
    else if (role === "ADMIN" || role === "TEACHER") {
      setIsAuthorized(true);
    } else {
      router.replace("/admin/login");
    }
  }, [router, pathname]);

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
