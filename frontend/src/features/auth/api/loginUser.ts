import api from "@/lib/axios";
import { LoginCredentials, AuthResponse } from "../types/auth.type";

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post('/api/v1/auth/login', credentials);
  return response.data;
};
