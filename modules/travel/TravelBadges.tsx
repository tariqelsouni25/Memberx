import { Badge } from '@/components/ui/badge';
import { Plane, X, Award, Clock } from 'lucide-react';

interface TravelBadgesProps {
  flightIncluded: boolean;
  freeCancel: boolean;
  isBestSeller: boolean;
  isLimitedOffer: boolean;
  locale?: string;
}

export function TravelBadges({
  flightIncluded,
  freeCancel,
  isBestSeller,
  isLimitedOffer,
  locale = 'ar',
}: TravelBadgesProps) {
  const isAr = locale === 'ar';

  return (
    <div className="absolute top-3 left-3 flex flex-col gap-2 z-10 [dir=rtl]:left-auto [dir=rtl]:right-3">
      {flightIncluded ? (
        <Badge className="bg-blue-600 hover:bg-blue-700 text-white gap-1">
          <Plane className="w-3 h-3" />
          {isAr ? 'يشمل الطيران' : 'Flight Included'}
        </Badge>
      ) : (
        <Badge variant="secondary" className="gap-1">
          <X className="w-3 h-3" />
          {isAr ? 'لا يشمل الطيران' : 'No Flight'}
        </Badge>
      )}

      {freeCancel && (
        <Badge className="bg-green-600 hover:bg-green-700 text-white">
          {isAr ? 'إلغاء مجاني' : 'Free Cancel'}
        </Badge>
      )}

      {isBestSeller && (
        <Badge className="bg-yellow-600 hover:bg-yellow-700 text-white gap-1">
          <Award className="w-3 h-3" />
          {isAr ? 'الأكثر مبيعًا' : 'Best Seller'}
        </Badge>
      )}

      {isLimitedOffer && (
        <Badge className="bg-red-600 hover:bg-red-700 text-white gap-1">
          <Clock className="w-3 h-3" />
          {isAr ? 'عرض محدود' : 'Limited Offer'}
        </Badge>
      )}
    </div>
  );
}

