/**
 * Admin RBAC - Role-Based Access Control
 * Defines permissions for each role in the admin panel
 */

import { Role } from '@prisma/client';

export enum Permission {
  // Content Management
  PAGES_VIEW = 'pages:view',
  PAGES_CREATE = 'pages:create',
  PAGES_EDIT = 'pages:edit',
  PAGES_DELETE = 'pages:delete',
  PAGES_PUBLISH = 'pages:publish',
  
  // Navigation
  NAV_VIEW = 'navigation:view',
  NAV_EDIT = 'navigation:edit',
  
  // Media
  MEDIA_VIEW = 'media:view',
  MEDIA_UPLOAD = 'media:upload',
  MEDIA_DELETE = 'media:delete',
  
  // Banners
  BANNERS_VIEW = 'banners:view',
  BANNERS_EDIT = 'banners:edit',
  BANNERS_PUBLISH = 'banners:publish',
  
  // Listings (Deals)
  LISTINGS_VIEW = 'listings:view',
  LISTINGS_CREATE = 'listings:create',
  LISTINGS_EDIT = 'listings:edit',
  LISTINGS_DELETE = 'listings:delete',
  LISTINGS_APPROVE = 'listings:approve',
  LISTINGS_PUBLISH = 'listings:publish',
  
  // Inventory (Slots)
  INVENTORY_VIEW = 'inventory:view',
  INVENTORY_MANAGE = 'inventory:manage',
  
  // Orders & Bookings
  ORDERS_VIEW = 'orders:view',
  ORDERS_MANAGE = 'orders:manage',
  ORDERS_REFUND = 'orders:refund',
  
  BOOKINGS_VIEW = 'bookings:view',
  BOOKINGS_MANAGE = 'bookings:manage',
  
  VOUCHERS_VIEW = 'vouchers:view',
  VOUCHERS_MANAGE = 'vouchers:manage',
  
  // SEO & Translations
  SEO_VIEW = 'seo:view',
  SEO_EDIT = 'seo:edit',
  
  TRANSLATIONS_VIEW = 'translations:view',
  TRANSLATIONS_EDIT = 'translations:edit',
  
  // Theme & Settings
  THEME_VIEW = 'theme:view',
  THEME_EDIT = 'theme:edit',
  
  // Feature Flags
  FLAGS_VIEW = 'flags:view',
  FLAGS_EDIT = 'flags:edit',
  
  // Users & Roles
  USERS_VIEW = 'users:view',
  USERS_MANAGE = 'users:manage',
  USERS_DELETE = 'users:delete',
  
  // Settings
  SETTINGS_VIEW = 'settings:view',
  SETTINGS_EDIT = 'settings:edit',
  
  // Audit & Versioning
  AUDIT_VIEW = 'audit:view',
  VERSION_VIEW = 'version:view',
  VERSION_REVERT = 'version:revert',
}

/**
 * Permission sets for each role
 */
export const RolePermissions: Record<Role, Permission[]> = {
  // Full system access
  ADMIN: Object.values(Permission),
  
  // Content editors can manage content but not users/settings
  CONTENT_EDITOR: [
    Permission.PAGES_VIEW,
    Permission.PAGES_CREATE,
    Permission.PAGES_EDIT,
    Permission.PAGES_PUBLISH,
    Permission.NAV_VIEW,
    Permission.NAV_EDIT,
    Permission.MEDIA_VIEW,
    Permission.MEDIA_UPLOAD,
    Permission.BANNERS_VIEW,
    Permission.BANNERS_EDIT,
    Permission.BANNERS_PUBLISH,
    Permission.LISTINGS_VIEW,
    Permission.LISTINGS_CREATE,
    Permission.LISTINGS_EDIT,
    Permission.LISTINGS_PUBLISH,
    Permission.INVENTORY_VIEW,
    Permission.INVENTORY_MANAGE,
    Permission.SEO_VIEW,
    Permission.SEO_EDIT,
    Permission.TRANSLATIONS_VIEW,
    Permission.TRANSLATIONS_EDIT,
    Permission.FLAGS_VIEW,
    Permission.AUDIT_VIEW,
    Permission.VERSION_VIEW,
  ],
  
  // Support can view and manage orders/bookings
  SUPPORT: [
    Permission.LISTINGS_VIEW,
    Permission.ORDERS_VIEW,
    Permission.ORDERS_MANAGE,
    Permission.ORDERS_REFUND,
    Permission.BOOKINGS_VIEW,
    Permission.BOOKINGS_MANAGE,
    Permission.VOUCHERS_VIEW,
    Permission.VOUCHERS_MANAGE,
    Permission.AUDIT_VIEW,
  ],
  
  // Partners can manage their own listings
  PARTNER: [
    Permission.LISTINGS_VIEW,
    Permission.LISTINGS_CREATE,
    Permission.LISTINGS_EDIT,
    Permission.INVENTORY_VIEW,
    Permission.INVENTORY_MANAGE,
    Permission.BOOKINGS_VIEW,
    Permission.VOUCHERS_VIEW,
  ],
  
  // Regular users have no admin permissions
  USER: [],
};

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: Role, permission: Permission): boolean {
  return RolePermissions[role]?.includes(permission) ?? false;
}

/**
 * Check if a role has any of the specified permissions
 */
export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some(p => hasPermission(role, p));
}

/**
 * Check if a role has all of the specified permissions
 */
export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every(p => hasPermission(role, p));
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: Role): Permission[] {
  return RolePermissions[role] || [];
}

/**
 * Check if user can access admin panel
 */
export function canAccessAdmin(role: Role): boolean {
  return role === Role.ADMIN || role === Role.CONTENT_EDITOR || role === Role.SUPPORT;
}

/**
 * Admin module definitions with required permissions
 */
export interface AdminModule {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  href: string;
  requiredPermissions: Permission[];
  subModules?: AdminModule[];
}

export const adminModules: AdminModule[] = [
  {
    id: 'dashboard',
    nameAr: 'لوحة التحكم',
    nameEn: 'Dashboard',
    icon: 'LayoutDashboard',
    href: '/admin',
    requiredPermissions: [],
  },
  {
    id: 'pages',
    nameAr: 'الصفحات',
    nameEn: 'Pages',
    icon: 'FileText',
    href: '/admin/pages',
    requiredPermissions: [Permission.PAGES_VIEW],
  },
  {
    id: 'navigation',
    nameAr: 'القوائم',
    nameEn: 'Navigation',
    icon: 'Menu',
    href: '/admin/navigation',
    requiredPermissions: [Permission.NAV_VIEW],
  },
  {
    id: 'media',
    nameAr: 'المكتبة',
    nameEn: 'Media',
    icon: 'Image',
    href: '/admin/media',
    requiredPermissions: [Permission.MEDIA_VIEW],
  },
  {
    id: 'banners',
    nameAr: 'الإعلانات',
    nameEn: 'Banners',
    icon: 'Image',
    href: '/admin/banners',
    requiredPermissions: [Permission.BANNERS_VIEW],
  },
  {
    id: 'listings',
    nameAr: 'العروض',
    nameEn: 'Listings',
    icon: 'Package',
    href: '/admin/listings',
    requiredPermissions: [Permission.LISTINGS_VIEW],
  },
  {
    id: 'inventory',
    nameAr: 'المخزون',
    nameEn: 'Inventory',
    icon: 'Calendar',
    href: '/admin/inventory',
    requiredPermissions: [Permission.INVENTORY_VIEW],
  },
  {
    id: 'orders',
    nameAr: 'الطلبات',
    nameEn: 'Orders',
    icon: 'ShoppingCart',
    href: '/admin/orders',
    requiredPermissions: [Permission.ORDERS_VIEW],
  },
  {
    id: 'seo',
    nameAr: 'SEO',
    nameEn: 'SEO',
    icon: 'Search',
    href: '/admin/seo',
    requiredPermissions: [Permission.SEO_VIEW],
  },
  {
    id: 'theme',
    nameAr: 'التصميم',
    nameEn: 'Theme',
    icon: 'Palette',
    href: '/admin/theme',
    requiredPermissions: [Permission.THEME_VIEW],
  },
  {
    id: 'users',
    nameAr: 'المستخدمين',
    nameEn: 'Users',
    icon: 'Users',
    href: '/admin/users',
    requiredPermissions: [Permission.USERS_VIEW],
  },
  {
    id: 'settings',
    nameAr: 'الإعدادات',
    nameEn: 'Settings',
    icon: 'Settings',
    href: '/admin/settings',
    requiredPermissions: [Permission.SETTINGS_VIEW],
  },
];

/**
 * Get modules accessible to a role
 */
export function getAccessibleModules(role: Role): AdminModule[] {
  return adminModules.filter(module => 
    module.requiredPermissions.length === 0 || 
    hasAnyPermission(role, module.requiredPermissions)
  );
}

