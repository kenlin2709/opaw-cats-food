import ProductForm from '@/components/ProductForm'

// Mock data - in a real app, this would come from your database
const product = {
  id: "1",
  name: "Premium Salmon",
  description: "Rich in omega-3 fatty acids for healthy skin and coat",
  price: 24.99,
  image: "🐱",
  category: "Salmon",
  stockCount: 15,
  inStock: true,
  featured: true,
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  return <ProductForm product={product} isEdit={true} />
}
