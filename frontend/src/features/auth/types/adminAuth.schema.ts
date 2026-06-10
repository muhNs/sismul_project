import { z } from 'zod';

export const adminLoginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  // Kita tambahkan flag khusus admin agar backend bisa memvalidasi 
  // bahwa request ini memang datang dari login portal admin
  is_admin_portal: z.boolean().default(true), 
}).required();

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;