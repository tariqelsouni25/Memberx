# 🔗 Get Connection String from Supabase

## Step 1: Log In to Supabase
1. Go to: **https://app.supabase.com** or **https://supabase.com**
2. Sign in to your account

## Step 2: Select Your Project
1. You'll see your projects listed on the dashboard
2. Click on the project you want to use (or create a new one)

## Step 3: Get Connection String
1. Click on **"Settings"** (gear icon ⚙️ in the left sidebar)
2. Click on **"Database"** in the settings menu
3. Scroll down to find the **"Connection string"** section
4. You'll see different tabs:
   - **URI** ← Use this one!
   - Connection pooling
   - Direct connection
   - etc.

5. Click on the **"URI"** tab
6. You'll see a connection string that looks like:
   ```
   postgresql://postgres.[REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```
   OR
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
   ```

7. **Important:** You need to replace `[YOUR-PASSWORD]` with your actual database password
   - If you don't remember it: Go to Settings → Database → Database Password → Reset password

8. Add `?sslmode=require` at the end if it's not there already

9. Click the **"Copy"** button or select all and copy

## Step 4: Save It
- Copy it somewhere safe (you'll paste it into Vercel next)
- Make sure the password is replaced in the connection string

---

**Once you have it copied, let me know and I'll help you add it to Vercel!**

