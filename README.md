# Y's Clothing — Always Clothing Brand 🛍️

A full-stack streetwear e-commerce website built with React, Node.js, and MongoDB.

## 🔗 Live Demo
[alwayscloth-store.netlify.app](https://alwayscloth-store.netlify.app)

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| Frontend Hosting | Netlify |
| Backend Hosting | Render  |

---

## ✨ Features

- 🧥 Product catalog — Hoodies, T-Shirts, Puffer Jackets, Shoes
- 🔄 360° product view (drag to rotate)
- 📏 Size selection per product
- 🛒 Add to cart with quantity control
- 📦 Cash on Delivery checkout
- 📱 Responsive design
- 🎨 Premium White & Gold theme

---

## 📁 Project Structure

```
clothing-brand/
├── backend/                 # Node.js + Express API
│   ├── models/
│   │   └── Product.js       # MongoDB product schema
│   ├── routes/
│   │   └── products.js      # API endpoints
│   └── server.js            # Express server
│
├── src/                     # React frontend
│   ├── components/
│   │   ├── Header.jsx       # Navigation + cart icon
│   │   ├── Hero.jsx         # Landing section
│   │   ├── Products.jsx     # Product sections
│   │   ├── Shoes.jsx        # Shoes section
│   │   ├── Cart.jsx         # Cart drawer + COD checkout
│   │   ├── CartContext.jsx  # Global cart state
│   │   └── Product360.jsx   # 360 view component
│   ├── styles/
│   │   └── style.css        # Global styles
│   └── api.js               # API helper functions
│
└── public/
    └── images/              # Product images
```

---

## 🚀 Run Locally

### Frontend
```bash
npm install
npm run dev
```
Opens at `http://localhost:5173`

### Backend
```bash
cd backend
npm install
node server.js
```
API runs at `https://y-s-clothing-website-project.onrender.com`

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/category/:category` | Get by category |
| POST | `/api/products` | Add a product |

---

## 🌍 Environment Variables

### Backend (`backend/.env`)
```env
MONGO_URI=your_mongodb_atlas_uri
PORT=5000
```

### Frontend (`.env.local`)
```env
VITE_API_URL=http://localhost:5https://y-s-clothing-website-project.onrender.com
```

---

## 👤 Author
**Rutvik** — Y's by Rutvik
