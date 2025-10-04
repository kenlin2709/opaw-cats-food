'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { ShoppingCart, Check } from 'lucide-react'

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    image?: string
    inStock: boolean
  }
  className?: string
  showIcon?: boolean
}

export default function AddToCartButton({ 
  product, 
  className = '', 
  showIcon = true 
}: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = async () => {
    if (!product.inStock) return
    
    setIsAdding(true)
    await addToCart(product)
    setIsAdding(false)
    setIsAdded(true)
    
    // Reset the "added" state after 2 seconds
    setTimeout(() => setIsAdded(false), 2000)
  }

  if (!product.inStock) {
    return (
      <button
        disabled
        className={`bg-gray-300 text-gray-500 cursor-not-allowed py-2 px-4 rounded-md font-medium transition-colors ${className}`}
      >
        Out of Stock
      </button>
    )
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`${
        isAdded 
          ? 'bg-green-600 text-white' 
          : 'bg-orange-600 text-white hover:bg-orange-700'
      } py-2 px-4 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${className}`}
    >
      {isAdding ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Adding...
        </>
      ) : isAdded ? (
        <>
          {showIcon && <Check className="h-4 w-4 mr-2" />}
          Added!
        </>
      ) : (
        <>
          {showIcon && <ShoppingCart className="h-4 w-4 mr-2" />}
          Add to Cart
        </>
      )}
    </button>
  )
}
