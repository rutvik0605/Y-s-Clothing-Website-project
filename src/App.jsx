import Header from "./components/Header.jsx"
import Hero from "./components/Hero.jsx"
import Products from "./components/Products.jsx"
import Shoes from "./components/Shoes.jsx"
import Cart from "./components/Cart.jsx"
import { CartProvider } from "./components/CartContext.jsx"

function App() {
  return (
    <CartProvider>
      <Header />
      <Hero />
      <Products />
      <Shoes />
      <Cart />
    </CartProvider>
  )
}

export default App