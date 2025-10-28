'use client';

import { useEffect, useRef } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Chip } from './Chip';
import { MEGA_CATEGORIES } from './menu.data';

interface PreviewPanelProps {
  selectedSlug: string | null;
  city: string;
  onClose: () => void;
}

export function PreviewPanel({ selectedSlug, city, onClose }: PreviewPanelProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const category = MEGA_CATEGORIES.find((c) => c.slug === selectedSlug);

  useEffect(() => {
    // Announce category change to screen readers
    if (titleRef.current && category) {
      titleRef.current.focus();
    }
  }, [category]);

  if (!category) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <p className="text-slate-500">اختر فئة لعرض التفاصيل</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      {/* Top bar with close button */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <span className="text-sm text-slate-500">القائمة الرئيسية</span>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="إغلاق القائمة">
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Heading group */}
        <div className="flex items-center justify-between gap-4">
          <h3
            ref={titleRef}
            tabIndex={-1}
            className="text-2xl font-bold text-slate-900"
            aria-live="polite"
            aria-atomic="true"
          >
            {category.label}
          </h3>
          <a
            href={category.allHref(city)}
            onClick={onClose}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <span>شاهد الكل</span>
            <ArrowLeft className="w-4 h-4" />
          </a>
        </div>

        {/* Chips grid - subcategories */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-3">الفئات الفرعية</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {category.chips.map((chip) => (
              <Chip
                key={chip.facet}
                label={chip.label}
                href={`/deals/${city}/${category.slug}?facet=${chip.facet}`}
                onClick={onClose}
              />
            ))}
          </div>
        </div>

        {/* Featured brands */}
        {category.featured && category.featured.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">ماركات مميزة</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {category.featured.map((brand) => (
                <Chip key={brand.href} label={brand.label} href={brand.href} onClick={onClose} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

