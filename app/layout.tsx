import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: 'Member X - أفضل العروض والخصومات في السعودية',
  description: 'اكتشف أفضل العروض والخصومات على المطاعم، التجميل، الفنادق، والأنشطة في الرياض، جدة، والدمام',
  keywords: ['عروض', 'خصومات', 'السعودية', 'الرياض', 'جدة', 'الدمام', 'مطاعم', 'فنادق', 'تجميل'],
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={cn(cairo.variable, 'font-cairo antialiased')}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
