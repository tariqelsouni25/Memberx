'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { MapPin } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface City {
  slug: string;
  nameAr: string;
  nameEn: string;
}

interface CitySwitcherProps {
  cities: City[];
  currentCity: string;
  locale?: string;
}

export function CitySwitcher({ cities, currentCity, locale = 'ar' }: CitySwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAr = locale === 'ar';

  const current = cities.find(c => c.slug === currentCity);
  const currentName = current ? (isAr ? current.nameAr : current.nameEn) : currentCity;

  const handleCityChange = (newCity: string) => {
    // Preserve search params but reset page to 1
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    
    // Replace city in pathname
    const newPath = pathname.replace(`/${currentCity}`, `/${newCity}`);
    router.push(`${newPath}?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <MapPin className="w-4 h-4" />
          <span>{currentName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isAr ? 'start' : 'end'}>
        {cities.map((city) => (
          <DropdownMenuItem
            key={city.slug}
            onClick={() => handleCityChange(city.slug)}
            className={currentCity === city.slug ? 'bg-muted' : ''}
          >
            {isAr ? city.nameAr : city.nameEn}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

