import api from "@/lib/axios";

export const registerUser = async (data: { name: string; email: string; password: string }) => {
  const response = await api.post("/api/v1/auth/register", data);
  return response.data;
};
