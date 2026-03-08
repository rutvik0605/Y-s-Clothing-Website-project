import express from "express"
import Order from "../models/Order.js"

const router = express.Router()

// POST - place an order
router.post("/", async (req, res) => {
  try {
    const { customer, items, total, paymentMethod } = req.body
    const order = new Order({ customer, items, total, paymentMethod })
    await order.save()
    res.json({ success: true, order })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET - all orders (for admin later)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router