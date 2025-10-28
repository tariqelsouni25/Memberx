import Link from 'next/link';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  locale?: string;
}

export function Breadcrumbs({ items, locale = 'ar' }: BreadcrumbsProps) {
  const isAr = locale === 'ar';
  const Separator = isAr ? ChevronLeft : ChevronRight;

  return (
    <nav aria-label={isAr ? 'مسار التنقل' : 'Breadcrumb'} className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        <li>
          <Link 
            href="/" 
            className="hover:text-foreground transition-colors flex items-center gap-1"
            aria-label={isAr ? 'الرئيسية' : 'Home'}
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center gap-2">
              <Separator className="w-4 h-4" />
              {item.href && !isLast ? (
                <Link 
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-foreground font-medium' : ''}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

