import { auth } from './auth.config';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;

  // Protected routes
  if (pathname.startsWith('/admin')) {
    if (!isLoggedIn || (userRole !== 'ADMIN' && userRole !== 'CONTENT_EDITOR')) {
      return NextResponse.redirect(new URL('/auth/signin?callbackUrl=' + pathname, req.url));
    }
  }

  if (pathname.startsWith('/partner')) {
    if (!isLoggedIn || (userRole !== 'PARTNER' && userRole !== 'ADMIN')) {
      return NextResponse.redirect(new URL('/auth/signin?callbackUrl=' + pathname, req.url));
    }
  }

  if (pathname.startsWith('/account')) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/auth/signin?callbackUrl=' + pathname, req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

