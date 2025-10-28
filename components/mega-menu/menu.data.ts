export type MegaCategory = {
  slug: string;
  label: string;
  icon: string;
  allHref: (city: string) => string;
  chips: { label: string; facet: string }[];
  featured?: { label: string; href: string }[];
};

export const MEGA_CATEGORIES: MegaCategory[] = [
  {
    slug: 'food-dining',
    label: 'مطاعم',
    icon: 'Utensils',
    allHref: (city) => `/deals/${city}/food-dining`,
    chips: [
      { label: 'فطور و غداء', facet: 'breakfast-lunch' },
      { label: 'أطعمة آسيوية', facet: 'asian' },
      { label: 'بوفيه 5 نجوم', facet: 'buffet-5star' },
      { label: 'الشواء', facet: 'bbq' },
      { label: 'برغر', facet: 'burger' },
      { label: 'مأكولات بحرية', facet: 'seafood' },
      { label: 'بيتزا وباستا', facet: 'pizza-pasta' },
      { label: 'مأكولات هندية', facet: 'indian' },
      { label: 'كعك وحلويات', facet: 'desserts' },
      { label: 'وجبات سريعة', facet: 'fast-food' },
      { label: 'طعـام مع بركة السباحة', facet: 'pool-dining' },
      { label: 'إستراحة وكافي', facet: 'cafe' },
    ],
    featured: [
      { label: 'مطاعم وتانا', href: '/brand/vittana' },
      { label: 'دبل تري من هيلتون', href: '/brand/doubletree' },
      { label: 'كارون بلازا', href: '/brand/caron-plaza' },
    ],
  },
  {
    slug: 'beauty-spa',
    label: 'التجميل والمنتجعات',
    icon: 'Sparkles',
    allHref: (city) => `/deals/${city}/beauty-spa`,
    chips: [
      { label: 'سبا نسائي', facet: 'ladies-spa' },
      { label: 'سبا رجالي', facet: 'mens-spa' },
      { label: 'مساج', facet: 'massage' },
      { label: 'عناية بالبشرة', facet: 'facial' },
      { label: 'عناية بالشعر', facet: 'hair' },
      { label: 'مناكير وباديكير', facet: 'nails' },
      { label: 'عناية بالجسم', facet: 'body-treatment' },
      { label: 'مكياج', facet: 'makeup' },
      { label: 'إزالة شعر', facet: 'hair-removal' },
      { label: 'حمام مغربي', facet: 'moroccan-bath' },
    ],
    featured: [
      { label: 'بودي لاين', href: '/brand/bodyline' },
      { label: 'لافندر سبا', href: '/brand/lavender-spa' },
    ],
  },
  {
    slug: 'hotels',
    label: 'الفنادق',
    icon: 'Hotel',
    allHref: (city) => `/deals/${city}/hotels`,
    chips: [
      { label: 'فنادق 5 نجوم', facet: '5-star' },
      { label: 'فنادق 4 نجوم', facet: '4-star' },
      { label: 'إقامة استجمام', facet: 'staycation' },
      { label: 'شاليهات', facet: 'chalets' },
      { label: 'منتجعات صحراوية', facet: 'desert-resorts' },
      { label: 'منتجعات شاطئية', facet: 'beach-resorts' },
      { label: 'أجنحة', facet: 'suites' },
      { label: 'شقق فندقية', facet: 'hotel-apartments' },
      { label: 'نزل', facet: 'boutique' },
    ],
    featured: [
      { label: 'ريتز كارلتون', href: '/brand/ritz-carlton' },
      { label: 'فور سيزونز', href: '/brand/four-seasons' },
      { label: 'هيلتون', href: '/brand/hilton' },
    ],
  },
  {
    slug: 'activities',
    label: 'الأنشطة',
    icon: 'Ticket',
    allHref: (city) => `/deals/${city}/activities`,
    chips: [
      { label: 'مدن ترفيهية', facet: 'theme-parks' },
      { label: 'مائية ومنزلقات', facet: 'water-parks' },
      { label: 'ألعاب ومغامرات', facet: 'adventure' },
      { label: 'سينما', facet: 'cinema' },
      { label: 'بولينج', facet: 'bowling' },
      { label: 'كارتينج', facet: 'go-kart' },
      { label: 'تزلج', facet: 'skiing' },
      { label: 'ترامبولين', facet: 'trampoline' },
      { label: 'متاحف وفنون', facet: 'museums' },
      { label: 'حدائق حيوانات', facet: 'zoo' },
    ],
    featured: [
      { label: 'وينتر وندرلاند', href: '/brand/winter-wonderland' },
      { label: 'سباركيز', href: '/brand/sparky' },
    ],
  },
  {
    slug: 'travel',
    label: 'السفر',
    icon: 'CarFront',
    allHref: (city) => `/deals/${city}/travel`,
    chips: [
      { label: 'رحلات سياحية', facet: 'tours' },
      { label: 'تأجير سيارات', facet: 'car-rental' },
      { label: 'رحلات طيران', facet: 'flights' },
      { label: 'رحلات بحرية', facet: 'cruises' },
      { label: 'تأشيرات', facet: 'visas' },
      { label: 'حجز فنادق خارجية', facet: 'international-hotels' },
    ],
    featured: [],
  },
  {
    slug: 'health',
    label: 'الصحة واللياقة',
    icon: 'HeartPulse',
    allHref: (city) => `/deals/${city}/health`,
    chips: [
      { label: 'صالات رياضية', facet: 'gym' },
      { label: 'يوغا وبيلاتس', facet: 'yoga' },
      { label: 'عيادات أسنان', facet: 'dental' },
      { label: 'عيادات جلدية', facet: 'dermatology' },
      { label: 'تغذية', facet: 'nutrition' },
      { label: 'فحوصات طبية', facet: 'medical-checkup' },
    ],
    featured: [],
  },
  {
    slug: 'services',
    label: 'خدمات متنوعة',
    icon: 'Pill',
    allHref: (city) => `/deals/${city}/services`,
    chips: [
      { label: 'غسيل وتلميع سيارات', facet: 'car-wash' },
      { label: 'صيانة سيارات', facet: 'car-service' },
      { label: 'تصوير فوتوغرافي', facet: 'photography' },
      { label: 'تنظيف منازل', facet: 'home-cleaning' },
      { label: 'توصيل ونقل', facet: 'delivery' },
    ],
    featured: [],
  },
];

