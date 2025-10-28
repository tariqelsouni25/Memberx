import { DealCard, DealCardSkeleton } from '@/components/deal-card';

interface DealGridProps {
  deals: any[];
  locale?: string;
  showCountdown?: boolean;
}

export function DealGrid({ deals, locale = 'ar', showCountdown = false }: DealGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {deals.map((deal) => (
        <DealCard
          key={deal.id}
          slug={deal.slug}
          image={deal.assets[0]?.url || '/placeholder-deal.jpg'}
          titleAr={deal.titleAr}
          titleEn={deal.titleEn}
          vendorNameAr={deal.vendor.nameAr}
          vendorNameEn={deal.vendor.nameEn}
          priceOriginal={deal.priceOriginal}
          priceSale={deal.priceSale}
          discountPct={deal.discountPct}
          badges={deal.badges}
          cityNameAr={deal.city?.nameAr}
          cityNameEn={deal.city?.nameEn}
          categoryNameAr={deal.category?.nameAr}
          categoryNameEn={deal.category?.nameEn}
          endsAt={deal.endsAt}
          soldCount={deal.orderCount}
          showCountdown={showCountdown}
          locale={locale}
        />
      ))}
    </div>
  );
}

export function DealGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <DealCardSkeleton key={idx} />
      ))}
    </div>
  );
}

