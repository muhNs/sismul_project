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

  return {
    accessToken,
    refreshToken: refreshTokenStr,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
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
      points: true,
      diamonds: true,
      avatar: true,
      deleted_at: true,
    }
  });

  if (!user || user.deleted_at) throw new Error("User tidak ditemukan");
  return user;
};