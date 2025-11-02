import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroCarousel } from '@/components/hero-carousel';
import { SectionHeader } from '@/components/section-header';
import { CategoryTiles } from '@/components/category-tiles';
import { BannerStrip } from '@/components/banner-strip';
import { DealGrid, DealGridSkeleton } from '@/components/deal-grid';
import { CitySwitcher } from '@/components/city-switcher';
import { Button } from '@/components/ui/button';
import { getHomepageData, getActiveCities } from '@/lib/data/homepage';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HomePageProps {
  searchParams: Promise<{ 
    lang?: string; 
    page?: string; 
    sort?: string;
    city?: string;
  }>;
}

export async function generateMetadata({ searchParams }: HomePageProps): Promise<Metadata> {
  const params = await searchParams;
  const lang = params.lang || 'ar';
  const city = params.city || 'riyadh';
  const isAr = lang === 'ar';

  const cityNames: Record<string, { ar: string; en: string }> = {
    riyadh: { ar: 'الرياض', en: 'Riyadh' },
    jeddah: { ar: 'جدة', en: 'Jeddah' },
    dammam: { ar: 'الدمام', en: 'Dammam' },
  };

  const cityName = cityNames[city] || cityNames.riyadh;

  if (isAr) {
    return {
      title: `عروض ${cityName.ar} | Member X`,
      description: `اكتشف أفضل العروض في ${cityName.ar}. خصومات ومدة محدودة على المطاعم، الجمال، الفنادق والأنشطة. احجز الآن.`,
      keywords: ['عروض', 'خصومات', cityName.ar, 'مطاعم', 'فنادق', 'تجميل', 'أنشطة'],
      openGraph: {
        title: `عروض ${cityName.ar} | Member X`,
        description: `اكتشف أفضل العروض في ${cityName.ar}`,
        type: 'website',
        locale: 'ar_SA',
      },
    };
  }

  return {
    title: `${cityName.en} Deals | Member X`,
    description: `Discover the best deals in ${cityName.en}. Limited time discounts on dining, beauty, hotels and activities. Book now.`,
    keywords: ['deals', 'discounts', cityName.en, 'restaurants', 'hotels', 'beauty', 'activities'],
    openGraph: {
      title: `${cityName.en} Deals | Member X`,
      description: `Discover the best deals in ${cityName.en}`,
      type: 'website',
      locale: 'en_US',
    },
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const lang = params.lang || 'ar';
  const city = params.city || 'riyadh';
  const page = parseInt(params.page || '1');
  const sort = params.sort || 'popular';
  const isAr = lang === 'ar';

  // Get homepage data
  let data;
  try {
    data = await getHomepageData({
      city,
      lang,
      page,
      perPage: 24,
      sort,
    });
  } catch (error) {
    console.error('Error loading homepage:', error);
    data = null;
  }

  // If no data (database error or no city), show empty state
  if (!data) {
    // Get cities for switcher with error handling
    const cities = await getActiveCities();
    
    return (
      <div className="min-h-screen flex flex-col">
        <Header locale={lang} city={city} />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              {isAr ? 'مرحبًا بك في Member X' : 'Welcome to Member X'}
            </h1>
            <p className="text-muted-foreground mb-8">
              {isAr 
                ? 'يبدو أن قاعدة البيانات غير متصلة. يرجى التحقق من إعدادات قاعدة البيانات.'
                : 'It looks like the database is not connected. Please check your database settings.'}
            </p>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {isAr ? 'أو تصفح الفئات:' : 'Or browse categories:'}
              </p>
              <CategoryTiles city={city} locale={lang} />
            </div>
          </div>
        </main>
        <Footer locale={lang} />
      </div>
    );
  }

  // Get cities for switcher
  const cities = await getActiveCities();

  // Sort options
  const sortOptions = [
    { value: 'popular', labelAr: 'الأكثر رواجًا', labelEn: 'Most Popular' },
    { value: 'new', labelAr: 'الأحدث', labelEn: 'Newest' },
    { value: 'ending', labelAr: 'ينتهي قريبًا', labelEn: 'Ending Soon' },
    { value: 'price-asc', labelAr: 'السعر: من الأقل', labelEn: 'Price: Low to High' },
    { value: 'price-desc', labelAr: 'السعر: من الأعلى', labelEn: 'Price: High to Low' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={lang} city={city} />

      <main className="flex-1">
        {/* Hero Carousel */}
        {data.heroSlides.length > 0 && (
          <section className="container mx-auto px-4 pt-8">
            <HeroCarousel slides={data.heroSlides} locale={lang} />
          </section>
        )}

        {/* Top Banner */}
        {data.bannersTop.length > 0 && (
          <section className="container mx-auto px-4 py-8">
            <BannerStrip
              imageUrl={data.bannersTop[0].imageUrl}
              title={isAr ? data.bannersTop[0].titleAr : data.bannersTop[0].titleEn}
              subtitle={isAr ? data.bannersTop[0].subtitleAr : data.bannersTop[0].subtitleEn}
              ctaText={isAr ? data.bannersTop[0].ctaTextAr : data.bannersTop[0].ctaTextEn}
              ctaLink={data.bannersTop[0].ctaLink}
              locale={lang}
            />
          </section>
        )}

        {/* Hot Now Section */}
        {data.hotNow.length > 0 && (
          <section className="container mx-auto px-4 py-12">
            <SectionHeader
              title={isAr ? 'ساخن الآن' : 'Hot Now'}
              viewAllHref={`/deals/${city}?sort=ending&lang=${lang}`}
              viewAllText={isAr ? 'شاهد الكل' : 'View All'}
              locale={lang}
            />
            
            {/* Mobile: Horizontal scroll */}
            <div className="md:hidden overflow-x-auto -mx-4 px-4">
              <div className="flex gap-4 pb-4" style={{ scrollSnapType: 'x mandatory' }}>
                {data.hotNow.map((deal) => (
                  <div key={deal.id} className="flex-none w-[85%]" style={{ scrollSnapAlign: 'start' }}>
                    <DealGrid deals={[deal]} locale={lang} showCountdown={true} />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden md:block">
              <DealGrid deals={data.hotNow} locale={lang} showCountdown={true} />
            </div>
          </section>
        )}

        {/* Category Shortcuts */}
        <section className="container mx-auto px-4 py-12 bg-muted/30">
          <SectionHeader
            title={isAr ? 'تصفح حسب الفئة' : 'Browse by Category'}
            locale={lang}
          />
          <CategoryTiles city={city} locale={lang} />
        </section>

        {/* Mid-page Banner */}
        {data.bannersMid.length > 0 && (
          <section className="container mx-auto px-4 py-8">
            <BannerStrip
              imageUrl={data.bannersMid[0].imageUrl}
              title={isAr ? data.bannersMid[0].titleAr : data.bannersMid[0].titleEn}
              subtitle={isAr ? data.bannersMid[0].subtitleAr : data.bannersMid[0].subtitleEn}
              ctaText={isAr ? data.bannersMid[0].ctaTextAr : data.bannersMid[0].ctaTextEn}
              ctaLink={data.bannersMid[0].ctaLink}
              locale={lang}
            />
          </section>
        )}

        {/* All Offers Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <SectionHeader
              title={isAr ? 'كل العروض' : 'All Offers'}
              locale={lang}
            />
            
            {/* City Switcher & Sort */}
            <div className="flex items-center gap-3 flex-wrap">
              <CitySwitcher cities={cities} currentCity={city} locale={lang} />
              
              {/* Sort Options */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {isAr ? 'ترتيب:' : 'Sort:'}
                </span>
                <div className="flex gap-1 overflow-x-auto">
                  {sortOptions.map((option) => (
                    <Link
                      key={option.value}
                      href={`/?city=${city}&sort=${option.value}&lang=${lang}&page=1`}
                      className={`text-xs px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                        sort === option.value
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {isAr ? option.labelAr : option.labelEn}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-6" aria-live="polite">
            {isAr 
              ? `عرض ${data.pagination.totalItems} عرض` 
              : `Showing ${data.pagination.totalItems} offers`}
          </p>

          {/* Grid */}
          <Suspense fallback={<DealGridSkeleton count={24} />}>
            {data.allOffers.length > 0 ? (
              <DealGrid deals={data.allOffers} locale={lang} />
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">
                  {isAr ? 'لا توجد عروض متاحة حالياً' : 'No offers available at the moment'}
                </p>
              </div>
            )}
          </Suspense>

          {/* Pagination */}
          {data.pagination.totalPages > 1 && (
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-12">
              <div className="flex items-center gap-2">
                {page > 1 && (
                  <Button variant="outline" asChild>
                    <Link href={`/?city=${city}&page=${page - 1}&sort=${sort}&lang=${lang}`}>
                      {isAr ? (
                        <>
                          <ChevronRight className="w-4 h-4 ml-1" />
                          السابق
                        </>
                      ) : (
                        <>
                          <ChevronLeft className="w-4 h-4 mr-1" />
                          Previous
                        </>
                      )}
                    </Link>
                  </Button>
                )}

                <span className="text-sm text-muted-foreground px-4">
                  {isAr
                    ? `صفحة ${page} من ${data.pagination.totalPages}`
                    : `Page ${page} of ${data.pagination.totalPages}`}
                </span>

                {page < data.pagination.totalPages && (
                  <Button variant="outline" asChild>
                    <Link href={`/?city=${city}&page=${page + 1}&sort=${sort}&lang=${lang}`}>
                      {isAr ? (
                        <>
                          التالي
                          <ChevronLeft className="w-4 h-4 mr-1" />
                        </>
                      ) : (
                        <>
                          Next
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </Link>
                  </Button>
                )}
              </div>

              {/* Page numbers (desktop only) */}
              <div className="hidden md:flex items-center gap-1">
                {Array.from({ length: Math.min(5, data.pagination.totalPages) }, (_, i) => {
                  let pageNum: number;
                  if (data.pagination.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= data.pagination.totalPages - 2) {
                    pageNum = data.pagination.totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }

                  return (
                    <Link
                      key={pageNum}
                      href={`/?city=${city}&page=${pageNum}&sort=${sort}&lang=${lang}`}
                      className={`w-9 h-9 flex items-center justify-center rounded-md transition-colors ${
                        page === pageNum
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {pageNum}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: isAr ? `عروض ${city}` : `${city} Deals`,
              numberOfItems: data.allOffers.length,
              itemListElement: data.allOffers.slice(0, 10).map((deal, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Product',
                  name: isAr ? deal.titleAr : deal.titleEn,
                  description: isAr ? deal.descAr : deal.descEn,
                  image: deal.assets[0]?.url,
                  offers: {
                    '@type': 'Offer',
                    price: deal.priceSale,
                    priceCurrency: 'SAR',
                    availability: 'https://schema.org/InStock',
                    validThrough: deal.endsAt,
                  },
                },
              })),
            }),
          }}
        />
      </main>

      <Footer locale={lang} />
    </div>
  );
}
