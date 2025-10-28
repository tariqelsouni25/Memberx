import { db } from '@/lib/db';
import { HeroSlide } from '@/components/hero-carousel';

export interface HomepageData {
  heroSlides: HeroSlide[];
  hotNow: any[];
  allOffers: any[];
  bannersTop: any[];
  bannersMid: any[];
  categories: any[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}

export interface HomepageParams {
  city: string;
  lang?: string;
  page?: number;
  perPage?: number;
  sort?: string;
}

export async function getHomepageData(params: HomepageParams): Promise<HomepageData | null> {
  const { city, lang = 'ar', page = 1, perPage = 24, sort = 'popular' } = params;

  try {
    // Get city data
    const cityData = await db.city.findUnique({
      where: { slug: city },
    });

    if (!cityData) return null;

    // Get hero banners
    const heroBanners = await db.banner.findMany({
      where: {
        placement: 'hero',
        status: 'PUBLISHED',
        OR: [
          { cityTargets: { isEmpty: true } },
          { cityTargets: { has: city } },
        ],
      },
      orderBy: { priority: 'desc' },
      take: 3,
    });

    const heroSlides: HeroSlide[] = heroBanners.map((banner) => ({
      id: banner.id,
      imageUrl: banner.imageUrl,
      titleAr: banner.titleAr,
      titleEn: banner.titleEn,
      subtitleAr: banner.subtitleAr || undefined,
      subtitleEn: banner.subtitleEn || undefined,
      ctaTextAr: banner.ctaTextAr || undefined,
      ctaTextEn: banner.ctaTextEn || undefined,
      ctaLink: banner.ctaLink || undefined,
    }));

    // Get top banners (before hot now)
    const bannersTop = await db.banner.findMany({
      where: {
        placement: 'top',
        status: 'PUBLISHED',
        OR: [
          { cityTargets: { isEmpty: true } },
          { cityTargets: { has: city } },
        ],
      },
      orderBy: { priority: 'desc' },
      take: 1,
    });

    // Get mid-page banners
    const bannersMid = await db.banner.findMany({
      where: {
        placement: 'mid-page',
        status: 'PUBLISHED',
        OR: [
          { cityTargets: { isEmpty: true } },
          { cityTargets: { has: city } },
        ],
      },
      orderBy: { priority: 'desc' },
      take: 1,
    });

    // Get categories
    const categories = await db.category.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      take: 4,
    });

    // Hot Now - deals ending within 48 hours, sorted by soldCount
    const twoDaysFromNow = new Date();
    twoDaysFromNow.setHours(twoDaysFromNow.getHours() + 48);

    const hotNow = await db.listing.findMany({
      where: {
        cityId: cityData.id,
        isActive: true,
        status: 'LIVE',
        endsAt: {
          gte: new Date(),
          lte: twoDaysFromNow,
        },
      },
      include: {
        vendor: true,
        city: true,
        category: true,
        assets: { orderBy: { order: 'asc' }, take: 1 },
      },
      orderBy: [
        { orderCount: 'desc' },
        { endsAt: 'asc' },
      ],
      take: 8,
    });

    // All Offers - paginated, sorted based on query
    const sortOptions: any = {
      popular: [{ orderCount: 'desc' }, { viewCount: 'desc' }],
      new: [{ createdAt: 'desc' }],
      ending: [{ endsAt: 'asc' }],
      'price-asc': [{ priceSale: 'asc' }],
      'price-desc': [{ priceSale: 'desc' }],
    };

    const skip = (page - 1) * perPage;

    const [allOffers, totalOffers] = await Promise.all([
      db.listing.findMany({
        where: {
          cityId: cityData.id,
          isActive: true,
          status: 'LIVE',
        },
        include: {
          vendor: true,
          city: true,
          category: true,
          assets: { orderBy: { order: 'asc' }, take: 1 },
        },
        orderBy: sortOptions[sort] || sortOptions.popular,
        skip,
        take: perPage,
      }),
      db.listing.count({
        where: {
          cityId: cityData.id,
          isActive: true,
          status: 'LIVE',
        },
      }),
    ]);

    const totalPages = Math.ceil(totalOffers / perPage);

    return {
      heroSlides,
      hotNow,
      allOffers,
      bannersTop,
      bannersMid,
      categories,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalOffers,
      },
    };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return null;
  }
}

// Get all active cities for city switcher
export async function getActiveCities() {
  return db.city.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
    select: {
      slug: true,
      nameAr: true,
      nameEn: true,
    },
  });
}

