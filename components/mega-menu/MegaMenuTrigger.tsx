'use client';

import { Grid3x3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMegaMenu } from '@/hooks/useMegaMenu';
import { MegaMenu } from './MegaMenu';

interface MegaMenuTriggerProps {
  city?: string;
  isAr?: boolean;
}

export function MegaMenuTrigger({ city = 'riyadh', isAr = true }: MegaMenuTriggerProps) {
  const { open } = useMegaMenu();

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={open}
        className="flex items-center gap-2 font-medium"
        aria-label={isAr ? 'فتح قائمة الفئات' : 'Open categories menu'}
      >
        <Grid3x3 className="w-4 h-4" />
        <span>{isAr ? 'جميع الفئات' : 'All Categories'}</span>
      </Button>

      <MegaMenu city={city} />
    </>
  );
}

