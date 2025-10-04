// Product types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category: string
  inStock: boolean
  stockCount: number
  featured: boolean
  createdAt: string
  updatedAt: string
}

// Cart types
export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image?: string
  quantity: number
}

export interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  isLoading: boolean
}

// Order types
export interface Order {
  id: string
  userId: string
  stripeId?: string
  status: OrderStatus
  total: number
  shippingAddress: ShippingAddress
  createdAt: string
  updatedAt: string
  items: OrderItem[]
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: number
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

// User types
export interface User {
  id: string
  email: string
  name?: string
  image?: string
  createdAt: string
  updatedAt: string
}

// Address types
export interface ShippingAddress {
  line1: string
  line2?: string
  city: string
  state: string
  postal_code: string
  country: string
}

// Invoice types
export interface InvoiceData {
  customerEmail: string
  customerName: string
  items: InvoiceItem[]
  shippingAddress: ShippingAddress
}

export interface InvoiceItem {
  name: string
  description: string
  quantity: number
  price: number
}

// Stripe types
export interface StripeCheckoutItem {
  id: string
  name: string
  description: string
  price: number
  image?: string
  quantity: number
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

export interface StripeResponse {
  sessionId?: string
  invoiceId?: string
  invoiceUrl?: string
  paymentIntent?: string
  error?: string
}
