import { useState, useEffect } from "react"
import Product360 from "./Product360"
import { useCart } from "./CartContext"
import { fetchProducts } from "../api"

// Fallback hardcoded data (used when backend is offline)
const fallbackHoodies = [
  { name: "RUTVIK Edition Hoodie", price: "₹3000", image: "/images/hoodie1.jpg", images: ["/images/hoodie1.jpg"] },
  { name: "RUTHLESS Hoodie", price: "₹3000", image: "/images/hoodie2.jpg", images: ["/images/hoodie2.jpg"] },
  { name: "RESTLESS Hoodie", price: "₹3000", image: "/images/hoodie3.jpg", images: ["/images/hoodie3.jpg"] }
]
const fallbackTees = [
  { name: "Street Black Tee", price: "₹1000", image: "/images/tee1.jpg", images: ["/images/tee1.jpg"] },
  { name: "Urban Oversized Tee", price: "₹1000", image: "/images/tee2.jpg", images: ["/images/tee2.jpg"] },
  { name: "Graphic Tee", price: "₹1000", image: "/images/tee3.jpg", images: ["/images/tee3.jpg"] }
]
const fallbackPuffers = [
  { name: "Midnight Puffer", price: "₹4500", image: "/images/puffer1.jpg", images: ["/images/puffer1.jpg"] },
  { name: "Urban Puffer", price: "₹4800", image: "/images/puffer2.jpg", images: ["/images/puffer2.jpg"] },
  { name: "Storm Puffer", price: "₹5000", image: "/images/puffer3.jpg", images: ["/images/puffer3.jpg"] },
  { name: "Arctic Puffer", price: "₹5200", image: "/images/puffer4.jpg", images: ["/images/puffer4.jpg"] }
]

function Section({ title, bg, category, fallback }) {
  const [items, setItems] = useState(fallback)
  const [selected, setSelected] = useState(null)
  const [size, setSize] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProducts(category).then(data => {
      if (data && data.length > 0) {
        // Format DB data to match component structure
        const formatted = data.map(p => ({
          ...p,
          price: `₹${p.price}`,
          images: [p.image]
        }))
        setItems(formatted)
      }
      // If no DB data, fallback stays
    })
  }, [category])

  const handleAddToCart = () => {
    if (!size) { alert("Please select a size!"); return }
    addToCart(selected, size)
    setSelected(null)
    setSize(null)
  }

  return (
    <section className={`section ${bg}`}>
      <h2>{title}</h2>
      <div className="products">
        {items.map((item, index) => (
          <div className="card" key={index} onClick={() => { setSelected(item); setSize(null) }}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.price}</p>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal" style={{ display: "flex" }} onClick={(e) => { if (e.target === e.currentTarget) setSelected(null) }}>
          <span className="close" onClick={() => setSelected(null)}>✕</span>
          <div className="modal-box">
            <Product360 images={selected.images} />
            <h2 style={{ marginTop: "16px" }}>{selected.name}</h2>
            <p style={{ marginTop: "6px", fontSize: "18px", fontWeight: 700 }}>{selected.price}</p>
            <div className="sizes">
              {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                <span key={s} className={size === s ? "active" : ""} onClick={() => setSize(s)}>{s}</span>
              ))}
            </div>
            <button className="add-cart-btn" onClick={handleAddToCart}>ADD TO CART</button>
          </div>
        </div>
      )}
    </section>
  )
}

function Products() {
  return (
    <>
      <Section title="Oversized Premium T-Shirts" bg="beige" category="tees"    fallback={fallbackTees} />
      <Section title="Winter Puffer Jackets"      bg="blue"  category="puffers" fallback={fallbackPuffers} />
      <Section title="450 GSM Premium Hoodies"   bg="beige" category="hoodies" fallback={fallbackHoodies} />
    </>
  )
}

export default Products