'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ChipProps {
  label: string;
  href: string;
  onClick?: () => void;
}

export function Chip({ label, href, onClick }: ChipProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center',
        'rounded-full px-4 py-2',
        'bg-slate-100 hover:bg-slate-200',
        'text-sm font-medium text-slate-700',
        'transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'truncate max-w-full'
      )}
    >
      {label}
    </Link>
  );
}

