import Link from 'next/link';
import { UtensilsCrossed, Sparkles, Hotel, PartyPopper } from 'lucide-react';

interface CategoryTilesProps {
  city?: string;
  locale?: string;
}

export function CategoryTiles({ city = 'riyadh', locale = 'ar' }: CategoryTilesProps) {
  const isAr = locale === 'ar';

  const categories = [
    {
      slug: 'food-dining',
      nameAr: 'مطاعم ومقاهي',
      nameEn: 'Food & Dining',
      icon: UtensilsCrossed,
      gradient: 'from-orange-500 to-red-500',
    },
    {
      slug: 'beauty-spa',
      nameAr: 'الجمال والسبا',
      nameEn: 'Beauty & Spa',
      icon: Sparkles,
      gradient: 'from-pink-500 to-purple-500',
    },
    {
      slug: 'hotels',
      nameAr: 'فنادق',
      nameEn: 'Hotels',
      icon: Hotel,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      slug: 'activities',
      nameAr: 'الأنشطة',
      nameEn: 'Activities',
      icon: PartyPopper,
      gradient: 'from-green-500 to-teal-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <Link
            key={category.slug}
            href={`/deals/${city}/${category.slug}`}
            className="group relative overflow-hidden rounded-2xl aspect-square bg-gradient-to-br hover:scale-105 transition-transform duration-300"
            style={{
              backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
            }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90 group-hover:opacity-100 transition-opacity`} />
            <div className="relative h-full flex flex-col items-center justify-center p-6 text-white">
              <Icon className="w-12 h-12 md:w-16 md:h-16 mb-3" strokeWidth={1.5} />
              <h3 className="text-base md:text-lg font-bold text-center">
                {isAr ? category.nameAr : category.nameEn}
              </h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

