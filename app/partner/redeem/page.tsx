import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { db } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Scan, CheckCircle2, XCircle } from 'lucide-react';

async function getRecentRedemptions(userId: string) {
  const vendor = await db.vendor.findFirst({
    where: { managerId: userId },
  });

  if (!vendor) return null;

  const redemptions = await db.redemptionAttempt.findMany({
    where: {
      voucher: {
        order: {
          items: {
            some: {
              listing: { vendorId: vendor.id },
            },
          },
        },
      },
    },
    include: {
      voucher: {
        include: {
          order: {
            include: {
              items: {
                include: { listing: true },
              },
            },
          },
        },
      },
      staff: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  return { vendor, redemptions };
}

export default async function PartnerRedeemPage() {
  const session = await auth();

  if (!session?.user || (session.user.role !== 'PARTNER' && session.user.role !== 'ADMIN')) {
    redirect('/auth/signin?callbackUrl=/partner/redeem');
  }

  const data = await getRecentRedemptions(session.user.id!);

  if (!data) {
    redirect('/partner');
  }

  const { vendor, redemptions } = data;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/partner" className="text-sm text-muted-foreground hover:text-primary mb-1 block">
                ← العودة للوحة التحكم
              </Link>
              <h1 className="text-2xl font-bold">استرداد القسائم</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Redeem Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="w-5 h-5" />
                استرداد قسيمة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="voucherCode">كود القسيمة</Label>
                  <Input
                    id="voucherCode"
                    placeholder="أدخل كود القسيمة أو امسح QR"
                    className="text-center text-lg font-mono tracking-wider"
                    autoComplete="off"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <CheckCircle2 className="w-5 h-5 ml-2 [dir=rtl]:ml-0 [dir=rtl]:mr-2" />
                  تأكيد الاسترداد
                </Button>

                <div className="p-4 bg-muted rounded-lg text-sm text-muted-foreground text-center">
                  <p>امسح رمز QR من القسيمة أو أدخل الكود يدوياً</p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>تعليمات الاسترداد</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">خطوات الاسترداد:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>اطلب من العميل عرض قسيمته</li>
                  <li>امسح رمز QR أو أدخل الكود يدوياً</li>
                  <li>تحقق من صحة القسيمة والتفاصيل</li>
                  <li>قدم الخدمة أو المنتج</li>
                  <li>أكد الاسترداد</li>
                </ol>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">ملاحظات مهمة:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>تأكد من صلاحية القسيمة قبل تقديم الخدمة</li>
                  <li>لا يمكن استرداد القسيمة أكثر من مرة</li>
                  <li>في حالة وجود مشكلة، اتصل بالدعم الفني</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Redemptions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>عمليات الاسترداد الأخيرة</CardTitle>
          </CardHeader>
          <CardContent>
            {redemptions.length > 0 ? (
              <div className="space-y-4">
                {redemptions.map((attempt) => (
                  <div key={attempt.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${attempt.success ? 'bg-green-100' : 'bg-red-100'}`}>
                        {attempt.success ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-mono font-semibold">{attempt.voucher.code}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(attempt.createdAt).toLocaleString('ar-SA')}
                        </p>
                        {attempt.voucher.order.items[0] && (
                          <p className="text-sm">{attempt.voucher.order.items[0].listing.titleAr}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-left">
                      <Badge variant={attempt.success ? 'default' : 'destructive'}>
                        {attempt.success ? 'نجح' : 'فشل'}
                      </Badge>
                      {!attempt.success && attempt.reason && (
                        <p className="text-xs text-muted-foreground mt-1">{attempt.reason}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">لا توجد عمليات استرداد بعد</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

