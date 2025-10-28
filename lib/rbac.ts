import { Role } from '@prisma/client';

export type Permission = 
  | 'view_admin'
  | 'manage_pages'
  | 'publish_content'
  | 'manage_navigation'
  | 'manage_media'
  | 'manage_banners'
  | 'manage_listings'
  | 'approve_listings'
  | 'manage_inventory'
  | 'view_orders'
  | 'manage_orders'
  | 'view_bookings'
  | 'manage_bookings'
  | 'view_vouchers'
  | 'manage_vouchers'
  | 'manage_seo'
  | 'manage_translations'
  | 'manage_theme'
  | 'manage_flags'
  | 'manage_users'
  | 'manage_roles'
  | 'view_audit'
  | 'manage_versions'
  | 'partner_dashboard'
  | 'partner_listings'
  | 'partner_redeem';

const rolePermissions: Record<Role, Permission[]> = {
  ADMIN: [
    'view_admin',
    'manage_pages',
    'publish_content',
    'manage_navigation',
    'manage_media',
    'manage_banners',
    'manage_listings',
    'approve_listings',
    'manage_inventory',
    'view_orders',
    'manage_orders',
    'view_bookings',
    'manage_bookings',
    'view_vouchers',
    'manage_vouchers',
    'manage_seo',
    'manage_translations',
    'manage_theme',
    'manage_flags',
    'manage_users',
    'manage_roles',
    'view_audit',
    'manage_versions',
  ],
  CONTENT_EDITOR: [
    'view_admin',
    'manage_pages',
    'publish_content',
    'manage_navigation',
    'manage_media',
    'manage_banners',
    'manage_listings',
    'manage_seo',
    'manage_translations',
    'view_audit',
  ],
  SUPPORT: [
    'view_admin',
    'view_orders',
    'manage_orders',
    'view_bookings',
    'manage_bookings',
    'view_vouchers',
    'manage_vouchers',
  ],
  PARTNER: [
    'partner_dashboard',
    'partner_listings',
    'partner_redeem',
    'view_bookings',
    'view_vouchers',
  ],
  USER: [],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}

export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some(p => hasPermission(role, p));
}

export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every(p => hasPermission(role, p));
}

export function requirePermission(role: Role | undefined, permission: Permission): void {
  if (!role || !hasPermission(role, permission)) {
    throw new Error('Unauthorized');
  }
}

export function requireAnyPermission(role: Role | undefined, permissions: Permission[]): void {
  if (!role || !hasAnyPermission(role, permissions)) {
    throw new Error('Unauthorized');
  }
}

