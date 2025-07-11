const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/product");

dotenv.config();

const products = [
  {
    name: "Parle-G",
    category: "Snacks",
    price: 10,
    stock: 50,
    qrCodeId: "qr_parle_g",
    location: { floor: 1, row: 2, column: 3, drawer: 1 },
  },
  {
    name: "Pepsi 500ml",
    category: "Beverages",
    price: 35,
    stock: 25,
    qrCodeId: "qr_pepsi_500",
    location: { floor: 1, row: 2, column: 4, drawer: 2 },
  },
  {
    name: "Sprite 250ml",
    category: "Beverages",
    price: 20,
    stock: 30,
    qrCodeId: "qr_sprite_250",
    location: { floor: 1, row: 2, column: 5, drawer: 1 },
  },
  {
    name: "Dairy Milk",
    category: "Chocolates",
    price: 45,
    stock: 40,
    qrCodeId: "qr_dairy_milk",
    location: { floor: 1, row: 2, column: 6, drawer: 2 },
  },
  {
    name: "Maggi 2-Min",
    category: "Noodles",
    price: 15,
    stock: 60,
    qrCodeId: "qr_maggi_2min",
    location: { floor: 1, row: 3, column: 1, drawer: 1 },
  },
  {
    name: "KitKat",
    category: "Chocolates",
    price: 20,
    stock: 35,
    qrCodeId: "qr_kitkat",
    location: { floor: 1, row: 3, column: 2, drawer: 2 },
  },
  {
    name: "Coke 1L",
    category: "Beverages",
    price: 40,
    stock: 20,
    qrCodeId: "qr_coke_1l",
    location: { floor: 1, row: 3, column: 3, drawer: 1 },
  },
  {
    name: "Lays Classic",
    category: "Snacks",
    price: 25,
    stock: 50,
    qrCodeId: "qr_lays_classic",
    location: { floor: 1, row: 3, column: 4, drawer: 2 },
  },
  {
    name: "Bournvita 500g",
    category: "Health Drinks",
    price: 120,
    stock: 15,
    qrCodeId: "qr_bournvita",
    location: { floor: 1, row: 3, column: 5, drawer: 1 },
  },
  {
    name: "Tropicana Orange",
    category: "Juice",
    price: 30,
    stock: 18,
    qrCodeId: "qr_tropicana_orange",
    location: { floor: 1, row: 3, column: 6, drawer: 2 },
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("DB connected ✔");
    await Product.deleteMany(); // clean previous
    await Product.insertMany(products); // insert fresh
    console.log("✅ Products seeded 🎉");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
  });