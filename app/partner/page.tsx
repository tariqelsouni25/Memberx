import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { db } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import { BarChart3, Package, Calendar, Ticket } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

async function getPartnerData(userId: string) {
  const vendor = await db.vendor.findFirst({
    where: { managerId: userId },
  });

  if (!vendor) return null;

  const [listingsCount, activeBookings, totalRevenue, recentOrders] = await Promise.all([
    db.listing.count({ where: { vendorId: vendor.id } }),
    db.booking.count({
      where: {
        order: {
          items: {
            some: {
              listing: { vendorId: vendor.id },
            },
          },
        },
        status: 'CONFIRMED',
      },
    }),
    db.orderItem.aggregate({
      where: {
        listing: { vendorId: vendor.id },
      },
      _sum: { priceTotal: true },
    }),
    db.order.findMany({
      where: {
        items: {
          some: {
            listing: { vendorId: vendor.id },
          },
        },
      },
      include: {
        items: {
          include: { listing: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ]);

  return {
    vendor,
    stats: {
      listingsCount,
      activeBookings,
      totalRevenue: totalRevenue._sum.priceTotal || 0,
    },
    recentOrders,
  };
}

export default async function PartnerDashboardPage() {
  const session = await auth();

  if (!session?.user || (session.user.role !== 'PARTNER' && session.user.role !== 'ADMIN')) {
    redirect('/auth/signin?callbackUrl=/partner');
  }

  const data = await getPartnerData(session.user.id!);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold mb-2">لا يوجد متجر مرتبط</h2>
            <p className="text-muted-foreground mb-4">
              لم يتم ربط حسابك بمتجر بعد. يرجى الاتصال بالدعم.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { vendor, stats, recentOrders } = data;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{vendor.nameAr}</h1>
              <p className="text-sm text-muted-foreground">لوحة تحكم الشريك</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/deals/riyadh">عرض الموقع</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي العروض</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.listingsCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الحجوزات النشطة</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeBookings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tabular-nums">{formatPrice(stats.totalRevenue)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Button asChild className="h-20">
            <Link href="/partner/listings">
              <div className="text-center">
                <Package className="h-6 w-6 mx-auto mb-1" />
                <span>إدارة العروض</span>
              </div>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-20">
            <Link href="/partner/slots">
              <div className="text-center">
                <Calendar className="h-6 w-6 mx-auto mb-1" />
                <span>إدارة المواعيد</span>
              </div>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-20">
            <Link href="/partner/redeem">
              <div className="text-center">
                <Ticket className="h-6 w-6 mx-auto mb-1" />
                <span>استرداد القسائم</span>
              </div>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-20">
            <Link href="/partner/reports">
              <div className="text-center">
                <BarChart3 className="h-6 w-6 mx-auto mb-1" />
                <span>التقارير</span>
              </div>
            </Link>
          </Button>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>الطلبات الأخيرة</CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <p className="font-medium">طلب #{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString('ar-SA')}
                      </p>
                      <div className="text-sm mt-1">
                        {order.items.map((item) => (
                          <span key={item.id} className="block">{item.listing.titleAr}</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="font-bold tabular-nums">{formatPrice(order.total)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">لا توجد طلبات بعد</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

