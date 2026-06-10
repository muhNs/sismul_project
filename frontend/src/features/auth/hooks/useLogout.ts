import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/logoutApi";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // 1. Bersihkan seluruh cache agar data admin lama tidak tertinggal
      queryClient.clear();

      // 2. Bersihkan Zustand store dan localStorage
      useStore.getState().logout();
      if (typeof window !== "undefined") {
        localStorage.removeItem("userRole");
      }
      
      // 3. Arahkan user kembali ke halaman login
      router.push("/admin/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      // Opsional: Tampilkan toast error di sini
    }
  });
};