// City slug to Arabic/English name mapping
export const cityNames: Record<string, { ar: string; en: string }> = {
  riyadh: { ar: 'الرياض', en: 'Riyadh' },
  jeddah: { ar: 'جدة', en: 'Jeddah' },
  dammam: { ar: 'الدمام', en: 'Dammam' },
  makkah: { ar: 'مكة', en: 'Makkah' },
  madinah: { ar: 'المدينة', en: 'Madinah' },
  khobar: { ar: 'الخبر', en: 'Khobar' },
  taif: { ar: 'الطائف', en: 'Taif' },
};

// Category slug to Arabic/English name mapping
export const categoryNames: Record<string, { ar: string; en: string; descAr: string; descEn: string }> = {
  'food-dining': {
    ar: 'مطاعم ومقاهي',
    en: 'Food & Dining',
    descAr: 'اكتشف أفضل المطاعم والمقاهي مع عروض حصرية وخصومات مميزة',
    descEn: 'Discover the best restaurants and cafes with exclusive deals and discounts',
  },
  'beauty-spa': {
    ar: 'الجمال والسبا',
    en: 'Beauty & Spa',
    descAr: 'عروض مميزة على صالونات التجميل والسبا وخدمات العناية',
    descEn: 'Special offers on beauty salons, spas and care services',
  },
  hotels: {
    ar: 'فنادق',
    en: 'Hotels',
    descAr: 'احجز غرفتك في أفضل الفنادق بأسعار لا تقبل المنافسة',
    descEn: 'Book your room in the best hotels at unbeatable prices',
  },
  activities: {
    ar: 'الأنشطة',
    en: 'Activities',
    descAr: 'أنشطة ترفيهية وتعليمية ومغامرات للعائلة والأصدقاء',
    descEn: 'Fun, educational and adventure activities for family and friends',
  },
  travel: {
    ar: 'السفر والسياحة',
    en: 'Travel & Tourism',
    descAr: 'باقات سفر عالمية شاملة للطيران والفنادق من السعودية',
    descEn: 'Global travel packages including flights and hotels from Saudi Arabia',
  },
  health: {
    ar: 'الصحة والعافية',
    en: 'Health & Wellness',
    descAr: 'خدمات صحية ورياضية ومراكز عناية بالصحة والعافية',
    descEn: 'Health, fitness and wellness services and care centers',
  },
  services: {
    ar: 'الخدمات',
    en: 'Services',
    descAr: 'خدمات منزلية ومهنية وصيانة وإصلاح وخدمات متنوعة',
    descEn: 'Home, professional, maintenance, repair and various services',
  },
};

// Sort options
export const sortOptions = [
  { value: 'pop', labelAr: 'الأكثر رواجًا', labelEn: 'Most Popular' },
  { value: 'new', labelAr: 'الأحدث', labelEn: 'Newest' },
  { value: 'ending', labelAr: 'ينتهي قريبًا', labelEn: 'Ending Soon' },
  { value: 'price-asc', labelAr: 'السعر: من الأقل إلى الأعلى', labelEn: 'Price: Low to High' },
  { value: 'price-desc', labelAr: 'السعر: من الأعلى إلى الأقل', labelEn: 'Price: High to Low' },
];

// Time window options
export const timeWindowOptions = [
  { value: 'today', labelAr: 'اليوم', labelEn: 'Today' },
  { value: 'week', labelAr: 'هذا الأسبوع', labelEn: 'This Week' },
  { value: 'month', labelAr: 'هذا الشهر', labelEn: 'This Month' },
];

// Category-specific facets
export const categoryFacets: Record<string, {
  cuisines?: string[];
  mealTimes?: string[];
  services?: string[];
  genders?: string[];
  stars?: string[];
  amenities?: string[];
  types?: string[];
  suitability?: string[];
}> = {
  'food-dining': {
    cuisines: ['إيطالي', 'صيني', 'هندي', 'عربي', 'أمريكي', 'ياباني', 'مكسيكي', 'لبناني', 'تركي', 'فرنسي'],
    mealTimes: ['إفطار', 'غداء', 'عشاء', 'حلويات', 'مشروبات', 'وجبات خفيفة'],
  },
  'beauty-spa': {
    services: ['قص شعر', 'صبغة', 'مساج', 'عناية بشرة', 'مكياج', 'عناية أظافر', 'حمام مغربي', 'تدليك', 'عناية قدم'],
    genders: ['رجال', 'نساء', 'مختلط'],
  },
  hotels: {
    stars: ['3 نجوم', '4 نجوم', '5 نجوم'],
    amenities: ['مسبح', 'واي فاي', 'إفطار مجاني', 'جيم', 'سبا', 'موقف سيارات', 'مطعم', 'خدمة غرف'],
  },
  activities: {
    types: ['رياضة', 'ترفيه', 'تعليمي', 'مغامرات', 'ثقافي', 'طبيعة', 'تسوق'],
    suitability: ['عائلي', 'أطفال', 'بالغين', 'مجموعات', 'فردي'],
  },
  travel: {
    types: ['رحلات', 'باقات سياحية', 'شهر عسل', 'عائلي', 'مغامرات', 'رحلات فاخرة'],
    amenities: ['طيران', 'فندق', 'تأشيرة', 'إلغاء مجاني', 'وجبات', 'مواصلات'],
  },
  health: {
    services: ['جيم', 'يوغا', 'بيلاتس', 'عيادات', 'علاج طبيعي', 'تغذية', 'تدليك علاجي', 'استشارات صحية'],
    types: ['رياضة', 'عافية', 'طبي', 'تأهيل', 'وقاية'],
    suitability: ['رجال', 'نساء', 'مختلط', 'عائلي', 'كبار السن'],
  },
  services: {
    types: ['تنظيف', 'صيانة', 'إصلاح', 'نقل', 'استشارات', 'تصميم', 'تصوير', 'طباعة', 'خياطة', 'تعليم', 'منزلية', 'مهنية', 'سيارات', 'إلكترونيات', 'تقنية', 'قانونية', 'محاسبة', 'تسويق'],
  },
};

// Get city name in specified language
export function getCityName(slug: string, lang: 'ar' | 'en' = 'ar'): string {
  return cityNames[slug]?.[lang] || slug;
}

// Get category name in specified language
export function getCategoryName(slug: string, lang: 'ar' | 'en' = 'ar'): string {
  return categoryNames[slug]?.[lang] || slug;
}

// Get category description in specified language
export function getCategoryDesc(slug: string, lang: 'ar' | 'en' = 'ar'): string {
  return categoryNames[slug]?.[lang === 'ar' ? 'descAr' : 'descEn'] || '';
}

// Get facets for a category
export function getCategoryFacets(categorySlug: string) {
  return categoryFacets[categorySlug] || {};
}

