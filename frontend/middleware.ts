import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // TODO: Integrasikan dengan pengecekan token JWT/Cookie sesungguhnya dari backend
  // Untuk sementara (UI/UX phase), kita anggap kita bisa membaca role dari cookies
  // const role = request.cookies.get('user_role')?.value;
  
  // Dummy check: Jika user mengakses /admin tapi bukan admin, redirect ke /home
  // (Saat ini di-comment agar Anda bisa test UI dengan bebas,
  // silakan uncomment saat integrasi dengan API backend)
  
  /*
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginRoute = request.nextUrl.pathname.startsWith('/admin/login');
  
  if (isAdminRoute && !isLoginRoute) {
    if (role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  }
  */

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
