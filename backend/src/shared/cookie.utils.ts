import { Response, CookieOptions } from 'express';

// Opsi standar untuk keamanan Cookie
const cookieOptions: CookieOptions = {
  httpOnly: true, // Mencegah akses cookie dari JavaScript browser (Anti XSS)
  secure: process.env.NODE_ENV === 'production', // Wajib HTTPS di mode Production
  sameSite: 'lax', // Mencegah serangan CSRF namun mengizinkan navigasi cross-origin
};

export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
  // Access Token: kadaluarsa dalam 15 menit
  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000, 
  });

  // Refresh Token: kadaluarsa dalam 7 hari
  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  });
};

export const clearAuthCookies = (res: Response) => {
  res.clearCookie('accessToken', cookieOptions);
  res.clearCookie('refreshToken', cookieOptions);
};