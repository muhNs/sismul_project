import { User } from '../../../generated/prisma/client';
import bcrypt from 'bcrypt';
import { prisma } from '../../shared/prisma';

export const getAllUsers = async () => {
  return prisma.user.findMany({
    where: { deleted_at: null },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      created_at: true,
    },
  });
};

export const getUserById = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId, deleted_at: null },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      created_at: true,
    },
  });
  if (!user) {
    throw new Error('User tidak ditemukan');
  }
  return user;
};

export const updateUserProfile = async (userId: number, data: { name?: string; password?: string }) => {
  const updateData: any = {};
  if (data.name) {
    updateData.name = data.name;
  }
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
  return user;
};

export const deleteUser = async (userId: number) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { deleted_at: new Date() },
  });
  return user;
};

export const createUser = async (data: any) => {
  // Cek apakah email sudah terdaftar
  const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
  if (existingUser) throw new Error('Email sudah digunakan');

  const hashedPassword = await bcrypt.hash(data.password, 10);
  
  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
    select: { id: true, name: true, email: true, role: true, created_at: true },
  });
};

// Tambahkan fungsi updateUserById (Khusus Admin)
export const updateUserById = async (userId: number, data: any) => {
  const updateData: any = { ...data };
  
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  // Jika admin mencoba mengubah email, pastikan tidak bentrok dengan email lain
  if (data.email) {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser && existingUser.id !== userId) {
      throw new Error('Email sudah digunakan oleh user lain');
    }
  }

  return prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: { id: true, name: true, email: true, role: true },
  });
};