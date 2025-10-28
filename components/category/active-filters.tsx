'use client';

import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { buildQueryString, parseArrayParam } from '@/lib/schemas/category-params';

interface ActiveFiltersProps {
  locale?: string;
}

export function ActiveFilters({ locale = 'ar' }: ActiveFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAr = locale === 'ar';

  const activeFilters: Array<{ key: string; value: string; label: string }> = [];

  // Price range
  const priceMin = searchParams.get('priceMin');
  const priceMax = searchParams.get('priceMax');
  if (priceMin || priceMax) {
    const min = priceMin || '0';
    const max = priceMax || '∞';
    activeFilters.push({
      key: 'price',
      value: `${min}-${max}`,
      label: isAr ? `السعر: ${min}–${max} ر.س` : `Price: ${min}–${max} SAR`,
    });
  }

  // Date range
  const dateFrom = searchParams.get('dateFrom');
  const dateTo = searchParams.get('dateTo');
  if (dateFrom || dateTo) {
    const from = dateFrom ? new Date(dateFrom).toLocaleDateString(isAr ? 'ar-SA' : 'en-US') : '...';
    const to = dateTo ? new Date(dateTo).toLocaleDateString(isAr ? 'ar-SA' : 'en-US') : '...';
    activeFilters.push({
      key: 'date',
      value: `${dateFrom}-${dateTo}`,
      label: isAr ? `التاريخ: ${from} – ${to}` : `Date: ${from} – ${to}`,
    });
  }

  // Time window
  const timeWindow = searchParams.get('timeWindow');
  if (timeWindow) {
    const labels: Record<string, { ar: string; en: string }> = {
      today: { ar: 'اليوم', en: 'Today' },
      week: { ar: 'هذا الأسبوع', en: 'This Week' },
      month: { ar: 'هذا الشهر', en: 'This Month' },
    };
    activeFilters.push({
      key: 'timeWindow',
      value: timeWindow,
      label: isAr ? labels[timeWindow]?.ar || timeWindow : labels[timeWindow]?.en || timeWindow,
    });
  }

  // Search query
  const q = searchParams.get('q');
  if (q) {
    activeFilters.push({
      key: 'q',
      value: q,
      label: isAr ? `البحث: "${q}"` : `Search: "${q}"`,
    });
  }

  // Category facets
  const facetKeys = ['cuisines', 'mealTimes', 'services', 'genders', 'stars', 'amenities', 'types', 'suitability'];
  facetKeys.forEach((key) => {
    const param = searchParams.get(key);
    if (param) {
      const values = parseArrayParam(param);
      values.forEach((value) => {
        activeFilters.push({
          key,
          value,
          label: value,
        });
      });
    }
  });

  const removeFilter = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams);

    if (key === 'price') {
      params.delete('priceMin');
      params.delete('priceMax');
    } else if (key === 'date') {
      params.delete('dateFrom');
      params.delete('dateTo');
    } else if (value && facetKeys.includes(key)) {
      // Remove specific value from array param
      const current = parseArrayParam(params.get(key) || '');
      const updated = current.filter((v) => v !== value);
      if (updated.length > 0) {
        params.set(key, updated.join(','));
      } else {
        params.delete(key);
      }
    } else {
      params.delete(key);
    }

    params.set('page', '1'); // Reset to first page
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAll = () => {
    const params = new URLSearchParams(searchParams);
    // Keep only lang and sort
    const lang = params.get('lang');
    const sort = params.get('sort');
    
    const newParams = new URLSearchParams();
    if (lang) newParams.set('lang', lang);
    if (sort) newParams.set('sort', sort);
    newParams.set('page', '1');

    router.push(`${pathname}?${newParams.toString()}`);
  };

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 flex-wrap mb-6 pb-4 border-b">
      <span className="text-sm text-muted-foreground">
        {isAr ? 'الفلاتر النشطة:' : 'Active Filters:'}
      </span>
      
      {activeFilters.map((filter, index) => (
        <Badge
          key={`${filter.key}-${filter.value}-${index}`}
          variant="secondary"
          className="gap-2 pl-2 pr-3 py-1.5 [dir=rtl]:pl-3 [dir=rtl]:pr-2"
        >
          <button
            onClick={() => removeFilter(filter.key, filter.value)}
            className="hover:bg-muted-foreground/20 rounded-full p-0.5"
            aria-label={isAr ? `إزالة ${filter.label}` : `Remove ${filter.label}`}
          >
            <X className="w-3 h-3" />
          </button>
          <span className="text-xs">{filter.label}</span>
        </Badge>
      ))}

      <Button
        variant="ghost"
        size="sm"
        onClick={clearAll}
        className="text-xs h-auto py-1"
      >
        {isAr ? 'مسح الكل' : 'Clear All'}
      </Button>
    </div>
  );
}

