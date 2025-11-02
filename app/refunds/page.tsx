import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

interface RefundsPageProps {
  searchParams: Promise<{ lang?: string }>;
}

export default async function RefundsPage({ searchParams }: RefundsPageProps) {
  const { lang = 'ar' } = await searchParams;
  const isAr = lang === 'ar';

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={lang} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 prose prose-slate max-w-none [dir=rtl]:text-right">
            <h1>{isAr ? 'سياسة الاسترجاع والإلغاء' : 'Refund & Cancellation Policy'}</h1>

            {isAr ? (
              <>
                <h2>سياسة الإلغاء</h2>
                <p>
                  يمكنك إلغاء حجزك قبل 24 ساعة من موعد الاستخدام المحدد للحصول على استرداد كامل. الإلغاءات التي تتم خلال 24 ساعة من الموعد غير مؤهلة للاسترداد.
                </p>

                <h2>سياسة الاسترجاع</h2>
                <ul>
                  <li>الاسترداد الكامل: متاح للإلغاءات قبل 24 ساعة</li>
                  <li>استرداد جزئي (50%): متاح للإلغاءات بين 12-24 ساعة</li>
                  <li>لا يوجد استرداد: للإلغاءات خلال 12 ساعة من الموعد</li>
                </ul>

                <h2>العروض غير القابلة للاسترداد</h2>
                <p>
                  بعض العروض الخاصة والعروض الخاطفة غير قابلة للاسترداد. سيتم توضيح ذلك بوضوح في صفحة العرض.
                </p>

                <h2>كيفية طلب الاسترداد</h2>
                <p>
                  لطلب استرداد، يرجى الاتصال بدعم العملاء على support@memberx.com مع رقم الحجز الخاص بك.
                </p>

                <h2>وقت المعالجة</h2>
                <p>
                  تتم معالجة طلبات الاسترداد خلال 5-7 أيام عمل. سيتم إرجاع المبلغ إلى طريقة الدفع الأصلية.
                </p>

                <h2>حالات خاصة</h2>
                <ul>
                  <li>الظروف القاهرة: قد نقدم استرداداً أو رصيداً في حالات استثنائية</li>
                  <li>جودة الخدمة: إذا لم تكن راضياً عن الخدمة، اتصل بنا خلال 48 ساعة</li>
                  <li>القسائم المنتهية: لا يمكن استرداد أو تمديد القسائم المنتهية</li>
                </ul>
              </>
            ) : (
              <>
                <h2>Cancellation Policy</h2>
                <p>
                  You may cancel your booking 24 hours before the scheduled time for a full refund. Cancellations within 24 hours are not eligible for refund.
                </p>

                <h2>Refund Policy</h2>
                <ul>
                  <li>Full refund: Available for cancellations before 24 hours</li>
                  <li>Partial refund (50%): Available for cancellations between 12-24 hours</li>
                  <li>No refund: For cancellations within 12 hours of appointment</li>
                </ul>

                <h2>Non-Refundable Offers</h2>
                <p>
                  Some special and flash offers are non-refundable. This will be clearly stated on the offer page.
                </p>

                <h2>How to Request a Refund</h2>
                <p>
                  To request a refund, please contact customer support at support@memberx.com with your booking reference.
                </p>

                <h2>Processing Time</h2>
                <p>
                  Refund requests are processed within 5-7 business days. The amount will be returned to the original payment method.
                </p>

                <h2>Special Cases</h2>
                <ul>
                  <li>Force majeure: We may offer a refund or credit in exceptional circumstances</li>
                  <li>Service quality: If unsatisfied with service, contact us within 48 hours</li>
                  <li>Expired vouchers: Expired vouchers cannot be refunded or extended</li>
                </ul>
              </>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer locale={lang} />
    </div>
  );
}

