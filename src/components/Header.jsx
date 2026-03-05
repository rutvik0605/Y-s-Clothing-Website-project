import { useState } from "react"
import { useCart } from "./CartContext"

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { cartItems, setCartOpen } = useCart()

  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0)

  return (
    <>
      <header>
        <div className="left">
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
          <span className="brand">Always Clothing</span>
        </div>

        {/* CART ICON */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            onClick={() => setCartOpen(true)}
            style={{ cursor: "pointer", position: "relative" }}
          >
            <span style={{ fontSize: "22px" }}>🛒</span>
            {totalItems > 0 && (
              <span style={{
                position: "absolute", top: "-8px", right: "-8px",
                background: "#6552D0", color: "white",
                borderRadius: "50%", width: "18px", height: "18px",
                fontSize: "11px", fontWeight: 800,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                {totalItems}
              </span>
            )}
          </div>
          <div className="logo">Y'S</div>
        </div>
      </header>

      <nav id="sideMenu" className={menuOpen ? "open" : ""}>
        <a>SHOES</a>
        <a>SOCKS</a>
        <a>CAPS</a>
        <a>WOMEN</a>
        <a>MEN</a>
      </nav>
    </>
  )
}

export default Header