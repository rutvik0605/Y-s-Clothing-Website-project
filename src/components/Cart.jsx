import { useState } from "react"
import { useCart } from "./CartContext"

function Cart() {
  const { cartItems, removeFromCart, updateQty, total, cartOpen, setCartOpen } = useCart()
  const [ordered, setOrdered] = useState(false)
  const [form, setForm] = useState({ name: "", phone: "", address: "" })

  const handleOrder = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all fields!")
      return
    }
    setOrdered(true)
  }

  return (
    <>
      {/* BACKDROP */}
      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 9998
          }}
        />
      )}

      {/* CART DRAWER */}
      <div style={{
        position: "fixed",
        top: 0, right: 0,
        width: "380px",
        height: "100vh",
        background: "white",
        zIndex: 9999,
        transform: cartOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s ease",
        display: "flex",
        flexDirection: "column",
        boxShadow: "-4px 0 20px rgba(0,0,0,0.2)"
      }}>

        {/* HEADER */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", padding: "20px",
          borderBottom: "1px solid #eee",
          background: "#17203D", color: "white"
        }}>
          <h2 style={{ fontSize: "18px", fontWeight: 800 }}>
            🛒 Cart ({cartItems.length})
          </h2>
          <span
            onClick={() => setCartOpen(false)}
            style={{ fontSize: "24px", cursor: "pointer" }}
          >✕</span>
        </div>

        {/* BODY */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>

          {ordered ? (
            // ORDER SUCCESS
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: "60px" }}>🎉</div>
              <h2 style={{ color: "#17203D", margin: "16px 0 8px" }}>Order Placed!</h2>
              <p style={{ color: "#555" }}>
                Thank you <strong>{form.name}</strong>! Your order will be delivered to:
              </p>
              <p style={{
                marginTop: "12px", padding: "12px",
                background: "#f6f1e8", borderRadius: "8px",
                fontSize: "14px", color: "#333"
              }}>
                {form.address}
              </p>
              <p style={{ marginTop: "12px", color: "#6552D0", fontWeight: 700 }}>
                Total: ₹{total.toLocaleString()}
              </p>
              <p style={{ marginTop: "8px", fontSize: "13px", color: "#888" }}>
                We'll call you on {form.phone} to confirm.
              </p>
              <button
                onClick={() => { setOrdered(false); setCartOpen(false) }}
                style={{
                  marginTop: "24px", padding: "12px 28px",
                  background: "#17203D", color: "white",
                  border: "none", borderRadius: "8px",
                  fontWeight: 700, cursor: "pointer"
                }}
              >
                Continue Shopping
              </button>
            </div>

          ) : cartItems.length === 0 ? (
            // EMPTY CART
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#888" }}>
              <div style={{ fontSize: "50px" }}>🛍️</div>
              <p style={{ marginTop: "16px", fontSize: "16px" }}>Your cart is empty</p>
            </div>

          ) : (
            // CART ITEMS + CHECKOUT FORM
            <>
              {cartItems.map((item, i) => (
                <div key={i} style={{
                  display: "flex", gap: "12px",
                  padding: "12px 0",
                  borderBottom: "1px solid #f0f0f0"
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "70px", height: "80px",
                      objectFit: "cover", borderRadius: "8px"
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: "14px", color: "#17203D" }}>{item.name}</p>
                    <p style={{ fontSize: "13px", color: "#888", marginTop: "2px" }}>Size: {item.size}</p>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#6552D0", marginTop: "4px" }}>{item.price}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "8px" }}>
                      <button onClick={() => updateQty(item.name, item.size, item.qty - 1)}
                        style={qtyBtn}>−</button>
                      <span style={{ fontWeight: 700 }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.name, item.size, item.qty + 1)}
                        style={qtyBtn}>+</button>
                      <button onClick={() => removeFromCart(item.name, item.size)}
                        style={{ marginLeft: "auto", background: "none", border: "none", color: "#e74c3c", cursor: "pointer", fontSize: "18px" }}>
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* TOTAL */}
              <div style={{
                display: "flex", justifyContent: "space-between",
                padding: "16px 0", fontWeight: 800,
                fontSize: "16px", color: "#17203D",
                borderTop: "2px solid #17203D", marginTop: "8px"
              }}>
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              {/* COD FORM */}
              <div style={{ marginTop: "8px" }}>
                <p style={{
                  fontWeight: 700, fontSize: "14px",
                  color: "#17203D", marginBottom: "12px"
                }}>
                  📦 Cash on Delivery — Enter Details
                </p>

                {[
                  { key: "name", placeholder: "Full Name", type: "text" },
                  { key: "phone", placeholder: "Phone Number", type: "tel" },
                  { key: "address", placeholder: "Delivery Address", type: "text" }
                ].map(f => (
                  <input
                    key={f.key}
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    style={{
                      width: "100%", padding: "10px 14px",
                      marginBottom: "10px", border: "1.5px solid #ddd",
                      borderRadius: "8px", fontSize: "14px",
                      outline: "none", boxSizing: "border-box"
                    }}
                  />
                ))}

                <button
                  onClick={handleOrder}
                  style={{
                    width: "100%", padding: "14px",
                    background: "#17203D", color: "white",
                    border: "none", borderRadius: "10px",
                    fontWeight: 800, fontSize: "16px",
                    cursor: "pointer", marginTop: "4px"
                  }}
                >
                  PLACE ORDER (COD)
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

const qtyBtn = {
  width: "28px", height: "28px",
  border: "1.5px solid #17203D",
  background: "white", borderRadius: "6px",
  cursor: "pointer", fontWeight: 700,
  fontSize: "16px"
}

export default Cart