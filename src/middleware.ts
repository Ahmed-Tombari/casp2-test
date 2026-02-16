import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect Admin Routes
  if (pathname.includes('/admin')) {
    const cookie = request.cookies.get('session')?.value
    const session = await decrypt(cookie || '')
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(ar|fr|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};

