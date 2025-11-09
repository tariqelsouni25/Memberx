# 🚀 Deploy Member X to Vercel - Quick Start Guide

## Your GitHub Repository
✅ **Repository**: https://github.com/tariqelsouni25/Memberx.git

---

## Step-by-Step Deployment

### 📋 Step 1: Set Up External Services

Before deploying, create accounts and get credentials from these services:

#### 1️⃣ Database - Neon PostgreSQL (FREE)

1. Go to https://neon.tech
2. Sign up with GitHub
3. Click "Create Project"
4. Name it: `memberx-db`
5. Select region: Choose closest to your users (e.g., US East for global, EU for Europe)
6. Click "Create Project"
7. **Copy the connection string** - looks like:
   ```
   postgresql://user:password@ep-cool-name.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
8. ✅ Save this - you'll need it as `DATABASE_URL`

#### 2️⃣ Image Hosting - Cloudinary (FREE)

1. Go to https://cloudinary.com/users/register/free
2. Sign up (free plan = 25GB storage, 25GB bandwidth/month)
3. After logging in, go to Dashboard
4. **Copy these 3 values:**
   - Cloud Name: `your-cloud-name`
   - API Key: `123456789012345`
   - API Secret: `abcdefghijklmnopqrstuvwxyz`
5. ✅ Save these

#### 3️⃣ Email Service - Resend (FREE)

1. Go to https://resend.com/signup
2. Sign up (free plan = 100 emails/day, 3,000/month)
3. Click "API Keys" → "Create API Key"
4. Name it: `memberx-production`
5. **Copy the API key**: `re_123abc...`
6. ✅ Save this as `RESEND_API_KEY`

**Optional - Add Your Domain (for branded emails):**
- Click "Domains" → "Add Domain"
- Enter your domain
- Add the DNS records shown
- Wait for verification
- Use `noreply@yourdomain.com` as sender

#### 4️⃣ Payment Gateway - Tap Payments

**For Testing (Sandbox):**
1. Go to https://www.tap.company
2. Sign up for a test account
3. Go to Dashboard → Settings → API Keys
4. **Copy these:**
   - Secret Key (Test): `sk_test_...`
   - Public Key (Test): `pk_test_...`
5. Generate a webhook secret or use any random string

**For Production:**
- Complete business verification
- Get live API keys
- Set up webhook endpoint

#### 5️⃣ Generate AUTH_SECRET

Run this command in your terminal:

**Windows PowerShell:**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object {Get-Random -Minimum 0 -Maximum 256}))
```

**Or use this online:** https://generate-secret.vercel.app/32

✅ Save the generated string (should be 40+ characters)

---

### 🚀 Step 2: Deploy to Vercel

#### Deploy Process:

1. **Go to Vercel**
   - Visit https://vercel.com
   - Click "Sign Up" → Choose "Continue with GitHub"
   - Authorize Vercel to access your GitHub

2. **Import Your Project**
   - Click "Add New..." → "Project"
   - Find your repository: `tariqelsouni25/Memberx`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - Keep all other settings as default

4. **Add Environment Variables** ⚠️ CRITICAL STEP
   
   Click "Environment Variables" and add these **ONE BY ONE**:

   ```env
   # Database (from Neon)
   DATABASE_URL=postgresql://user:password@host.neon.tech/neondb?sslmode=require

   # Authentication
   AUTH_SECRET=your-generated-secret-from-step-5
   NEXTAUTH_URL=https://your-app-name.vercel.app

   # Site Configuration
   NEXT_PUBLIC_SITE_URL=https://your-app-name.vercel.app
   NEXT_PUBLIC_SITE_NAME=Member X

   # Cloudinary (from Step 2)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Email (from Resend)
   RESEND_API_KEY=re_your_api_key
   RESEND_FROM_EMAIL=noreply@yourdomain.com

   # Payments (from Tap)
   TAP_API_KEY=sk_test_your_secret_key
   TAP_WEBHOOK_SECRET=your_webhook_secret
   NEXT_PUBLIC_TAP_PUBLIC_KEY=pk_test_your_public_key

   # Build Configuration
   SKIP_ENV_VALIDATION=true
   ```

   **Important Notes:**
   - For `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL`: You'll get the URL after first deploy
   - You can edit these later in Project Settings → Environment Variables
   - Make sure all values are correct - no spaces or quotes needed

5. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - ✅ You'll get a URL like: `https://memberx-abc123.vercel.app`

---

### 🗄️ Step 3: Initialize Database

After your first deployment succeeds:

1. **Update Environment Variables with Your URL**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Update `NEXTAUTH_URL` to: `https://your-actual-url.vercel.app`
   - Update `NEXT_PUBLIC_SITE_URL` to: `https://your-actual-url.vercel.app`
   - Click "Save"

2. **Run Database Migrations**
   
   Go to your Vercel project → Settings → Functions → Add Function (or use Vercel CLI)
   
   **Option A: Using Vercel CLI (Recommended)**
   ```powershell
   # Install Vercel CLI
   npm install -g vercel

   # Login
   vercel login

   # Link project
   vercel link

   # Run migration (use your DATABASE_URL from Neon)
   vercel env pull .env.local
   npx prisma migrate deploy
   ```

   **Option B: Manual SQL (if CLI doesn't work)**
   - Download your `prisma/schema.prisma`
   - Go to Neon dashboard → SQL Editor
   - Generate SQL manually or use Prisma Studio

3. **Seed the Database**
   ```powershell
   # Using your local environment with production DB URL
   npm run prisma:seed
   ```

   Or manually run the seed script through Vercel CLI:
   ```powershell
   vercel env pull .env.local
   npm run prisma:seed
   ```

---

### 🔧 Step 4: Configure Webhooks

**Tap Payments Webhook:**

1. Go to Tap Dashboard → Webhooks
2. Add new webhook:
   - **URL**: `https://your-app.vercel.app/api/webhooks/tap`
   - **Events**: Select these:
     - `charge.captured`
     - `charge.failed`
     - `charge.updated`
   - **Secret**: Use the same `TAP_WEBHOOK_SECRET` you set in env vars
3. Save and test

---

### ✅ Step 5: Test Your Deployment

1. **Visit your site**: `https://your-app.vercel.app`

2. **Test login** with seeded accounts:
   - Admin: `admin@demo.local` / `admin123`
   - User: `user@demo.local` / `user123`

3. **Check Admin Dashboard**: `https://your-app.vercel.app/admin`

4. **Test key features:**
   - Browse deals
   - View deal details
   - Add to cart (test the flow, don't complete payment in test mode)
   - Upload images in admin

---

### 🔒 Step 6: Security (IMPORTANT!)

⚠️ **Before going live:**

1. **Change all default passwords!**
   - Go to admin dashboard
   - Delete or change passwords for demo accounts
   - Create new admin account with strong password

2. **Update email templates**
   - Edit `lib/email.ts`
   - Change sender name and email

3. **Configure custom domain** (Optional but recommended)
   - Go to Vercel Project → Settings → Domains
   - Add your domain (e.g., memberx.com)
   - Update DNS records as shown
   - Update `NEXT_PUBLIC_SITE_URL` to your custom domain

4. **Switch to production API keys**
   - Update Tap API keys from test to live
   - Update Cloudinary to production settings
   - Update Resend domain

---

## 🎉 You're Live!

Your Member X marketplace is now deployed and accessible online!

### What's Next?

- [ ] Add custom domain
- [ ] Upload real listings via admin
- [ ] Configure email templates
- [ ] Set up Google Analytics (optional)
- [ ] Enable Sentry for error tracking (optional)
- [ ] Configure Redis for caching (optional)

---

## 🐛 Troubleshooting

### Build Fails

**Error: "Cannot find module '@prisma/client'"**
- Solution: Vercel auto-runs `prisma generate` via `postinstall` script
- Check that `postinstall` exists in `package.json`

**Error: "Environment variable not defined"**
- Solution: Double-check all environment variables in Vercel dashboard
- Make sure `SKIP_ENV_VALIDATION=true` is set

### Database Connection Issues

**Error: "Can't reach database server"**
- Check your `DATABASE_URL` format
- Ensure it includes `?sslmode=require` at the end
- Verify your IP isn't blocked in Neon

### Runtime Errors

**Check Vercel Logs:**
1. Go to Vercel Dashboard → Your Project
2. Click "Deployments"
3. Click on your deployment
4. Click "View Function Logs"

---

## 📱 Mobile Testing

After deployment, test on:
- iPhone Safari
- Android Chrome
- Desktop Chrome, Firefox, Safari

---

## 🔄 Continuous Deployment

Now that you're deployed:

1. **Every push to `main` branch = automatic deployment**
2. **Preview deployments** for pull requests
3. **Rollback** available in Vercel dashboard

To deploy updates:
```powershell
git add .
git commit -m "Update features"
git push origin main
```

Vercel will automatically build and deploy!

---

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs

---

**🎊 Congratulations on deploying Member X! 🎊**

