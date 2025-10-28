import { z } from 'zod';

// Travel package schema
export const travelPackageSchema = z.object({
  slug: z.string(),
  title: z.string(),
  destination: z.string(),
  nights: z.number(),
  stars: z.number().min(3).max(5),
  board: z.enum(['breakfast', 'half-board', 'full-board', 'all-inclusive']),
  flightIncluded: z.boolean(),
  visaIncluded: z.boolean(),
  freeCancel: z.boolean(),
  airline: z.string().optional(),
  depCity: z.string(),
  priceSar: z.number(),
  listPriceSar: z.number(),
  discountPct: z.number(),
  endsAt: z.date(),
  soldCount: z.number(),
  images: z.array(z.string()),
  pkgType: z.array(z.string()),
  createdAt: z.date(),
  isBestSeller: z.boolean().default(false),
  isLimitedOffer: z.boolean().default(false),
});

export type TravelPackage = z.infer<typeof travelPackageSchema>;

// Query parameters schema
export const travelParamsSchema = z.object({
  // Search
  q: z.string().optional(),
  
  // Filters
  dest: z.string().optional(), // comma-separated
  nights: z.string().optional(), // comma-separated numbers
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  stars: z.string().optional(), // comma-separated
  board: z.string().optional(), // comma-separated
  flightIncluded: z.enum(['yes', 'no']).optional(),
  depCity: z.string().optional(), // comma-separated
  airline: z.string().optional(), // comma-separated
  pkgType: z.string().optional(), // comma-separated
  visaIncluded: z.enum(['yes', 'no']).optional(),
  freeCancel: z.enum(['yes', 'no']).optional(),
  priceMin: z.coerce.number().min(0).optional(),
  priceMax: z.coerce.number().min(0).optional(),
  
  // Sort & pagination
  sort: z.enum(['pop', 'new', 'ending', 'price-asc', 'price-desc']).default('pop'),
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce.number().int().min(1).max(100).default(24),
  
  // Language
  lang: z.enum(['ar', 'en']).default('ar'),
});

export type TravelParams = z.infer<typeof travelParamsSchema>;

// Response data
export interface TravelPageData {
  items: TravelPackage[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
  kpis: {
    available: number;
    endingSoon: number;
    bestSellers: number;
  };
}

// Helper to parse comma-separated values
export function parseArrayParam(param: string | undefined): string[] {
  if (!param) return [];
  return param.split(',').filter(Boolean);
}

// Localized labels
export const destinationLabels: Record<string, { ar: string; en: string }> = {
  dubai: { ar: 'دبي', en: 'Dubai' },
  bali: { ar: 'بالي', en: 'Bali' },
  trabzon: { ar: 'طرابزون', en: 'Trabzon' },
  georgia: { ar: 'جورجيا', en: 'Georgia' },
  cairo: { ar: 'القاهرة', en: 'Cairo' },
  azerbaijan: { ar: 'أذربيجان', en: 'Azerbaijan' },
  sharm: { ar: 'شرم الشيخ', en: 'Sharm El Sheikh' },
  istanbul: { ar: 'إسطنبول', en: 'Istanbul' },
  europe: { ar: 'أوروبا', en: 'Europe' },
  maldives: { ar: 'المالديف', en: 'Maldives' },
  thailand: { ar: 'تايلاند', en: 'Thailand' },
  malaysia: { ar: 'ماليزيا', en: 'Malaysia' },
  turkey: { ar: 'تركيا', en: 'Turkey' },
  egypt: { ar: 'مصر', en: 'Egypt' },
};

export const boardLabels: Record<string, { ar: string; en: string }> = {
  breakfast: { ar: 'فطور', en: 'Breakfast' },
  'half-board': { ar: 'نصف إقامة', en: 'Half Board' },
  'full-board': { ar: 'إقامة كاملة', en: 'Full Board' },
  'all-inclusive': { ar: 'شامل كليًا', en: 'All Inclusive' },
};

export const pkgTypeLabels: Record<string, { ar: string; en: string }> = {
  honeymoon: { ar: 'شهر عسل', en: 'Honeymoon' },
  family: { ar: 'عائلي', en: 'Family' },
  weekend: { ar: 'عطلة نهاية الأسبوع', en: 'Weekend' },
  luxury: { ar: 'فاخر', en: 'Luxury' },
  budget: { ar: 'اقتصادي', en: 'Budget' },
};

