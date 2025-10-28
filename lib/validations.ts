import { z } from 'zod';

// Auth
export const signInSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

export const signUpSchema = z.object({
  name: z.string().min(2, 'الاسم مطلوب'),
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  phone: z.string().optional(),
});

// Listings
export const createListingSchema = z.object({
  titleAr: z.string().min(3, 'العنوان بالعربية مطلوب'),
  titleEn: z.string().min(3, 'العنوان بالإنجليزية مطلوب'),
  subtitleAr: z.string().optional(),
  subtitleEn: z.string().optional(),
  descAr: z.string().optional(),
  descEn: z.string().optional(),
  cityId: z.string(),
  categoryId: z.string(),
  vendorId: z.string(),
  priceOriginal: z.number().positive('السعر الأصلي مطلوب'),
  priceSale: z.number().positive('سعر البيع مطلوب'),
  discountPct: z.number().int().min(0).max(100).optional(),
  startsAt: z.date().optional(),
  endsAt: z.date().optional(),
  stock: z.number().int().positive().optional(),
  maxPerUser: z.number().int().positive().optional(),
  highlightsAr: z.array(z.string()).default([]),
  highlightsEn: z.array(z.string()).default([]),
  termsAr: z.string().optional(),
  termsEn: z.string().optional(),
  bookingEnabled: z.boolean().default(true),
  requiresSlot: z.boolean().default(false),
});

export const updateListingSchema = createListingSchema.partial();

// Variants
export const createVariantSchema = z.object({
  nameAr: z.string().min(2, 'الاسم بالعربية مطلوب'),
  nameEn: z.string().min(2, 'الاسم بالإنجليزية مطلوب'),
  descAr: z.string().optional(),
  descEn: z.string().optional(),
  priceAdjust: z.number().default(0),
  order: z.number().int().default(0),
});

// Slot Rules
export const createSlotRuleSchema = z.object({
  nameAr: z.string().min(2, 'الاسم بالعربية مطلوب'),
  nameEn: z.string().min(2, 'الاسم بالإنجليزية مطلوب'),
  listingId: z.string(),
  daysOfWeek: z.array(z.number().int().min(0).max(6)),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'صيغة الوقت غير صالحة'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'صيغة الوقت غير صالحة'),
  intervalMinutes: z.number().int().positive(),
  capacity: z.number().int().positive(),
  effectiveFrom: z.date(),
  effectiveUntil: z.date().optional(),
});

// Orders
export const createOrderSchema = z.object({
  items: z.array(z.object({
    listingId: z.string(),
    variantId: z.string().optional(),
    quantity: z.number().int().positive(),
    slotId: z.string().optional(),
  })),
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().optional(),
  promoCode: z.string().optional(),
});

// Pages (CMS)
export const createPageSchema = z.object({
  titleAr: z.string().min(2, 'العنوان بالعربية مطلوب'),
  titleEn: z.string().min(2, 'العنوان بالإنجليزية مطلوب'),
  slug: z.string().min(2),
  type: z.enum(['HOME', 'CATEGORY', 'STATIC', 'CUSTOM']),
  cityId: z.string().optional(),
  categoryId: z.string().optional(),
  jsonBlocks: z.any().optional(),
  scheduledAt: z.date().optional(),
});

export const updatePageSchema = createPageSchema.partial();

// Sections
export const createSectionSchema = z.object({
  pageId: z.string(),
  type: z.enum(['HERO', 'HOT_NOW', 'ALL_OFFERS', 'CATEGORY_TILES', 'BANNERS', 'CUSTOM']),
  titleAr: z.string().optional(),
  titleEn: z.string().optional(),
  subtitleAr: z.string().optional(),
  subtitleEn: z.string().optional(),
  order: z.number().int().default(0),
  isVisible: z.boolean().default(true),
  maxItems: z.number().int().positive().optional(),
  config: z.any().optional(),
});

// Navigation
export const createNavItemSchema = z.object({
  location: z.enum(['HEADER', 'FOOTER']),
  labelAr: z.string().min(1),
  labelEn: z.string().min(1),
  href: z.string().min(1),
  parentId: z.string().optional(),
  order: z.number().int().default(0),
  isVisible: z.boolean().default(true),
  targetRules: z.any().optional(),
});

// Banners
export const createBannerSchema = z.object({
  titleAr: z.string().min(2),
  titleEn: z.string().min(2),
  subtitleAr: z.string().optional(),
  subtitleEn: z.string().optional(),
  imageUrl: z.string().url(),
  videoUrl: z.string().url().optional(),
  ctaTextAr: z.string().optional(),
  ctaTextEn: z.string().optional(),
  ctaLink: z.string().optional(),
  cityTargets: z.array(z.string()).default([]),
  placement: z.string().default('hero'),
  priority: z.number().int().default(0),
  scheduledAt: z.date().optional(),
});

// SEO Meta
export const createSeoMetaSchema = z.object({
  entityType: z.string(),
  entityId: z.string(),
  titleAr: z.string().optional(),
  titleEn: z.string().optional(),
  descriptionAr: z.string().optional(),
  descriptionEn: z.string().optional(),
  canonical: z.string().url().optional(),
  ogImageUrl: z.string().url().optional(),
  keywords: z.array(z.string()).default([]),
});

// Translations
export const createTranslationSchema = z.object({
  key: z.string().min(2),
  namespace: z.string().default('common'),
  ar: z.string(),
  en: z.string(),
});

// Theme
export const updateThemeSchema = z.object({
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  accentColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  fontFamily: z.string().optional(),
  logoLightUrl: z.string().url().optional(),
  logoDarkUrl: z.string().url().optional(),
  faviconUrl: z.string().url().optional(),
  borderRadius: z.number().int().min(0).max(24).optional(),
  shadowEnabled: z.boolean().optional(),
  customCss: z.string().optional(),
});

// Feature Flags
export const createFeatureFlagSchema = z.object({
  key: z.string().min(2),
  enabled: z.boolean().default(false),
  cityId: z.string().optional(),
  description: z.string().optional(),
  config: z.any().optional(),
});

// Voucher Redemption
export const redeemVoucherSchema = z.object({
  code: z.string().min(6),
});

// Booking
export const createBookingSchema = z.object({
  listingId: z.string(),
  variantId: z.string().optional(),
  slotId: z.string().optional(),
  quantity: z.number().int().positive().default(1),
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().optional(),
});

