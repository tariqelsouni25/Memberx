# 🔐 Your Personal Secrets Setup Guide

Use this guide to set up all your GitHub Secrets. I've already generated some values for you!

---

## ✅ Secret 1: AUTH_SECRET (GENERATED FOR YOU!)

**Value to copy:**
```
bjF8yOA38kE9vURdAp5ySQKMl1EsFm/tCSKEnd0iirw=
```

**How to add:**
1. Go to: https://github.com/tariqelsouni25/Memberx/settings/secrets/actions
2. Click **"New repository secret"**
3. **Name:** `AUTH_SECRET`
4. **Secret:** Paste: `bjF8yOA38kE9vURdAp5ySQKMl1EsFm/tCSKEnd0iirw=`
5. Click **"Add secret"**

---

## 📍 Next: Add These Secrets (I'll Help You Get Each One)

### Secret 2: DATABASE_URL

**What you need:**
- A PostgreSQL database (free options: Neon, Supabase, Railway)

**Option A: Neon (Recommended - Free tier available)**
1. Go to: https://neon.tech
2. Sign up (free account available)
3. Click **"Create a project"**
4. Choose a name: `memberx` or `Memberx`
5. Select a region close to you
6. Click **"Create project"**
7. On the project dashboard, you'll see **"Connection string"**
8. Click **"Copy"** - it looks like:
   ```
   postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

**Option B: Supabase (Free tier available)**
1. Go to: https://supabase.com
2. Sign up (free account available)
3. Click **"New project"**
4. Fill in:
   - Name: `Memberx`
   - Database password: (choose a strong password - save it!)
   - Region: choose closest to you
5. Click **"Create new project"** (takes ~2 minutes)
6. Go to **Settings** → **Database**
7. Find **"Connection string"** → **"URI"**
8. Copy the connection string

**Once you have it:**
1. Go to GitHub Secrets
2. Add new secret
3. **Name:** `DATABASE_URL`
4. **Secret:** Paste your connection string
5. Click **"Add secret"**

---

### Secret 3: NEXT_PUBLIC_SITE_URL

**For now, use a placeholder (you can update later):**
```
https://memberx.vercel.app
```

Or if you have a domain:
```
https://yourdomain.com
```

**How to add:**
1. Go to GitHub Secrets
2. Add new secret
3. **Name:** `NEXT_PUBLIC_SITE_URL`
4. **Secret:** `https://memberx.vercel.app` (or your actual domain)
5. Click **"Add secret"**

---

### Secrets 4-6: Cloudinary Credentials

**Step 1: Create Cloudinary Account**
1. Go to: https://cloudinary.com
2. Sign up (free account available - 25 credits/month)
3. Verify your email

**Step 2: Get Your Credentials**
1. Go to your Cloudinary Dashboard: https://cloudinary.com/console
2. You'll see three values displayed:
   - **Cloud name** (e.g., `my-cloud-123`)
   - **API Key** (a long number)
   - **API Secret** (click "Show" or the eye icon to reveal it)

**Step 3: Add All Three Secrets**
Add them one by one:

**Secret 4: CLOUDINARY_CLOUD_NAME**
1. Go to GitHub Secrets
2. Add new secret
3. **Name:** `CLOUDINARY_CLOUD_NAME`
4. **Secret:** Paste your cloud name
5. Click **"Add secret"**

**Secret 5: CLOUDINARY_API_KEY**
1. Go to GitHub Secrets
2. Add new secret
3. **Name:** `CLOUDINARY_API_KEY`
4. **Secret:** Paste your API Key (the number)
5. Click **"Add secret"**

**Secret 6: CLOUDINARY_API_SECRET**
1. Go to GitHub Secrets
2. Add new secret
3. **Name:** `CLOUDINARY_API_SECRET`
4. **Secret:** Paste your API Secret (the long string - make sure to show it first!)
5. Click **"Add secret"**

---

### Secret 7: RESEND_API_KEY

**Step 1: Create Resend Account**
1. Go to: https://resend.com
2. Sign up (free account available - 100 emails/day)
3. Verify your email

**Step 2: Create API Key**
1. Go to: https://resend.com/api-keys
2. Click **"Create API Key"**
3. Name it: `GitHub Deployment`
4. Select **Full Access**
5. Click **"Create"**
6. **COPY THE KEY IMMEDIATELY** - it starts with `re_` and you won't see it again!

**How to add:**
1. Go to GitHub Secrets
2. Add new secret
3. **Name:** `RESEND_API_KEY`
4. **Secret:** Paste your key (starts with `re_`)
5. Click **"Add secret"**

---

### Secrets 8-10: Tap Payments (If you have account)

If you already have Tap Payments:
1. Go to: https://tap.company
2. Log in to your dashboard
3. Go to **API Keys** section
4. Copy:
   - **Secret Key** → Add as `TAP_API_KEY`
   - **Public Key** → Add as `NEXT_PUBLIC_TAP_PUBLIC_KEY`
   - **Webhook Secret** → Add as `TAP_WEBHOOK_SECRET`

**If you don't have Tap Payments yet:**
- You can add placeholder values for now and update later
- Or skip these for initial deployment and add them when you're ready for payments

---

## 🚀 Vercel Secrets (If you want to deploy to Vercel)

### Secret 11: VERCEL_TOKEN

**Step 1: Install Vercel CLI (Optional - for easier setup)**
```powershell
npm install -g vercel
```

**Step 2: Get Vercel Token**
1. Go to: https://vercel.com/account/tokens
2. Click **"Create Token"**
3. Name it: `GitHub Deployment`
4. Select **Full Account Access**
5. Click **"Create"**
6. **COPY THE TOKEN** - it starts with `vercel_`

**How to add:**
1. Go to GitHub Secrets
2. Add new secret
3. **Name:** `VERCEL_TOKEN`
4. **Secret:** Paste your token
5. Click **"Add secret"**

---

### Secret 12: VERCEL_ORG_ID

**Option A: UEFA Vercel Dashboard**
1. Go to: https://vercel.com
2. Sign up/login
3. Click on your **team/organization name** (top left)
4. Go to **Settings** → **General**
5. Find **"Team ID"** or **"Organization ID"**
6. Copy that ID

**Option B: Using Vercel CLI**
1. Open PowerShell in your project folder
2. Run: `vercel login`
3. Run: `vercel link`
4. Follow prompts to create/link project
5. Check `.vercel/project.json` file
6. Copy the `orgId` value

**How to add:**
1. Go to GitHub Secrets
2. Add new secret
3. **Name:** `VERCEL_ORG_ID`
4. **Secret:** Paste the org ID
5. Click **"Add secret"**

---

### Secret 13: VERCEL_PROJECT_ID

**After linking your project (from Secret 12):**
1. Check `.vercel/project.json` file in your project
2. Copy the `projectId` value

**Or:**
1. Go to Vercel Dashboard
2. Click on your project
3. Go to **Settings** → **General**
4. Find **Project ID**

**How to add:**
1. Go to GitHub Secrets
2. Add new secret
3. **Name:** `VERCEL_PROJECT_ID`
4. **Secret:** Paste the project ID
5. Click **"Add secret"**

---

## 📋 Quick Action Checklist

Use this to track your progress:

### Essential Secrets (Required)
- [ ] `AUTH_SECRET` - ✅ **Already generated above!**
- [ ] `DATABASE_URL` - Set up Neon/Supabase account
- [ ] `NEXT_PUBLIC_SITE_URL` - Use placeholder for now
- [ ] `CLOUDINARY_CLOUD_NAME` - Set up Cloudinary account
- [ ] `CLOUDINARY_API_KEY` - From Cloudinary dashboard
- [ ] `CLOUDINARY_API_SECRET` - From Cloudinary dashboard
- [ ] `RESEND_API_KEY` - Set up Resend account
- [ ] `TAP_API_KEY` - Optional for now
- [ ] `TAP_WEBHOOK_SECRET` - Optional for now
- [ ] `NEXT_PUBLIC_TAP_PUBLIC_KEY` - Optional for now

### Vercel Secrets (If deploying to Vercel)
- [ ] `VERCEL_TOKEN` - From Vercel account settings
- [ ] `VERCEL_ORG_ID` - From Vercel team settings
- [ ] `VERCEL_PROJECT_ID` - After linking project

---

## 🎯 Recommended Order to Set Up

1. **Start with AUTH_SECRET** ✅ (Already done!)
2. **Set up DATABASE_URL** (Neon or Supabase - 5 minutes)
3. **Set up NEXT_PUBLIC_SITE_URL** (2 seconds - use placeholder)
4. **Set up Cloudinary** (5 minutes)
5. **Set up Resend** (3 minutes)
6. **Set up Vercel secrets** (if using Vercel - 10 minutes)
7. **Add Tap Payments** (later, if needed)

---

## 📍 Direct Link to Add Secrets

**Click here:** https://github.com/tariqelsouni25/Memberx/settings/secrets/actions

---

## 💡 Tips

1. **Start with minimum secrets:** At least add `AUTH_SECRET`, `DATABASE_URL`, and `NEXT_PUBLIC_SITE_URL` to test deployment
2. **Update later:** You can always update secrets later in GitHub settings
3. **Free tiers available:** All recommended services have free tiers to get started
4. **Test deployment:** Once you have the minimum secrets, push to main branch and see if deployment works

---

## 🆘 Need Help?

If you get stuck on any step, let me know:
- Which secret are you working on?
- What step are you at?
- What error or issue are you seeing?

Good luck! 🚀
