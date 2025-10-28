import { Breadcrumbs } from '@/components/breadcrumbs';
import { KPIChips } from '@/components/category/kpi-chips';

interface TravelHeaderProps {
  totalDeals: number;
  endingSoon: number;
  bestSellers: number;
  locale?: string;
}

export function TravelHeader({
  totalDeals,
  endingSoon,
  bestSellers,
  locale = 'ar',
}: TravelHeaderProps) {
  const isAr = locale === 'ar';

  const breadcrumbItems = [
    { label: isAr ? 'العروض العالمية' : 'Global Deals', href: '/' },
    { label: isAr ? 'السفر' : 'Travel' },
  ];

  return (
    <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-8 md:py-12 border-b">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} locale={locale} />

        {/* Title & Description */}
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {isAr ? 'عروض السفر – السعودية' : 'Travel Deals – Saudi Arabia'}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-6">
            {isAr
              ? 'اكتشف أفضل باقات السفر العالمية من السعودية: يشمل الطيران، فنادق حتى 5 نجوم، وإلغاء مجاني حيث يتوفر.'
              : 'Discover the best global travel packages from Saudi Arabia: flights included, hotels up to 5 stars, and free cancellation where available.'}
          </p>

          {/* KPI Chips */}
          <KPIChips
            totalDeals={totalDeals}
            endingSoon={endingSoon}
            bestSellers={bestSellers}
            locale={locale}
          />
        </div>
      </div>
    </section>
  );
}

