# Deployment Guide - Member X

This guide covers deploying Member X to production.

## Prerequisites

Before deployment, ensure you have:
- PostgreSQL database (recommended: Neon, Supabase, or Railway)
- Cloudinary account for image hosting
- Resend account for email delivery
- Tap Payments account (or other payment provider)
- Domain name (optional but recommended)

## Environment Setup

### 1. Create Production Database

**Option A: Neon (Recommended)**
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string

**Option B: Supabase**
1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → Database → Connection String
4. Copy the pooling connection string

### 2. Set Environment Variables

Copy all variables from `.env.example` and set them in your deployment platform:

```bash
# Required
DATABASE_URL=your-postgresql-connection-string
AUTH_SECRET=your-random-32-char-secret
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email
RESEND_API_KEY=your-resend-key

# Payments
TAP_API_KEY=your-tap-secret-key
TAP_WEBHOOK_SECRET=your-webhook-secret
NEXT_PUBLIC_TAP_PUBLIC_KEY=your-tap-public-key
```

Generate `AUTH_SECRET`:
```bash
openssl rand -base64 32
```

## Deployment Platforms

### Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Add Environment Variables**
- Go to Project Settings → Environment Variables
- Add all variables from `.env.example`

5. **Deploy Migrations**
```bash
# In Vercel dashboard, add a deploy script or run manually
DATABASE_URL="your-db-url" npx prisma migrate deploy
```

6. **Seed Database** (First Time Only)
```bash
DATABASE_URL="your-db-url" npm run prisma:seed
```

### Railway

1. **Create New Project**
- Go to [railway.app](https://railway.app)
- Click "New Project"
- Select "Deploy from GitHub repo"

2. **Add PostgreSQL**
- Click "New" → "Database" → "Add PostgreSQL"
- Copy the `DATABASE_URL` from variables

3. **Configure Environment**
- Go to your service → Variables
- Add all required environment variables

4. **Deploy**
- Push to main branch
- Railway auto-deploys

### Self-Hosted (VPS)

1. **Server Setup** (Ubuntu 22.04)
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Nginx
sudo apt install -y nginx

# Install PM2
sudo npm install -g pm2
```

2. **Clone & Setup**
```bash
# Clone repo
git clone <your-repo-url> memberx
cd memberx

# Install dependencies
npm ci

# Setup environment
cp .env.example .env
nano .env  # Edit with your values

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:deploy

# Seed database (first time)
npm run prisma:seed

# Build
npm run build
```

3. **Configure PM2**
```bash
# Start app
pm2 start npm --name "memberx" -- start

# Save PM2 config
pm2 save

# Setup PM2 startup
pm2 startup
```

4. **Configure Nginx**
```nginx
# /etc/nginx/sites-available/memberx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/memberx /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

5. **SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## Post-Deployment

### 1. Webhook Configuration

**Tap Payments Webhook**
- URL: `https://yourdomain.com/api/webhooks/tap`
- Events: `charge.captured`, `charge.failed`
- Secret: Your `TAP_WEBHOOK_SECRET`

### 2. Change Default Passwords

**CRITICAL:** Immediately change all default passwords:
```sql
-- Connect to your database and run:
DELETE FROM "User" WHERE email IN (
  'admin@demo.local',
  'editor@demo.local',
  'partner@demo.local',
  'user@demo.local'
);
```

Then create new admin user via Prisma Studio or seed script.

### 3. DNS Configuration

Point your domain to your deployment:
- **Vercel**: Add custom domain in project settings
- **Railway**: Add custom domain in service settings
- **VPS**: A record pointing to server IP

### 4. Email Configuration

**Resend Domain Setup**
1. Go to Resend dashboard
2. Add your domain
3. Add DNS records (SPF, DKIM, DMARC)
4. Verify domain
5. Update `from` address in `lib/email.ts`

### 5. Monitoring Setup (Optional)

**Sentry**
```bash
# Install Sentry
npm install @sentry/nextjs

# Initialize
npx @sentry/wizard@latest -i nextjs
```

Add `SENTRY_DSN` to environment variables.

## Database Migrations

### Running Migrations

**Development**
```bash
npm run prisma:migrate
```

**Production**
```bash
DATABASE_URL="your-prod-db-url" npx prisma migrate deploy
```

### Schema Changes

1. Update `prisma/schema.prisma`
2. Create migration: `npx prisma migrate dev --name description`
3. Commit migration files
4. Deploy: `npx prisma migrate deploy`

## Backup & Restore

### Automated Backups

**PostgreSQL on VPS**
```bash
# Create backup script
cat > /home/deploy/backup.sh << 'EOF'
#!/bin/bash
pg_dump -U postgres memberx > /backups/memberx-$(date +%Y%m%d-%H%M%S).sql
# Keep last 30 days
find /backups -name "memberx-*.sql" -mtime +30 -delete
EOF

chmod +x /home/deploy/backup.sh

# Add to crontab (daily at 2 AM)
crontab -e
# Add: 0 2 * * * /home/deploy/backup.sh
```

**Cloud Providers**
- Most managed databases have automatic backups
- Enable point-in-time recovery

### Restore from Backup
```bash
psql -U postgres -d memberx < backup.sql
```

## Performance Optimization

### 1. Enable Caching (Optional)

**Redis Setup**
```bash
# Install Upstash Redis or self-hosted
npm install ioredis

# Add to .env
REDIS_URL=redis://localhost:6379
```

### 2. CDN Configuration

**Cloudinary**
- Already configured for image optimization
- Auto format conversion
- Responsive images

**Vercel Edge Network**
- Automatically optimizes static assets
- Global CDN

### 3. Database Optimization

```sql
-- Add indexes (if not already in schema)
CREATE INDEX IF NOT EXISTS idx_listings_city_category ON "Listing"("cityId", "categoryId");
CREATE INDEX IF NOT EXISTS idx_listings_status ON "Listing"("status");
CREATE INDEX IF NOT EXISTS idx_orders_user ON "Order"("userId");
```

## Security Checklist

- [ ] Changed all default passwords
- [ ] Set strong `AUTH_SECRET`
- [ ] Configured HTTPS/SSL
- [ ] Set up webhook signature verification
- [ ] Enabled database connection pooling
- [ ] Configured CORS if needed
- [ ] Set up rate limiting on sensitive endpoints
- [ ] Reviewed and updated privacy policy
- [ ] Configured CSP headers (optional)
- [ ] Set up monitoring and alerts

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Database Connection Errors
- Check `DATABASE_URL` format
- Ensure database allows connections from your IP
- Verify SSL settings (`?sslmode=require`)

### Prisma Client Issues
```bash
npm run prisma:generate
```

### Memory Issues
```bash
# Increase Node memory limit
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

## Support

For deployment issues:
1. Check logs in your platform dashboard
2. Review [Next.js deployment docs](https://nextjs.org/docs/deployment)
3. Contact support@memberx.com

---

**Remember:** Always test in a staging environment before deploying to production!

