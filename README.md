# 🐱 Opaw Cat Food - Ecommerce Store

A modern, responsive ecommerce website for premium cat food built with Next.js 15, TypeScript, Tailwind CSS, and Prisma.

## ✨ Features

- **Modern Design**: Clean, mobile-responsive UI with cat-themed branding
- **Product Management**: Full CRUD operations for products
- **Admin Dashboard**: Secure admin panel for store management
- **Database Integration**: PostgreSQL with Prisma ORM
- **API Routes**: RESTful API for all operations
- **Authentication**: Admin login system
- **Mobile Responsive**: Works perfectly on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (local or cloud)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd opaw-cats-food
npm install
```

### 2. Database Setup

#### Option A: Local PostgreSQL
```bash
# Install PostgreSQL locally
# Create database
createdb opaw_cats_food

# Set environment variable
export DATABASE_URL="postgresql://username:password@localhost:5432/opaw_cats_food"
```

#### Option B: Cloud Database (Recommended)

**Neon (Free PostgreSQL):**
1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Set as `DATABASE_URL` in your environment

**Other Options:**
- [Supabase](https://supabase.com) - Free PostgreSQL
- [Railway](https://railway.app) - Easy deployment
- [PlanetScale](https://planetscale.com) - MySQL alternative

### 3. Environment Setup

```bash
# Copy environment template
cp env.example .env.local

# Edit .env.local with your database URL
DATABASE_URL="your-database-connection-string"
```

### 4. Database Migration & Seeding

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed the database
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your store!

## 🔐 Admin Access

- **URL**: `/admin/login`
- **Email**: `admin@opaw.com`
- **Password**: `admin123`

## 📦 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard:
     - `DATABASE_URL`: Your production database URL
   - Deploy!

3. **Database Migration on Production**
   ```bash
   # After deployment, run migrations
   npx prisma migrate deploy
   ```

### Other Deployment Options

**Netlify:**
- Connect GitHub repository
- Build command: `npm run build`
- Publish directory: `.next`
- Add `DATABASE_URL` environment variable

**Railway:**
- Connect GitHub repository
- Add PostgreSQL service
- Deploy automatically

## 🗄️ Database Providers

### Free Options:
- **Neon**: 0.5GB free, serverless PostgreSQL
- **Supabase**: 500MB free, includes auth & storage
- **Railway**: $5 credit monthly, easy setup

### Paid Options:
- **AWS RDS**: Scalable, enterprise-grade
- **Google Cloud SQL**: Managed PostgreSQL
- **DigitalOcean**: Simple, affordable

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:seed      # Seed database with sample data
```

### Database Commands

```bash
npx prisma studio           # Open database GUI
npx prisma migrate dev      # Create and apply migration
npx prisma migrate deploy   # Apply migrations to production
npx prisma generate         # Generate Prisma client
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── admin/          # Admin pages
│   ├── api/            # API routes
│   ├── products/       # Product pages
│   └── page.tsx        # Homepage
├── components/         # React components
├── lib/               # Utilities (Prisma client)
└── styles/            # Global styles

prisma/
├── schema.prisma      # Database schema
├── seed.ts           # Database seeding
└── migrations/       # Database migrations
```

## 🔧 Customization

### Adding New Product Fields
1. Update `prisma/schema.prisma`
2. Run `npx prisma migrate dev`
3. Update forms and components

### Styling
- Uses Tailwind CSS
- Customize colors in `tailwind.config.js`
- Component styles in individual files

### Admin Features
- Add new admin users in the database
- Customize admin dashboard in `/admin/dashboard`
- Modify product forms in `ProductForm.tsx`

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error:**
- Check `DATABASE_URL` format
- Ensure database is running
- Verify credentials

**Migration Errors:**
- Reset database: `npx prisma migrate reset`
- Check schema syntax
- Ensure database is empty

**Build Errors:**
- Clear `.next` folder
- Reinstall dependencies
- Check TypeScript errors

## 📄 License

MIT License - feel free to use this project for your own ecommerce needs!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ for cat lovers everywhere! 🐱