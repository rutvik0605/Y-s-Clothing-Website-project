import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true }, // hoodies, tees, puffers, shoes
  sizes: { type: [String], default: ["XS", "S", "M", "L", "XL", "XXL"] },
  description: { type: String, default: "" },
}, { timestamps: true })

export default mongoose.model("Product", productSchema)