# 🚀 Quick Setup: Create GitHub Repository and Deploy

## Step 1: Create GitHub Repository

### Option A: Create via GitHub Website (Recommended)

1. **Go to GitHub:**
   - Visit: https://github.com/new
   - Or: https://github.com → Click the **"+"** button (top right) → **"New repository"**

2. **Repository Settings:**
   - **Repository name:** `emberx` (or any name you prefer)
   - **Description:** (Optional) "Member X - Marketplace Platform"
   - **Visibility:** Choose **Public** or **Private**
   - **⚠️ DO NOT** check "Initialize with README" (we already have code)
   - **⚠️ DO NOT** add .gitignore or license (we already have them)
   - Click **"Create repository"**

3. **After Creating:**
   - GitHub will show you setup instructions
   - **Don't follow those** - we'll use the commands below instead

### Option B: Verify Repository Exists

If you think the repository already exists:
- Go to: https://github.com/tariqelsouni25/emberx
- If you see a 404, it doesn't exist - create it using Option A
- If you see the repository, check if you have push access

---

## Step 2: Set Correct Remote URL

After creating the repository, verify/update your remote:

```bash
# Check current remote
git remote -v

# If the repository name is different, update it:
git remote set-url origin https://github.com/tariqelsouni25/YOUR_REPO_NAME.git

# Replace YOUR_REPO_NAME with your actual repository name
```

---

## Step 3: Push Your Code

Once the repository exists and remote is correct:

```bash
# Push to GitHub
git push -u origin main
```

If you get authentication errors, you'll need to authenticate:

### Authentication Options:

**Option 1: GitHub CLI (Easiest)**
```bash
# Install GitHub CLI if needed
# Then:
gh auth login
git push -u origin main
```

**Option 2: Personal Access Token**
1. Go to: https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scopes: `repo` (full control)
4. Copy the token
5. When pushing, use token as password:
   ```bash
   git push -u origin main
   # Username: your_github_username
   # Password: paste_your_token_here
   ```

**Option 3: SSH (Most Secure)**
```bash
# Set up SSH key first, then:
git remote set-url origin git@github.com:tariqelsouni25/emberx.git
git push -u origin main
```

---

## Step 4: Verify Push Successful

After pushing:
1. Go to: https://github.com/tariqelsouni25/emberx
2. You should see all your files including `.github/` folder
3. Check **"Actions"** tab - you should see workflows running

---

## Step 5: Set Up Secrets (Required Before Deployment)

**⚠️ IMPORTANT:** Before deployment can succeed, you MUST add secrets:

1. Go to: https://github.com/tariqelsouni25/emberx/settings/secrets/actions
2. Add all required secrets (see `.github/SECRETS-CHECKLIST.md`)

**Minimum required secrets to get started:**
- `DATABASE_URL`
- `AUTH_SECRET`
- `NEXT_PUBLIC_SITE_URL`

---

## Step 6: Monitor Deployment

1. Go to: https://github.com/tariqelsouni25/emberx/actions
2. You'll see workflow runs:
   - **CI** workflow runs on every push (checks code)
   - **Deploy** workflow runs on push to `main` (deploys app)

---

## Need Help?

- **Can't create repository?** Make sure you're logged into GitHub
- **Authentication issues?** Try using GitHub CLI or Personal Access Token
- **Repository not found?** Double-check the repository name exists
- **Permission denied?** Verify you have push access to the repository

---

## Alternative: If Repository Name is Different

If your repository has a different name (not "emberx"):

```bash
# Update remote URL
git remote set-url origin https://github.com/tariqelsouni25/YOUR_ACTUAL_REPO_NAME.git

# Then push
git push -u origin main
```

---

**Once pushed successfully, your deployment workflows will trigger automatically! 🚀**

