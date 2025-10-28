import { Suspense } from 'react';
import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { DealGrid, DealGridSkeleton } from '@/components/deal-grid';
import { KPIChips } from '@/components/category/kpi-chips';
import { FiltersBar } from '@/components/category/filters-bar';
import { FiltersSheet } from '@/components/category/filters-sheet';
import { ActiveFilters } from '@/components/category/active-filters';
import { EmptyState } from '@/components/category/empty-state';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getCategoryPageData } from '@/lib/data/category-page';
import { categoryPageParamsSchema } from '@/lib/schemas/category-params';
import { getCityName, getCategoryName, getCategoryDesc, sortOptions } from '@/lib/utils/category-mappers';

interface CategoryPageProps {
  params: Promise<{ city: string; category: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ params, searchParams }: CategoryPageProps): Promise<Metadata> {
  const { city: citySlug, category: categorySlug } = await params;
  const rawParams = await searchParams;
  const lang = (rawParams.lang as string) || 'ar';
  const isAr = lang === 'ar';

  const cityName = getCityName(citySlug, lang as 'ar' | 'en');
  const categoryName = getCategoryName(categorySlug, lang as 'ar' | 'en');
  const categoryDesc = getCategoryDesc(categorySlug, lang as 'ar' | 'en');

  if (isAr) {
    return {
      title: `${categoryName} – ${cityName} | Member X`,
      description: `${categoryDesc}. احجز الآن واستمتع بخصومات حصرية.`,
      keywords: [categoryName, cityName, 'عروض', 'خصومات', 'احجز الآن'],
      openGraph: {
        title: `${categoryName} – ${cityName}`,
        description: categoryDesc,
        type: 'website',
        locale: 'ar_SA',
      },
      alternates: {
        canonical: `/deals/${citySlug}/${categorySlug}`,
      },
    };
  }

  return {
    title: `${categoryName} – ${cityName} | Member X`,
    description: `${categoryDesc}. Book now and enjoy exclusive discounts.`,
    keywords: [categoryName, cityName, 'deals', 'discounts', 'book now'],
    openGraph: {
      title: `${categoryName} – ${cityName}`,
      description: categoryDesc,
      type: 'website',
      locale: 'en_US',
    },
    alternates: {
      canonical: `/deals/${citySlug}/${categorySlug}`,
    },
  };
}


export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { city: citySlug, category: categorySlug } = await params;
  const rawParams = await searchParams;

  // Parse and validate query parameters
  const validatedParams = categoryPageParamsSchema.parse({
    ...rawParams,
    page: rawParams.page || '1',
    perPage: rawParams.perPage || '24',
  });

  const isAr = validatedParams.lang === 'ar';

  // Fetch data
  const data = await getCategoryPageData(citySlug, categorySlug, validatedParams);

  if (!data) {
    notFound();
  }

  const { city, category, deals, kpis, pagination } = data;

  // Check if any filters are active
  const hasActiveFilters = Boolean(
    validatedParams.q ||
    validatedParams.priceMin ||
    validatedParams.priceMax ||
    validatedParams.dateFrom ||
    validatedParams.dateTo ||
    validatedParams.timeWindow ||
    validatedParams.cuisines ||
    validatedParams.mealTimes ||
    validatedParams.services ||
    validatedParams.genders ||
    validatedParams.stars ||
    validatedParams.amenities ||
    validatedParams.types ||
    validatedParams.suitability
  );

  // Helper to build pagination URL
  const buildPageUrl = (pageNum: number) => {
    const params = new URLSearchParams();
    Object.entries(rawParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && !Array.isArray(value)) {
        params.set(key, String(value));
      }
    });
    params.set('page', String(pageNum));
    return `/deals/${citySlug}/${categorySlug}?${params.toString()}`;
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: getCityName(citySlug, validatedParams.lang), href: `/?city=${citySlug}&lang=${validatedParams.lang}` },
    { label: getCategoryName(categorySlug, validatedParams.lang) },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={validatedParams.lang} city={citySlug} />

      <main className="flex-1">
        {/* Category Header */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-8 md:py-12 border-b">
          <div className="container mx-auto px-4">
            {/* Breadcrumbs */}
            <Breadcrumbs items={breadcrumbItems} locale={validatedParams.lang} />

            {/* Title & Description */}
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                {getCategoryName(categorySlug, validatedParams.lang)}{' '}
                {isAr ? `في ${getCityName(citySlug, 'ar')}` : `in ${getCityName(citySlug, 'en')}`}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-6">
                {getCategoryDesc(categorySlug, validatedParams.lang)}
              </p>

              {/* KPI Chips */}
              <KPIChips
                totalDeals={kpis.total}
                endingSoon={kpis.endingSoon}
                bestSellers={kpis.bestSellers}
                locale={validatedParams.lang}
              />
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar (Desktop) */}
            <aside className="hidden lg:block lg:w-72 shrink-0">
              <div className="sticky top-24">
                <FiltersBar
                  citySlug={citySlug}
                  categorySlug={categorySlug}
                  locale={validatedParams.lang}
                />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Filters Sheet (Mobile) + Sort */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b">
                <div className="flex items-center gap-3">
                  {/* Mobile Filter Sheet */}
                  <div className="lg:hidden">
                    <FiltersSheet
                      citySlug={citySlug}
                      categorySlug={categorySlug}
                      locale={validatedParams.lang}
                    />
                  </div>

                  <p className="text-sm text-muted-foreground" aria-live="polite" aria-atomic="true">
                    {pagination.totalItems} {isAr ? 'عرض' : 'offers'}
                  </p>
                </div>

                {/* Sort (visible on all screens) */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground hidden md:inline">
                    {isAr ? 'ترتيب:' : 'Sort:'}
                  </span>
                  <div className="flex gap-1 overflow-x-auto">
                    {sortOptions.slice(0, 3).map((option) => (
                      <Link
                        key={option.value}
                        href={`/deals/${citySlug}/${categorySlug}?sort=${option.value}&lang=${validatedParams.lang}&page=1`}
                        className={`text-xs px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                          validatedParams.sort === option.value
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

              {/* Active Filters Chips */}
              <ActiveFilters locale={validatedParams.lang} />

              {/* Deals Grid */}
              <Suspense fallback={<DealGridSkeleton count={24} />}>
                {deals.length > 0 ? (
                  <DealGrid deals={deals} locale={validatedParams.lang} />
                ) : (
                  <EmptyState
                    citySlug={citySlug}
                    categorySlug={categorySlug}
                    locale={validatedParams.lang}
                    hasActiveFilters={hasActiveFilters}
                  />
                )}
              </Suspense>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-12">
                  <div className="flex items-center gap-2">
                    {pagination.currentPage > 1 && (
                      <Button variant="outline" asChild>
                        <Link href={buildPageUrl(pagination.currentPage - 1)}>
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
                        ? `صفحة ${pagination.currentPage} من ${pagination.totalPages}`
                        : `Page ${pagination.currentPage} of ${pagination.totalPages}`}
                    </span>

                    {pagination.currentPage < pagination.totalPages && (
                      <Button variant="outline" asChild>
                        <Link href={buildPageUrl(pagination.currentPage + 1)}>
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
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      let pageNum: number;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (pagination.currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (pagination.currentPage >= pagination.totalPages - 2) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = pagination.currentPage - 2 + i;
                      }

                      return (
                        <Link
                          key={pageNum}
                          href={buildPageUrl(pageNum)}
                          className={`w-9 h-9 flex items-center justify-center rounded-md transition-colors ${
                            pagination.currentPage === pageNum
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
            </div>
          </div>
        </div>

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: `${getCategoryName(categorySlug, validatedParams.lang)} - ${getCityName(citySlug, validatedParams.lang)}`,
              numberOfItems: deals.length,
              itemListElement: deals.slice(0, 10).map((deal, index) => ({
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

      <Footer locale={validatedParams.lang} />
    </div>
  );
}

