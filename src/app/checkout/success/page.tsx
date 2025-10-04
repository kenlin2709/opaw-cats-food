import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Package, Truck, Home, ShoppingBag } from 'lucide-react'

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Opaw Cat Food"
              width={120}
              height={36}
              className="h-9 w-auto logo-transparent"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your order. Your cat food will be on its way soon!
          </p>

          {/* Order Details */}
          <div className="bg-white rounded-lg shadow p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">What happens next?</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Package className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Order Processing</h3>
                  <p className="text-gray-600">We're preparing your order for shipment. This usually takes 1-2 business days.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Shipping</h3>
                  <p className="text-gray-600">Your order will be shipped via our trusted delivery partners. You'll receive tracking information via email.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Delivery</h3>
                  <p className="text-gray-600">Your cat food will arrive at your doorstep within 3-5 business days.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center"
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <Link
              href="/products"
              className="border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-colors flex items-center justify-center"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Continue Shopping
            </Link>
          </div>

          {/* Contact Information */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Questions about your order? We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <a 
                href="mailto:hello@opawcatfood.com" 
                className="text-orange-600 hover:text-orange-700"
              >
                hello@opawcatfood.com
              </a>
              <span className="hidden sm:block text-gray-400">•</span>
              <a 
                href="tel:+1-555-OPAW-CAT" 
                className="text-orange-600 hover:text-orange-700"
              >
                (555) 672-2281
              </a>
            </div>
          </div>

          {/* Cat Emoji */}
          <div className="mt-12">
            <span className="text-6xl">🐱</span>
            <p className="text-gray-500 mt-2">Your cat will love this!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
