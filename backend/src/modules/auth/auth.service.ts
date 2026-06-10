import { prisma } from "../../../lib/prisma";
import {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshTokenString,
} from "../../shared/auth.utils";
import { Role } from "../../../generated/prisma/client";

export const registerService = async (data: any) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingUser) throw new Error("Email sudah terdaftar");

  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: Role.STUDENT, // Default register selalu STUDENT
    },
  });

  return user;
};

export const loginService = async (data: any) => {
  const user = await prisma.user.findUnique({ 
    where: { email: data.email } 
  });
  
  if (!user || user.deleted_at) throw new Error("Email atau password salah");

  const isValidPassword = await comparePassword(data.password, user.password);
  if (!isValidPassword) throw new Error("Email atau password salah");

  // Generate Tokens
  const accessToken = generateAccessToken({
    userId: user.id,
    role: user.role,
  });
  const refreshTokenStr = generateRefreshTokenString();

  // Simpan Refresh Token ke Database (Expired dalam 7 hari)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await prisma.refreshToken.create({
    data: {
      user_id: user.id,
      refreshToken: refreshTokenStr,
      exp: expiresAt,
    },
  });

  // Hitung total poin
  const scoreSum = await prisma.studentScore.aggregate({
    where: { user_id: user.id },
    _sum: { score: true }
  });

  return {
    accessToken,
    refreshToken: refreshTokenStr,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      points: scoreSum._sum.score || 0,
    },
  };
};

export const refreshTokenService = async (oldRefreshToken: string) => {
  // Cari token di DB
  const tokenRecord = await prisma.refreshToken.findUnique({
    where: { refreshToken: oldRefreshToken },
    include: { user: true },
  });

  if (!tokenRecord) throw new Error("Refresh token tidak valid");
  if (new Date() > tokenRecord.exp) {
    // Hapus token yang sudah expired dari DB
    await prisma.refreshToken.delete({ where: { id: tokenRecord.id } });
    throw new Error("Refresh token sudah kadaluarsa. Silakan login kembali.");
  }

  // Buat Access Token Baru
  const newAccessToken = generateAccessToken({
    userId: tokenRecord.user.id,
    role: tokenRecord.user.role,
  });
  
  return newAccessToken;
};

export const logoutService = async (refreshToken: string) => {
  // Hapus refresh token dari Database
  await prisma.refreshToken.update({
    where: { refreshToken },
    data: { deleted_at: new Date() },
  });
};

export const getMeService = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      deleted_at: true,
    }
  });

  if (!user || user.deleted_at) throw new Error("User tidak ditemukan");

  // Hitung total poin
  const scoreSum = await prisma.studentScore.aggregate({
    where: { user_id: userId },
    _sum: { score: true }
  });

  return {
    ...user,
    points: scoreSum._sum.score || 0,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`
  };
};

// In-memory token store for forgot password flow
const resetTokens = new Map<string, { email: string; expires: number }>();

export const forgotPasswordService = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user || user.deleted_at) {
    throw new Error("User dengan email tersebut tidak ditemukan");
  }

  // Generate 6-digit verification code
  const token = Math.floor(100000 + Math.random() * 900000).toString();
  // Token expires in 15 minutes
  const expires = Date.now() + 15 * 60 * 1000;

  resetTokens.set(token, { email, expires });

  // Log to console for backend debugging/demo
  console.log(`\n=============================================`);
  console.log(`[RESET PASSWORD REQUEST]`);
  console.log(`Email: ${email}`);
  console.log(`Token: ${token}`);
  console.log(`Expires: ${new Date(expires).toLocaleTimeString()}`);
  console.log(`=============================================\n`);

  return token;
};

export const resetPasswordService = async (token: string, newPassword: string) => {
  const tokenData = resetTokens.get(token);

  if (!tokenData) {
    throw new Error("Token tidak valid atau sudah kadaluarsa");
  }

  if (Date.now() > tokenData.expires) {
    resetTokens.delete(token);
    throw new Error("Token sudah kadaluarsa. Silakan ajukan ulang.");
  }

  // Hash new password
  const hashedPassword = await hashPassword(newPassword);

  // Update password in DB
  await prisma.user.update({
    where: { email: tokenData.email },
    data: { password: hashedPassword }
  });

  // Remove used token
  resetTokens.delete(token);
};