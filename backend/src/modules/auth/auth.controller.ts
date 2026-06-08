import { Request, Response } from 'express';
import { loginService, refreshTokenService, registerService, logoutService, getMeService } from './auth.service';
import { registerSchema, loginSchema } from './auth.schema';
import { setAuthCookies, clearAuthCookies } from '../../shared/cookie.utils';
import { ZodError } from 'zod';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const validatedData = registerSchema.parse(req.body);
      const user = await registerService(validatedData);
      res.status(201).json({ status: 'success', data: user });
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({ status: 'error', message: error.issues.map(i => i.message).join(', ') });
      }
      res.status(400).json({ status: 'error', message: error.message || 'Validasi gagal' });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const validatedData = loginSchema.parse(req.body);
      const { accessToken, refreshToken, user } = await loginService(validatedData);

      // Set cookie menggunakan library yang sudah kita buat
      setAuthCookies(res, accessToken, refreshToken);

      res.status(200).json({ status: 'success', message: 'Login berhasil', data: user });
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({ status: 'error', message: error.issues.map(i => i.message).join(', ') });
      }
      res.status(401).json({ status: 'error', message: error.message });
    }
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) return res.status(401).json({ status: 'error', message: 'Refresh token tidak ditemukan di cookie' });

      const newAccessToken = await refreshTokenService(refreshToken);

      // Set cookie hanya untuk access token yang baru (Refresh token tetap sama)
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000,
      });

      res.status(200).json({ status: 'success', message: 'Access Token berhasil diperbarui' });
    } catch (error: any) {
      clearAuthCookies(res); // Jika gagal/expired, paksa hapus cookie agar user login ulang
      res.status(401).json({ status: 'error', message: error.message });
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;
      if (refreshToken) {
        await logoutService(refreshToken);
      }
      clearAuthCookies(res);
      res.status(200).json({ status: 'success', message: 'Logout berhasil' });
    } catch (error: any) {
      res.status(500).json({ status: 'error', message: 'Gagal melakukan logout' });
    }
  }

  static async getMe(req: Request, res: Response) {
    try {
      const user = await getMeService(req.user.userId);
      res.status(200).json({ status: 'success', data: user });
    } catch (error: any) {
      res.status(404).json({ status: 'error', message: error.message });
    }
  }
}