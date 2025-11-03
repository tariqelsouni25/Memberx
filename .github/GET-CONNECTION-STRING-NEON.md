# 🔗 Get Connection String from Neon

## Step 1: Log In to Neon
1. Go to: **https://console.neon.tech** or **https://neon.tech**
2. Sign in to your account

## Step 2: Select Your Project
1. You'll see your projects listed
2. Click on the project you want to use (or create a new one)

## Step 3: Get Connection String
1. Once in your project dashboard, look for:
   - A section called **"Connection string"** or **"Connection details"**
   - Or a tab/button that says **"Connection Details"**

2. You'll see different connection string options. Choose the one that says:
   - **"Connection string"** or **"URI"** (not "Connection pooling")
   
3. It will look like:
   ```
   postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

4. Click the **"Copy"** button (usually looks like a clipboard icon 📋)

5. **Important:** Make sure the connection string includes `?sslmode=require` at the end

## Step 4: Save It
- Copy it somewhere safe (you'll paste it into Vercel next)

---

**Once you have it copied, let me know and I'll help you add it to Vercel!**

