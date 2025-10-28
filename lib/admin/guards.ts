/**
 * Admin Guards - Server and Client Side
 * Protect admin routes and check permissions
 */

import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';
import { canAccessAdmin, hasPermission, Permission } from './permissions';

// Mock auth function for now (replace with actual auth when available)
async function auth() {
  // Return mock session for development
  return {
    user: {
      id: '1',
      email: 'admin@demo.local',
      name: 'Admin User',
      role: 'ADMIN' as Role
    }
  };
}

/**
 * Server-side guard for admin pages
 * Use in Server Components and Route Handlers
 */
export async function requireAdmin() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/auth/signin?callbackUrl=/admin');
  }
  
  const userRole = session.user.role as Role;
  
  if (!canAccessAdmin(userRole)) {
    redirect('/');
  }
  
  return { user: session.user, role: userRole };
}

/**
 * Server-side permission check
 */
export async function requirePermission(permission: Permission) {
  const { role } = await requireAdmin();
  
  if (!hasPermission(role, permission)) {
    throw new Error('Insufficient permissions');
  }
}

/**
 * Check multiple permissions (any)
 */
export async function requireAnyPermission(permissions: Permission[]) {
  const { role } = await requireAdmin();
  
  const hasAny = permissions.some(p => hasPermission(role, p));
  
  if (!hasAny) {
    throw new Error('Insufficient permissions');
  }
}

/**
 * Get current admin user
 * Returns null if not authenticated or not admin
 */
export async function getAdminUser() {
  try {
    const session = await auth();
    if (!session?.user) return null;
    
    const userRole = session.user.role as Role;
    if (!canAccessAdmin(userRole)) return null;
    
    return { ...session.user, role: userRole };
  } catch {
    return null;
  }
}

/**
 * Admin guard function that checks permissions
 * This is the main function used in admin pages
 */
export async function adminGuard(requiredPermissions: Permission[] = []) {
  const { role } = await requireAdmin();
  
  if (requiredPermissions.length > 0) {
    const hasAny = requiredPermissions.some(p => hasPermission(role, p));
    if (!hasAny) {
      throw new Error('Insufficient permissions');
    }
  }
  
  return { role };
}

