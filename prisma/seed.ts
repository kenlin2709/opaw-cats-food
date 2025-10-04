import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@opaw.com' },
    update: {},
    create: {
      email: 'admin@opaw.com',
      password: 'admin123', // In production, this should be hashed
      name: 'Admin User',
    },
  })

  // Create sample products
  const products = [
    {
      name: 'Premium Salmon',
      description: 'Rich in omega-3 fatty acids for healthy skin and coat',
      price: 24.99,
      image: '🐱',
      category: 'Salmon',
      inStock: true,
      stockCount: 15,
      featured: true,
    },
    {
      name: 'Natural Chicken',
      description: 'Grain-free formula with real chicken and vegetables',
      price: 22.99,
      image: '🌿',
      category: 'Chicken',
      inStock: true,
      stockCount: 20,
      featured: true,
    },
    {
      name: 'Ocean Fish',
      description: 'High-protein formula with fresh ocean fish',
      price: 26.99,
      image: '🐟',
      category: 'Fish',
      inStock: true,
      stockCount: 12,
      featured: true,
    },
    {
      name: 'Turkey & Sweet Potato',
      description: 'Limited ingredient diet perfect for sensitive cats',
      price: 28.99,
      image: '🦃',
      category: 'Turkey',
      inStock: true,
      stockCount: 8,
      featured: false,
    },
    {
      name: 'Beef & Liver',
      description: 'Protein-rich formula with organ meats for extra nutrition',
      price: 25.99,
      image: '🥩',
      category: 'Beef',
      inStock: true,
      stockCount: 18,
      featured: false,
    },
    {
      name: 'Lamb & Rice',
      description: 'Gentle on sensitive stomachs with premium lamb',
      price: 23.99,
      image: '🐑',
      category: 'Lamb',
      inStock: false,
      stockCount: 0,
      featured: false,
    },
  ]

  // Clear existing products and create new ones
  await prisma.product.deleteMany()
  await prisma.product.createMany({
    data: products,
  })

  console.log('Database seeded successfully!')
  console.log('Admin user created:', admin.email)
  console.log('Products created:', products.length)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
