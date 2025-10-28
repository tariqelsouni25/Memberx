/**
 * Client-side admin guard hook
 * Use in Client Components to check authentication and permissions
 */

'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Role } from '@prisma/client';
import { canAccessAdmin, hasPermission, Permission } from '@/lib/admin/permissions';

export function useAdminGuard(requiredPermissions?: Permission[]) {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session?.user) {
      router.push('/auth/signin?callbackUrl=/admin');
      return;
    }
    
    const userRole = session.user.role as Role;
    
    if (!canAccessAdmin(userRole)) {
      router.push('/');
      return;
    }
    
    // Check specific permissions if required
    if (requiredPermissions && requiredPermissions.length > 0) {
      const hasRequired = requiredPermissions.some(p => hasPermission(userRole, p));
      if (!hasRequired) {
        router.push('/admin');
      }
    }
  }, [session, status, router, requiredPermissions]);
  
  return {
    user: session?.user,
    role: session?.user?.role as Role,
    isLoading: status === 'loading',
    isAuthenticated: !!session?.user,
    canAccess: session?.user && canAccessAdmin(session.user.role as Role),
  };
}

export function usePermission(permission: Permission) {
  const { data: session } = useSession();
  
  if (!session?.user) return false;
  
  const userRole = session.user.role as Role;
  return hasPermission(userRole, permission);
}

export function useHasAnyPermission(permissions: Permission[]) {
  const { data: session } = useSession();
  
  if (!session?.user) return false;
  
  const userRole = session.user.role as Role;
  return permissions.some(p => hasPermission(userRole, p));
}

