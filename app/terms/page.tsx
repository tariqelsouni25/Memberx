import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';

interface TermsPageProps {
  searchParams: Promise<{ lang?: string }>;
}

export default async function TermsPage({ searchParams }: TermsPageProps) {
  const { lang = 'ar' } = await searchParams;
  const isAr = lang === 'ar';

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={lang} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 prose prose-slate max-w-none [dir=rtl]:text-right">
            <h1>{isAr ? 'الشروط والأحكام' : 'Terms & Conditions'}</h1>

            {isAr ? (
              <>
                <h2>مقدمة</h2>
                <p>
                  مرحباً بك في Member X. باستخدامك لخدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام.
                </p>

                <h2>استخدام الخدمة</h2>
                <p>
                  يمكنك استخدام خدماتنا للأغراض القانونية فقط. يحظر استخدام الخدمة لأي نشاط غير قانوني أو احتيالي.
                </p>

                <h2>الحجوزات والمدفوعات</h2>
                <p>
                  جميع الحجوزات نهائية. المبالغ المدفوعة غير قابلة للاسترداد ما لم ينص على خلاف ذلك في شروط العرض المحدد.
                </p>

                <h2>القسائم</h2>
                <p>
                  القسائم صالحة فقط خلال الفترة المحددة ولدى الشريك المعين. لا يمكن استبدال القسائم بالنقد.
                </p>

                <h2>المسؤولية</h2>
                <p>
                  Member X ليست مسؤولة عن جودة الخدمات المقدمة من قبل الشركاء. أي مطالبات يجب توجيهها مباشرة إلى الشريك.
                </p>

                <h2>التغييرات على الشروط</h2>
                <p>
                  نحتفظ بالحق في تعديل هذه الشروط في أي وقت. التعديلات تصبح سارية فور نشرها على الموقع.
                </p>
              </>
            ) : (
              <>
                <h2>Introduction</h2>
                <p>
                  Welcome to Member X. By using our services, you agree to be bound by these Terms and Conditions.
                </p>

                <h2>Use of Service</h2>
                <p>
                  You may use our services for lawful purposes only. Any illegal or fraudulent activity is prohibited.
                </p>

                <h2>Bookings and Payments</h2>
                <p>
                  All bookings are final. Payments are non-refundable unless otherwise stated in the specific offer terms.
                </p>

                <h2>Vouchers</h2>
                <p>
                  Vouchers are valid only during the specified period and at the designated partner. Vouchers cannot be exchanged for cash.
                </p>

                <h2>Liability</h2>
                <p>
                  Member X is not responsible for the quality of services provided by partners. Claims should be directed to the partner.
                </p>

                <h2>Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. Changes become effective immediately upon posting.
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer locale={lang} />
    </div>
  );
}

