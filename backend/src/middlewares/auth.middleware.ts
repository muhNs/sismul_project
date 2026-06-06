import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../shared/auth.utils';
import { Role } from "../../generated/prisma/client";

// Middleware Autentikasi (Cek Login)
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Mengambil token dari Cookie
    const token = req.cookies?.accessToken;
    
    if (!token) {
      return res.status(401).json({ status: 'error', message: 'Akses ditolak. Token tidak ditemukan.' });
    }

    const decoded = verifyAccessToken(token);
    req.user = decoded; // Memasukkan payload ke req.user
    
    next();
  } catch (error) {
    return res.status(401).json({ status: 'error', message: 'Token tidak valid atau sudah kadaluarsa.' });
  }
};

// Middleware Otorisasi (Cek Role)
export const authorize = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        status: 'error', 
        message: 'Akses ditolak. Anda tidak memiliki izin untuk resource ini.' 
      });
    }
    next();
  };
};