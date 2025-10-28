# Contributing to Member X

Thank you for considering contributing to Member X! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the community

## Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/member-x.git
   cd member-x
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your local credentials
   ```
5. **Initialize database**
   ```bash
   npm run prisma:migrate
   npm run prisma:seed
   ```
6. **Start development server**
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Naming

- Feature: `feature/description`
- Bug fix: `fix/description`
- Hotfix: `hotfix/description`
- Docs: `docs/description`

Example:
```bash
git checkout -b feature/add-gift-cards
```

### Commit Messages

Follow conventional commits format:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(admin): add bulk delete for listings
fix(checkout): resolve payment webhook issue
docs(readme): update deployment instructions
```

### Code Style

**TypeScript**
- Use TypeScript for all new files
- Avoid `any` types - use proper typing
- Enable strict mode checks

**Components**
- Prefer Server Components (default in App Router)
- Use Client Components only when needed (`'use client'`)
- Keep components small and focused

**Naming Conventions**
- Components: PascalCase (`DealCard.tsx`)
- Files: kebab-case (`deal-card.tsx`)
- Functions: camelCase (`formatPrice()`)
- Constants: UPPER_SNAKE_CASE (`MAX_ITEMS`)

**Formatting**
- 2 spaces indentation
- Single quotes for strings
- Trailing commas
- Max line length: 120 characters

Run formatter:
```bash
npm run lint
```

### Testing

Before submitting:
1. Test your changes locally
2. Run type checking: `npm run typecheck`
3. Run linting: `npm run lint`
4. Test on different screen sizes
5. Test with Arabic and English locales

### Database Changes

**Adding a new model:**
1. Update `prisma/schema.prisma`
2. Create migration: `npx prisma migrate dev --name add_feature_name`
3. Update seed if needed: `prisma/seed.ts`
4. Update types: `npm run prisma:generate`

**Modifying existing model:**
1. Update schema
2. Create migration: `npx prisma migrate dev --name modify_model_name`
3. Test migration on fresh database
4. Update affected code

## Pull Request Process

1. **Update your branch**
   ```bash
   git checkout main
   git pull upstream main
   git checkout your-branch
   git rebase main
   ```

2. **Push your changes**
   ```bash
   git push origin your-branch
   ```

3. **Create Pull Request**
   - Use a clear, descriptive title
   - Fill out the PR template
   - Link related issues
   - Add screenshots for UI changes
   - Ensure CI passes

4. **PR Checklist**
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex code
   - [ ] Documentation updated
   - [ ] No new warnings
   - [ ] Tested on RTL (Arabic) layout
   - [ ] Tested on mobile & desktop

5. **Review Process**
   - Wait for maintainer review
   - Address feedback promptly
   - Update PR as requested
   - Squash commits if needed

## Project Structure

```
member-x/
├── app/              # Next.js pages & API routes
│   ├── (auth)/      # Auth pages (signin, signup)
│   ├── account/     # User dashboard
│   ├── admin/       # Admin CMS modules
│   ├── api/         # API endpoints
│   ├── checkout/    # Checkout flow
│   ├── deal/        # Deal detail pages
│   ├── deals/       # Listing pages (city/category)
│   ├── partner/     # Partner dashboard
│   └── ...          # Other pages
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   └── ...          # Custom components
├── lib/             # Utilities & helpers
├── prisma/          # Database schema & migrations
└── types/           # TypeScript type definitions
```

## Adding New Features

### Adding a New User Page

1. Create page in `app/your-page/page.tsx`
2. Add layout if needed
3. Add to navigation (`components/header.tsx`)
4. Add link to footer if relevant
5. Update sitemap generation
6. Add SEO meta tags

### Adding a New Admin Module

1. Create page in `app/admin/module-name/page.tsx`
2. Add to admin dashboard (`app/admin/page.tsx`)
3. Add required permissions to RBAC (`lib/rbac.ts`)
4. Create API endpoints if needed
5. Add navigation item
6. Update documentation

### Adding a New API Endpoint

1. Create route in `app/api/your-endpoint/route.ts`
2. Add validation schema (`lib/validations.ts`)
3. Add RBAC checks if protected
4. Add error handling
5. Document the endpoint

## Common Tasks

### Adding a Translation

Edit `lib/translations.ts`:
```typescript
export const translations = {
  ar: {
    your_key: 'النص بالعربية',
  },
  en: {
    your_key: 'English text',
  },
};
```

Usage:
```typescript
import { t } from '@/lib/translations';
const text = t('your_key', locale);
```

### Adding a Permission

1. Add to `Permission` type in `lib/rbac.ts`
2. Add to role permissions in `rolePermissions`
3. Use in guards:
   ```typescript
   requirePermission(userRole, 'your_permission');
   ```

### Adding an Email Template

1. Add function in `lib/email.ts`
2. Create HTML template with AR/EN support
3. Use Cairo font for Arabic
4. Test on different email clients

## Debugging

### Common Issues

**Build fails:**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**Prisma issues:**
```bash
npm run prisma:generate
npx prisma migrate reset
```

**Type errors:**
```bash
npm run typecheck
```

### Debugging Tools

- **Next.js DevTools**: Built into dev server
- **Prisma Studio**: `npm run prisma:studio`
- **React DevTools**: Browser extension
- **Console logs**: `console.log()` in development

## Documentation

When adding features:
- Update README.md if it affects setup/usage
- Add inline comments for complex logic
- Update DEPLOYMENT.md if it affects deployment
- Add JSDoc for exported functions

## Questions?

- Check existing issues
- Ask in discussions
- Contact maintainers

---

Thank you for contributing to Member X! 🙏

