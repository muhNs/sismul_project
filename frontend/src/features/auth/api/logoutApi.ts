import api from "@/lib/axios";

export const logout = async () => {
  const response = await api.post("/api/v1/auth/logout");
  return response.data;
};