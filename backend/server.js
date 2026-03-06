import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import productRoutes from "./routes/products.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use("/api/products", productRoutes)

app.get("/", (req, res) => {
  res.send("API running ✅")
})

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
})
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("Mongo Error:", err))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("Server running on port", PORT))