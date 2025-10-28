import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';

interface PrivacyPageProps {
  searchParams: Promise<{ lang?: string }>;
}

export default async function PrivacyPage({ searchParams }: PrivacyPageProps) {
  const { lang = 'ar' } = await searchParams;
  const isAr = lang === 'ar';

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={lang} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 prose prose-slate max-w-none [dir=rtl]:text-right">
            <h1>{isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</h1>

            {isAr ? (
              <>
                <h2>جمع المعلومات</h2>
                <p>
                  نقوم بجمع المعلومات التي تقدمها لنا عند التسجيل أو إجراء عملية شراء، بما في ذلك الاسم والبريد الإلكتروني ورقم الهاتف.
                </p>

                <h2>استخدام المعلومات</h2>
                <p>نستخدم معلوماتك من أجل:</p>
                <ul>
                  <li>معالجة الحجوزات والطلبات</li>
                  <li>إرسال القسائم والتأكيدات</li>
                  <li>تحسين خدماتنا</li>
                  <li>إرسال عروض وإشعارات تسويقية (يمكنك إلغاء الاشتراك)</li>
                </ul>

                <h2>حماية المعلومات</h2>
                <p>
                  نستخدم تدابير أمنية متقدمة لحماية معلوماتك الشخصية. جميع المعاملات المالية مشفرة.
                </p>

                <h2>مشاركة المعلومات</h2>
                <p>
                  لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك المعلومات الضرورية مع شركائنا لإتمام الحجوزات.
                </p>

                <h2>ملاحظة PDPL</h2>
                <p>
                  نلتزم بقانون حماية البيانات الشخصية في المملكة العربية السعودية (PDPL) وجميع اللوائح ذات الصلة.
                </p>

                <h2>حقوقك</h2>
                <p>لديك الحق في:</p>
                <ul>
                  <li>الوصول إلى بياناتك الشخصية</li>
                  <li>تصحيح البيانات غير الدقيقة</li>
                  <li>طلب حذف بياناتك</li>
                  <li>الاعتراض على معالجة بياناتك</li>
                </ul>

                <h2>اتصل بنا</h2>
                <p>
                  إذا كانت لديك أي أسئلة حول سياسة الخصوصية، يرجى الاتصال بنا على: privacy@memberx.com
                </p>
              </>
            ) : (
              <>
                <h2>Information Collection</h2>
                <p>
                  We collect information you provide when registering or making a purchase, including name, email, and phone number.
                </p>

                <h2>Use of Information</h2>
                <p>We use your information to:</p>
                <ul>
                  <li>Process bookings and orders</li>
                  <li>Send vouchers and confirmations</li>
                  <li>Improve our services</li>
                  <li>Send promotional offers and notifications (you can opt out)</li>
                </ul>

                <h2>Information Protection</h2>
                <p>
                  We use advanced security measures to protect your personal information. All financial transactions are encrypted.
                </p>

                <h2>Information Sharing</h2>
                <p>
                  We do not sell or rent your personal information to third parties. We may share necessary information with our partners to complete bookings.
                </p>

                <h2>PDPL Compliance</h2>
                <p>
                  We comply with the Personal Data Protection Law (PDPL) in Saudi Arabia and all related regulations.
                </p>

                <h2>Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                </ul>

                <h2>Contact Us</h2>
                <p>
                  If you have any questions about our Privacy Policy, please contact us at: privacy@memberx.com
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

