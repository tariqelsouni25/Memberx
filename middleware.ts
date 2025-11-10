import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple, reliable middleware that doesn't depend on NextAuth
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow all public routes to pass through
  // Protected routes will be handled by page-level authentication
  return NextResponse.next();
}

export const config = {
  // Only match specific paths to minimize middleware overhead
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

