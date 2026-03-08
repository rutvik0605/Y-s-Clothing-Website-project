import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  items: [
    {
      name: String,
      price: String,
      image: String,
      size: String,
      qty: Number
    }
  ],
  total: { type: Number, required: true },
  paymentMethod: { type: String, default: "COD" },
  status: { type: String, default: "Pending" }
}, { timestamps: true })

export default mongoose.model("Order", orderSchema)