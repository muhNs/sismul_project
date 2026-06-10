import { publicApi, privateApi } from "@/lib/axios";
import { AdminLoginInput } from "../types/adminAuth.schema";

// Login Admin menggunakan publicApi
export const loginAdmin = (data: AdminLoginInput) => publicApi.post("/auth/login", data);

// Logout Admin menggunakan privateApi
export const logoutAdmin = () => privateApi.post("/auth/logout");