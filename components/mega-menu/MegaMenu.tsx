'use client';

import { useEffect, useCallback } from 'react';
import { useMegaMenu } from '@/hooks/useMegaMenu';
import { CategoryRail } from './CategoryRail';
import { PreviewPanel } from './PreviewPanel';
import { cn } from '@/lib/utils';

interface MegaMenuProps {
  city?: string;
}

export function MegaMenu({ city = 'riyadh' }: MegaMenuProps) {
  const { isOpen, selected, close, setSelected } = useMegaMenu();

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, close]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        close();
      }
    },
    [close]
  );

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mega-menu-title"
      className={cn(
        'fixed inset-0 z-50',
        'bg-black/10 backdrop-blur-md',
        'transition-opacity duration-200',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      onClick={handleBackdropClick}
    >
      <div className="container mx-auto h-full flex items-start justify-center pt-4 md:pt-8 px-4 md:px-6">
        <div
          className={cn(
            'w-full max-w-[1200px] h-[calc(100vh-2rem)] md:h-auto',
            'bg-white rounded-3xl shadow-xl overflow-hidden',
            'min-h-[520px] max-h-[85vh]',
            'flex flex-col md:flex-row',
            'transition-transform duration-300',
            isOpen ? 'translate-y-0' : 'translate-y-8'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Right rail - Categories (RTL) */}
          <CategoryRail selected={selected} onSelect={setSelected} />

          {/* Left panel - Preview (RTL) */}
          <PreviewPanel selectedSlug={selected} city={city} onClose={close} />
        </div>
      </div>
    </div>
  );
}

