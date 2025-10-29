# 🔐 GitHub Secrets Quick Reference Checklist

Use this as a quick reference while setting up your secrets. Check off each one as you add it.

---

## 📍 Where to Add Secrets
**GitHub Repository → Settings → Secrets and variables → Actions → New repository secret**

---

## ✅ Essential Secrets (Add ALL of these)

| # | Secret Name | Where to Get It | Status |
|---|-------------|----------------|--------|
| 1 | `DATABASE_URL` | [Neon](https://neon.tech) or [Supabase](https://supabase.com) dashboard | ☐ |
| 2 | `AUTH_SECRET` | Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` | ☐ |
| 3 | `NEXT_PUBLIC_SITE_URL` | Your domain (e.g., `https://yourdomain.com`) | ☐ |
| 4 | `CLOUDINARY_CLOUD_NAME` | [Cloudinary Dashboard](https://cloudinary.com/console) | ☐ |
| 5 | `CLOUDINARY_API_KEY` | [Cloudinary Dashboard](https://cloudinary.com/console) | ☐ |
| 6 | `CLOUDINARY_API_SECRET` | [Cloudinary Dashboard](https://cloudinary.com/console) - Click "Show" | ☐ |
| 7 | `RESEND_API_KEY` | [Resend Dashboard](https://resend.com/api-keys) - Create new key | ☐ |
| 8 | `TAP_API_KEY` | [Tap Payments Dashboard](https://tap.company) - API Keys section | ☐ |
| 9 | `TAP_WEBHOOK_SECRET` | [Tap Payments Dashboard](https://tap.company) - Webhook settings | ☐ |
| 10 | `NEXT_PUBLIC_TAP_PUBLIC_KEY` | [Tap Payments Dashboard](https://tap.company) - Public Key | ☐ |

---

## ✅ Vercel Secrets (Add if deploying to Vercel)

| # | Secret Name | Where to Get It | Status |
|---|-------------|----------------|--------|
| 11 | `VERCEL_TOKEN` | [Vercel Tokens](https://vercel.com/account/tokens) - Create new token | ☐ |
| 12 | `VERCEL_ORG_ID` | Vercel Settings → Team ID, or run `vercel link` locally | ☐ |
| 13 | `VERCEL_PROJECT_ID` | Run `vercel link` locally, check `.vercel/project.json` | ☐ |

---

## ✅ Railway Secrets (Add if deploying to Railway instead of Vercel)

| # | Secret Name | Where to Get It | Status |
|---|-------------|----------------|--------|
| 14 | `RAILWAY_TOKEN` | [Railway Tokens](https://railway.app/account/tokens) - Create new token | ☐ |

---

## 📝 Quick Instructions for Each Secret

### 1. DATABASE_URL
**Service:** [Neon.tech](https://neon.tech) (Recommended) or [Supabase.com](https://supabase.com)
- Sign up → Create project → Copy connection string
- Format: `postgresql://user:password@host:port/database?sslmode=require`

### 2. AUTH_SECRET
**Generate it:**
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
Or online: [generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)

### 3. NEXT_PUBLIC_SITE_URL
**Your website URL:**
- If you have a domain: `https://yourdomain.com`
- If using Vercel: `https://your-project.vercel.app`
- If using Railway: `https://your-project.railway.app`
- You can update this later once deployed

### 4-6. Cloudinary Credentials
**Service:** [Cloudinary.com](https://cloudinary.com)
- Sign up → Dashboard → Copy:
  - Cloud name (e.g., `my-cloud-123`)
  - API Key (long number)
  - API Secret (click "Show" to reveal)

### 7. RESEND_API_KEY
**Service:** [Resend.com](https://resend.com)
- Sign up → API Keys → Create API Key
- Copy immediately (starts with `re_`)
- ⚠️ You won't see it again after creation!

### 8-10. Tap Payments Credentials
**Service:** [Tap.company](https://tap.company)
- Sign up → Dashboard → API Keys section
- Copy:
  - Secret Key → `TAP_API_KEY`
  - Public Key → `NEXT_PUBLIC_TAP_PUBLIC_KEY`
  - Webhook Secret → `TAP_WEBHOOK_SECRET`

### 11-13. Vercel Credentials (If using Vercel)
**Service:** [Vercel.com](https://vercel.com)

**VERCEL_TOKEN:**
- Settings → Tokens → Create Token → Copy (starts with `vercel_`)

**VERCEL_ORG_ID:**
- Settings → General → Copy Team ID
- Or run locally: `vercel link` → check `.vercel/project.json`

**VERCEL_PROJECT_ID:**
- Run locally: 
  ```bash
  npm install -g vercel
  vercel login
  vercel link
  ```
- Check `.vercel/project.json` for `projectId`

### 14. RAILWAY_TOKEN (If using Railway)
**Service:** [Railway.app](https://railway.app)
- Account Settings → Tokens → Create Token → Copy

---

## 🚀 Steps to Add Secrets

For EACH secret above:

1. Go to: **GitHub Repository → Settings → Secrets and variables → Actions**
2. Click **"New repository secret"**
3. **Name:** Enter the exact name from the table above (case-sensitive!)
4. **Secret:** Paste the value
5. Click **"Add secret"**
6. Check it off in the table above ✅
7. Repeat for next secret

---

## 🔍 Verification

After adding all secrets:

1. Go to: **Settings → Secrets and variables → Actions**
2. You should see all secrets listed (names only, values hidden)
3. Count them - you should have **10-13 secrets** depending on your deployment platform

---

## 📋 All Secret Names in One Place (Copy-Paste Ready)

```
DATABASE_URL
AUTH_SECRET
NEXT_PUBLIC_SITE_URL
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
RESEND_API_KEY
TAP_API_KEY
TAP_WEBHOOK_SECRET
NEXT_PUBLIC_TAP_PUBLIC_KEY
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
RAILWAY_TOKEN
```

---

## ⚡ Quick Links

- **Add Secrets:** `https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions`
- **Neon Database:** https://neon.tech
- **Supabase Database:** https://supabase.com
- **Cloudinary:** https://cloudinary.com
- **Resend:** https://resend.com
- **Tap Payments:** https://tap.company
- **Vercel:** https://vercel.com
- **Railway:** https://railway.app
- **Generate AUTH_SECRET:** https://generate-secret.vercel.app/32

---

## ✅ Final Checklist

Before deploying, make sure you have:

- [ ] All 10 essential secrets added
- [ ] Vercel secrets added (if using Vercel) OR Railway token added (if using Railway)
- [ ] All secret names spelled correctly (case-sensitive!)
- [ ] All values copied correctly (no extra spaces)
- [ ] Tested AUTH_SECRET generation works
- [ ] Database is ready and accessible
- [ ] All service accounts created and verified

---

## 🆘 Need Help?

- See detailed instructions: `.github/GITHUB-SECRETS-SETUP.md`
- Check deployment guide: `.github/DEPLOYMENT-SETUP.md`
- Review main docs: `DEPLOYMENT.md`

---

**Good luck! Once all secrets are set up, you're ready to deploy! 🚀**
