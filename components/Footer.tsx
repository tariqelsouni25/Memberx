import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

interface FooterProps {
  locale?: string;
}

export function Footer({ locale = 'ar' }: FooterProps) {
  const isAr = locale === 'ar';

  const sections = [
    {
      titleAr: 'عن Member X',
      titleEn: 'About Member X',
      links: [
        { labelAr: 'من نحن', labelEn: 'About Us', href: '/about' },
        { labelAr: 'كيف نعمل', labelEn: 'How It Works', href: '/how-it-works' },
        { labelAr: 'الوظائف', labelEn: 'Careers', href: '/careers' },
        { labelAr: 'للشركاء', labelEn: 'Partner With Us', href: '/partner' },
      ],
    },
    {
      titleAr: 'المساعدة',
      titleEn: 'Help',
      links: [
        { labelAr: 'الأسئلة الشائعة', labelEn: 'FAQ', href: '/faq' },
        { labelAr: 'اتصل بنا', labelEn: 'Contact Us', href: '/contact' },
        { labelAr: 'سياسة الاسترجاع', labelEn: 'Refund Policy', href: '/refunds' },
      ],
    },
    {
      titleAr: 'قانوني',
      titleEn: 'Legal',
      links: [
        { labelAr: 'الشروط والأحكام', labelEn: 'Terms & Conditions', href: '/terms' },
        { labelAr: 'سياسة الخصوصية', labelEn: 'Privacy Policy', href: '/privacy' },
      ],
    },
  ];

  return (
    <footer className="bg-slate-50 border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Member X
            </h3>
            <p className="text-sm text-muted-foreground">
              {isAr
                ? 'منصة العروض الرائدة في المملكة العربية السعودية'
                : 'The leading deals platform in Saudi Arabia'}
            </p>
          </div>

          {sections.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-semibold mb-4">{isAr ? section.titleAr : section.titleEn}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {isAr ? link.labelAr : link.labelEn}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            {isAr ? '© 2025 Member X. جميع الحقوق محفوظة.' : '© 2025 Member X. All rights reserved.'}
          </p>
          <div className="flex gap-4">
            <Link href="/?lang=ar" className="hover:text-primary">
              العربية
            </Link>
            <Link href="/?lang=en" className="hover:text-primary">
              English
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
