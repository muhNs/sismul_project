import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { AppJwtPayload } from '../types/express';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_development';
const JWT_EXPIRES_IN = '15m'; // Access token umur pendek (15 menit)

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateAccessToken = (payload: AppJwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyAccessToken = (token: string): AppJwtPayload => {
  return jwt.verify(token, JWT_SECRET) as AppJwtPayload;
};

// Menghasilkan string acak yang aman (Opaque Token) untuk Refresh Token
export const generateRefreshTokenString = (): string => {
  return crypto.randomBytes(40).toString('hex');
};