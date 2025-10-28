import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

interface TravelDetailPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}

export async function generateMetadata({ params }: TravelDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  return {
    title: `Travel Package | Member X`,
    description: 'View travel package details',
  };
}

export default async function TravelDetailPage({ params, searchParams }: TravelDetailPageProps) {
  const { slug } = await params;
  const { lang = 'ar' } = await searchParams;
  const isAr = lang === 'ar';

  // TODO: Fetch package data by slug
  // For now, show placeholder

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={lang} city="global" />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">
              {isAr ? 'صفحة تفاصيل الباقة' : 'Package Detail Page'}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {isAr ? `الباقة: ${slug}` : `Package: ${slug}`}
            </p>
            <p className="text-muted-foreground">
              {isAr
                ? 'هذه صفحة بديلة. سيتم إضافة تفاصيل الباقة الكاملة قريبًا.'
                : 'This is a placeholder page. Full package details will be added soon.'}
            </p>
          </div>
        </div>
      </main>

      <Footer locale={lang} />
    </div>
  );
}

