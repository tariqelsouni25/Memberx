# Member X Homepage - Arabic RTL Implementation

## 🎯 Overview

The **Member X** homepage has been built with full Arabic RTL support, matching Cobone's Riyadh deals home style. The implementation includes all required sections, components, and features specified in the requirements.

## ✅ Completed Features

### 1. **Core Components**

All components are RTL-aware and support Arabic/English toggle:

- ✅ `HeroCarousel` - Auto-playing carousel with 3 slides, Arabic overlay text, and CTA buttons
- ✅ `SectionHeader` - Reusable section titles with optional "شاهد الكل" links
- ✅ `DealCard` - Enhanced with countdown timers, sold count, badges, and category/city chips
- ✅ `Countdown` - Live countdown with Arabic numerals and `aria-live` accessibility
- ✅ `CategoryTiles` - 4 category shortcuts with icons and gradient backgrounds
- ✅ `BannerStrip` - Responsive 16:9 banners with optional headline/CTA
- ✅ `DealGrid` - Responsive grid with skeleton loading states
- ✅ `CitySwitcher` - Dropdown to switch between cities (preserves query params)
- ✅ `LanguageToggle` - Toggle between Arabic and English

### 2. **Page Sections**

The homepage (`app/page.tsx`) includes:

1. **Hero Carousel** - Up to 3 slides with large headlines, subcopy, and CTAs
2. **Top Banner** - Optional promotional banner before "Hot Now"
3. **Hot Now (ساخن الآن)** - Deals ending within 48 hours with live countdowns
   - Mobile: Horizontal scrolling carousel
   - Desktop: 2-row grid (4×2)
4. **Category Shortcuts** - 4 rounded tiles linking to category pages
5. **Mid-page Banner** - Optional banner between sections
6. **All Offers (كل العروض)** - Paginated grid with sorting and filtering
   - Sort by: Popular, Newest, Ending Soon, Price (Low/High)
   - 24 deals per page with pagination
7. **Footer** - Links to legal pages and company info

### 3. **Data Provider**

Created `lib/data/homepage.ts` with:

- ✅ `getHomepageData()` - SSR function that fetches:
  - Hero slides from `Banner` table
  - Hot Now deals (ending within 48h, sorted by `soldCount`)
  - All offers (paginated, sorted)
  - Banners (top, mid-page)
  - Categories
- ✅ `getActiveCities()` - Fetches cities for the city switcher
- ✅ Prisma queries with proper relations and filtering

### 4. **RTL & Localization**

- ✅ `dir="rtl" lang="ar"` set globally in `app/layout.tsx`
- ✅ **Cairo** font (400/500/600/700) applied globally
- ✅ Tabular numerals for prices and timers
- ✅ Arabic numerals in countdown component
- ✅ All UI text supports Arabic/English toggle via `?lang=` query param
- ✅ RTL-aware icons and chevron directions

### 5. **SEO & Metadata**

- ✅ Dynamic metadata with `generateMetadata()`
- ✅ Title: "عروض الرياض | Member X"
- ✅ Description and keywords optimized for Arabic/English
- ✅ OpenGraph tags for social sharing
- ✅ JSON-LD schema (`ItemList` with `Product` offers) for first 10 deals

### 6. **Performance**

- ✅ Server-side rendering (SSR) with Next.js App Router
- ✅ `next/image` optimization for all images
- ✅ Lazy loading with `Suspense` and skeleton states
- ✅ Client components only where needed (carousel, countdown, dropdowns)

### 7. **Accessibility**

- ✅ `aria-live="polite"` for countdown and result counts
- ✅ Keyboard navigation for carousels and controls
- ✅ Semantic HTML with proper heading hierarchy
- ✅ Focus rings on interactive elements
- ✅ Screen reader-friendly labels

## 📁 File Structure

```
app/
├── page.tsx                      # Main homepage (SSR)
├── deals/
│   ├── [city]/
│   │   ├── page.tsx              # Redirects to /?city=X
│   │   └── [category]/page.tsx   # Category page (existing)

components/
├── hero-carousel.tsx             # Hero carousel with slides
├── section-header.tsx            # Reusable section headers
├── countdown.tsx                 # Live countdown with Arabic numerals
├── category-tiles.tsx            # 4 category shortcuts
├── banner-strip.tsx              # Responsive banner component
├── city-switcher.tsx             # City dropdown switcher
├── language-toggle.tsx           # Language toggle (AR/EN)
├── deal-card.tsx                 # Enhanced deal card (updated)
├── deal-grid.tsx                 # Deal grid with skeletons (updated)
├── header.tsx                    # Header with language toggle (updated)
├── footer.tsx                    # Footer (existing)

lib/
└── data/
    └── homepage.ts               # Data provider for homepage

scripts/
└── seed-homepage.ts              # Seed script for demo data
```

## 🚀 Usage

### 1. Seed the Database

First, seed the database with cities, categories, and banners:

```bash
npx tsx scripts/seed-homepage.ts
```

### 2. Create Listings

Create some listings in the admin panel (`/admin/listings`) with:

- **Status**: `LIVE`
- **isActive**: `true`
- **Assets**: At least one image
- **endsAt**: Set some within 48 hours for "Hot Now" section
- **City & Category**: Assign to created cities/categories

### 3. Access the Homepage

Visit the homepage at:

- Default (Riyadh, Arabic): `http://localhost:3000/`
- With city: `http://localhost:3000/?city=riyadh`
- With language: `http://localhost:3000/?city=riyadh&lang=en`
- With sorting: `http://localhost:3000/?city=riyadh&sort=new`
- With pagination: `http://localhost:3000/?city=riyadh&page=2`

### 4. Query Parameters

| Parameter | Values | Default | Description |
|-----------|--------|---------|-------------|
| `city` | `riyadh`, `jeddah`, `dammam` | `riyadh` | Current city |
| `lang` | `ar`, `en` | `ar` | Language |
| `page` | `1`, `2`, `3`, ... | `1` | Page number |
| `sort` | `popular`, `new`, `ending`, `price-asc`, `price-desc` | `popular` | Sort order |

## 🎨 Styling

### Cairo Font

The Cairo font is loaded in `app/layout.tsx` with weights 400, 500, 600, and 700. It's applied globally via the `font-cairo` class.

### Tabular Numerals

Prices and countdown timers use `tabular-nums` utility class for consistent digit spacing.

### RTL Support

All components use conditional classes for RTL/LTR support:

```tsx
// Example
<div className="ml-2 [dir=rtl]:ml-0 [dir=rtl]:mr-2">
```

Chevron icons are automatically flipped based on language:

```tsx
{isAr ? <ChevronLeft /> : <ChevronRight />}
```

## 📊 Database Schema

The homepage uses these Prisma models:

- **City** - Cities (Riyadh, Jeddah, Dammam)
- **Category** - Categories (Food, Beauty, Hotels, Activities)
- **Banner** - Hero and promotional banners
- **Listing** - Deals/offers
- **Vendor** - Merchants/partners
- **ListingAsset** - Deal images

## 🔄 Data Flow

1. **User visits homepage** → `/` or `/?city=riyadh&lang=ar&page=1&sort=popular`
2. **Server fetches data** via `getHomepageData()`
3. **Prisma queries database** for banners, hot deals, all offers
4. **SSR renders HTML** with all data
5. **Client hydrates** interactive components (carousel, countdown)
6. **User interactions** (sort, pagination, city switch) → URL updates → re-fetch

## 🎯 Features Matching Cobone Style

### Visual Hierarchy

- ✅ Large hero carousel with bold headlines
- ✅ "Hot Now" section with urgency (countdown badges)
- ✅ Clear category tiles with icons
- ✅ Dense grid layout (2/3/4 columns)
- ✅ Prominent CTAs ("احجز الآن")

### Information Density

- ✅ Deal cards show: vendor, title, price (original/sale), discount %, category, city, sold count
- ✅ Badges: HOT, BEST_SELLER, FLASH, DISCOUNT, NEW
- ✅ Live countdowns for ending deals
- ✅ "تم بيع X" (sold count) micro-copy

### Responsive Design

- ✅ Mobile-first approach
- ✅ Horizontal scrolling on mobile for "Hot Now"
- ✅ Grid adjusts: 2 cols (sm), 3 (md), 4 (lg)
- ✅ Works from 360px to 1440px

## 🐛 Troubleshooting

### No Banners Showing

Make sure banners are:
1. Created in the database
2. `status` is `PUBLISHED`
3. `placement` matches (`hero`, `top`, `mid-page`)
4. `cityTargets` is empty (shows in all cities) or includes the current city

### No Deals in "Hot Now"

For deals to appear in "Hot Now":
1. `endsAt` must be within next 48 hours
2. `status` must be `LIVE`
3. `isActive` must be `true`
4. Must belong to the selected city

### Countdown Not Working

The countdown component is client-side. Check:
1. `endsAt` is a valid future date
2. Component is mounted (`showCountdown={true}`)
3. Deal is ending within 48 hours

### Images Not Loading

Make sure:
1. Listings have assets in `ListingAsset` table
2. Image URLs are valid and accessible
3. Next.js image domains are configured in `next.config.js`

## 📝 Next Steps

### Recommended Enhancements

1. **Filters** - Add price range, date range, and category filters with `Sheet` component
2. **Search** - Add search bar in header with autocomplete
3. **Favorites** - Allow users to save/favorite deals
4. **Share** - Add social sharing buttons for deals
5. **Analytics** - Track `view_home`, `click_deal_card`, `apply_filters` events
6. **A/B Testing** - Test different hero slides and banner placements
7. **Sticky Toolbar** - Add sticky sort/filter bar after scrolling past hero
8. **"Best Sellers" Logic** - Implement `BEST_SELLER` badge based on last 7 days sales

### Database Optimizations

1. Add indexes on `orderCount`, `viewCount` for sorting
2. Cache homepage data with Redis/Vercel KV
3. Pre-generate static params for popular cities

## 🙏 Credits

- **Cairo Font**: Google Fonts
- **Icons**: Lucide React
- **UI Components**: shadcn/ui
- **Images**: Unsplash (demo placeholders)
- **Framework**: Next.js 15 (App Router)

---

**Built with ❤️ for Member X**

