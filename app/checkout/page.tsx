import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart, CreditCard } from 'lucide-react';

interface CheckoutPageProps {
  searchParams: Promise<{ lang?: string }>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const session = await auth();
  const { lang = 'ar' } = await searchParams;

  if (!session) {
    redirect(`/auth/signin?callbackUrl=/checkout&lang=${lang}`);
  }

  const isAr = lang === 'ar';

  // In a real app, this would come from cart state/session
  const cartItems = [
    {
      id: '1',
      titleAr: 'عشاء فاخر لشخصين',
      titleEn: 'Luxury Dinner for Two',
      quantity: 1,
      price: 299,
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 0;
  const tax = 0;
  const total = subtotal - discount + tax;

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={lang} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{isAr ? 'الدفع' : 'Checkout'}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{isAr ? 'معلومات الاتصال' : 'Contact Information'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">{isAr ? 'الاسم' : 'Name'}</Label>
                  <Input id="name" defaultValue={session.user?.name || ''} />
                </div>
                <div>
                  <Label htmlFor="email">{isAr ? 'البريد الإلكتروني' : 'Email'}</Label>
                  <Input id="email" type="email" defaultValue={session.user?.email || ''} />
                </div>
                <div>
                  <Label htmlFor="phone">{isAr ? 'رقم الجوال' : 'Phone'}</Label>
                  <Input id="phone" type="tel" placeholder={isAr ? '05XXXXXXXX' : '05XXXXXXXX'} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{isAr ? 'كود الخصم' : 'Promo Code'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input placeholder={isAr ? 'أدخل كود الخصم' : 'Enter promo code'} />
                  <Button variant="outline">{isAr ? 'تطبيق' : 'Apply'}</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right - Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  {isAr ? 'ملخص الطلب' : 'Order Summary'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{isAr ? item.titleAr : item.titleEn}</p>
                      <p className="text-sm text-muted-foreground">
                        {isAr ? 'الكمية' : 'Qty'}: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium tabular-nums">{formatPrice(item.price)}</p>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{isAr ? 'المجموع الفرعي' : 'Subtotal'}</span>
                    <span className="tabular-nums">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>{isAr ? 'الخصم' : 'Discount'}</span>
                      <span className="tabular-nums">-{formatPrice(discount)}</span>
                    </div>
                  )}
                  {tax > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>{isAr ? 'الضريبة' : 'Tax'}</span>
                      <span className="tabular-nums">{formatPrice(tax)}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>{isAr ? 'الإجمالي' : 'Total'}</span>
                  <span className="tabular-nums">{formatPrice(total)}</span>
                </div>

                <Button size="xl" className="w-full">
                  <CreditCard className="w-5 h-5 ml-2 [dir=rtl]:ml-0 [dir=rtl]:mr-2" />
                  {isAr ? 'الدفع الآن' : 'Pay Now'}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  {isAr
                    ? 'الدفع آمن ومشفر. سيتم إرسال قسائمك بالبريد الإلكتروني.'
                    : 'Payment is secure and encrypted. Vouchers will be sent via email.'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer locale={lang} />
    </div>
  );
}

