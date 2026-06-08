export interface LoginCredentials {
  username?: string;
  email?: string;
  password?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  points?: number;
  level?: number;
  streak?: number;
  avatar?: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  data: User;
}
