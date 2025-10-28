# Category Listing Page - Complete Implementation

## 🎉 Overview

The category listing page at `/deals/[city]/[category]` has been completely rebuilt as a comprehensive, production-ready solution with advanced filtering, Arabic RTL support, and Zod validation.

---

## ✅ What Was Built

### **New Components** (8 components)

1. **`components/breadcrumbs.tsx`** ✅
   - RTL-aware breadcrumb navigation
   - Home icon + chevron separators
   - Active/inactive states

2. **`components/category/kpi-chips.tsx`** ✅
   - Total offers count
   - Ending soon count
   - Best sellers count
   - Color-coded badges with icons

3. **`components/category/filters-bar.tsx`** ✅
   - Search input
   - Sort dropdown
   - Price range inputs (min/max SAR)
   - Time window presets (today/week/month)
   - Category-specific facets (checkboxes)
   - Desktop sticky sidebar

4. **`components/category/filters-sheet.tsx`** ✅
   - Mobile slide-in sheet
   - Contains FiltersBar component
   - RTL-aware slide direction

5. **`components/category/active-filters.tsx`** ✅
   - Shows active filter chips
   - Removable (X button)
   - "Clear All" button
   - Preserves other params on removal

6. **`components/category/empty-state.tsx`** ✅
   - No results found UI
   - "Reset Filters" CTA when filters active
   - "Browse All Offers" fallback

7. **`components/ui/sheet.tsx`** ✅
   - Radix UI Sheet component
   - RTL-aware positioning
   - Accessible overlay & focus trap

### **New Libraries** (3 files)

8. **`lib/schemas/category-params.ts`** ✅
   - Zod schema for query param validation
   - Type-safe parameter parsing
   - Helper functions (parseArrayParam, buildQueryString)

9. **`lib/utils/category-mappers.ts`** ✅
   - City slug → Arabic/English mapping
   - Category slug → Arabic/English mapping
   - Sort options localized
   - Time window options
   - Category-specific facets data

10. **`lib/data/category-page.ts`** ✅
    - `getCategoryPageData()` function
    - Prisma queries with filtering/sorting
    - KPI calculations
    - Pagination logic

### **Updated Page**

11. **`app/deals/[city]/[category]/page.tsx`** ✅ (Complete rebuild)
    - Zod validation for all query params
    - SEO metadata with `generateMetadata()`
    - Breadcrumbs integration
    - KPI chips display
    - Desktop/mobile filter UIs
    - Active filters chips
    - Enhanced pagination
    - JSON-LD schema
    - Empty states

---

## 🎯 Features Implemented

### **1. Query String as Source of Truth**

All filters are stored in URL query parameters:

```
/deals/riyadh/food-dining?
  lang=ar
  &page=1
  &perPage=24
  &sort=pop
  &q=pizza
  &priceMin=50
  &priceMax=200
  &timeWindow=week
  &cuisines=إيطالي,أمريكي
  &mealTimes=غداء,عشاء
```

**Benefits:**
- ✅ Shareable URLs
- ✅ Browser back/forward works
- ✅ Bookmarkable
- ✅ SEO-friendly

### **2. Arabic-First RTL**

- ✅ All text in Arabic by default
- ✅ RTL layout with Cairo font
- ✅ Arabic numerals for prices
- ✅ Chevron icons flip for RTL
- ✅ Sheet slides from right (Arabic) or left (English)

### **3. City & Category Aware**

**URL Structure:**
- `/deals/riyadh/food-dining` → Food & Dining in Riyadh
- `/deals/jeddah/hotels` → Hotels in Jeddah
- `/deals/dammam/activities` → Activities in Dammam

**Category Mappings:**
- `food-dining` → "مطاعم ومقاهي"
- `beauty-spa` → "الجمال والسبا"
- `hotels` → "فنادق"
- `activities` → "الأنشطة"

### **4. Advanced Filtering**

#### **Search**
- Full-text search on:
  - Deal title (AR/EN)
  - Vendor name (AR/EN)

#### **Price Range**
- Min/Max SAR inputs
- Applied to `priceSale` field

#### **Time Window**
- Presets: Today / This Week / This Month
- Or custom date range (from/to)
- Filters on `endsAt` date

#### **Category-Specific Facets**

**Food & Dining:**
- Cuisines: Italian, Chinese, Indian, Arabic, American, Japanese, Mexican, Lebanese, Turkish, French
- Meal Times: Breakfast, Lunch, Dinner, Desserts, Drinks, Snacks

**Beauty & Spa:**
- Services: Haircut, Hair Dye, Massage, Skincare, Makeup, Nails, Moroccan Bath, Foot Care
- Genders: Men, Women, Mixed

**Hotels:**
- Stars: 3-star, 4-star, 5-star
- Amenities: Pool, WiFi, Free Breakfast, Gym, Spa, Parking, Restaurant, Room Service

**Activities:**
- Types: Sports, Entertainment, Educational, Adventures, Cultural, Nature, Shopping
- Suitability: Family, Kids, Adults, Groups, Solo

### **5. Sorting**

5 sort options:
1. **الأكثر رواجًا** (pop) - Most Popular (orderCount desc, viewCount desc)
2. **الأحدث** (new) - Newest (createdAt desc)
3. **ينتهي قريبًا** (ending) - Ending Soon (endsAt asc)
4. **السعر: من الأقل** (price-asc) - Price Low to High
5. **السعر: من الأعلى** (price-desc) - Price High to Low

### **6. Pagination**

- 24 deals per page (configurable via `?perPage=`)
- Previous/Next buttons
- Page numbers (1-5 visible, smart centering)
- Preserves all filters when paginating
- Scroll to top on page change (client-side)

### **7. KPI Chips**

Three badges at the top:
- **Available Offers** - Total count for current filters
- **Ending Soon** - Deals ending within 48 hours
- **Best Sellers** - Deals with `BEST_SELLER` badge

### **8. Active Filters**

Removable chips showing:
- Search query: `البحث: "pizza"`
- Price range: `السعر: 50–200 ر.س`
- Date range: `التاريخ: 2025-01-01 – 2025-01-31`
- Time window: `هذا الأسبوع`
- Facet values: `إيطالي`, `غداء`, etc.

**Clear All** button resets to default (keeps lang & sort only).

### **9. SEO & Metadata**

#### **Dynamic Metadata**
```typescript
title: "مطاعم ومقاهي – الرياض | Member X"
description: "اكتشف أفضل المطاعم والمقاهي مع عروض حصرية وخصومات مميزة. احجز الآن واستمتع بخصومات حصرية."
canonical: "/deals/riyadh/food-dining"
```

#### **JSON-LD Schema**
```json
{
  "@type": "ItemList",
  "name": "مطاعم ومقاهي - الرياض",
  "numberOfItems": 24,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Product",
        "name": "عرض بيتزا إيطالية",
        "offers": {
          "@type": "Offer",
          "price": 99,
          "priceCurrency": "SAR"
        }
      }
    }
  ]
}
```

### **10. Accessibility**

- ✅ `aria-live="polite"` for result count updates
- ✅ Keyboard navigation for all controls
- ✅ Focus rings visible
- ✅ Screen reader labels
- ✅ Semantic HTML

---

## 📦 File Structure

```
app/deals/[city]/[category]/
└── page.tsx                    # Main page component (rebuilt)

components/
├── breadcrumbs.tsx              # Breadcrumb navigation
├── category/
│   ├── active-filters.tsx       # Removable filter chips
│   ├── empty-state.tsx          # No results UI
│   ├── filters-bar.tsx          # Desktop filters sidebar
│   ├── filters-sheet.tsx        # Mobile filters sheet
│   └── kpi-chips.tsx            # KPI badges
└── ui/
    └── sheet.tsx                # Radix UI Sheet (new)

lib/
├── data/
│   └── category-page.ts         # Data provider
├── schemas/
│   └── category-params.ts       # Zod validation
└── utils/
    └── category-mappers.ts      # City/category mappings
```

---

## 🚀 Usage

### **1. Basic URL**

```
http://localhost:3000/deals/riyadh/food-dining
```

### **2. With Filters**

```
http://localhost:3000/deals/riyadh/food-dining?
  q=burger
  &priceMin=50
  &priceMax=150
  &cuisines=أمريكي,عربي
  &sort=price-asc
  &page=1
```

### **3. Query Parameters**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `lang` | `ar \| en` | `ar` | Language |
| `page` | `number` | `1` | Page number |
| `perPage` | `number` | `24` | Items per page (max 100) |
| `sort` | `pop \| new \| ending \| price-asc \| price-desc` | `pop` | Sort order |
| `q` | `string` | - | Search query |
| `priceMin` | `number` | - | Minimum price (SAR) |
| `priceMax` | `number` | - | Maximum price (SAR) |
| `timeWindow` | `today \| week \| month` | - | Time preset |
| `dateFrom` | `ISO date` | - | Custom start date |
| `dateTo` | `ISO date` | - | Custom end date |
| `cuisines` | `string[]` | - | Comma-separated (food-dining only) |
| `mealTimes` | `string[]` | - | Comma-separated (food-dining only) |
| `services` | `string[]` | - | Comma-separated (beauty-spa only) |
| `genders` | `string[]` | - | Comma-separated (beauty-spa only) |
| `stars` | `string[]` | - | Comma-separated (hotels only) |
| `amenities` | `string[]` | - | Comma-separated (hotels only) |
| `types` | `string[]` | - | Comma-separated (activities only) |
| `suitability` | `string[]` | - | Comma-separated (activities only) |

---

## 🎨 UI/UX Details

### **Desktop Layout**

```
┌─────────────────────────────────────────────────────┐
│ Header (sticky)                                      │
├─────────────────────────────────────────────────────┤
│ Breadcrumbs: Home › الرياض › مطاعم ومقاهي           │
│ H1: مطاعم ومقاهي في الرياض                          │
│ Description                                          │
│ [KPI Chip] [KPI Chip] [KPI Chip]                   │
├──────────────┬──────────────────────────────────────┤
│ Filters      │ [Mobile Filter] 24 عرض    Sort: ... │
│ Sidebar      │ ────────────────────────────────────  │
│              │ [Active Filter Chips]                │
│ Search       │ ────────────────────────────────────  │
│ Sort         │ [Deal] [Deal] [Deal] [Deal]         │
│ Price Range  │ [Deal] [Deal] [Deal] [Deal]         │
│ Time Window  │ [Deal] [Deal] [Deal] [Deal]         │
│ Facets       │ ────────────────────────────────────  │
│ (sticky)     │ [< Prev]  Page 1 of 5  [Next >]     │
│              │ [1] [2] [3] [4] [5]                  │
└──────────────┴──────────────────────────────────────┘
```

### **Mobile Layout**

```
┌────────────────────────┐
│ Header                  │
├────────────────────────┤
│ Breadcrumbs            │
│ H1                     │
│ Description            │
│ [KPI] [KPI] [KPI]     │
├────────────────────────┤
│ [Filters] 24 عرض Sort │
│ [Active Filter Chips]  │
├────────────────────────┤
│ [Deal Card]            │
│ [Deal Card]            │
│ [Deal Card]            │
│ ...                    │
├────────────────────────┤
│ [< Prev] Page 1 [Next >]│
└────────────────────────┘
```

---

## 🔧 Technical Implementation

### **Zod Validation**

All query params are validated with Zod:

```typescript
const validatedParams = categoryPageParamsSchema.parse({
  ...rawParams,
  page: rawParams.page || '1',
  perPage: rawParams.perPage || '24',
});
```

Invalid params are coerced or use defaults (never crashes).

### **Type Safety**

```typescript
export type CategoryPageParams = z.infer<typeof categoryPageParamsSchema>;

// Fully typed data response
export interface CategoryPageData {
  city: City;
  category: Category;
  deals: Listing[];
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
```

### **Prisma Queries**

Dynamic where clause based on filters:

```typescript
const where: any = {
  cityId: city.id,
  categoryId: category.id,
  isActive: true,
  status: 'LIVE',
};

if (params.q) {
  where.OR = [
    { titleAr: { contains: params.q } },
    { titleEn: { contains: params.q } },
    { vendor: { nameAr: { contains: params.q } } },
  ];
}

if (params.priceMin || params.priceMax) {
  where.priceSale = {};
  if (params.priceMin) where.priceSale.gte = params.priceMin;
  if (params.priceMax) where.priceSale.lte = params.priceMax;
}
```

### **URL State Management**

Filters update URL without page reload:

```typescript
const updateParam = (key: string, value: string | null) => {
  const params = new URLSearchParams(searchParams);
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  params.set('page', '1'); // Reset to page 1
  router.push(`${pathname}?${params.toString()}`);
};
```

---

## 🐛 Troubleshooting

### **No Deals Showing**

Check:
1. Listings exist for that city + category
2. `status` is `LIVE`
3. `isActive` is `true`
4. Assets (images) are uploaded

### **Filters Not Working**

1. Check console for Zod validation errors
2. Verify facet values match exactly (case-sensitive)
3. Clear filters and try again

### **KPIs Show Zero**

KPIs are calculated separately:
- **Ending Soon**: `endsAt` within 48 hours
- **Best Sellers**: `badges` includes `BEST_SELLER`

Make sure listings have appropriate data.

---

## 🎯 Next Steps

### **Enhancements**

1. **Persistent Filters** - Save user preferences to localStorage
2. **Sort by Distance** - Geo-location sorting
3. **Advanced Search** - Autocomplete with suggestions
4. **Filter Combinations** - Smart filter logic (AND/OR)
5. **URL Shortening** - Shorten long filter URLs
6. **Export Results** - Download filtered results as CSV

### **Performance**

1. **Caching** - Cache filter results with Redis
2. **Debouncing** - Debounce search input
3. **Infinite Scroll** - Alternative to pagination
4. **Lazy Load Images** - Intersection Observer for images below fold

---

## ✅ Acceptance Criteria

All requirements met:

- ✅ Arabic-first with Cairo font, RTL, Arabic numerals
- ✅ City + category aware routing
- ✅ Query string source of truth
- ✅ Breadcrumbs with proper structure
- ✅ H1 mapped from slug (food-dining → مطاعم ومقاهي)
- ✅ Sticky filters bar (desktop inline, mobile sheet)
- ✅ Search, sort, price range, time window, facets
- ✅ KPI chips (total, ending soon, best sellers)
- ✅ Active filter chips (removable)
- ✅ Empty state with "Reset Filters" CTA
- ✅ Pagination with numbered pages
- ✅ SSR with Prisma
- ✅ Zod validation for type safety
- ✅ SEO metadata + JSON-LD
- ✅ Accessibility (aria-live, keyboard nav)
- ✅ No linter errors

---

**Built with ❤️ for Member X**

*Last Updated: January 2025*

