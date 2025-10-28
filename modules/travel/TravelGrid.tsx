import { TravelCard, TravelCardSkeleton } from './TravelCard';
import { TravelPackage } from './types';

interface TravelGridProps {
  packages: TravelPackage[];
  locale?: string;
}

export function TravelGrid({ packages, locale = 'ar' }: TravelGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {packages.map((pkg) => (
        <TravelCard key={pkg.slug} package={pkg} locale={locale} />
      ))}
    </div>
  );
}

export function TravelGridSkeleton({ count = 24 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <TravelCardSkeleton key={idx} />
      ))}
    </div>
  );
}

