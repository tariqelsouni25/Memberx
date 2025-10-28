'use client';

import { useEffect, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import { MEGA_CATEGORIES, MegaCategory } from './menu.data';

interface CategoryRailProps {
  selected: string | null;
  onSelect: (slug: string) => void;
}

export function CategoryRail({ selected, onSelect }: CategoryRailProps) {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-select first category on mount
    if (!selected && MEGA_CATEGORIES.length > 0) {
      onSelect(MEGA_CATEGORIES[0].slug);
    }
  }, [selected, onSelect]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (index + 1) % MEGA_CATEGORIES.length;
      onSelect(MEGA_CATEGORIES[next].slug);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (index - 1 + MEGA_CATEGORIES.length) % MEGA_CATEGORIES.length;
      onSelect(MEGA_CATEGORIES[prev].slug);
    }
  };

  return (
    <div
      ref={railRef}
      className="w-full md:w-[340px] bg-white md:bg-slate-50/50 border-l border-slate-200 overflow-y-auto"
      role="menu"
      aria-label="فئات القائمة"
    >
      {MEGA_CATEGORIES.map((category, index) => {
        const Icon = (LucideIcons as any)[category.icon] || LucideIcons.Circle;
        const isActive = selected === category.slug;

        return (
          <button
            key={category.slug}
            role="menuitem"
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(category.slug)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onMouseEnter={() => onSelect(category.slug)}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-4 h-[60px]',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary',
              isActive
                ? 'bg-slate-50 border-s-4 border-primary font-semibold'
                : 'hover:bg-slate-50/50 border-s-4 border-transparent'
            )}
          >
            {/* Icon at far right (RTL) */}
            <Icon className={cn('w-5 h-5 flex-shrink-0', isActive ? 'text-primary' : 'text-slate-500')} />

            {/* Label */}
            <span className={cn('flex-1 text-right text-sm', isActive ? 'text-slate-900' : 'text-slate-700')}>
              {category.label}
            </span>

            {/* Active indicator dot */}
            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}

            {/* Chevron at left (RTL) */}
            <ChevronLeft
              className={cn('w-4 h-4 flex-shrink-0 transition-opacity', isActive ? 'opacity-100' : 'opacity-0')}
            />
          </button>
        );
      })}
    </div>
  );
}

