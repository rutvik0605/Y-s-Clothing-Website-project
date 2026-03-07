const BASE_URL = import.meta.env.VITE_API_URL || "https://y-s-clothing-website-project.onrender.com"

export const fetchProducts = async (category) => {
  try {
    const url = category
      ? `${BASE_URL}/api/products/category/${category}`
      : `${BASE_URL}/api/products`

    const res = await fetch(url)
    const data = await res.json()
    return data
  } catch (err) {
    console.error("Failed to fetch products:", err)
    return null
  }
}

export const addProduct = async (product) => {
  try {
    const res = await fetch(`${BASE_URL}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.error("Failed to add product:", err)
    return null
  }
}