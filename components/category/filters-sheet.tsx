'use client';

import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { FiltersBar } from './filters-bar';

interface FiltersSheetProps {
  citySlug: string;
  categorySlug: string;
  locale?: string;
}

export function FiltersSheet({ citySlug, categorySlug, locale = 'ar' }: FiltersSheetProps) {
  const isAr = locale === 'ar';

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          {isAr ? 'تصفية' : 'Filters'}
        </Button>
      </SheetTrigger>
      <SheetContent side={isAr ? 'right' : 'left'} className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{isAr ? 'تصفية العروض' : 'Filter Offers'}</SheetTitle>
          <SheetDescription>
            {isAr
              ? 'اختر المعايير للعثور على العروض المناسبة'
              : 'Select criteria to find suitable offers'}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <FiltersBar citySlug={citySlug} categorySlug={categorySlug} locale={locale} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

