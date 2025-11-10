import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware if auth is not properly configured
  // This allows the site to load without authentication during initial setup
  if (!process.env.AUTH_SECRET || !process.env.DATABASE_URL) {
    console.warn('Auth not configured. Skipping middleware protection.');
    
    // Block admin/partner routes if auth is not configured
    if (pathname.startsWith('/admin') || pathname.startsWith('/partner') || pathname.startsWith('/account')) {
      return NextResponse.json(
        { error: 'Authentication not configured. Please set AUTH_SECRET and DATABASE_URL environment variables.' },
        { status: 503 }
      );
    }
    
    return NextResponse.next();
  }

  // If auth is configured, use it
  try {
    const { auth } = await import('./auth.config');
    
    // Wrap in auth middleware
    const authMiddleware = auth((req) => {
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

    return authMiddleware(req);
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

