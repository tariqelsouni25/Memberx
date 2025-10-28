import { TravelPackage, TravelParams, TravelPageData, parseArrayParam } from './types';

// Mock travel packages data
const mockTravelPackages: TravelPackage[] = [
  {
    slug: 'dubai-5-nights-4-stars',
    title: 'دبي: باقة 5 ليالٍ في فندق 4 نجوم مع إفطار',
    destination: 'dubai',
    nights: 5,
    stars: 4,
    board: 'breakfast',
    flightIncluded: true,
    visaIncluded: true,
    freeCancel: true,
    airline: 'الخطوط السعودية',
    depCity: 'riyadh',
    priceSar: 2499,
    listPriceSar: 3500,
    discountPct: 29,
    endsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    soldCount: 156,
    images: ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop'],
    pkgType: ['family', 'weekend'],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    isBestSeller: true,
    isLimitedOffer: true,
  },
  {
    slug: 'bali-7-nights-5-stars',
    title: 'بالي: باقة 7 ليالٍ في منتجع 5 نجوم شامل كليًا',
    destination: 'bali',
    nights: 7,
    stars: 5,
    board: 'all-inclusive',
    flightIncluded: true,
    visaIncluded: false,
    freeCancel: false,
    airline: 'طيران ناس',
    depCity: 'jeddah',
    priceSar: 5999,
    listPriceSar: 8500,
    discountPct: 29,
    endsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    soldCount: 89,
    images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop'],
    pkgType: ['honeymoon', 'luxury'],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    isBestSeller: true,
    isLimitedOffer: false,
  },
  {
    slug: 'trabzon-4-nights-3-stars',
    title: 'طرابزون: باقة 4 ليالٍ في فندق 3 نجوم مع نصف إقامة',
    destination: 'trabzon',
    nights: 4,
    stars: 3,
    board: 'half-board',
    flightIncluded: true,
    visaIncluded: true,
    freeCancel: true,
    airline: 'فلاي دبي',
    depCity: 'riyadh',
    priceSar: 1899,
    listPriceSar: 2600,
    discountPct: 27,
    endsAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    soldCount: 234,
    images: ['https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=600&fit=crop'],
    pkgType: ['family', 'budget'],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    isBestSeller: false,
    isLimitedOffer: true,
  },
  {
    slug: 'georgia-5-nights-4-stars',
    title: 'جورجيا: باقة 5 ليالٍ في تبليسي وباتومي - فنادق 4 نجوم',
    destination: 'georgia',
    nights: 5,
    stars: 4,
    board: 'breakfast',
    flightIncluded: true,
    visaIncluded: true,
    freeCancel: true,
    airline: 'الخطوط السعودية',
    depCity: 'dammam',
    priceSar: 3299,
    listPriceSar: 4200,
    discountPct: 21,
    endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    soldCount: 112,
    images: ['https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&h=600&fit=crop'],
    pkgType: ['family', 'weekend'],
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    isBestSeller: true,
    isLimitedOffer: false,
  },
  {
    slug: 'cairo-3-nights-5-stars',
    title: 'القاهرة: باقة 3 ليالٍ في فندق 5 نجوم على النيل',
    destination: 'cairo',
    nights: 3,
    stars: 5,
    board: 'full-board',
    flightIncluded: true,
    visaIncluded: false,
    freeCancel: false,
    airline: 'مصر للطيران',
    depCity: 'riyadh',
    priceSar: 1799,
    listPriceSar: 2400,
    discountPct: 25,
    endsAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    soldCount: 178,
    images: ['https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&h=600&fit=crop'],
    pkgType: ['family', 'weekend'],
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    isBestSeller: false,
    isLimitedOffer: false,
  },
  {
    slug: 'azerbaijan-6-nights-4-stars',
    title: 'أذربيجان: باقة 6 ليالٍ في باكو وقوبا - فنادق 4 نجوم',
    destination: 'azerbaijan',
    nights: 6,
    stars: 4,
    board: 'breakfast',
    flightIncluded: true,
    visaIncluded: true,
    freeCancel: true,
    airline: 'طيران العربية',
    depCity: 'jeddah',
    priceSar: 2899,
    listPriceSar: 3800,
    discountPct: 24,
    endsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    soldCount: 145,
    images: ['https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=600&fit=crop'],
    pkgType: ['family', 'honeymoon'],
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    isBestSeller: true,
    isLimitedOffer: true,
  },
  {
    slug: 'sharm-4-nights-5-stars',
    title: 'شرم الشيخ: باقة 4 ليالٍ في منتجع 5 نجوم شامل كليًا',
    destination: 'sharm',
    nights: 4,
    stars: 5,
    board: 'all-inclusive',
    flightIncluded: true,
    visaIncluded: false,
    freeCancel: true,
    airline: 'مصر للطيران',
    depCity: 'riyadh',
    priceSar: 2399,
    listPriceSar: 3200,
    discountPct: 25,
    endsAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    soldCount: 201,
    images: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop'],
    pkgType: ['family', 'luxury'],
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    isBestSeller: true,
    isLimitedOffer: false,
  },
  {
    slug: 'istanbul-5-nights-4-stars',
    title: 'إسطنبول: باقة 5 ليالٍ في فندق 4 نجوم وسط المدينة',
    destination: 'istanbul',
    nights: 5,
    stars: 4,
    board: 'breakfast',
    flightIncluded: true,
    visaIncluded: true,
    freeCancel: false,
    airline: 'الخطوط التركية',
    depCity: 'dammam',
    priceSar: 2699,
    listPriceSar: 3500,
    discountPct: 23,
    endsAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    soldCount: 167,
    images: ['https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=600&fit=crop'],
    pkgType: ['family', 'weekend'],
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    isBestSeller: false,
    isLimitedOffer: false,
  },
  {
    slug: 'maldives-7-nights-5-stars',
    title: 'المالديف: باقة 7 ليالٍ في منتجع مائي 5 نجوم شامل كليًا',
    destination: 'maldives',
    nights: 7,
    stars: 5,
    board: 'all-inclusive',
    flightIncluded: true,
    visaIncluded: true,
    freeCancel: false,
    airline: 'الخطوط السعودية',
    depCity: 'riyadh',
    priceSar: 9999,
    listPriceSar: 14000,
    discountPct: 29,
    endsAt: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
    soldCount: 45,
    images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop'],
    pkgType: ['honeymoon', 'luxury'],
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    isBestSeller: true,
    isLimitedOffer: true,
  },
  {
    slug: 'thailand-10-nights-4-stars',
    title: 'تايلاند: باقة 10 ليالٍ (بانكوك + بوكيت) - فنادق 4 نجوم',
    destination: 'thailand',
    nights: 10,
    stars: 4,
    board: 'breakfast',
    flightIncluded: true,
    visaIncluded: false,
    freeCancel: true,
    airline: 'طيران ناس',
    depCity: 'jeddah',
    priceSar: 4599,
    listPriceSar: 6000,
    discountPct: 23,
    endsAt: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
    soldCount: 98,
    images: ['https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600&fit=crop'],
    pkgType: ['family', 'honeymoon'],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    isBestSeller: false,
    isLimitedOffer: false,
  },
  // Add more packages...
];

// Duplicate and modify some packages to reach 60+ items
for (let i = 0; i < 50; i++) {
  const base = mockTravelPackages[i % mockTravelPackages.length];
  mockTravelPackages.push({
    ...base,
    slug: `${base.slug}-${i}`,
    priceSar: base.priceSar + Math.floor(Math.random() * 1000),
    listPriceSar: base.listPriceSar + Math.floor(Math.random() * 1500),
    soldCount: Math.floor(Math.random() * 300),
    endsAt: new Date(Date.now() + Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000),
    isBestSeller: Math.random() > 0.7,
    isLimitedOffer: Math.random() > 0.6,
  });
}

export async function getTravelPageData(params: TravelParams): Promise<TravelPageData> {
  // Parse filters
  const destinations = parseArrayParam(params.dest);
  const nightsFilter = parseArrayParam(params.nights).map(Number);
  const starsFilter = parseArrayParam(params.stars).map(Number);
  const boardFilter = parseArrayParam(params.board);
  const depCityFilter = parseArrayParam(params.depCity);
  const airlineFilter = parseArrayParam(params.airline);
  const pkgTypeFilter = parseArrayParam(params.pkgType);

  // Filter packages
  let filtered = mockTravelPackages.filter((pkg) => {
    // Search
    if (params.q && !pkg.title.toLowerCase().includes(params.q.toLowerCase())) {
      return false;
    }

    // Destination
    if (destinations.length > 0 && !destinations.includes(pkg.destination)) {
      return false;
    }

    // Nights
    if (nightsFilter.length > 0 && !nightsFilter.includes(pkg.nights)) {
      return false;
    }

    // Stars
    if (starsFilter.length > 0 && !starsFilter.includes(pkg.stars)) {
      return false;
    }

    // Board
    if (boardFilter.length > 0 && !boardFilter.includes(pkg.board)) {
      return false;
    }

    // Flight included
    if (params.flightIncluded === 'yes' && !pkg.flightIncluded) return false;
    if (params.flightIncluded === 'no' && pkg.flightIncluded) return false;

    // Visa included
    if (params.visaIncluded === 'yes' && !pkg.visaIncluded) return false;
    if (params.visaIncluded === 'no' && pkg.visaIncluded) return false;

    // Free cancel
    if (params.freeCancel === 'yes' && !pkg.freeCancel) return false;
    if (params.freeCancel === 'no' && pkg.freeCancel) return false;

    // Departure city
    if (depCityFilter.length > 0 && !depCityFilter.includes(pkg.depCity)) {
      return false;
    }

    // Airline
    if (airlineFilter.length > 0 && pkg.airline && !airlineFilter.includes(pkg.airline)) {
      return false;
    }

    // Package type
    if (pkgTypeFilter.length > 0 && !pkgTypeFilter.some((type) => pkg.pkgType.includes(type))) {
      return false;
    }

    // Price range
    if (params.priceMin && pkg.priceSar < params.priceMin) return false;
    if (params.priceMax && pkg.priceSar > params.priceMax) return false;

    // Date range (approximate - just check if package expires within range)
    if (params.dateFrom && pkg.endsAt < new Date(params.dateFrom)) return false;
    if (params.dateTo && pkg.endsAt > new Date(params.dateTo)) return false;

    return true;
  });

  // Sort
  switch (params.sort) {
    case 'pop':
      filtered.sort((a, b) => b.soldCount - a.soldCount);
      break;
    case 'new':
      filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      break;
    case 'ending':
      filtered.sort((a, b) => a.endsAt.getTime() - b.endsAt.getTime());
      break;
    case 'price-asc':
      filtered.sort((a, b) => a.priceSar - b.priceSar);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.priceSar - a.priceSar);
      break;
  }

  // Pagination
  const total = filtered.length;
  const totalPages = Math.ceil(total / params.perPage);
  const skip = (params.page - 1) * params.perPage;
  const items = filtered.slice(skip, skip + params.perPage);

  // Calculate KPIs
  const now = Date.now();
  const twoDaysFromNow = now + 2 * 24 * 60 * 60 * 1000;
  const endingSoon = filtered.filter((pkg) => pkg.endsAt.getTime() < twoDaysFromNow).length;
  const bestSellers = filtered.filter((pkg) => pkg.isBestSeller).length;

  return {
    items,
    total,
    page: params.page,
    perPage: params.perPage,
    totalPages,
    kpis: {
      available: total,
      endingSoon,
      bestSellers,
    },
  };
}

