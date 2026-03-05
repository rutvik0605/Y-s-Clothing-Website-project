import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const addToCart = (product, size) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.name === product.name && i.size === size)
      if (existing) {
        return prev.map(i =>
          i.name === product.name && i.size === size
            ? { ...i, qty: i.qty + 1 }
            : i
        )
      }
      return [...prev, { ...product, size, qty: 1 }]
    })
    setCartOpen(true)
  }

  const removeFromCart = (name, size) => {
    setCartItems(prev => prev.filter(i => !(i.name === name && i.size === size)))
  }

  const updateQty = (name, size, qty) => {
    if (qty < 1) return removeFromCart(name, size)
    setCartItems(prev =>
      prev.map(i => i.name === name && i.size === size ? { ...i, qty } : i)
    )
  }

  const total = cartItems.reduce((sum, i) => {
    const price = parseInt(i.price.replace(/[^\d]/g, ""))
    return sum + price * i.qty
  }, 0)

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, total, cartOpen, setCartOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}