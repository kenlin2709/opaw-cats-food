#!/bin/bash

# Opaw Cat Food - Deployment Script
# This script helps you deploy your ecommerce store

echo "🐱 Opaw Cat Food - Deployment Helper"
echo "====================================="

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local not found!"
    echo "📝 Please create .env.local with your DATABASE_URL"
    echo "   Copy env.example to .env.local and fill in your database URL"
    exit 1
fi

echo "✅ Environment file found"

# Check if DATABASE_URL is set
if ! grep -q "DATABASE_URL=" .env.local; then
    echo "❌ DATABASE_URL not found in .env.local"
    echo "   Please add your database connection string"
    exit 1
fi

echo "✅ Database URL configured"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy

# Seed database (optional)
read -p "🌱 Do you want to seed the database with sample data? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database..."
    npm run db:seed
fi

# Build the application
echo "🏗️ Building application..."
npm run build

echo "✅ Deployment preparation complete!"
echo ""
echo "🚀 Next steps:"
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Ready for deployment'"
echo "   git push origin main"
echo ""
echo "2. Deploy to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repository"
echo "   - Add DATABASE_URL environment variable"
echo "   - Deploy!"
echo ""
echo "3. Or deploy to other platforms:"
echo "   - Netlify: Connect GitHub repo"
echo "   - Railway: Connect GitHub repo + add PostgreSQL"
echo "   - DigitalOcean: Use App Platform"
echo ""
echo "🐱 Your Opaw Cat Food store is ready to go live!"
