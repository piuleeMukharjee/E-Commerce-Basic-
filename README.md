# 🛒 Mini E-Commerce Frontend (Cart System)

## 📌 Project Overview
This project is a **mini e-commerce frontend application** built using **HTML, CSS, and Vanilla JavaScript**.  
Users can browse products, search items, add products to a cart, manage quantities, apply discount coupons, and place orders.

The application is **frontend-only** and uses **LocalStorage** to persist cart data, inventory, and dark mode preferences.

This project was developed as part of a **Web Developer Intern Assignment**.

---

## 🎯 Objective
- Build a functional mini e-commerce system using only frontend technologies
- Implement cart management, price calculation, and persistence
- Ensure clean UI/UX with responsive design
- Handle common edge cases properly

---

## 🧰 Tech Stack
- **HTML5**
- **CSS3 (External CSS)**
- **Vanilla JavaScript**
- **LocalStorage**

---

## 📄 Pages / Views
- **Product Listing Page**
- **Cart Page** (implemented using SPA-style hash routing)

---

## ✨ Features

### 🛍️ Product Listing
- Displays products with image, name, price, and stock
- Product images include:
  - Lazy loading
  - Hover zoom effect
  - Placeholder image if missing
  - Fallback image on error
- Search bar to filter products by name or category keyword

### 🛒 Cart System
- Add products to cart
- Increase or decrease item quantity
- Remove items from cart
- Search filter inside cart
- Dynamic total price calculation
- Cart data persists using LocalStorage

### 💸 Discount & Coupon Logic
- Supported coupons:
  - `SAVE10` → 10% discount
  - `FLAT200` → Flat ₹200 discount
- Invalid coupon handling
- Final payable amount calculation

### 🌙 Dark Mode
- Custom sliding toggle button
- Uses CSS variables
- Theme preference stored in LocalStorage
- Persists across page reloads

### 📦 Inventory Management (Frontend Simulation)
- Product data loaded from `products.json`
- Inventory updated after placing an order
- Out-of-stock products are automatically disabled

### 📱 Responsive UI
- Mobile-friendly layout
- Cart and buttons adapt to smaller screens
- No overflow issues on mobile devices

---

## 📁 Folder Structure
mini-ecommerce/
│
├── assets/
│ └── images/
│ ├── placeholder.png
│ ├── headphones.jpg
│ ├── watch.jpg
│ ├── shoes.jpg
│ └── backpack.jpg
│
├── css/
│ └── style.css
│
├── data/
│ └── products.json
│
├── js/
│ ├── products.js
│ ├── cart.js
│ ├── theme.js
│ └── toast.js
│
├── index.html
└── README.md



---

## ▶️ How to Run the Project (IMPORTANT)

⚠️ This project uses `fetch()` and LocalStorage, so it **must be run on a local server**.

### Option 1: Using VS Code (Recommended)
1. Install the **Live Server** extension
2. Right-click `index.html`
3. Select **Open with Live Server**

### Option 2: Using Python
```bash
python -m http.server
