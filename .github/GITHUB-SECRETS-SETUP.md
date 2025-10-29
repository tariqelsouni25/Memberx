# 🔐 Step-by-Step Guide: Setting Up GitHub Secrets

This guide will walk you through setting up GitHub Secrets for your deployment workflows.

## 📍 Part 1: Accessing GitHub Secrets Page

### Step 1: Open Your Repository on GitHub
1. Go to [github.com](https://github.com) and sign in
2. Navigate to your repository: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME`

### Step 2: Open Repository Settings
1. Click on the **"Settings"** tab (it's the rightmost tab at the top of your repository)
   - Note: If you don't see the Settings tab, you may not have admin access to the repository

### Step 3: Navigate to Secrets
1. In the left sidebar, scroll down to find **"Secrets and variables"**
2. Click on **"Secrets and variables"**
3. Click on **"Actions"** (this opens the Actions secrets page)

### Step 4: Add Your First Secret
1. Click the green button **"New repository secret"** (top right)
2. You'll see a form with two fields:
   - **Name**: This is the secret name (must match exactly what the workflow expects)
   - **Secret**: This is the actual value (kept private)

---

## 📝 Part 2: Adding Required Secrets

You'll need to add each secret one by one. Here's the complete list and how to get each value:

---

## 🔑 Secret 1: DATABASE_URL

**What it is:** Your production PostgreSQL database connection string

**How to get it:**
1. **If using Neon (Recommended):**
   - Go to [neon.tech](https://neon.tech) and sign in
   - Create a new project or select existing one
   - Click on your database
   - Copy the connection string (it looks like: `postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require`)

2. **If using Supabase:**
   - Go to [supabase.com](https://supabase.com) and sign in
   - Select your project
   - Go to **Settings** → **Database**
   - Scroll to **Connection string** → **URI**
   - Copy the connection string (it should include `?sslmode=require`)

3. **If using Railway:**
   - Go to [railway.app](https://railway.app) and sign in
   - Click on your PostgreSQL database
   - Go to **Variables** tab
   - Copy the value of `DATABASE_URL`

**How to add it:**
1. Click **"New repository secret"**
2. **Name:** `DATABASE_URL` (exact capitalization)
3. **Secret:** Paste your connection string
4. Click **"Add secret"**

---

## 🔑 Secret 2: AUTH_SECRET

**What it is:** A random secret key for encrypting user sessions

**How to generate it:**
1. **Option A: Using Node.js (Recommended)**
   - Open PowerShell or Command Prompt
   - Navigate to your project folder
   - Run this command:
     ```powershell
     node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
     ```
   - Copy the output (a long string of characters)

2. **Option B: Using Git Bash or WSL**
   - Open Git Bash or Windows Subsystem for Linux
   - Run:
     ```bash
     openssl rand -base64 32
     ```
   - Copy the output

3. **Option C: Online Generator**
   - Go to [generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)
   - Copy the generated secret

**How to add it:**
1. Click **"New repository secret"**
2. **Name:** `AUTH_SECRET`
3. **Secret:** Paste the generated secret
4. Click **"Add secret"**

---

## 🔑 Secret 3: NEXT_PUBLIC_SITE_URL

**What it is:** Your website's production URL

**How to get it:**
- If you already have a domain: `https://yourdomain.com`
- If using Vercel: `https://your-project.vercel.app` (you'll get this after first deployment)
- If using Railway: `https://your-project.railway.app`
- You can update this later once you have your actual domain

**How to add it:**
1. Click **"New repository secret"**
2. **Name:** `NEXT_PUBLIC_SITE_URL`
3. **Secret:** Enter your URL (e.g., `https://yourdomain.com`)
4. Click **"Add secret"**

---

## 🔑 Secrets 4-6: Cloudinary Credentials

**What they are:** Image hosting service credentials

**How to get them:**
1. Go to [cloudinary.com](https://cloudinary.com) and sign up/login
2. Go to your **Dashboard**
3. You'll see:
   - **Cloud name** (e.g., `my-cloud-name`)
   - **API Key** (a long number)
   - **API Secret** (click "Show" to reveal it)

**How to add them:**

**Secret 4: CLOUDINARY_CLOUD_NAME**
1. Click **"New repository secret"**
2. **Name:** `CLOUDINARY_CLOUD_NAME`
3. **Secret:** Your Cloudinary cloud name
4. Click **"Add secret"**

**Secret 5: CLOUDINARY_API_KEY**
1. Click **"New repository secret"**
2. **Name:** `CLOUDINARY_API_KEY`
3. **Secret:** Your Cloudinary API Key
4. Click **"Add secret"**

**Secret 6: CLOUDINARY_API_SECRET**
1. Click **"New repository secret"**
2. **Name:** `CLOUDINARY_API_SECRET`
3. **Secret:** Your Cloudinary API Secret
4. Click **"Add secret"**

---

## 🔑 Secret 7: RESEND_API_KEY

**What it is:** Email service API key

**How to get it:**
1. Go to [resend.com](https://resend.com) and sign up/login
2. Go to **API Keys** in the dashboard
3. Click **"Create API Key"**
4. Give it a name (e.g., "Production")
5. Select **Full Access** or appropriate permissions
6. Click **"Create"**
7. **Copy the API key immediately** (you won't be able to see it again!)

**How to add it:**
1. Click **"New repository secret"**
2. **Name:** `RESEND_API_KEY`
3. **Secret:** Paste the API key (starts with `re_`)
4. Click **"Add secret"**

---

## 🔑 HSecrets 8-10: Tap Payments Credentials

**What they are:** Payment gateway API keys

**How to get them:**
1. Go to [tap.company](https://tap.company) and sign up/login
2. Go to your **Dashboard**
3. Navigate to **API Keys** or **Settings** → **API Keys**
4. You'll find:
   - **Secret Key** (for server-side)
   - **Public Key** (for client-side)
   - **Webhook Secret** (for webhook verification)

**How to add them:**

**Secret 8: TAP_API_KEY**
1. Click **"New repository secret"**
2. **Name:** `TAP_API_KEY`
3. **Secret:** Your Tap Payments Secret Key
4. Click **"Add secret"**

**Secret 9: TAP_WEBHOOK_SECRET**
1. Click **"New repository secret"**
2. **Name:** `TAP_WEBHOOK_SECRET`
3. **Secret:** Your Tap Payments Webhook Secret
4. Click **"Add secret"**

**Secret 10: NEXT_PUBLIC_TAP_PUBLIC_KEY**
1. Click **"New repository secret"**
2. **Name:** `NEXT_PUBLIC_TAP_PUBLIC_KEY`
3. **Secret:** Your Tap Payments Public Key
4. Click **"Add secret"**

---

## 🚀 Part 3: Vercel Deployment Secrets (If Using Vercel)

If you plan to deploy to Vercel, you'll need these additional secrets:

---

## 🔑 Secret 11: VERCEL_TOKEN

**What it is:** Vercel API token for deployment

**How to get it:**
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click on your profile picture (top right)
3. Click **"Settings"**
4. In the left sidebar, click **"Tokens"**
5. Click **"Create Token"**
6. Give it a name: `GitHub Deployment`
7. Select **Full Account Access** (or appropriate scope)
8. Click **"Create"**
9. **Copy the token immediately** (starts with `vercel_`)

**How to add it:**
1. Click **"New repository secret"**
2. **Name:** `VERCEL_TOKEN`
3. **Secret:** Paste the token
4. Click **"Add secret"**

---

## 🔑 Secret 12: VERCEL_ORG_ID

**What it is:** Your Vercel organization/team ID

**How to get it:**
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click on your **team/organization** name (top left)
3. Click **"Settings"**
4. In the **General** tab, you'll see **"Team ID"** or **"Organization ID"**
5. Copy that ID

**Alternative method (using Vercel CLI):**
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel login`
3. Navigate to your project folder
4. Run: `vercel link`
5. It will create a `.vercel` folder with `project.json` containing the org ID

**How to add it:**
1. Click **"New repository secret"**
2. **Name:** `VERCEL_ORG_ID`
3. **Secret:** Paste the organization ID
4. Click **"Add secret"**

---

## 🔑 Secret 13: VERCEL_PROJECT_ID

**What it is:** Your Vercel project ID

**How to get it:**
1. **First, link your project to Vercel:**
   - Install Vercel CLI: `npm install -g vercel`
   - Open terminal in your project folder
   - Run: `vercel login`
   - Run: `vercel link`
   - Follow the prompts to create/link a project
   
2. **Get the Project ID:**
   - After running `vercel link`, check the `.vercel/project.json` file
   - Open: `.vercel/project.json`
   - Copy the `projectId` value

**Alternative method:**
1. Create a new project in Vercel dashboard
2. Go to project **Settings** → **General**
3. Look for **Project ID** in the settings

**How to add it:**
1. Click **"New repository secret"**
2. **Name:** `VERCEL_PROJECT_ID`
3. **Secret:** Paste the project ID
4. Click **"Add secret"**

---

## 📋 Part 4: Verification Checklist

After adding all secrets, verify you have:

### ✅ Essential Secrets (Required for all deployments)
- [ ] `DATABASE_URL`
- [ ] `AUTH_SECRET`
- [ ] `NEXT_PUBLIC_SITE_URL`
- [ ] `CLOUDINARY_CLOUD_NAME`
- [ ] `CLOUDINARY_API_KEY`
- [ ] `CLOUDINARY_API_SECRET`
- [ ] `RESEND_API_KEY`
- [ ] `TAP_API_KEY`
- [ ] `TAP_WEBHOOK_SECRET`
- [ ] `NEXT_PUBLIC_TAP_PUBLIC_KEY`

### ✅ Vercel Secrets (If using Vercel)
- [ ] `VERCEL_TOKEN`
- [ ] `VERCEL_ORG_ID`
- [ ] `VERCEL_PROJECT_ID`

### ✅ Railway Secrets (If using Railway instead)
- [ ] `RAILWAY_TOKEN`

---

## 🔍 Part 5: Viewing Your Secrets

To see which secrets you've added:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. You'll see a list of all your secrets (names only, values are hidden)
3. You can click on a secret name to see when it was last updated
4. You can click **"Update"** to change a secret value
5. You can click **"Delete"** to remove a secret (use with caution!)

**⚠️ Important:** You cannot view the actual secret values after adding them. If you need to see a value, you'll need to delete and re-add it.

---

## ✅ Part 6: Testing Your Secrets

After adding all secrets:

1. **Check that secrets are set:**
   - Go to Settings → Secrets and variables → Actions
   - Verify all required secrets are listed

2. **Test the deployment:**
   - Go to the **Actions** tab in your repository
   - Manually trigger the deployment workflow:
     - Click on **"Deploy"** or **"Manual Deployment"** workflow
     - Click **"Run workflow"**
     - Select branch: `main`
     - Click **"Run workflow"**

3. **Monitor the workflow:**
   - Watch the workflow run in real-time
   - If it fails, click on the failed job to see error messages
   - Common issues:
     - Missing secret → Add the missing secret
     - Wrong secret name → Check capitalization and spelling
     - Invalid secret value → Verify the value is correct

---

## 🆘 Troubleshooting

### Problem: "Secret not found" error
**Solution:** 
- Check the secret name matches exactly (case-sensitive)
- Verify you added it to the correct repository
- Ensure you're on the repository where the workflow runs

### Problem: Can't see Settings tab
**Solution:**
- You need to be a repository owner or have admin access
- Ask the repository owner to add you as an admin

### Problem: Deployment fails with "Invalid credentials"
**Solution:**
- Double-check the secret values
- Regenerate API keys/tokens if needed
- Verify account status (paid vs free tiers)

### Problem: Can't find Vercel/Railway credentials
**Solution:**
- Make sure you've created an account on the platform
- Check that you're logged into the correct account
- Follow platform-specific guides for finding API keys

---

## 📚 Next Steps

Once all secrets are set up:
1. ✅ Your deployment workflows are ready to use
2. ✅ Push to `main` branch to trigger automatic deployment
3. ✅ Check the **Actions** tab to monitor deployments
4. ✅ Visit your deployed site once deployment succeeds

---

## 🔒 Security Best Practices

1. **Never commit secrets to code** - Always use GitHub Secrets
2. **Rotate secrets regularly** - Update API keys periodically
3. **Use minimal permissions** - Only grant necessary access
4. **Limit secret access** - Only add secrets to repositories that need them
 plaintext in logs - GitHub Actions won't expose secrets

---

**Need Help?** 
- Check the main `DEPLOYMENT-SETUP.md` file
- Review GitHub Actions logs for specific errors
- Consult platform documentation (Vercel, Railway, etc.)

Good luck with your deployment! 🚀
