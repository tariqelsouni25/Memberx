import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TravelPaginationProps {
  currentPage: number;
  totalPages: number;
  buildPageUrl: (page: number) => string;
  locale?: string;
}

export function TravelPagination({
  currentPage,
  totalPages,
  buildPageUrl,
  locale = 'ar',
}: TravelPaginationProps) {
  const isAr = locale === 'ar';

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-12">
      <div className="flex items-center gap-2">
        {currentPage > 1 && (
          <Button variant="outline" asChild>
            <Link href={buildPageUrl(currentPage - 1)}>
              {isAr ? (
                <>
                  <ChevronRight className="w-4 h-4 ml-1" />
                  السابق
                </>
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </>
              )}
            </Link>
          </Button>
        )}

        <span className="text-sm text-muted-foreground px-4">
          {isAr
            ? `صفحة ${currentPage} من ${totalPages}`
            : `Page ${currentPage} of ${totalPages}`}
        </span>

        {currentPage < totalPages && (
          <Button variant="outline" asChild>
            <Link href={buildPageUrl(currentPage + 1)}>
              {isAr ? (
                <>
                  التالي
                  <ChevronLeft className="w-4 h-4 mr-1" />
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Link>
          </Button>
        )}
      </div>

      {/* Page numbers (desktop only) */}
      <div className="hidden md:flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum: number;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <Link
              key={pageNum}
              href={buildPageUrl(pageNum)}
              className={`w-9 h-9 flex items-center justify-center rounded-md transition-colors ${
                currentPage === pageNum
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

