import { Search, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface EmptyStateProps {
  citySlug: string;
  categorySlug: string;
  locale?: string;
  hasActiveFilters?: boolean;
}

export function EmptyState({ citySlug, categorySlug, locale = 'ar', hasActiveFilters = false }: EmptyStateProps) {
  const isAr = locale === 'ar';

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
        <Search className="w-10 h-10 text-muted-foreground" />
      </div>
      
      <h3 className="text-2xl font-bold mb-2">
        {isAr ? 'لا توجد نتائج' : 'No Results Found'}
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-md">
        {isAr
          ? 'لم نتمكن من العثور على عروض تطابق معاييرك. جرب تعديل الفلاتر أو البحث عن شيء آخر.'
          : "We couldn't find any offers matching your criteria. Try adjusting your filters or searching for something else."}
      </p>

      {hasActiveFilters ? (
        <Button asChild variant="default">
          <Link href={`/deals/${citySlug}/${categorySlug}?lang=${locale}`}>
            <RotateCcw className="w-4 h-4 ml-2 [dir=rtl]:ml-0 [dir=rtl]:mr-2" />
            {isAr ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
          </Link>
        </Button>
      ) : (
        <Button asChild variant="outline">
          <Link href={`/?city=${citySlug}&lang=${locale}`}>
            {isAr ? 'تصفح جميع العروض' : 'Browse All Offers'}
          </Link>
        </Button>
      )}
    </div>
  );
}

