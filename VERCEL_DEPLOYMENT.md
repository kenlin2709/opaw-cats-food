# Vercel Deployment Guide for Opaw Cat Food

## 🚀 Quick Deployment Steps

### 1. **Set Up Database**
Choose one of these free database options:

#### **Option A: Neon (Recommended)**
1. Go to [https://neon.tech](https://neon.tech)
2. Sign up for free
3. Create a new project
4. Copy the connection string (looks like: `postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require`)

#### **Option B: Supabase**
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for free
3. Create a new project
4. Go to Settings > Database
5. Copy the connection string

#### **Option C: Railway**
1. Go to [https://railway.app](https://railway.app)
2. Sign up for free
3. Create a new PostgreSQL database
4. Copy the connection string

### 2. **Set Up Stripe Account**
1. Go to [https://stripe.com](https://stripe.com)
2. Sign up for free
3. Get your API keys from [https://dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
4. Copy both test keys (pk_test_... and sk_test_...)

### 3. **Deploy to Vercel**

#### **Method A: Deploy from GitHub**
1. Push your code to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js

#### **Method B: Deploy with Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel
```

### 4. **Add Environment Variables in Vercel**

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add these variables:

```
DATABASE_URL = your_postgresql_connection_string
STRIPE_PUBLISHABLE_KEY = pk_test_your_publishable_key
STRIPE_SECRET_KEY = sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET = whsec_your_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_test_your_publishable_key
NEXTAUTH_SECRET = your-secret-key-here
NEXTAUTH_URL = https://your-domain.vercel.app
ADMIN_EMAIL = admin@opaw.com
ADMIN_PASSWORD = admin123
```

### 5. **Redeploy**

After adding environment variables:
1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Or push a new commit to trigger auto-deployment

### 6. **Test Your Deployment**

1. Visit your Vercel URL
2. Test the homepage, products, and cart
3. Try the admin login (admin@opaw.com / admin123)
4. Test adding products to cart
5. Test the checkout process

## 🔧 Troubleshooting

### **Common Issues:**

#### **"DATABASE_URL not found"**
- Make sure you added `DATABASE_URL` in Vercel environment variables
- Check that your database connection string is correct
- Ensure your database is accessible from the internet

#### **"Prisma Client not generated"**
- The build script now includes `prisma generate`
- If it still fails, add `prisma generate` to your build command

#### **"Stripe keys not working"**
- Make sure you added both `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- Check that you're using test keys (pk_test_... and sk_test_...)
- Verify the keys are correct in Stripe dashboard

#### **"Build fails"**
- Check the build logs in Vercel dashboard
- Make sure all dependencies are in `package.json`
- Ensure your database is accessible

### **Database Migration:**

If you need to run database migrations:

```bash
# Install Vercel CLI
npm install -g vercel

# Pull environment variables
vercel env pull .env.local

# Run migrations
npx prisma migrate deploy
npx prisma generate
```

## 🎯 Production Checklist

- [ ] Database set up and accessible
- [ ] Stripe account created and keys added
- [ ] Environment variables configured in Vercel
- [ ] Domain configured (optional)
- [ ] SSL certificate active (automatic with Vercel)
- [ ] Admin account created
- [ ] Test payments working
- [ ] Cart functionality working
- [ ] Product management working

## 🚀 Going Live

1. **Complete Stripe verification** for live payments
2. **Switch to live Stripe keys** in environment variables
3. **Update domain** in Stripe webhook settings
4. **Test with real (small) payments**
5. **Monitor your Stripe dashboard** for payments

## 📊 Monitoring

- **Vercel Dashboard**: Monitor deployments and performance
- **Stripe Dashboard**: Monitor payments and customers
- **Database Dashboard**: Monitor database performance
- **Application Logs**: Check Vercel function logs

Your Opaw Cat Food store will be live and ready to accept customers! 🐱💰
