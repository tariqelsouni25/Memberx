# Admin CMS - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Access the Admin Panel

```
URL: http://localhost:3000/admin
```

### 2. Login with Test Credentials

```
Email:    admin@demo.local
Password: admin123
```

**⚠️ Note:** Run `npm run prisma:seed` first if these credentials don't work.

### 3. Explore the Dashboard

You'll see:
- **Quick Stats** at the top
- **12 CMS Modules** in a grid
- Each module is a card you can click

---

## ✅ What's Already Working

### Core System
- ✅ **Authentication** - Role-based access (ADMIN, CONTENT_EDITOR, SUPPORT, PARTNER)
- ✅ **RBAC System** - Fine-grained permissions per role
- ✅ **Dashboard** - Stats and module overview at `/admin`
- ✅ **Audit Logging** - All changes tracked automatically
- ✅ **Version Control** - Auto-snapshots of important changes

### Working Modules
1. ✅ **Admin Dashboard** (`/admin`) - Overview and quick access
2. ✅ **Listings Management** (`/admin/listings`) - Full CRUD for deals
3. ✅ **Theme Settings** (`/admin/theme`) - Colors, fonts, branding

### Database Schema
- ✅ All CMS models in Prisma schema:
  - Page, PageSection
  - NavigationItem
  - Banner
  - MediaAsset
  - SeoMeta
  - Translation
  - ThemeSetting
  - FeatureFlag
  - AuditLog
  - Version

---

## 📋 Module Status

| Module | Status | Location | Description |
|--------|--------|----------|-------------|
| **Dashboard** | ✅ Complete | `/admin` | Stats & module grid |
| **Pages & Sections** | 🟡 Scaffold | `/admin/pages` | Homepage builder |
| **Navigation** | 🟡 Scaffold | `/admin/navigation` | Menu management |
| **Media Library** | 🟡 Scaffold | `/admin/media` | Image/video management |
| **Banners** | 🟡 Scaffold | `/admin/banners` | Hero sliders |
| **Listings** | ✅ Complete | `/admin/listings` | Deal management |
| **Inventory** | 🟡 Scaffold | `/admin/inventory` | Booking slots |
| **Orders** | 🟡 Scaffold | `/admin/orders` | Order management |
| **SEO** | 🟡 Scaffold | `/admin/seo` | Meta tags |
| **Theme** | ✅ Complete | `/admin/theme` | Branding & styling |
| **Feature Flags** | 🟡 Scaffold | `/admin/flags` | Toggle features |
| **Users** | 🟡 Scaffold | `/admin/users` | User management |
| **Settings** | 🟡 Scaffold | `/admin/settings` | Global config |

**Legend:**
- ✅ Complete - Fully functional
- 🟡 Scaffold - Route exists, needs full implementation

---

## 🎯 Quick Tasks

### Task 1: View Your Listings

1. Go to http://localhost:3000/admin/listings
2. See all deals in a table
3. Click a listing to edit
4. Update any field
5. Save changes

### Task 2: Change Theme Colors

1. Go to http://localhost:3000/admin/theme
2. See current branding
3. Change primary color
4. Change accent color
5. Save and view on public site

### Task 3: Check User Roles

1. Go to http://localhost:3000/admin
2. See your role in top-right
3. Try accessing different modules
4. Notice permissions working

---

## 🔑 Permissions Quick Reference

### ADMIN Role
- ✅ Full access to everything
- ✅ Can create/delete users
- ✅ Can change system settings
- ✅ Can approve listings
- ✅ Can process refunds

### CONTENT_EDITOR Role
- ✅ Manage pages and content
- ✅ Upload media
- ✅ Create/edit listings
- ✅ Manage SEO & translations
- ❌ Cannot manage users
- ❌ Cannot change system settings

### SUPPORT Role
- ✅ View and manage orders
- ✅ Process refunds
- ✅ Manage bookings
- ✅ Manage vouchers
- ❌ Cannot edit content
- ❌ Cannot manage users

### PARTNER Role
- ✅ Manage own listings
- ✅ Manage own inventory
- ✅ View own bookings
- ❌ Cannot see other partners' data
- ❌ Cannot access system settings

---

## 📂 File Structure

```
your-project/
├── app/
│   ├── admin/              # Admin pages
│   │   ├── page.tsx        # Dashboard ✅
│   │   ├── listings/       # Listings module ✅
│   │   ├── theme/          # Theme module ✅
│   │   └── [other]/        # Other modules 🟡
│   └── api/
│       └── admin/          # Admin API routes
│
├── lib/
│   ├── admin/
│   │   ├── permissions.ts  # RBAC system ✅
│   │   └── guards.ts       # Auth guards ✅
│   └── auth.ts             # Auth config
│
├── components/
│   ├── admin/              # Admin components
│   └── ui/                 # shadcn/ui components
│
├── hooks/
│   └── useAdminGuard.ts    # Client guard hook ✅
│
├── prisma/
│   ├── schema.prisma       # Database schema ✅
│   └── seed.ts             # Seed data
│
└── ADMIN-CMS-GUIDE.md      # Full documentation ✅
```

---

## 🛠️ Development Tasks

### To Complete a Module

1. **Create the Page** (`app/admin/[module]/page.tsx`)
   ```typescript
   import { requireAdmin } from '@/lib/admin/guards';
   
   export default async function ModulePage() {
     await requireAdmin();
     // Your module UI
   }
   ```

2. **Create API Routes** (`app/api/admin/[module]/route.ts`)
   ```typescript
   import { requirePermission, Permission } from '@/lib/admin/guards';
   
   export async function GET(request: Request) {
     await requirePermission(Permission.MODULE_VIEW);
     // Your API logic
   }
   ```

3. **Add Client Components** (`components/admin/[module]/`)
   - Table/List view
   - Create/Edit forms
   - Filters and search
   - Bulk actions

4. **Test Permissions**
   - Try as ADMIN ✅
   - Try as CONTENT_EDITOR
   - Try as SUPPORT
   - Verify access rules

---

## 🎨 UI Patterns

### Standard Module Layout

```tsx
<div className="container mx-auto px-4 py-8">
  {/* Header */}
  <div className="flex justify-between items-center mb-6">
    <div>
      <h1 className="text-3xl font-bold">Module Name</h1>
      <p className="text-muted-foreground">Description</p>
    </div>
    <Button>Create New</Button>
  </div>
  
  {/* Filters */}
  <Card className="mb-6">
    <CardContent className="flex gap-4 pt-6">
      <Input placeholder="Search..." />
      <Select>...</Select>
      <Button variant="outline">Filter</Button>
    </CardContent>
  </Card>
  
  {/* Table */}
  <Card>
    <Table>
      {/* Your data */}
    </Table>
  </Card>
  
  {/* Pagination */}
  <div className="flex justify-center mt-6">
    {/* Pagination controls */}
  </div>
</div>
```

### Form Pattern

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  titleAr: z.string().min(3),
  titleEn: z.string().min(3),
  // ...
});

export function ModuleForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  });
  
  async function onSubmit(data) {
    const res = await fetch('/api/admin/module', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    // Handle response
  }
  
  return <Form form={form} onSubmit={onSubmit}>...</Form>;
}
```

---

## 📚 Resources

- **Full Documentation**: `ADMIN-CMS-GUIDE.md`
- **Permissions**: `lib/admin/permissions.ts`
- **Guards**: `lib/admin/guards.ts`
- **Schema**: `prisma/schema.prisma`

---

## 🐛 Troubleshooting

### Can't Access Admin Panel

**Problem**: Redirected to signin
**Solution**: 
1. Make sure you're logged in
2. Check your role is ADMIN, CONTENT_EDITOR, or SUPPORT
3. Run `npm run prisma:seed` to create admin users

### Permission Denied

**Problem**: "Insufficient permissions"
**Solution**:
1. Check your role in top-right corner
2. Verify module requirements in `lib/admin/permissions.ts`
3. Ask admin to grant permissions

### Database Connection Errors

**Problem**: Prisma errors in console
**Solution**:
1. Check `.env` has `DATABASE_URL`
2. Run `npm run prisma:generate`
3. Run `npm run prisma:migrate`
4. Run `npm run prisma:seed`

### Module Not Found (404)

**Problem**: Module page returns 404
**Solution**:
1. Module may not be implemented yet (see status table above)
2. Check `app/admin/[module]/page.tsx` exists
3. Restart dev server: `npm run dev`

---

## ✨ Next Steps

1. **Test the Dashboard**
   - Login and explore
   - Click each module
   - Check your permissions

2. **Manage Some Listings**
   - Go to `/admin/listings`
   - Edit a deal
   - Try publishing/unpublishing

3. **Customize Theme**
   - Go to `/admin/theme`
   - Change colors
   - Upload a logo
   - See changes on public site

4. **Read Full Docs**
   - Open `ADMIN-CMS-GUIDE.md`
   - Learn about each module
   - Follow detailed workflows

5. **Build More Modules**
   - Pick a module from the status table
   - Follow the development pattern
   - Test with different roles
   - Deploy!

---

**Need Help?** Check `ADMIN-CMS-GUIDE.md` for comprehensive documentation.

**Want to Contribute?** See `CONTRIBUTING.md` for guidelines.

---

**Happy Building! 🚀**

