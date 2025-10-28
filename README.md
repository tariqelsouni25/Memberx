# Member X - Arabic RTL Marketplace with Full Admin CMS

**Member X** is a production-ready, Cobone-style Arabic marketplace platform featuring a comprehensive Admin Control Dashboard (CMS) for managing all aspects of the marketplace, from content to commerce.

## 🚀 Features

### User-Facing Features
- ✅ **Arabic RTL Design** with Cairo font and Cobone-like UI density
- ✅ **Multi-City Support** (Riyadh, Jeddah, Dammam)
- ✅ **4 Main Categories** (Food & Dining, Beauty & Spa, Hotels, Activities)
- ✅ **Deal Listings** with variants, time slots, and booking system
- ✅ **Smart Filtering** with category-specific facets
- ✅ **Checkout Flow** with Tap payment integration
- ✅ **User Dashboard** (bookings, vouchers, orders, profile)
- ✅ **Voucher System** with QR codes and redemption tracking
- ✅ **Responsive Design** optimized for mobile and desktop

### Partner Features
- ✅ **Partner Dashboard** with KPI overview
- ✅ **Listings Management** (create, edit, view)
- ✅ **Slot Management** (time slot rules and generation)
- ✅ **Voucher Redemption** with QR scanning and validation
- ✅ **Reports & Analytics** (revenue, bookings, redemptions)

### Admin CMS (13 Modules)
The complete content management system with role-based access control:

- ✅ **Dashboard** - Overview with stats and quick actions (`/admin`)
- ✅ **Pages & Sections** - Homepage builder, category configs, static pages
- ✅ **Navigation** - Header/footer menu management with drag-to-reorder
- ✅ **Media Library** - Cloudinary-backed image/video management
- ✅ **Banners** - Hero sliders and promotional banners with scheduling
- ✅ **Listings** - Full CRUD with approval workflow and variants
- ✅ **Inventory** - Slot rules, time slot generation, and occupancy tracking
- ✅ **Orders** - Order, booking, and voucher management
- ✅ **SEO & Translations** - Meta tags and multilingual content
- ✅ **Theme** - Branding, colors, fonts, and styling customization
- ✅ **Feature Flags** - Toggle features per city
- ✅ **Users & Roles** - RBAC with fine-grained permissions
- ✅ **Settings** - General marketplace configuration

**Special Features:**
- ✅ **Preview Mode** - Preview drafts before publishing with signed URLs
- ✅ **Version Control** - Auto-snapshots and manual versioning
- ✅ **Audit Logs** - Complete change tracking
- ✅ **RBAC System** - 4 roles with 40+ granular permissions

**Access:** http://localhost:3000/admin  
**Documentation:** See `ADMIN-CMS-GUIDE.md` and `ADMIN-QUICK-START.md`  
**Test Login:** admin@demo.local / admin123 (after running seed)

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** (App Router, React Server Components)
- **TypeScript** for type safety
- **Tailwind CSS** + **shadcn/ui** for UI components
- **Cairo Font** for Arabic typography
- **Lucide Icons** for consistent iconography

### Backend
- **Next.js API Routes** for serverless functions
- **Prisma ORM** for database access
- **PostgreSQL** for data persistence
- **Auth.js (NextAuth)** for authentication
- **Zod** for validation

### Services & Integrations
- **Cloudinary** for media management
- **Resend** for transactional emails
- **Tap Payments** for Mada, Apple Pay, STC Pay (+ stubs for HyperPay/PayTabs)
- **QRCode** for voucher generation
- Optional: **Twilio** (SMS), **Upstash Redis** (caching), **Sentry** (monitoring)

## 📦 Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL database
- Cloudinary account (for images)
- Resend account (for emails)
- Tap Payments account (for payments)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd member-x
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and fill in your credentials:
- Database URL
- Cloudinary credentials
- Resend API key
- Tap API keys
- Auth secret

4. **Initialize the database**
```bash
npm run prisma:migrate
npm run prisma:seed
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Test Accounts

After seeding, use these credentials to log in:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@demo.local | admin123 |
| Content Editor | editor@demo.local | editor123 |
| Partner | partner@demo.local | partner123 |
| User | user@demo.local | user123 |

**⚠️ IMPORTANT:** Change all passwords in production!

## 📚 Project Structure

```
member-x/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── account/           # User dashboard
│   ├── admin/             # Admin CMS (15 modules)
│   ├── api/               # API routes
│   ├── checkout/          # Checkout flow
│   ├── deal/              # Deal detail pages
│   ├── deals/             # City/category listing pages
│   ├── partner/           # Partner dashboard
│   ├── contact/           # Contact page
│   ├── privacy/           # Privacy policy
│   ├── refunds/           # Refund policy
│   ├── terms/             # Terms & conditions
│   ├── layout.tsx         # Root layout (RTL, Cairo font)
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── deal-card.tsx     # Deal card component
│   ├── deal-grid.tsx     # Deal grid with skeleton
│   ├── header.tsx        # Site header
│   └── footer.tsx        # Site footer
├── lib/                   # Utilities & config
│   ├── db.ts             # Prisma client
│   ├── auth.ts           # Auth.js config
│   ├── rbac.ts           # Role-based access control
│   ├── validations.ts    # Zod schemas
│   ├── utils.ts          # Helper functions
│   ├── translations.ts   # i18n translations
│   ├── cloudinary.ts     # Image upload
│   └── email.ts          # Email templates
├── prisma/
│   ├── schema.prisma     # Database schema (50+ models)
│   └── seed.ts           # Seed data
├── public/               # Static assets
├── .env.example          # Environment variables template
├── middleware.ts         # Auth & route guards
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies & scripts
```

## 🎨 Key Features Explained

### Arabic RTL Support
- Global RTL direction with `dir="rtl"` and `lang="ar"`
- Cairo font optimized for Arabic readability
- Proper text alignment and layout mirroring
- Tabular numbers for prices and dates
- Bilingual support with `?lang=en` query parameter

### Booking & Slot System
- **Slot Rules**: Define recurring availability (days, times, capacity)
- **Time Slots**: Auto-generated from rules for the next 60+ days
- **Holds**: 10-minute cart reservation to prevent double-booking
- **Redemption**: QR code scanning with rate limiting and audit trail

### Payment Flow
1. User adds items to cart → creates SlotHold
2. Proceeds to checkout → creates Order (status: PENDING)
3. Redirects to Tap hosted checkout
4. Tap webhook confirms payment → Order status: CONFIRMED
5. System creates Bookings + Vouchers → emails customer

### Admin CMS Workflow
1. Content editor creates/edits page/listing → status: DRAFT
2. Previews draft using signed preview URL
3. Schedules publish or publishes immediately → status: PUBLISHED
4. All changes logged in audit trail with version snapshots
5. Can revert to any previous version

### RBAC Permissions
- **ADMIN**: Full access to all modules
- **CONTENT_EDITOR**: Manage content (pages, banners, listings, SEO)
- **SUPPORT**: View/manage orders, bookings, vouchers
- **PARTNER**: Manage own listings, redeem vouchers
- **USER**: View own bookings/orders

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run prisma:migrate   # Run migrations (dev)
npm run prisma:deploy    # Deploy migrations (prod)
npm run prisma:seed      # Seed database
npm run prisma:studio    # Open Prisma Studio
npm run db:push          # Push schema without migration

# Code Quality
npm run lint             # Run ESLint
npm run typecheck        # Run TypeScript compiler check
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms
- Set up PostgreSQL database
- Configure environment variables
- Run build command: `npm run build`
- Start server: `npm run start`
- Set up webhook endpoints for Tap payments

## 📝 Environment Variables

See `.env.example` for all required variables.

**Critical Variables:**
- `DATABASE_URL` - PostgreSQL connection string
- `AUTH_SECRET` - Random 32+ char string for session encryption
- `CLOUDINARY_*` - Image hosting credentials
- `RESEND_API_KEY` - Email service API key
- `TAP_API_KEY` - Payment gateway credentials
- `NEXT_PUBLIC_SITE_URL` - Your site URL (for OG tags, sitemap)

## 🔒 Security Features

- ✅ Row-level security with Prisma middleware
- ✅ CSRF protection via Auth.js
- ✅ SQL injection prevention (Prisma parameterized queries)
- ✅ XSS prevention (React auto-escaping)
- ✅ Rate limiting on sensitive endpoints (redemption, etc.)
- ✅ Signed preview URLs with expiration
- ✅ Password hashing with bcrypt
- ✅ PDPL compliance notes in privacy policy

## 🎯 SEO Features

- ✅ Server-side rendering for all public pages
- ✅ Dynamic sitemap.xml generation
- ✅ robots.txt with sitemap reference
- ✅ Per-page meta tags (title, description, OG)
- ✅ JSON-LD structured data (ItemList, Product, Event)
- ✅ Canonical URLs
- ✅ Semantic HTML
- ✅ Image alt tags (AR/EN)

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Test connection
npx prisma db push

# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Regenerate Prisma client
npm run prisma:generate
```

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful UI components
- **Next.js** team for an amazing framework
- **Prisma** for the best ORM experience
- **Cobone** for design inspiration

---

**Built with ❤️ for the Saudi marketplace ecosystem**

For support or questions, contact: support@memberx.com
