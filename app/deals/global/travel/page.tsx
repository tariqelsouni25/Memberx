import { Suspense } from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { TravelHeader } from '@/modules/travel/TravelHeader';
import { TravelGrid, TravelGridSkeleton } from '@/modules/travel/TravelGrid';
import { TravelPagination } from '@/modules/travel/TravelPagination';
import { getTravelPageData } from '@/modules/travel/TravelData';
import { travelParamsSchema } from '@/modules/travel/types';

interface TravelsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ searchParams }: TravelsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const lang = (params.lang as string) || 'ar';
  const isAr = lang === 'ar';

  if (isAr) {
    return {
      title: 'عروض السفر – السعودية | Member X',
      description:
        'اكتشف أفضل باقات السفر العالمية من السعودية: يشمل الطيران، فنادق حتى 5 نجوم، وإلغاء مجاني حيث يتوفر.',
      keywords: ['عروض السفر', 'باقات سياحية', 'السعودية', 'طيران', 'فنادق'],
      openGraph: {
        title: 'عروض السفر – السعودية',
        description: 'اكتشف أفضل باقات السفر العالمية من السعودية',
        type: 'website',
        locale: 'ar_SA',
      },
      alternates: {
        canonical: '/deals/global/travel',
      },
    };
  }

  return {
    title: 'Travel Deals – Saudi Arabia | Member X',
    description:
      'Discover the best global travel packages from Saudi Arabia: flights included, hotels up to 5 stars, and free cancellation where available.',
    keywords: ['travel deals', 'tour packages', 'Saudi Arabia', 'flights', 'hotels'],
    openGraph: {
      title: 'Travel Deals – Saudi Arabia',
      description: 'Discover the best global travel packages from Saudi Arabia',
      type: 'website',
      locale: 'en_US',
    },
    alternates: {
      canonical: '/deals/global/travel',
    },
  };
}

export default async function TravelsPage({ searchParams }: TravelsPageProps) {
  const rawParams = await searchParams;

  // Parse and validate query parameters
  const validatedParams = travelParamsSchema.parse({
    ...rawParams,
    page: rawParams.page || '1',
    perPage: rawParams.perPage || '24',
  });

  const isAr = validatedParams.lang === 'ar';

  // Fetch travel data
  const data = await getTravelPageData(validatedParams);

  // Helper to build pagination URL
  const buildPageUrl = (pageNum: number) => {
    const params = new URLSearchParams();
    Object.entries(rawParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && !Array.isArray(value)) {
        params.set(key, String(value));
      }
    });
    params.set('page', String(pageNum));
    return `/deals/global/travel?${params.toString()}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={validatedParams.lang} city="global" />

      <main className="flex-1">
        {/* Travel Header */}
        <TravelHeader
          totalDeals={data.kpis.available}
          endingSoon={data.kpis.endingSoon}
          bestSellers={data.kpis.bestSellers}
          locale={validatedParams.lang}
        />

        <div className="container mx-auto px-4 py-8">
          {/* Results count & Sort */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {data.total} {isAr ? 'باقة' : 'packages'}
            </p>
            {/* TODO: Add sort & filter controls */}
          </div>

          {/* Travel Grid */}
          <Suspense fallback={<TravelGridSkeleton count={24} />}>
            {data.items.length > 0 ? (
              <TravelGrid packages={data.items} locale={validatedParams.lang} />
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">
                  {isAr ? 'لا توجد باقات متاحة حالياً' : 'No packages available at the moment'}
                </p>
              </div>
            )}
          </Suspense>

          {/* Pagination */}
          <TravelPagination
            currentPage={data.page}
            totalPages={data.totalPages}
            buildPageUrl={buildPageUrl}
            locale={validatedParams.lang}
          />
        </div>

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: isAr ? 'عروض السفر – السعودية' : 'Travel Deals – Saudi Arabia',
              numberOfItems: data.items.length,
              itemListElement: data.items.slice(0, 10).map((pkg, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Product',
                  name: pkg.title,
                  image: pkg.images[0],
                  offers: {
                    '@type': 'Offer',
                    price: pkg.priceSar,
                    priceCurrency: 'SAR',
                    availability: 'https://schema.org/InStock',
                    priceValidUntil: pkg.endsAt.toISOString(),
                  },
                },
              })),
            }),
          }}
        />
      </main>

      <Footer locale={validatedParams.lang} />
    </div>
  );
}

