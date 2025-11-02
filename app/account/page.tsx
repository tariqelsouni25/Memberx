import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { db } from '@/lib/db';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatPrice, formatDate } from '@/lib/utils';
import { Calendar, Receipt, Ticket, User } from 'lucide-react';
import QRCode from 'qrcode';

interface AccountPageProps {
  searchParams: Promise<{ lang?: string }>;
}

async function getUserData(userId: string) {
  const [bookings, orders, vouchers] = await Promise.all([
    db.booking.findMany({
      where: { userId },
      include: {
        order: {
          include: {
            items: {
              include: { listing: true },
            },
          },
        },
        slot: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
    db.order.findMany({
      where: { userId },
      include: {
        items: {
          include: { listing: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
    db.voucher.findMany({
      where: {
        order: { userId },
      },
      include: {
        order: {
          include: {
            items: {
              include: { listing: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
  ]);

  return { bookings, orders, vouchers };
}

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const session = await auth();
  const { lang = 'ar' } = await searchParams;

  if (!session?.user) {
    redirect(`/auth/signin?callbackUrl=/account&lang=${lang}`);
  }

  const { bookings, orders, vouchers } = await getUserData(session.user.id!);
  const isAr = lang === 'ar';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
      case 'COMPLETED':
      case 'ACTIVE':
        return 'default';
      case 'PENDING':
        return 'secondary';
      case 'CANCELLED':
      case 'EXPIRED':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusLabel = (status: string) => {
    if (isAr) {
      const labels: Record<string, string> = {
        PENDING: 'قيد الانتظار',
        CONFIRMED: 'مؤكد',
        CANCELLED: 'ملغي',
        COMPLETED: 'مكتمل',
        NO_SHOW: 'لم يحضر',
        ACTIVE: 'نشط',
        REDEEMED: 'مستخدم',
        EXPIRED: 'منتهي',
        PROCESSING: 'جاري المعالجة',
      };
      return labels[status] || status;
    }
    return status;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={lang} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{isAr ? 'حسابي' : 'My Account'}</h1>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {isAr ? 'حجوزاتي' : 'My Bookings'}
            </TabsTrigger>
            <TabsTrigger value="vouchers" className="flex items-center gap-2">
              <Ticket className="w-4 h-4" />
              {isAr ? 'قسائمي' : 'My Vouchers'}
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Receipt className="w-4 h-4" />
              {isAr ? 'طلباتي' : 'My Orders'}
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {isAr ? 'الملف الشخصي' : 'Profile'}
            </TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-semibold text-lg">
                          {isAr ? 'حجز رقم' : 'Booking'} #{booking.bookingRef}
                        </p>
                        <p className="text-sm text-muted-foreground">{formatDate(booking.createdAt, lang)}</p>
                      </div>
                      <Badge variant={getStatusColor(booking.status) as any}>{getStatusLabel(booking.status)}</Badge>
                    </div>
                    {booking.order.items.map((item) => (
                      <div key={item.id} className="mb-2">
                        <p className="font-medium">{isAr ? item.listing.titleAr : item.listing.titleEn}</p>
                        {booking.slot && (
                          <p className="text-sm text-muted-foreground">
                            {new Date(booking.slot.startsAt).toLocaleString(isAr ? 'ar-SA' : 'en-US')}
                          </p>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center text-muted-foreground">
                  {isAr ? 'لا توجد حجوزات' : 'No bookings found'}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Vouchers Tab */}
          <TabsContent value="vouchers" className="space-y-4">
            {vouchers.length > 0 ? (
              vouchers.map((voucher) => (
                <Card key={voucher.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-mono text-2xl font-bold tracking-wider">{voucher.code}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {isAr ? 'صالح حتى' : 'Valid until'}: {formatDate(voucher.validUntil, lang)}
                        </p>
                      </div>
                      <Badge variant={getStatusColor(voucher.status) as any}>{getStatusLabel(voucher.status)}</Badge>
                    </div>
                    {voucher.order.items.map((item) => (
                      <p key={item.id} className="text-sm mb-2">
                        {isAr ? item.listing.titleAr : item.listing.titleEn}
                      </p>
                    ))}
                    <div className="mt-4 p-4 bg-muted rounded flex justify-center">
                      <div className="text-xs text-muted-foreground">[QR Code would display here]</div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center text-muted-foreground">
                  {isAr ? 'لا توجد قسائم' : 'No vouchers found'}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            {orders.length > 0 ? (
              orders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-semibold text-lg">
                          {isAr ? 'طلب رقم' : 'Order'} #{order.orderNumber}
                        </p>
                        <p className="text-sm text-muted-foreground">{formatDate(order.createdAt, lang)}</p>
                      </div>
                      <div className="text-left [dir=rtl]:text-right">
                        <Badge variant={getStatusColor(order.status) as any}>{getStatusLabel(order.status)}</Badge>
                        <p className="font-bold mt-2 tabular-nums">{formatPrice(order.total)}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{isAr ? item.listing.titleAr : item.listing.titleEn}</span>
                          <span className="text-muted-foreground">×{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center text-muted-foreground">
                  {isAr ? 'لا توجد طلبات' : 'No orders found'}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>{isAr ? 'معلومات الحساب' : 'Account Information'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">{isAr ? 'الاسم' : 'Name'}</p>
                  <p className="font-medium">{session.user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{isAr ? 'البريد الإلكتروني' : 'Email'}</p>
                  <p className="font-medium">{session.user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{isAr ? 'الدور' : 'Role'}</p>
                  <Badge>{session.user.role}</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer locale={lang} />
    </div>
  );
}

