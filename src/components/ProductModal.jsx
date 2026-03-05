import Product360 from "./Product360.jsx"

function ProductModal({ product, onClose }) {
  if (!product) return null

  return (
    <div className="modal" style={{ display: "flex" }} onClick={onClose}>
      <span className="close" onClick={onClose}>✕</span>

      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        {/* 360 DEGREE VIEW */}
        <Product360 images={product.images360} />

        <h2>{product.name}</h2>
        <h3>{product.price}</h3>
        <p>{product.desc}</p>

        <div className="sizes">
          {product.sizes.map((size, i) => (
            <span key={i}>{size}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductModal
