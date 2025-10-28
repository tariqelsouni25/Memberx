import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Moon, Star, Utensils, ShoppingCart } from 'lucide-react';
import { TravelPackage, boardLabels, destinationLabels } from './types';
import { TravelBadges } from './TravelBadges';
import { Countdown } from '@/components/countdown';

interface TravelCardProps {
  package: TravelPackage;
  locale?: string;
}

export function TravelCard({ package: pkg, locale = 'ar' }: TravelCardProps) {
  const isAr = locale === 'ar';

  // Check if ending soon (within 48 hours)
  const isEndingSoon = pkg.endsAt.getTime() - Date.now() < 48 * 60 * 60 * 1000;

  // Get localized board label
  const boardLabel = boardLabels[pkg.board]?.[isAr ? 'ar' : 'en'] || pkg.board;
  const destLabel = destinationLabels[pkg.destination]?.[isAr ? 'ar' : 'en'] || pkg.destination;

  // Generate star symbols
  const stars = '★'.repeat(pkg.stars);

  return (
    <Link href={`/travel/${pkg.slug}`}>
      <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Image with badges */}
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          <Image
            src={pkg.images[0]}
            alt={pkg.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <TravelBadges
            flightIncluded={pkg.flightIncluded}
            freeCancel={pkg.freeCancel}
            isBestSeller={pkg.isBestSeller}
            isLimitedOffer={pkg.isLimitedOffer}
            locale={locale}
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="font-bold text-lg line-clamp-2 leading-tight">
            {pkg.title}
          </h3>

          {/* Meta row with icons */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{destLabel}</span>
            </div>
            <div className="flex items-center gap-1">
              <Moon className="w-3 h-3" />
              <span>
                {pkg.nights} {isAr ? 'ليالٍ' : 'nights'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-yellow-600 font-medium">{stars}</span>
            </div>
            <div className="flex items-center gap-1">
              <Utensils className="w-3 h-3" />
              <span>{boardLabel}</span>
            </div>
          </div>

          {/* Countdown & sold count */}
          <div className="flex items-center justify-between text-xs">
            {isEndingSoon && (
              <div className="text-red-600 font-medium">
                {isAr ? 'ينتهي خلال ' : 'Ends in '}
                <Countdown 
                  endsAt={pkg.endsAt} 
                  locale={locale} 
                  showIcon={false}
                  className="inline text-red-600"
                />
              </div>
            )}
            <div className="flex items-center gap-1 text-muted-foreground">
              <ShoppingCart className="w-3 h-3" />
              <span>
                {isAr ? `تم الحجز ${pkg.soldCount} مرة` : `${pkg.soldCount} bookings`}
              </span>
            </div>
          </div>

          {/* Price stack */}
          <div className="flex items-end justify-between pt-3 border-t">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary tabular-nums">
                  {pkg.priceSar.toLocaleString(isAr ? 'ar-SA' : 'en-US')}
                </span>
                <span className="text-xs text-muted-foreground">
                  {isAr ? 'ر.س' : 'SAR'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground line-through tabular-nums">
                  {pkg.listPriceSar.toLocaleString(isAr ? 'ar-SA' : 'en-US')}
                </span>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  {isAr ? `وفّر ${pkg.discountPct}%` : `Save ${pkg.discountPct}%`}
                </span>
              </div>
              <span className="text-xs text-muted-foreground mt-0.5">
                {isAr ? 'السعر للفرد' : 'Per person'}
              </span>
            </div>

            {/* CTA Button */}
            <Button size="sm" className="shrink-0">
              {isAr ? 'احجز الآن' : 'Book Now'}
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export function TravelCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[16/9] bg-muted animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-muted rounded animate-pulse" />
        <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
        <div className="flex gap-2">
          <div className="h-3 bg-muted rounded w-16 animate-pulse" />
          <div className="h-3 bg-muted rounded w-16 animate-pulse" />
        </div>
        <div className="h-8 bg-muted rounded w-1/2 animate-pulse" />
      </div>
    </Card>
  );
}

