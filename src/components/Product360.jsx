import { useRef, useState } from "react"

function Product360({ images }) {
  const [index, setIndex] = useState(0)
  const startX = useRef(0)

  const startDrag = (e) => {
    startX.current = e.touches ? e.touches[0].clientX : e.clientX
  }

  const onDrag = (e) => {
    const x = e.touches ? e.touches[0].clientX : e.clientX
    const diff = x - startX.current

    if (Math.abs(diff) > 10) {
      setIndex((prev) =>
        diff > 0
          ? (prev + 1) % images.length
          : (prev - 1 + images.length) % images.length
      )
      startX.current = x
    }
  }

  return (
    <div
      style={{ cursor: "grab" }}
      onMouseDown={startDrag}
      onMouseMove={onDrag}
      onTouchStart={startDrag}
      onTouchMove={onDrag}
    >
      <img
        src={images[index]}
        alt="360 view"
        style={{
          width: "100%",
          maxHeight: "55vh",
          objectFit: "contain"
        }}
      />
    </div>
  )
}

export default Product360
