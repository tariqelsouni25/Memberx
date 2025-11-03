import { db } from '@/lib/db';
import { CategoryPageParams, parseArrayParam } from '@/lib/schemas/category-params';

export interface CategoryPageData {
  city: any;
  category: any;
  deals: any[];
  kpis: {
    total: number;
    endingSoon: number;
    bestSellers: number;
  };
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    perPage: number;
  };
}

export async function getCategoryPageData(
  citySlug: string,
  categorySlug: string,
  params: CategoryPageParams
): Promise<CategoryPageData | null> {
  try {
    // Get city and category
    const [city, category] = await Promise.all([
      db.city.findUnique({ where: { slug: citySlug } }),
      db.category.findUnique({ where: { slug: categorySlug } }),
    ]);

    // Fallback for categories when database is not available
    if (!city || !category) {
      // Mock data for travel, health, and services categories
      if (categorySlug === 'travel' || categorySlug === 'health' || categorySlug === 'services') {
        const categoryData = categorySlug === 'travel' 
          ? {
              id: 'mock-travel-category-id',
              slug: 'travel',
              nameAr: 'السفر والسياحة',
              nameEn: 'Travel & Tourism',
              descAr: 'باقات سفر عالمية شاملة للطيران والفنادق من السعودية',
              descEn: 'Global travel packages including flights and hotels from Saudi Arabia',
              icon: '✈️',
              order: 5,
            }
          : categorySlug === 'health'
          ? {
              id: 'mock-health-category-id',
              slug: 'health',
              nameAr: 'الصحة والعافية',
              nameEn: 'Health & Wellness',
              descAr: 'خدمات صحية ورياضية ومراكز عناية بالصحة والعافية',
              descEn: 'Health, fitness and wellness services and care centers',
              icon: '🏥',
              order: 6,
            }
          : {
              id: 'mock-services-category-id',
              slug: 'services',
              nameAr: 'الخدمات',
              nameEn: 'Services',
              descAr: 'خدمات منزلية ومهنية وصيانة وإصلاح وخدمات متنوعة',
              descEn: 'Home, professional, maintenance, repair and various services',
              icon: '🔧',
              order: 7,
            };

        return {
          city: {
            id: 'mock-city-id',
            slug: citySlug,
            nameAr: citySlug === 'riyadh' ? 'الرياض' : citySlug === 'jeddah' ? 'جدة' : 'الدمام',
            nameEn: citySlug.charAt(0).toUpperCase() + citySlug.slice(1),
            isActive: true,
            order: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          category: {
            ...categoryData,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          deals: [],
          kpis: {
            total: 0,
            endingSoon: 0,
            bestSellers: 0,
          },
          pagination: {
            currentPage: params.page,
            totalPages: 0,
            totalItems: 0,
            perPage: params.perPage,
          },
        };
      }
      return null;
    }

    // Build where clause
    const where: any = {
      cityId: city.id,
      categoryId: category.id,
      isActive: true,
      status: 'LIVE',
    };

    // Search query
    if (params.q) {
      where.OR = [
        { titleAr: { contains: params.q, mode: 'insensitive' } },
        { titleEn: { contains: params.q, mode: 'insensitive' } },
        { vendor: { nameAr: { contains: params.q, mode: 'insensitive' } } },
        { vendor: { nameEn: { contains: params.q, mode: 'insensitive' } } },
      ];
    }

    // Price range
    if (params.priceMin !== undefined || params.priceMax !== undefined) {
      where.priceSale = {};
      if (params.priceMin !== undefined) where.priceSale.gte = params.priceMin;
      if (params.priceMax !== undefined) where.priceSale.lte = params.priceMax;
    }

    // Time window / Date range
    if (params.timeWindow || params.dateFrom || params.dateTo) {
      const now = new Date();
      const startDate = params.dateFrom ? new Date(params.dateFrom) : now;
      let endDate: Date | undefined;

      if (params.timeWindow === 'today') {
        endDate = new Date(now);
        endDate.setHours(23, 59, 59, 999);
      } else if (params.timeWindow === 'week') {
        endDate = new Date(now);
        endDate.setDate(endDate.getDate() + 7);
      } else if (params.timeWindow === 'month') {
        endDate = new Date(now);
        endDate.setMonth(endDate.getMonth() + 1);
      } else if (params.dateTo) {
        endDate = new Date(params.dateTo);
      }

      if (endDate) {
        where.endsAt = {
          gte: startDate,
          lte: endDate,
        };
      }
    }

    // Sort order
    let orderBy: any = [];
    switch (params.sort) {
      case 'pop':
        orderBy = [{ orderCount: 'desc' }, { viewCount: 'desc' }];
        break;
      case 'new':
        orderBy = [{ createdAt: 'desc' }];
        break;
      case 'ending':
        orderBy = [{ endsAt: 'asc' }];
        break;
      case 'price-asc':
        orderBy = [{ priceSale: 'asc' }];
        break;
      case 'price-desc':
        orderBy = [{ priceSale: 'desc' }];
        break;
      default:
        orderBy = [{ isFeatured: 'desc' }, { orderCount: 'desc' }];
    }

    // Pagination
    const skip = (params.page - 1) * params.perPage;

    // Fetch deals and total count
    const [deals, totalItems] = await Promise.all([
      db.listing.findMany({
        where,
        include: {
          vendor: true,
          city: true,
          category: true,
          assets: {
            orderBy: { order: 'asc' },
            take: 1,
          },
        },
        orderBy,
        skip,
        take: params.perPage,
      }),
      db.listing.count({ where }),
    ]);

    // Calculate KPIs
    const twoDaysFromNow = new Date();
    twoDaysFromNow.setHours(twoDaysFromNow.getHours() + 48);

    const [endingSoonCount, bestSellersCount] = await Promise.all([
      db.listing.count({
        where: {
          ...where,
          endsAt: {
            gte: new Date(),
            lte: twoDaysFromNow,
          },
        },
      }),
      db.listing.count({
        where: {
          ...where,
          badges: { has: 'BEST_SELLER' },
        },
      }),
    ]);

    const totalPages = Math.ceil(totalItems / params.perPage);

    return {
      city,
      category,
      deals,
      kpis: {
        total: totalItems,
        endingSoon: endingSoonCount,
        bestSellers: bestSellersCount,
      },
      pagination: {
        currentPage: params.page,
        totalPages,
        totalItems,
        perPage: params.perPage,
      },
    };
  } catch (error) {
    console.error('Error fetching category page data:', error);
    return null;
  }
}

