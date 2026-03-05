import { useState } from "react"
import Product360 from "./Product360"
import { useCart } from "./CartContext"

const shoes = [
  {
    name: "Urban Street Sneakers",
    price: "₹4200",
    image: "/images/shoe1.jpg",
    images: ["/images/shoe1.jpg"]
  },
  {
    name: "Low Court Sneakers",
    price: "₹3900",
    image: "/images/shoe2.jpg",
    images: ["/images/shoe2.jpg"]
  },
  {
    name: "Chunky Street Sole",
    price: "₹4600",
    image: "/images/shoe3.jpg",
    images: ["/images/shoe3.jpg"]
  },
  {
    name: "Minimal White Trainer",
    price: "₹4100",
    image: "/images/shoe4.jpg",
    images: ["/images/shoe4.jpg"]
  },
  {
    name: "Street Grip Runner",
    price: "₹4400",
    image: "/images/shoe5.jpg",
    images: ["/images/shoe5.jpg"]
  }
]

function Shoes() {
  const [selected, setSelected] = useState(null)
  const [size, setSize] = useState(null)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    if (!size) { alert("Please select a size!"); return }
    addToCart(selected, size)
    setSelected(null)
    setSize(null)
  }

  return (
    <section className="section blue">
      <h2>Shoes Collection</h2>

      <div className="products">
        {shoes.map((shoe, index) => (
          <div
            className="card"
            key={index}
            onClick={() => { setSelected(shoe); setSize(null) }}
          >
            <img src={shoe.image} alt={shoe.name} />
            <h3>{shoe.name}</h3>
            <p>{shoe.price}</p>
          </div>
        ))}
      </div>

      {selected && (
        <div
          className="modal"
          style={{ display: "flex" }}
          onClick={(e) => { if (e.target === e.currentTarget) setSelected(null) }}
        >
          <span className="close" onClick={() => setSelected(null)}>✕</span>

          <div className="modal-box">
            <Product360 images={selected.images} />

            <h2 style={{ marginTop: "16px" }}>{selected.name}</h2>
            <p style={{ marginTop: "6px", fontSize: "18px", fontWeight: 700 }}>{selected.price}</p>

            {/* Shoe sizes */}
            <div className="sizes">
              {["UK6", "UK7", "UK8", "UK9", "UK10", "UK11"].map((s) => (
                <span
                  key={s}
                  className={size === s ? "active" : ""}
                  onClick={() => setSize(s)}
                >
                  {s}
                </span>
              ))}
            </div>

            <button className="add-cart-btn" onClick={handleAddToCart}>
              ADD TO CART
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Shoes