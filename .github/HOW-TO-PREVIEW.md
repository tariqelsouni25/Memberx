# 👀 How to Preview Your Deployed Pages

After your code is on GitHub, you need to deploy it to a hosting platform to preview it. Here's how:

---

## 🎯 Quick Answer

**GitHub doesn't host your app directly.** You need to:
1. ✅ Code is on GitHub (Done!)
2. ⏳ Deploy to Vercel/Railway (Next step)
3. ✅ Preview at your deployment URL

---

## 📍 Method 1: After Deployment to Vercel (Recommended)

### Step 1: Deploy to Vercel

Your deployment workflow will automatically deploy when you push to `main` **AND** have secrets set up.

### Step 2: Find Your Deployment URL

**Option A: Check GitHub Actions**
1. Go to: https://github.com/tariqelsouni25/Memberx/actions
2. Click on the latest "Deploy" workflow run
3. Look at the workflow logs
4. Find the line that says: `🚀 Deployment completed successfully!`
5. You'll see: `Production URL: https://your-project.vercel.app`

**Option B: Check Vercel Dashboard**
1. Go to: https://vercel.com/dashboard
2. Sign in (same account you used for VERCEL_TOKEN)
3. Find your project "Memberx" or "emberx"
4. Click on it
5. You'll see the deployment URL: `https://your-project.vercel.app`

**Option C: Check Deployment Email**
- Vercel sends an email when deployment completes with the URL

### Step 3: Preview Your Pages

Once you have your URL (e.g., `https://memberx.vercel.app`), you can access:

#### 🏠 Main Pages:
- **Homepage:** `https://your-project.vercel.app/`
- **Contact:** `https://your-project.vercel.app/contact`
- **About:** `https://your-project.vercel.app/about`
- **Privacy:** `https://your-project.vercel.app/privacy`
- **Terms:** `https://your-project.vercel.app/terms`

#### 🛍️ Category Pages (Riyadh):
- **Food & Dining:** `https://your-project.vercel.app/deals/riyadh/food-dining`
- **Beauty & Spa:** `https://your-project.vercel.app/deals/riyadh/beauty-spa`
- **Hotels:** `https://your-project.vercel.app/deals/riyadh/hotels`
- **Activities:** `https://your-project.vercel.app/deals/riyadh/activities`
- **Travel:** `https://your-project.vercel.app/deals/riyadh/travel`
- **Health:** `https://your-project.vercel.app/deals/riyadh/health`
- **Services:** `https://your-project.vercel.app/deals/riyadh/services`

#### 🔐 Admin Pages:
- **Admin Dashboard:** `https://your-project.vercel.app/admin`
- **Admin Login:** `https://your-project.vercel.app/auth/signin`

#### 👤 User Pages:
- **Account:** `https://your-project.vercel.app/account`
- **Partner Dashboard:** `https://your-project.vercel.app/partner`

---

## 📍 Method 2: After Deployment to Railway

If you're using Railway instead:

1. Go to: https://railway.app/dashboard
2. Find your project
3. Click on it
4. Click on your service
5. Find the "Domains" section
6. Your URL will be: `https://your-project.railway.app`

Then use the same page paths as above!

---

## 📍 Method 3: Preview Locally (Before Deployment)

If you want to test the code locally without deploying:

### Step 1: Make Sure Dependencies are Installed
```bash
npm install
```

### Step 2: Set Up Environment Variables
Create a `.env` file in your project root with:
```env
DATABASE_URL=your-database-url
AUTH_SECRET=your-auth-secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# ... other variables
```

### Step 3: Generate Prisma Client
```bash
npm run prisma:generate
```

### Step 4: Run Development Server
```bash
npm run dev
```

### Step 5: Open Browser
Go to: **http://localhost:3000**

You can then preview all pages:
- http://localhost:3000/
- http://localhost:3000/contact
- http://localhost:3000/admin
- etc.

---

## 🔍 How to Check if Deployment Succeeded

### Check GitHub Actions:
1. Go to: https://github.com/tariqelsouni25/Memberx/actions
2. Look for green checkmarks ✅ = Success
3. Look for red X ❌ = Failed (check logs)

### Check Deployment Logs:
1. Click on a workflow run
2. Click on the "Deploy to Vercel" job
3. Scroll down to see:
   - ✅ Build success
   - ✅ Deployment URL
   - ❌ Any errors

---

## ⚠️ Common Issues

### "Deployment Not Found"
**Problem:** Deployment hasn't run yet
**Solution:** 
- Make sure you've pushed to `main` branch
- Check if secrets are set up (required for deployment)

### "404 Not Found" on Preview
**Problem:** App might not be deployed yet or URL is wrong
**Solution:**
- Check Vercel/Railway dashboard for correct URL
- Wait a few minutes after deployment (can take 2-5 minutes)
- Make sure deployment succeeded (green checkmark)

### "Build Failed"
**Problem:** Something wrong with the code or secrets
**Solution:**
- Check GitHub Actions logs for error messages
- Make sure all required secrets are added
- Check if database is accessible

---

## 📋 Quick Checklist to Preview

Before you can preview:

- [ ] Code is pushed to GitHub ✅ (Done!)
- [ ] Secrets are set up (VERCEL_TOKEN, DATABASE_URL, etc.)
- [ ] Deployment workflow ran successfully
- [ ] Got deployment URL from Vercel/Railway
- [ ] Can access the URL in browser

---

## 🚀 Quick Deploy Command (Alternative)

If you want to deploy manually via Vercel CLI:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

This will give you a deployment URL immediately!

---

## 📱 Testing on Mobile

Once deployed, you can also test on mobile:
1. Open the deployment URL on your phone
2. Or use Vercel's preview feature to get a shareable link
3. Test responsive design and mobile navigation

---

## 🔄 Automatic Previews

**Every time you push to GitHub:**
- ✅ If secrets are set up → Auto-deploys to production
- ✅ You can preview immediately at your production URL

**For pull requests:**
- Vercel creates preview deployments for each PR
- You'll see a preview URL in the PR comments

---

## 📚 All Your Preview Links (After Deployment)

Once deployed, bookmark these:

```
🏠 Main Site: https://your-project.vercel.app
📧 Contact: https://your-project.vercel.app/contact
📄 About: https://your-project.vercel.app/about
🔒 Admin: https://your-project.vercel.app/admin
👤 Account: https://your-project.vercel.app/account
🛍️ Deals: https://your-project.vercel.app/deals/riyadh/food-dining
```

---

**Need Help?**
- Check deployment status: https://github.com/tariqelsouni25/Memberx/actions
- View deployment logs for errors
- Make sure all secrets are configured

