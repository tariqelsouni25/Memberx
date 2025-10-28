# Member X - Admin CMS Guide
**Complete Content Management System Documentation**

---

## 🎯 Overview

The Member X Admin CMS is a comprehensive content management system that allows non-technical users to manage all aspects of the marketplace:

- **Pages & Sections** - Homepage builder, category configs, static pages
- **Navigation** - Header/footer menus
- **Media Library** - Image/video management via Cloudinary
- **Banners** - Hero sliders and promotional content
- **Listings** - Deal management with approval workflow
- **Inventory** - Booking slots and availability
- **Orders & Bookings** - Customer order management
- **SEO & Translations** - Meta tags and multilingual content
- **Theme** - Branding, colors, and styling
- **Feature Flags** - Toggle features per city
- **Users & Roles** - User management and permissions
- **Audit Logs** - Track all changes
- **Settings** - Global configuration

---

## 🔐 Access & Authentication

### Accessing the Admin Panel

**URL:** http://localhost:3000/admin

### User Roles & Permissions

| Role | Access Level | Permissions |
|------|--------------|-------------|
| **ADMIN** | Full Access | Everything |
| **CONTENT_EDITOR** | Content Management | Pages, Media, Banners, Listings, SEO, Translations |
| **SUPPORT** | Customer Service | Orders, Bookings, Vouchers, Refunds |
| **PARTNER** | Own Content | Own listings, inventory, bookings |
| **USER** | No Admin Access | - |

### Test Accounts

After running `npm run prisma:seed`:

```
Admin:           admin@demo.local / admin123
Content Editor:  editor@demo.local / editor123
Support:         support@demo.local / support123
Partner:         partner@demo.local / partner123
```

**⚠️ CHANGE PASSWORDS IN PRODUCTION!**

---

## 📊 Dashboard

The admin dashboard (`/admin`) shows:

- **Quick Stats**: Total listings, pending approvals, orders, bookings, users
- **Module Grid**: Access to all CMS modules
- **Pending Actions**: Items requiring attention
- **Recent Activity**: Latest changes

---

## 📄 Pages & Sections Module

**Location:** `/admin/pages`

### Page Types

1. **HOME** - Homepage with configurable sections
2. **CATEGORY** - Category landing pages (per city)
3. **STATIC** - Terms, Privacy, Contact, etc.

### Homepage Sections

The homepage builder allows drag-and-drop reordering of sections:

#### 1. **HERO Section**
- Hero carousel/slider
- CTA buttons
- Background images/videos

**Config:**
```json
{
  "slides": [
    {
      "imageUrl": "...",
      "titleAr": "...",
      "titleEn": "...",
      "ctaLink": "/deals/riyadh"
    }
  ],
  "autoplay": true,
  "interval": 5000
}
```

#### 2. **HOT_NOW Section**
- "Hot Now" deals slider
- Time-sensitive offers
- Auto-updates based on criteria

**Config:**
```json
{
  "maxItems": 6,
  "sortBy": "endingSoon",
  "showTimer": true
}
```

#### 3. **ALL_OFFERS Section**
- Grid of all available deals
- Pagination
- Filter by city/category

**Config:**
```json
{
  "perPage": 24,
  "defaultSort": "popular",
  "showFilters": true
}
```

#### 4. **CATEGORY_TILES Section**
- Visual category navigation
- Image tiles with gradients
- Links to category pages

**Config:**
```json
{
  "layout": "grid",
  "columns": 4,
  "showIcons": true
}
```

#### 5. **BANNERS Section**
- Mid-page promotional banners
- Customizable placement
- Schedule display times

**Config:**
```json
{
  "placement": "mid-page",
  "maxBanners": 2
}
```

### Publishing Workflow

1. **DRAFT** → Create/edit without publishing
2. **SCHEDULED** → Set `scheduledAt` for future publish
3. **PUBLISHED** → Live on site

### Preview System

- Click "Preview" to get a signed URL (expires in 15 min)
- Shows draft content without publishing
- Share with stakeholders for review

---

## 🧭 Navigation Module

**Location:** `/admin/navigation`

### Header Navigation

- Primary tabs (Food, Beauty, Hotels, Activities, Travel, Health, Services)
- City switcher
- Language toggle
- Search bar (optional)

### Footer Navigation

- Column-based layout
- Multiple link groups
- Social media links
- Legal links (Terms, Privacy)

### Configuration

```typescript
interface NavigationItem {
  id: string;
  location: "HEADER" | "FOOTER";
  labelAr: string;
  labelEn: string;
  href: string;
  order: number;
  isVisible: boolean;
  targetRules?: {
    cities?: string[];  // Show only in specific cities
    roles?: string[];   // Show only to specific roles
    dateRange?: {       // Show only during date range
      start: Date;
      end: Date;
    };
  };
}
```

### Drag-to-Reorder

- Use drag handles to reorder nav items
- Changes save automatically
- Preview immediately on public site

---

## 🖼️ Media Library Module

**Location:** `/admin/media`

### Features

- **Cloudinary Integration** - Automatic optimization
- **Bulk Upload** - Multiple files at once
- **Image Editing** - Crop, resize, filters
- **Alt Text** - AR/EN for accessibility & SEO
- **Tagging System** - Organize with tags
- **Usage Tracking** - See where media is used
- **Replace Asset** - Update without breaking links

### Best Practices

1. **Image Sizes:**
   - Hero: 1920×1080px (16:9)
   - Listing Cards: 800×600px (4:3)
   - Category Tiles: 600×600px (1:1)
   - Logos: SVG or 512×512px PNG

2. **File Formats:**
   - Photos: JPEG (optimized)
   - Graphics: PNG (transparency)
   - Logos: SVG preferred
   - Videos: MP4 (max 10MB)

3. **Alt Text:**
   - Describe the image content
   - Include keywords for SEO
   - Provide AR and EN versions

---

## 🎨 Banners Module

**Location:** `/admin/banners`

### Banner Types

1. **Hero Banners** - Full-width top sliders
2. **Mid-Page Banners** - Between content sections
3. **Sidebar Banners** - Column advertisements
4. **Sticky Banners** - Fixed position

### Creating a Banner

```typescript
interface Banner {
  titleAr: string;
  titleEn: string;
  subtitleAr?: string;
  subtitleEn?: string;
  imageUrl: string;
  videoUrl?: string;
  ctaTextAr?: string;
  ctaTextEn?: string;
  ctaLink?: string;
  cityTargets: string[];  // [] = all cities
  placement: string;
  status: "DRAFT" | "SCHEDULED" | "PUBLISHED";
  scheduledAt?: Date;
  publishedAt?: Date;
  priority: number;  // Higher = shows first
  abLabel?: string;  // For A/B testing
}
```

### Targeting Rules

- **Cities**: Show only in selected cities
- **Date Range**: Auto-show/hide based on dates
- **Priority**: Order of display (1-100)
- **A/B Labels**: Track performance variants

### Analytics

- **Impressions**: How many times shown
- **Clicks**: How many times clicked
- **CTR**: Click-through rate

---

## 📦 Listings Module

**Location:** `/admin/listings`

### Deal Lifecycle

```
DRAFT → PENDING → APPROVED → LIVE → ENDED
```

1. **DRAFT** - Being created/edited
2. **PENDING** - Submitted for review
3. **APPROVED** - Approved but not live
4. **LIVE** - Active and visible
5. **ENDED** - Past end date or manually ended

### Creating a Listing

#### Basic Info
- Title (AR/EN)
- Subtitle (AR/EN)
- Description (AR/EN)
- City & Category
- Vendor

#### Pricing
- List Price (original)
- Sale Price (discounted)
- Discount % (auto-calculated)
- Currency (SAR)

#### Availability
- Start Date
- End Date
- Max stock (optional)
- Max per user (optional)

#### Variants
Create different options:
- Weekday vs Weekend
- Adult vs Child
- Time slots (Morning, Afternoon, Evening)

```typescript
interface ListingVariant {
  name: string;
  priceModifier: number;  // Add to base price
  stock?: number;
  isActive: boolean;
}
```

#### Assets
- Main image (required)
- Gallery images (4-10 recommended)
- Video (optional)

#### Terms & FAQs
- Inclusions/Exclusions
- Cancellation policy
- FAQ items

### Approval Workflow

**For Content Editors:**
1. Create listing → Status: DRAFT
2. Submit for review → Status: PENDING
3. Wait for admin approval

**For Admins:**
1. Review pending listings
2. Add reviewer comments
3. Approve → APPROVED or Reject → DRAFT
4. Publish → LIVE

### Bulk Actions

- Publish multiple listings
- Change category
- Update prices
- End deals
- Export to CSV

---

## 📅 Inventory Module

**Location:** `/admin/inventory`

### Slot Rules

Define recurring availability patterns:

```typescript
interface SlotRule {
  listingId: string;
  daysOfWeek: number[];  // 0=Sunday, 6=Saturday
  startTime: string;     // "09:00"
  endTime: string;       // "18:00"
  intervalMinutes: number;  // 30, 60, 120
  capacity: number;      // Max bookings per slot
  effectiveFrom: Date;
  effectiveTo?: Date;
}
```

**Example:**
- Days: Monday-Friday (1,2,3,4,5)
- Time: 09:00-18:00
- Interval: 60 minutes
- Capacity: 10 per slot

This generates time slots:
- 09:00-10:00 (capacity: 10)
- 10:00-11:00 (capacity: 10)
- ... up to 17:00-18:00

### Time Slot Generation

1. Create Slot Rule
2. Click "Generate Slots"
3. Choose date range (e.g., next 60 days)
4. System creates TimeSlot records

### Manual Blocks

Block specific dates/times:
- Holidays
- Maintenance
- Special events

### Occupancy View

- Calendar view with availability
- Color-coded: Available, Low, Full
- Export bookings to CSV

---

## 🛒 Orders & Bookings Module

**Location:** `/admin/orders`

### Order Management

**Order Statuses:**
- PENDING - Payment in progress
- CONFIRMED - Paid successfully
- CANCELLED - User cancelled
- REFUNDED - Money returned

**Actions:**
- View order details
- Contact customer
- Issue refund (partial/full)
- Download invoice
- Resend confirmation email

### Booking Management

**Booking Statuses:**
- CONFIRMED - Ready to use
- USED - Redeemed
- CANCELLED - Cancelled
- EXPIRED - Past validity date

**Actions:**
- Reschedule booking
- Cancel (per policy)
- Mark as used
- Transfer to another user

### Voucher Management

**Voucher Statuses:**
- ACTIVE - Can be redeemed
- REDEEMED - Already used
- CANCELLED - Invalidated
- EXPIRED - Past expiry

**Features:**
- QR code display
- Search by code
- Re-issue voucher
- Bulk export
- Redemption history

### Refund Flow

1. Customer requests refund
2. Support reviews reason
3. Check cancellation policy
4. Approve/reject
5. Process refund via payment gateway
6. Email confirmation

---

## 🔍 SEO & Translations Module

**Location:** `/admin/seo`

### SEO Meta Tags

Set per entity (Page, Listing, Category):

```typescript
interface SeoMeta {
  entityType: string;
  entityId: string;
  titleAr: string;       // <title> tag
  titleEn: string;
  descriptionAr: string; // <meta description>
  descriptionEn: string;
  canonical?: string;    // Canonical URL
  ogImageUrl?: string;   // Open Graph image
  keywords: string[];    // Meta keywords
}
```

### Translations

Manage all UI text:

```typescript
interface Translation {
  key: string;           // "checkout.button.pay"
  namespace: string;     // "common", "checkout", etc.
  ar: string;           // Arabic text
  en: string;           // English text
}
```

**Namespaces:**
- `common` - Shared UI elements
- `homepage` - Homepage specific
- `checkout` - Checkout flow
- `errors` - Error messages
- `emails` - Email templates

### Best Practices

1. **Title Length**: 50-60 characters
2. **Description Length**: 150-160 characters
3. **Keywords**: 5-10 relevant keywords
4. **OG Image**: 1200×630px recommended
5. **Canonical**: Use for duplicate content

---

## 🎨 Theme Module

**Location:** `/admin/theme`

### Branding

**Upload Assets:**
- Logo (light mode)
- Logo (dark mode)
- Favicon (32×32px ICO or PNG)

**Colors:**
- Primary Color (brand color)
- Accent Color (CTAs, highlights)
- Background Colors
- Text Colors

**Contrast Check:**
- System validates WCAG AA compliance
- Warns if contrast ratio < 4.5:1

### Typography

**Font Families:**
- Cairo (default, excellent for Arabic)
- Tajawal
- Noto Sans Arabic
- Custom font upload

**Font Scales:**
- Display: 3.5rem
- H1: 2.5rem
- H2: 2rem
- H3: 1.5rem
- Body: 1rem
- Small: 0.875rem

### Styling

**Border Radius:**
- None (0px)
- Small (4px)
- Medium (8px)
- Large (12px)
- XL (16px)

**Shadows:**
- Enable/disable drop shadows
- Preset shadow scales

**Custom CSS:**
- Advanced: Add custom CSS
- Warning: Can break layout if misused

### Preview

- Live preview as you make changes
- Desktop/mobile toggle
- Before/after comparison

---

## 🚩 Feature Flags Module

**Location:** `/admin/flags`

### Toggle Features

Enable/disable features without code deployment:

```typescript
interface FeatureFlag {
  key: string;
  enabled: boolean;
  cityId?: string;  // null = global
  description: string;
  config?: Json;
}
```

### Common Flags

- `hot-now-section` - Show "Hot Now" on homepage
- `sms-reminders` - Send SMS booking reminders
- `gift-cards` - Enable gift card purchases
- `loyalty-points` - Activate loyalty program
- `review-system` - Allow customer reviews
- `social-login` - Google/Facebook login

### Per-City Flags

Example: Enable `same-day-delivery` only in Riyadh:

```json
{
  "key": "same-day-delivery",
  "enabled": true,
  "cityId": "riyadh-id"
}
```

---

## 👥 Users & Roles Module

**Location:** `/admin/users`

### User Management

**Actions:**
- Create new user (invite email)
- Assign role
- Enable/disable account
- Reset password
- View activity log

### Role Permissions

See `lib/admin/permissions.ts` for full matrix.

**Creating a Content Editor:**
1. Go to Users module
2. Click "Invite User"
3. Enter email
4. Select role: CONTENT_EDITOR
5. User receives invitation email
6. They set password and log in

### Security

- Passwords hashed with bcrypt
- Session-based auth (Auth.js)
- CSRF protection
- Rate limiting on sensitive endpoints

---

## 📜 Audit Logs Module

**Location:** `/admin/audit`

### What's Logged

Every admin action is tracked:
- WHO: User who made the change
- WHAT: Entity type & ID
- WHEN: Timestamp
- ACTION: CREATE, UPDATE, DELETE, PUBLISH
- DIFF: Before/after values

### Viewing Logs

**Filters:**
- Entity type (Page, Listing, etc.)
- Entity ID (specific item)
- Actor (which user)
- Date range
- Action type

**Export:**
- CSV download
- JSON export for analysis

---

## 🔄 Version Control

### Automatic Snapshots

System auto-saves versions when:
- Publishing a page
- Approving a listing
- Major updates

### Manual Snapshots

Click "Save Version" and add a note:
- "Before Black Friday changes"
- "Approved by legal team"
- "Tested and ready"

### Reverting

1. Go to Version History
2. Select previous version
3. Click "Revert"
4. Confirm action
5. Entity restored to that state

---

## ⚙️ Settings Module

**Location:** `/admin/settings`

### General Settings

- Default city
- Currency (SAR)
- Language options
- Timezone (Asia/Riyadh)

### Cancellation Policies

- Free cancellation period (e.g., 24h)
- Refund percentage by timing
- Non-refundable categories

### Service Provider Keys

**Payment (Tap):**
- API Key
- Secret Key
- Webhook URL

**Email (Resend):**
- API Key
- From email/name

**Media (Cloudinary):**
- Cloud Name
- API Key
- API Secret

**SMS (Twilio):**
- Account SID
- Auth Token
- Phone number

**Monitoring (Sentry):**
- DSN URL

**Cache (Redis):**
- Connection URL

---

## 🔐 Security Best Practices

### Access Control

1. **Principle of Least Privilege**
   - Grant minimum required permissions
   - Review roles quarterly

2. **Password Policy**
   - Minimum 8 characters
   - Mix of letters, numbers, symbols
   - Change every 90 days

3. **Two-Factor Authentication**
   - Enable for ADMIN role (recommended)
   - Use authenticator app

### Data Protection

1. **Backups**
   - Database: Daily automated backups
   - Media: Cloudinary has redundancy
   - Test restore quarterly

2. **HTTPS**
   - Always use HTTPS in production
   - Auto-redirect HTTP to HTTPS

3. **Rate Limiting**
   - API endpoints rate-limited
   - Login attempts limited
   - Prevents brute force

### Audit & Compliance

1. **Review Logs**
   - Check audit logs weekly
   - Investigate suspicious activity
   - Export for compliance

2. **PDPL Compliance** (Saudi Data Protection Law)
   - User consent for data collection
   - Right to access/delete data
   - Secure data storage

---

## 🚀 Common Workflows

### Publishing a New Category Page

1. Go to Pages module
2. Click "Create Page"
3. Select type: CATEGORY
4. Choose city & category
5. Configure sections:
   - Enable/disable sections
   - Set max items
   - Customize titles
6. Set SEO meta
7. Click "Save as Draft"
8. Click "Preview" to review
9. Click "Publish" when ready

### Launching a New Deal

1. Go to Listings module
2. Click "Create Listing"
3. Fill in all details
4. Upload images
5. Add variants if needed
6. Set pricing
7. Click "Save as Draft"
8. Go to Inventory module
9. Create Slot Rules
10. Generate Time Slots
11. Return to Listings
12. Submit for approval
13. Admin approves
14. Click "Publish"
15. Deal goes live!

### Updating Homepage

1. Go to Pages module
2. Find "Homepage"
3. Reorder sections (drag handles)
4. Toggle section visibility
5. Edit section configs
6. Click "Save as Draft"
7. Click "Preview"
8. Share preview link with team
9. Get approval
10. Click "Publish"
11. Changes live immediately

### Managing a Refund

1. Go to Orders module
2. Search for order
3. Click order to view details
4. Review refund request
5. Check cancellation policy
6. Click "Process Refund"
7. Select amount (full/partial)
8. Add reason/notes
9. Click "Confirm Refund"
10. System processes via payment gateway
11. Customer receives email

---

## 📞 Support & Help

### Getting Help

- **Documentation**: This file
- **Admin UI**: Tooltip hints on form fields
- **Email**: admin-support@memberx.sa

### Reporting Issues

1. Go to Settings → Support
2. Click "Report Issue"
3. Describe the problem
4. Attach screenshots
5. Include steps to reproduce
6. Submit ticket

### Feature Requests

Submit feature requests via admin feedback form.

---

## 🎯 Quick Reference

### Keyboard Shortcuts

- `Ctrl/Cmd + S` - Save draft
- `Ctrl/Cmd + P` - Preview
- `Ctrl/Cmd + Enter` - Publish
- `Esc` - Close modal
- `/` - Focus search

### Status Colors

- 🟢 **Green** - Published/Live/Active
- 🟡 **Yellow** - Draft/Pending
- 🔴 **Red** - Ended/Cancelled
- 🔵 **Blue** - Scheduled

### API Endpoints

All admin API routes are under `/api/admin/*`:

- `GET /api/admin/pages` - List pages
- `POST /api/admin/pages` - Create page
- `PATCH /api/admin/pages/:id` - Update page
- `DELETE /api/admin/pages/:id` - Delete page

Full API documentation: See `ADMIN-API.md`

---

## 🔄 Updates & Maintenance

### System Updates

Check for updates monthly:
1. Go to Settings → About
2. View current version
3. Check for updates
4. Review changelog
5. Schedule maintenance window
6. Run updates

### Database Maintenance

- **Optimize**: Monthly
- **Backup**: Daily (automated)
- **Archive**: Old data after 2 years

---

**Last Updated**: October 2025
**Version**: 1.0.0
**Support**: admin-support@memberx.sa

