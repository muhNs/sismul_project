import { Request, Response } from 'express';
import * as userService from './users.service';
import { updateProfileSchema, createUserSchema, updateUserSchema } from './users.schema';
import { ZodError } from 'zod';

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ status: 'success', data: users });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getProfileController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'User belum login' });
    }
    const user = await userService.getUserById(userId);
    res.status(200).json({ status: 'success', data: user });
  } catch (error: any) {
    res.status(404).json({ status: 'error', message: error.message });
  }
};

export const updateProfileController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'User belum login' });
    }
    const parsedData = updateProfileSchema.parse(req.body);
    const updatedUser = await userService.updateUserProfile(userId, parsedData);
    res.status(200).json({ status: 'success', message: 'Profil berhasil diperbarui', data: updatedUser });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ status: 'error', message: error.issues });
    }
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id as string, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ status: 'error', message: 'ID tidak valid' });
    }
    await userService.deleteUser(userId);
    res.status(200).json({ status: 'success', message: 'User berhasil dihapus' });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const parsedData = createUserSchema.parse(req.body);
    const newUser = await userService.createUser(parsedData);
    res.status(201).json({ status: 'success', message: 'User berhasil dibuat', data: newUser });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ status: 'error', message: error.issues });
    }
    res.status(error.message === 'Email sudah digunakan' ? 409 : 500).json({ status: 'error', message: error.message });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id as string, 10);
    if (isNaN(userId)) return res.status(400).json({ status: 'error', message: 'ID tidak valid' });

    const parsedData = updateUserSchema.parse(req.body);
    const updatedUser = await userService.updateUserById(userId, parsedData);
    
    res.status(200).json({ status: 'success', message: 'Data user berhasil diperbarui', data: updatedUser });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ status: 'error', message: error.issues });
    }
    res.status(error.message.includes('digunakan') ? 409 : 500).json({ status: 'error', message: error.message });
  }
};