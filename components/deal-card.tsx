import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { BadgeType } from '@prisma/client';
import { Clock, MapPin, ShoppingCart } from 'lucide-react';
import { Countdown } from '@/components/countdown';

interface DealCardProps {
  slug: string;
  image: string;
  titleAr: string;
  titleEn: string;
  vendorNameAr: string;
  vendorNameEn: string;
  priceOriginal: number;
  priceSale: number;
  discountPct?: number;
  badges: BadgeType[];
  cityNameAr?: string;
  cityNameEn?: string;
  categoryNameAr?: string;
  categoryNameEn?: string;
  endsAt?: Date;
  soldCount?: number;
  showCountdown?: boolean;
  locale?: string;
}

export function DealCard({
  slug,
  image,
  titleAr,
  titleEn,
  vendorNameAr,
  vendorNameEn,
  priceOriginal,
  priceSale,
  discountPct,
  badges,
  cityNameAr,
  cityNameEn,
  categoryNameAr,
  categoryNameEn,
  endsAt,
  soldCount,
  showCountdown = false,
  locale = 'ar',
}: DealCardProps) {
  const isAr = locale === 'ar';
  const title = isAr ? titleAr : titleEn;
  const vendorName = isAr ? vendorNameAr : vendorNameEn;
  const cityName = isAr ? cityNameAr : cityNameEn;
  const categoryName = isAr ? categoryNameAr : categoryNameEn;
  const discount = discountPct || calculateDiscount(priceOriginal, priceSale);

  // Check if deal is ending soon (within 48 hours)
  const isEndingSoon = endsAt && (new Date(endsAt).getTime() - Date.now()) < 48 * 60 * 60 * 1000;

  const getBadgeVariant = (badge: BadgeType): any => {
    const map: Record<BadgeType, string> = {
      HOT: 'hot',
      BEST_SELLER: 'bestSeller',
      FLASH: 'flash',
      DISCOUNT: 'discount',
      NEW: 'new',
    };
    return map[badge] || 'default';
  };

  const getBadgeLabel = (badge: BadgeType): string => {
    if (locale === 'ar') {
      const labels: Record<BadgeType, string> = {
        HOT: 'ساخن',
        BEST_SELLER: 'الأكثر مبيعاً',
        FLASH: 'عرض خاطف',
        DISCOUNT: `خصم ${discount}%`,
        NEW: 'جديد',
      };
      return labels[badge];
    } else {
      const labels: Record<BadgeType, string> = {
        HOT: 'Hot',
        BEST_SELLER: 'Best Seller',
        FLASH: 'Flash',
        DISCOUNT: `${discount}% OFF`,
        NEW: 'New',
      };
      return labels[badge];
    }
  };

  return (
    <Link href={`/deal/${slug}`}>
      <Card className="deal-card overflow-hidden group cursor-pointer">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {badges.length > 0 && (
            <div className="absolute top-3 right-3 flex flex-col gap-2 [dir=rtl]:right-auto [dir=rtl]:left-3">
              {badges.map((badge, idx) => (
                <Badge key={idx} variant={getBadgeVariant(badge) as any}>
                  {getBadgeLabel(badge)}
                </Badge>
              ))}
            </div>
          )}
          {showCountdown && endsAt && isEndingSoon && (
            <div className="absolute bottom-3 left-3 bg-red-600/90 text-white px-3 py-1.5 rounded-full text-xs [dir=rtl]:left-auto [dir=rtl]:right-3">
              <Countdown endsAt={endsAt} locale={locale} className="text-white" />
            </div>
          )}
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-2 mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{vendorName}</p>
          </div>

          {/* Category & City chips */}
          <div className="flex items-center gap-2 flex-wrap">
            {categoryName && (
              <span className="text-xs bg-muted px-2 py-1 rounded-full">
                {categoryName}
              </span>
            )}
            {cityName && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{cityName}</span>
              </div>
            )}
          </div>

          <div className="flex items-baseline justify-between pt-2">
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary tabular-nums">{formatPrice(priceSale)}</span>
                <span className="text-sm text-muted-foreground line-through tabular-nums">{formatPrice(priceOriginal)}</span>
              </div>
              <div className="text-sm font-medium text-green-600">
                {isAr ? 'وفّر' : 'Save'} {discount}%
              </div>
            </div>
          </div>

          {/* Sold count */}
          {soldCount && soldCount > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-2 border-t">
              <ShoppingCart className="w-3 h-3" />
              <span>
                {isAr ? `تم بيع ${soldCount}` : `${soldCount} sold`}
              </span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}

export function DealCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/3] bg-muted animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <div className="h-5 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
        </div>
        <div className="h-8 bg-muted rounded w-1/2 animate-pulse" />
      </div>
    </Card>
  );
}

