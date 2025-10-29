# GitHub Deployment Setup Guide

This guide explains how to set up automated deployment from GitHub to various platforms.

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ GitHub repository set up
- ✅ Production database (PostgreSQL) ready
- ✅ Platform account (Vercel, Railway, etc.)
- ✅ Environment variables configured

## 🔐 Required GitHub Secrets

Navigate to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

### For Vercel Deployment

1. **VERCEL_TOKEN**
   - Go to [Vercel Settings > Tokens](https://vercel.com/account/tokens)
   - Create a new token with full access
   - Copy and paste as `VERCEL_TOKEN`

2. **VERCEL_ORG_ID**
   - Go to your Vercel team/organization settings
   - Copy the Organization ID from the URL or settings page
   - Or run: `vercel link` locally to get it

3. **VERCEL_PROJECT_ID**
   - After linking your project to Vercel, you'll find this in your project settings
   - Or in `.vercel/project.json` after running `vercel link`

### For Railway Deployment

1. **RAILWAY_TOKEN**
   - Go to [Railway Account Settings](https://railway.app/account/tokens)
   - Create a new token
   - Copy and paste as `RAILWAY_TOKEN`

### Common Secrets (Required for all platforms)

1. **DATABASE_URL**
   - Your production PostgreSQL connection string
   - Format: `postgresql://user:password@host:port/database?sslmode=require`

2. **AUTH_SECRET**
   - Generate with: `openssl rand -base64 32`
   - Or use: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`

3. **NEXT_PUBLIC_SITE_URL**
   - Your production domain: `https://yourdomain.com`

4. **CLOUDINARY_CLOUD_NAME**
5. **CLOUDINARY_API_KEY**
6. **CLOUDINARY_API_SECRET**
7. **RESEND_API_KEY**
8. **TAP_API_KEY** (or your payment provider key)
9. **TAP_WEBHOOK_SECRET**
10. **NEXT_PUBLIC_TAP_PUBLIC_KEY**

## 🚀 Deployment Workflows

### Option 1: Automatic Vercel Deployment (Recommended)

**File:** `.github/workflows/deploy.yml`

Automatically deploys to Vercel when you push to the `main` branch.

**Setup Steps:**
1. Add the Vercel secrets (VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID)
2. Link your project to Vercel (if not already done):
   ```bash
   npm install -g vercel
   vercel login
   vercel link
   ```
3. Push to `main` branch → Deployment triggers automatically!

### Option 2: Railway Deployment

**File:** `.github/workflows/deploy-railway.yml`

Deploys to Railway on push to `main`.

**Setup Steps:**
1. Add `RAILWAY_TOKEN` secret
2. Create a Railway project and connect your GitHub repo
3. Configure environment variables in Railway dashboard
4. Push to `main` → Auto-deploys!

### Option 3: Manual Deployment

**File:** `.github/workflows/deploy-manual.yml`

Allows you to manually trigger deployment from GitHub Actions tab.

**Usage:**
1. Go to Actions tab in GitHub
2. Select "Manual Deployment" workflow
3. Click "Run workflow"
4. Choose platform (vercel, railway, or build-only)
5. Click "Run workflow" button

## 📝 Initial Setup Checklist

### First Time Deployment

- [ ] Set up production database (Neon, Supabase, or Railway)
- [ ] Add all required GitHub secrets
- [ ] Link project to deployment platform
- [ ] Configure environment variables in platform dashboard
- [ ] Run database migrations:
  ```bash
  npx prisma migrate deploy
  ```
- [ ] Seed database (first time only):
  ```bash
  npm run prisma:seed
  ```
- [ ] Configure webhook URLs in payment provider
- [ ] Update DNS records if using custom domain
- [ ] Test deployment by pushing to `main` branch

## 🔄 How It Works

1. **Push to main branch** → Triggers deployment workflow
2. **Workflow runs**:
   - Checks out code
   - Sets up Node.js 20
   - Installs dependencies
   - Generates Prisma Client
   - Builds the Next.js app
   - Deploys to platform
   - Runs database migrations (Vercel workflow only)

## 🛠️ Troubleshooting

### Build Fails
- Check that all environment variables are set
- Verify Node.js version is 20+
- Check build logs in GitHub Actions

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Ensure database allows connections from deployment platform IPs
- Check SSL settings in connection string

### Deployment Not Triggering
- Verify workflow file is in `.github/workflows/` directory
- Check that you're pushing to `main` branch (or configured branch)
- Verify workflow syntax in Actions tab

### Missing Secrets Error
- Go to Settings → Secrets → Actions
- Ensure all required secrets are added
- Check secret names match exactly (case-sensitive)

## 📚 Additional Resources

- [Vercel Deployment Docs](https://vercel.com/docs/concepts/deployments/overview)
- [Railway Deployment Docs](https://docs.railway.app/deploy/github)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- See `DEPLOYMENT.md` in project root for detailed deployment guide

## 🔒 Security Notes

- ⚠️ Never commit `.env` files or secrets to git
- ✅ Use GitHub Secrets for sensitive data
- ✅ Enable branch protection on `main` branch
- ✅ Review deployments before production
- ✅ Rotate secrets regularly

## 🎯 Next Steps

After deployment:
1. Verify site is accessible
2. Test authentication flows
3. Test payment webhooks
4. Monitor logs for errors
5. Set up monitoring (optional: Sentry)

---

**Need Help?** Check the main `DEPLOYMENT.md` file or create an issue in the repository.

Synonyms:
- Railway deployment workflow
- Vercel CI/CD pipeline
- GitHub Actions deployment
- Automated deployment setup

