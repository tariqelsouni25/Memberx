'use client';

import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { sortOptions, timeWindowOptions, getCategoryFacets } from '@/lib/utils/category-mappers';
import { buildQueryString } from '@/lib/schemas/category-params';

interface FiltersBarProps {
  citySlug: string;
  categorySlug: string;
  locale?: string;
}

export function FiltersBar({ citySlug, categorySlug, locale = 'ar' }: FiltersBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAr = locale === 'ar';

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [priceMin, setPriceMin] = useState(searchParams.get('priceMin') || '');
  const [priceMax, setPriceMax] = useState(searchParams.get('priceMax') || '');

  const facets = getCategoryFacets(categorySlug);

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const toggleFacet = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    const current = params.get(key)?.split(',').filter(Boolean) || [];
    
    const index = current.indexOf(value);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(value);
    }
    
    if (current.length > 0) {
      params.set(key, current.join(','));
    } else {
      params.delete(key);
    }
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam('q', searchQuery || null);
  };

  const handlePriceFilter = () => {
    const params = new URLSearchParams(searchParams);
    if (priceMin) params.set('priceMin', priceMin);
    else params.delete('priceMin');
    if (priceMax) params.set('priceMax', priceMax);
    else params.delete('priceMax');
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const currentFacets = (key: string) => {
    return searchParams.get(key)?.split(',').filter(Boolean) || [];
  };

  return (
    <div className="bg-muted/30 rounded-lg p-6 space-y-6">
      {/* Search */}
      <div>
        <Label htmlFor="search" className="text-sm font-medium mb-2 block">
          {isAr ? 'ابحث عن عرض' : 'Search for offers'}
        </Label>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            id="search"
            type="text"
            placeholder={isAr ? 'اكتب اسم العرض أو المطعم...' : 'Type offer or restaurant name...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Search className="w-4 h-4" />
          </Button>
        </form>
      </div>

      {/* Sort */}
      <div>
        <Label className="text-sm font-medium mb-2 block">
          {isAr ? 'الترتيب' : 'Sort By'}
        </Label>
        <Select
          value={searchParams.get('sort') || 'pop'}
          onValueChange={(value) => updateParam('sort', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {isAr ? option.labelAr : option.labelEn}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-sm font-medium mb-2 block">
          {isAr ? 'السعر (ر.س)' : 'Price (SAR)'}
        </Label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder={isAr ? 'من' : 'Min'}
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            min="0"
          />
          <Input
            type="number"
            placeholder={isAr ? 'إلى' : 'Max'}
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            min="0"
          />
          <Button onClick={handlePriceFilter} variant="secondary" size="icon">
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Time Window */}
      <div>
        <Label className="text-sm font-medium mb-2 block">
          {isAr ? 'الفترة الزمنية' : 'Time Window'}
        </Label>
        <Select
          value={searchParams.get('timeWindow') || 'all'}
          onValueChange={(value) => updateParam('timeWindow', value === 'all' ? null : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder={isAr ? 'اختر الفترة' : 'Select period'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{isAr ? 'الكل' : 'All'}</SelectItem>
            {timeWindowOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {isAr ? option.labelAr : option.labelEn}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category-specific Facets */}
      {Object.entries(facets).map(([facetKey, facetValues]) => {
        const currentSelected = currentFacets(facetKey);
        const facetLabels: Record<string, { ar: string; en: string }> = {
          cuisines: { ar: 'نوع المطبخ', en: 'Cuisine Type' },
          mealTimes: { ar: 'وقت الوجبة', en: 'Meal Time' },
          services: { ar: 'الخدمات', en: 'Services' },
          genders: { ar: 'الجنس', en: 'Gender' },
          stars: { ar: 'التصنيف', en: 'Star Rating' },
          amenities: { ar: 'المرافق', en: 'Amenities' },
          types: { ar: 'النوع', en: 'Type' },
          suitability: { ar: 'مناسب لـ', en: 'Suitable For' },
        };

        return (
          <div key={facetKey}>
            <Label className="text-sm font-medium mb-3 block">
              {isAr ? facetLabels[facetKey]?.ar : facetLabels[facetKey]?.en}
            </Label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {facetValues.map((value: string) => (
                <div key={value} className="flex items-center gap-2">
                  <Checkbox
                    id={`${facetKey}-${value}`}
                    checked={currentSelected.includes(value)}
                    onCheckedChange={() => toggleFacet(facetKey, value)}
                  />
                  <Label
                    htmlFor={`${facetKey}-${value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {value}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

