import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/logoutApi";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // 1. Bersihkan seluruh cache agar data admin lama tidak tertinggal
      queryClient.clear();
      
      // 2. Arahkan user kembali ke halaman login
      router.push("/admin/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      // Opsional: Tampilkan toast error di sini
    }
  });
};