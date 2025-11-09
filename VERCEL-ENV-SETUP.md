# ⚠️ CRITICAL: Vercel Environment Variables Setup

## 🚨 Required Action Before Deployment Works

Your app will BUILD successfully now, but **IT WILL NOT WORK** at runtime until you add environment variables in Vercel.

---

## 📝 Step-by-Step: Add Environment Variables to Vercel

### 1. Go to Vercel Dashboard
- Visit: https://vercel.com/dashboard
- Click on your `Memberx` project

### 2. Open Environment Variables Settings
- Click on **"Settings"** tab
- Click on **"Environment Variables"** in the left sidebar

### 3. Add ALL These Variables

Click **"Add New"** for each variable below:

#### Database (REQUIRED)
```
Key: DATABASE_URL
Value: postgresql://user:password@host.region.provider.com/database?sslmode=require
Environment: Production, Preview, Development
```
**Get this from:** https://neon.tech (or your database provider)

#### Authentication (REQUIRED)
```
Key: AUTH_SECRET
Value: (Generate with command below)
Environment: Production, Preview, Development
```
**Generate with PowerShell:**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object {Get-Random -Minimum 0 -Maximum 256}))
```

```
Key: NEXTAUTH_URL  
Value: https://your-actual-vercel-url.vercel.app
Environment: Production, Preview, Development
```
**Note:** Update this AFTER first deployment with your actual URL

#### Site Configuration (REQUIRED)
```
Key: NEXT_PUBLIC_SITE_URL
Value: https://your-actual-vercel-url.vercel.app
Environment: Production, Preview, Development
```

```
Key: NEXT_PUBLIC_SITE_NAME
Value: Member X
Environment: Production, Preview, Development
```

#### Cloudinary - Image Hosting (REQUIRED)
```
Key: CLOUDINARY_CLOUD_NAME
Value: your-cloud-name
Environment: Production, Preview, Development
```

```
Key: CLOUDINARY_API_KEY
Value: your-api-key
Environment: Production, Preview, Development
```

```
Key: CLOUDINARY_API_SECRET
Value: your-api-secret
Environment: Production, Preview, Development
```
**Get these from:** https://cloudinary.com/console

#### Resend - Email Service (REQUIRED)
```
Key: RESEND_API_KEY
Value: re_your_api_key
Environment: Production, Preview, Development
```

```
Key: RESEND_FROM_EMAIL
Value: noreply@yourdomain.com
Environment: Production, Preview, Development
```
**Get API key from:** https://resend.com/api-keys

#### Tap Payments - Payment Gateway (REQUIRED)
```
Key: TAP_API_KEY
Value: sk_test_your_secret_key (or sk_live_ for production)
Environment: Production, Preview, Development
```

```
Key: TAP_WEBHOOK_SECRET
Value: your-webhook-secret
Environment: Production, Preview, Development
```

```
Key: NEXT_PUBLIC_TAP_PUBLIC_KEY
Value: pk_test_your_public_key (or pk_live_ for production)
Environment: Production, Preview, Development
```
**Get these from:** https://dashboard.tap.company

---

## ✅ After Adding Variables

1. **Redeploy Your App**
   - Go to **Deployments** tab
   - Click the three dots (...) on the latest deployment
   - Click **"Redeploy"**
   - OR push a new commit to trigger automatic deployment

2. **Verify Environment Variables**
   - In Vercel Settings → Environment Variables
   - You should see all variables listed
   - Each should be available in Production, Preview, and Development

3. **Update URLs After First Deployment**
   - Once deployed, copy your Vercel URL
   - Update `NEXTAUTH_URL` with actual URL
   - Update `NEXT_PUBLIC_SITE_URL` with actual URL
   - Redeploy again

---

## 🔍 Why This Is Needed

- **Build Time**: Uses placeholder DATABASE_URL from `vercel.json` to allow Prisma to generate client
- **Runtime**: Uses REAL DATABASE_URL from environment variables to connect to actual database
- **Without these**: Your app will build but crash when trying to access database/auth/images/emails

---

## 🆘 Troubleshooting

### Build Still Fails
- Check that all environment variables are added
- Verify DATABASE_URL format is correct
- Make sure you selected all environments (Production, Preview, Development)

### App Builds But Crashes at Runtime
- DATABASE_URL is missing or incorrect
- Check Vercel Function Logs for specific errors
- Verify all REQUIRED environment variables are set

### Authentication Not Working
- Check AUTH_SECRET is set and is a long random string
- Verify NEXTAUTH_URL matches your actual deployment URL
- Make sure DATABASE_URL is valid (auth uses database)

### Images Not Uploading
- Verify all three CLOUDINARY_* variables are set correctly
- Check Cloudinary dashboard to confirm API keys are active

---

## 📚 Quick Reference

**Minimum Required for Basic Functionality:**
1. DATABASE_URL
2. AUTH_SECRET  
3. NEXTAUTH_URL
4. NEXT_PUBLIC_SITE_URL
5. CLOUDINARY_CLOUD_NAME
6. CLOUDINARY_API_KEY
7. CLOUDINARY_API_SECRET
8. RESEND_API_KEY
9. TAP_API_KEY
10. NEXT_PUBLIC_TAP_PUBLIC_KEY

---

## 🎯 Next Steps

After adding environment variables:

1. ✅ Redeploy your app
2. ✅ Run database migrations (see DEPLOY-NOW.md)
3. ✅ Seed the database
4. ✅ Test your deployment
5. ✅ Update URLs in environment variables
6. ✅ Redeploy one more time

---

**📖 For detailed deployment guide, see:** `DEPLOY-NOW.md`

**📋 For deployment checklist, see:** `DEPLOYMENT-CHECKLIST.md`

