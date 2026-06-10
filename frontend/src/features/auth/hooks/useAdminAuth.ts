import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginAdmin } from "../api/adminApi";
import { AdminLoginInput } from "../types/adminAuth.schema";

export const useAdminAuth = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: AdminLoginInput) => loginAdmin(data),
    onSuccess: () => {
      // Redirect ke dashboard admin setelah login sukses
      router.push("/admin/dashboard");
      router.refresh(); // Pastikan session di server sinkron
    },
    onError: (error: any) => {
      console.error("Admin Login Failed:", error.response?.data?.message);
    },
  });
};