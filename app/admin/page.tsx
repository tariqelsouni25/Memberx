import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { db } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  Navigation,
  Image,
  Megaphone,
  Package,
  Calendar,
  ShoppingCart,
  Search,
  Palette,
  Flag,
  Users,
  History,
  Settings,
} from 'lucide-react';

async function getAdminStats() {
  const [
    totalListings,
    pendingListings,
    totalOrders,
    totalUsers,
    activeBookings,
  ] = await Promise.all([
    db.listing.count(),
    db.listing.count({ where: { status: 'PENDING' } }),
    db.order.count(),
    db.user.count(),
    db.booking.count({ where: { status: 'CONFIRMED' } }),
  ]);

  return {
    totalListings,
    pendingListings,
    totalOrders,
    totalUsers,
    activeBookings,
  };
}

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'CONTENT_EDITOR')) {
    redirect('/auth/signin?callbackUrl=/admin');
  }

  const stats = await getAdminStats();

  const modules = [
    {
      title: 'Pages & Sections',
      titleAr: 'الصفحات والأقسام',
      icon: FileText,
      href: '/admin/pages',
      description: 'Manage homepage, category pages, and static content',
      descriptionAr: 'إدارة الصفحة الرئيسية وصفحات الفئات والمحتوى الثابت',
    },
    {
      title: 'Navigation',
      titleAr: 'القوائم',
      icon: Navigation,
      href: '/admin/navigation',
      description: 'Header and footer menu management',
      descriptionAr: 'إدارة قوائم الرأس والتذييل',
    },
    {
      title: 'Media Library',
      titleAr: 'مكتبة الوسائط',
      icon: Image,
      href: '/admin/media',
      description: 'Upload and manage images and videos',
      descriptionAr: 'رفع وإدارة الصور والفيديوهات',
    },
    {
      title: 'Banners',
      titleAr: 'البانرات',
      icon: Megaphone,
      href: '/admin/banners',
      description: 'Hero sliders and promotional banners',
      descriptionAr: 'سلايدرات البطل والبانرات الترويجية',
    },
    {
      title: 'Listings',
      titleAr: 'العروض',
      icon: Package,
      href: '/admin/listings',
      description: 'Deal management and approval workflow',
      descriptionAr: 'إدارة العروض وسير عمل الموافقة',
      badge: stats.pendingListings > 0 ? stats.pendingListings : undefined,
    },
    {
      title: 'Inventory',
      titleAr: 'المخزون',
      icon: Calendar,
      href: '/admin/inventory',
      description: 'Slot rules and time slot management',
      descriptionAr: 'إدارة قواعد وأوقات الحجوزات',
    },
    {
      title: 'Orders',
      titleAr: 'الطلبات',
      icon: ShoppingCart,
      href: '/admin/orders',
      description: 'Orders, bookings, and vouchers',
      descriptionAr: 'الطلبات والحجوزات والقسائم',
    },
    {
      title: 'SEO & Translations',
      titleAr: 'SEO والترجمات',
      icon: Search,
      href: '/admin/seo',
      description: 'Meta tags and multilingual content',
      descriptionAr: 'العلامات الوصفية والمحتوى متعدد اللغات',
    },
    {
      title: 'Theme',
      titleAr: 'المظهر',
      icon: Palette,
      href: '/admin/theme',
      description: 'Branding, colors, and styling',
      descriptionAr: 'العلامة التجارية والألوان والتصميم',
    },
    {
      title: 'Feature Flags',
      titleAr: 'مفاتيح الميزات',
      icon: Flag,
      href: '/admin/flags',
      description: 'Toggle features and experiments',
      descriptionAr: 'تبديل الميزات والتجارب',
    },
    {
      title: 'Users & Roles',
      titleAr: 'المستخدمين والأدوار',
      icon: Users,
      href: '/admin/users',
      description: 'User management and permissions',
      descriptionAr: 'إدارة المستخدمين والصلاحيات',
    },
    {
      title: 'Audit Logs',
      titleAr: 'سجلات المراجعة',
      icon: History,
      href: '/admin/audit',
      description: 'Track all changes and actions',
      descriptionAr: 'تتبع جميع التغييرات والإجراءات',
    },
    {
      title: 'Settings',
      titleAr: 'الإعدادات',
      icon: Settings,
      href: '/admin/settings',
      description: 'General marketplace settings',
      descriptionAr: 'إعدادات السوق العامة',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <LayoutDashboard className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Member X CMS</h1>
                <p className="text-sm text-muted-foreground">لوحة تحكم المحتوى</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/deals/riyadh">عرض الموقع</Link>
              </Button>
              <div className="text-left">
                <p className="text-sm font-medium">{session.user.name}</p>
                <p className="text-xs text-muted-foreground">{session.user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">إجمالي العروض</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalListings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">بانتظار الموافقة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pendingListings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">الطلبات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">الحجوزات النشطة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeBookings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">المستخدمين</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>
        </div>

        {/* CMS Modules Grid */}
        <Card>
          <CardHeader>
            <CardTitle>وحدات إدارة المحتوى (CMS Modules)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map((module) => (
                <Link
                  key={module.href}
                  href={module.href}
                  className="group relative p-6 border rounded-lg hover:border-primary hover:shadow-md transition-all"
                >
                  {module.badge && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {module.badge}
                    </span>
                  )}
                  <module.icon className="w-10 h-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-lg mb-1">{module.titleAr}</h3>
                  <p className="text-sm text-muted-foreground">{module.descriptionAr}</p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

