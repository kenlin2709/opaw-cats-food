# 🚀 Deployment Guide - Opaw Cat Food

This guide will walk you through deploying your Opaw Cat Food ecommerce store to production.

## 📋 Prerequisites

- GitHub account
- Database provider account (Neon, Supabase, etc.)
- Deployment platform account (Vercel, Netlify, etc.)

## 🗄️ Step 1: Choose & Setup Database

### Option A: Neon (Recommended - Free)
1. Go to [neon.tech](https://neon.tech)
2. Sign up with GitHub
3. Create a new project
4. Copy the connection string
5. Format: `postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require`

### Option B: Supabase (Free + Features)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings > Database
4. Copy the connection string
5. Format: `postgresql://postgres:password@db.xxx.supabase.co:5432/postgres`

### Option C: Railway (Easy Setup)
1. Go to [railway.app](https://railway.app)
2. Connect GitHub
3. Add PostgreSQL service
4. Copy connection string from variables

## 🔧 Step 2: Configure Environment

1. **Create `.env.local` file:**
   ```bash
   cp env.example .env.local
   ```

2. **Add your database URL:**
   ```env
   DATABASE_URL="your-database-connection-string-here"
   ```

3. **Test locally:**
   ```bash
   npm run dev
   ```

## 🚀 Step 3: Deploy to Vercel (Recommended)

### Method 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variables
vercel env add DATABASE_URL
```

### Method 2: Vercel Dashboard
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variable:
   - Name: `DATABASE_URL`
   - Value: Your database connection string
6. Click "Deploy"

### Method 3: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/opaw-cats-food)

## 🌐 Step 4: Deploy to Other Platforms

### Netlify
1. Connect GitHub repository
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Add environment variable: `DATABASE_URL`
4. Deploy

### Railway
1. Connect GitHub repository
2. Add PostgreSQL service
3. Add environment variable: `DATABASE_URL`
4. Deploy automatically

### DigitalOcean App Platform
1. Connect GitHub repository
2. Add PostgreSQL database
3. Add environment variable: `DATABASE_URL`
4. Deploy

## 🗄️ Step 5: Database Migration

After deployment, run database migrations:

```bash
# Using Vercel CLI
vercel env pull .env.local
npx prisma migrate deploy

# Or using your deployment platform's CLI
# Most platforms support running commands in their dashboard
```

## 🔐 Step 6: Admin Setup

1. **Access admin panel:**
   - URL: `https://your-domain.com/admin/login`
   - Email: `admin@opaw.com`
   - Password: `admin123`

2. **Change admin password:**
   - Go to admin dashboard
   - Update password in database or admin panel

3. **Add products:**
   - Use the admin dashboard to add your products
   - Or run the seed script: `npm run db:seed`

## 🔧 Step 7: Production Optimizations

### Environment Variables
Add these to your production environment:

```env
# Required
DATABASE_URL="your-production-database-url"

# Optional
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://your-domain.com"
```

### Database Connection Pooling
For high traffic, consider:
- Prisma Data Proxy
- PgBouncer
- Connection pooling in your database provider

### Performance
- Enable Vercel Analytics
- Use Vercel Edge Functions
- Optimize images with Next.js Image component
- Enable caching

## 🐛 Troubleshooting

### Common Issues

**Database Connection Failed:**
- Check `DATABASE_URL` format
- Ensure database allows external connections
- Check SSL requirements

**Migration Errors:**
- Run `npx prisma migrate reset` (development only)
- Check schema syntax
- Ensure database is accessible

**Build Failures:**
- Check TypeScript errors
- Ensure all dependencies are installed
- Check environment variables

**Admin Login Issues:**
- Verify admin user exists in database
- Check password hashing
- Ensure database is seeded

### Debug Commands

```bash
# Check database connection
npx prisma db pull

# View database in browser
npx prisma studio

# Check build locally
npm run build

# Test production build
npm run start
```

## 📊 Monitoring & Maintenance

### Health Checks
- Monitor database connections
- Set up uptime monitoring
- Track error rates

### Backups
- Enable automatic database backups
- Regular data exports
- Test restore procedures

### Updates
- Keep dependencies updated
- Monitor security advisories
- Regular database maintenance

## 🎉 Success!

Your Opaw Cat Food store is now live! 

**Next Steps:**
1. Customize the design and content
2. Add your actual products
3. Set up payment processing (Stripe, PayPal)
4. Configure email notifications
5. Add analytics (Google Analytics, Vercel Analytics)
6. Set up monitoring and alerts

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review the logs in your deployment platform
3. Check the GitHub issues
4. Contact support for your database/deployment provider

---

**Happy selling! 🐱💰**
