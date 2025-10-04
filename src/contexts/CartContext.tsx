'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'
import { CartItem, CartState, Product } from '@/types'

type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
  addToCart: (product: Product) => Promise<void>
  removeFromCart: (productId: string) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
} | null>(null)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    
    case 'SET_CART':
      const total = action.payload.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const itemCount = action.payload.reduce((sum, item) => sum + item.quantity, 0)
      return {
        ...state,
        items: action.payload,
        total,
        itemCount,
        isLoading: false
      }
    
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.productId === action.payload.productId)
      let newItems
      
      if (existingItem) {
        newItems = state.items.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        )
      } else {
        newItems = [...state.items, action.payload]
      }
      
      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)
      
      return {
        ...state,
        items: newItems,
        total: newTotal,
        itemCount: newItemCount
      }
    
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.productId !== action.payload)
      const filteredTotal = filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const filteredItemCount = filteredItems.reduce((sum, item) => sum + item.quantity, 0)
      
      return {
        ...state,
        items: filteredItems,
        total: filteredTotal,
        itemCount: filteredItemCount
      }
    
    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item =>
        item.productId === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0)
      
      const updatedTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const updatedItemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
      
      return {
        ...state,
        items: updatedItems,
        total: updatedTotal,
        itemCount: updatedItemCount
      }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0
      }
    
    default:
      return state
  }
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isLoading: true
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('opaw-cart')
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart)
        dispatch({ type: 'SET_CART', payload: cartItems })
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!state.isLoading) {
      localStorage.setItem('opaw-cart', JSON.stringify(state.items))
    }
  }, [state.items, state.isLoading])

  const addToCart = async (product: Product) => {
    const cartItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    }
    
    dispatch({ type: 'ADD_ITEM', payload: cartItem })
  }

  const removeFromCart = async (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId })
  }

  const updateQuantity = async (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
  }

  const clearCart = async () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <CartContext.Provider value={{
      state,
      dispatch,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
