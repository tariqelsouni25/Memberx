import { z } from 'zod';

// Query parameters schema for category page
export const categoryPageParamsSchema = z.object({
  // Pagination
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce.number().int().min(1).max(100).default(24),
  
  // Search
  q: z.string().optional(),
  
  // Sort
  sort: z.enum(['pop', 'new', 'ending', 'price-asc', 'price-desc']).default('pop'),
  
  // Price range
  priceMin: z.coerce.number().min(0).optional(),
  priceMax: z.coerce.number().min(0).optional(),
  
  // Date range
  dateFrom: z.string().optional(), // ISO date string
  dateTo: z.string().optional(),   // ISO date string
  
  // Time window presets
  timeWindow: z.enum(['today', 'week', 'month']).optional(),
  
  // Language
  lang: z.enum(['ar', 'en']).default('ar'),
  
  // Category-specific facets (will be parsed as arrays)
  cuisines: z.string().optional(),      // comma-separated
  mealTimes: z.string().optional(),     // comma-separated
  services: z.string().optional(),      // comma-separated
  genders: z.string().optional(),       // comma-separated
  stars: z.string().optional(),         // comma-separated
  amenities: z.string().optional(),     // comma-separated
  types: z.string().optional(),         // comma-separated
  suitability: z.string().optional(),   // comma-separated
});

export type CategoryPageParams = z.infer<typeof categoryPageParamsSchema>;

// Helper to parse comma-separated values
export function parseArrayParam(param: string | undefined): string[] {
  if (!param) return [];
  return param.split(',').filter(Boolean);
}

// Helper to build query string from params
export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          searchParams.set(key, value.join(','));
        }
      } else {
        searchParams.set(key, String(value));
      }
    }
  });
  
  return searchParams.toString();
}

