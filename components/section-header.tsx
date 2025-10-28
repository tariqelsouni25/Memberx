import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  viewAllHref?: string;
  viewAllText?: string;
  locale?: string;
}

export function SectionHeader({ 
  title, 
  viewAllHref, 
  viewAllText,
  locale = 'ar' 
}: SectionHeaderProps) {
  const isAr = locale === 'ar';
  const defaultViewAllText = isAr ? 'شاهد الكل' : 'View All';

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      {viewAllHref && (
        <Link 
          href={viewAllHref}
          className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-medium"
        >
          <span>{viewAllText || defaultViewAllText}</span>
          {isAr ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </Link>
      )}
    </div>
  );
}

