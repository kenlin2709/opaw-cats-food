import Link from "next/link";
import { Star, ArrowLeft, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id }
    });
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

async function getRelatedProducts(category: string, currentId: string) {
  try {
    const products = await prisma.product.findMany({
      where: { 
        category,
        id: { not: currentId }
      },
      take: 3,
      orderBy: { createdAt: 'desc' }
    });
    return products;
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  
  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category, product.id);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-orange-600">Products</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg flex items-center justify-center">
              <span className="text-9xl">{product.image || '🐱'}</span>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center">
                <Heart className="h-4 w-4 mr-2" />
                Add to Wishlist
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                {product.featured && (
                  <span className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">(4.8) 124 reviews</span>
                </div>
                <span className="text-sm text-gray-500">Category: {product.category}</span>
              </div>
              <p className="text-lg text-gray-600">{product.description}</p>
            </div>

            <div className="border-t border-b py-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl font-bold text-orange-600">${product.price}</span>
                <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? `In Stock (${product.stockCount} available)` : 'Out of Stock'}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-orange-500 focus:border-orange-500">
                  {[...Array(Math.min(product.stockCount, 10))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-4">
                <AddToCartButton 
                  product={product} 
                  className="flex-1 py-3 px-6 rounded-lg font-semibold"
                  showIcon={true}
                />
                <button className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-orange-600" />
                <span className="text-sm text-gray-600">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-orange-600" />
                <span className="text-sm text-gray-600">Quality Guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="h-5 w-5 text-orange-600" />
                <span className="text-sm text-gray-600">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button className="border-b-2 border-orange-600 py-2 px-1 text-sm font-medium text-orange-600">
                Description
              </button>
              <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                Ingredients
              </button>
              <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                Nutritional Info
              </button>
              <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                Reviews
              </button>
            </nav>
          </div>

          <div className="py-8">
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Description</h3>
              <p className="text-gray-600 mb-6">{product.longDescription}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Product Details</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><strong>Weight:</strong> {product.weight}</li>
                    <li><strong>Age Range:</strong> {product.ageRange}</li>
                    <li><strong>Life Stage:</strong> {product.lifeStage}</li>
                    <li><strong>Category:</strong> {product.category}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Nutritional Information</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><strong>Protein:</strong> {product.nutritionalInfo.protein}</li>
                    <li><strong>Fat:</strong> {product.nutritionalInfo.fat}</li>
                    <li><strong>Fiber:</strong> {product.nutritionalInfo.fiber}</li>
                    <li><strong>Moisture:</strong> {product.nutritionalInfo.moisture}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center">
                    <span className="text-6xl">{relatedProduct.image || '🐱'}</span>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{relatedProduct.name}</h4>
                    <p className="text-gray-600 text-sm mb-4">{relatedProduct.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-orange-600">${relatedProduct.price}</span>
                      <Link
                        href={`/products/${relatedProduct.id}`}
                        className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
