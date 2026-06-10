import { publicApi, privateApi } from "@/lib/axios";
import { LoginInput, RegisterInput } from "../types/studentAuth.schema";

// Login Siswa menggunakan publicApi karena belum ada cookie
export const loginUser = (data: LoginInput) => publicApi.post("/auth/login", data);

// Register Siswa menggunakan publicApi
export const registerUser = (data: RegisterInput) => publicApi.post("/auth/register", data);

// Logout Siswa menggunakan privateApi karena butuh akses ke cookie (refresh token)
export const logoutUser = () => privateApi.post("/auth/logout");