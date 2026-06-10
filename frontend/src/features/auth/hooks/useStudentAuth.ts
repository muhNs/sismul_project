import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "../api/studentApi";
import { LoginInput, RegisterInput } from "../types/studentAuth.schema";

// Hook untuk Login Siswa
export const useStudentLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginInput) => loginUser(data),
    onSuccess: () => {
      router.push("/home"); // Redirect ke dashboard siswa
      router.refresh();
    },
  });
};

// Hook untuk Register Siswa
export const useStudentRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterInput) => registerUser(data),
    onSuccess: () => {
      router.push("/login"); // Ke halaman login setelah daftar
    },
  });
};