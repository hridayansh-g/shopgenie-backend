### ✅ **ShopGenie Backend (Express + MongoDB)**

#### `README.md` (for shopgenie-backend)

# 🛠️ ShopGenie Server (Server)

This is the backend service for the **ShopGenie** mobile application, a smart assistant for in-store navigation, product scanning, and simulated payments. Built with **Express.js** and **MongoDB**, it provides all necessary RESTful APIs for product data, payment processing, QR code generation, and popularity tracking.

## ⚙️ Features

- 📁 Product catalog with brand, price, stock, and QR code ID
- 🧠 Product popularity tracking (used for personalization)
- 📸 Dynamic QR Code generation per product
- 💳 Purchase simulation and payment logging
- 🧾 Purchase history API (used in frontend)
- 🔒 CORS-enabled and ready for cloud deployment

## 🧑‍💻 Tech Stack

- **Node.js + Express**
- **MongoDB + Mongoose**
- **QRCode package for generation**
- **CORS, dotenv, nodemon**

## 🛠️ Installation

```bash
git clone https://github.com/hridayansh/shopgenie-backend.git
cd shopgenie-backend
npm install
npm run dev
```

## Make sure to create a .env file with your MongoDB URI:
MONGODB_URI=your_mongodb_connection_string


## 📄 License
This project is open-source and made for educational use.

