import { Badge } from '@/components/ui/badge';
import { Clock, Flame, TrendingUp } from 'lucide-react';

interface KPIChipsProps {
  totalDeals: number;
  endingSoon: number;
  bestSellers: number;
  locale?: string;
}

export function KPIChips({ totalDeals, endingSoon, bestSellers, locale = 'ar' }: KPIChipsProps) {
  const isAr = locale === 'ar';

  const kpis = [
    {
      icon: TrendingUp,
      label: isAr ? 'العروض المتاحة' : 'Available Offers',
      value: totalDeals,
      variant: 'secondary' as const,
    },
    {
      icon: Clock,
      label: isAr ? 'ينتهي قريبًا' : 'Ending Soon',
      value: endingSoon,
      variant: 'destructive' as const,
    },
    {
      icon: Flame,
      label: isAr ? 'الأكثر مبيعًا' : 'Best Sellers',
      value: bestSellers,
      variant: 'default' as const,
    },
  ];

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <Badge key={index} variant={kpi.variant} className="px-3 py-1.5 gap-2">
            <Icon className="w-4 h-4" />
            <span className="font-medium">{kpi.label}:</span>
            <span className="tabular-nums font-bold">{kpi.value}</span>
          </Badge>
        );
      })}
    </div>
  );
}

