const mongoose = require('mongoose');
const config = require('config');
const Item = require('./models/Item'); // Adjust the path if needed

// MongoDB URI from config
const dbURI = config.get('dbURI');

// Default products (30 items)
const defaultProducts = [
  { title: "Apple iPhone 15", description: "Latest Apple iPhone with A17 Bionic chip", category: "Electronics", price: 120000 },
  { title: "Samsung Galaxy S23", description: "High-end Samsung smartphone", category: "Electronics", price: 90000 },
  { title: "OnePlus 12", description: "Flagship killer smartphone", category: "Electronics", price: 80000 },
  { title: "Google Pixel 8", description: "Pure Android experience", category: "Electronics", price: 70000 },
  { title: "Sony WH-1000XM5", description: "Noise-cancelling wireless headphones", category: "Electronics", price: 25000 },
  { title: "Bose QuietComfort 45", description: "Premium noise-cancelling headphones", category: "Electronics", price: 28000 },
  { title: "Nike Air Max", description: "Comfortable running shoes", category: "Footwear", price: 6000 },
  { title: "Adidas Ultraboost", description: "High-performance running shoes", category: "Footwear", price: 6500 },
  { title: "Puma Sports Shoes", description: "Stylish sports shoes", category: "Footwear", price: 5000 },
  { title: "Levi's 501 Jeans", description: "Classic blue denim jeans", category: "Clothing", price: 3000 },
  { title: "H&M T-Shirt", description: "Casual cotton T-shirt", category: "Clothing", price: 800 },
  { title: "Zara Jacket", description: "Trendy winter jacket", category: "Clothing", price: 4000 },
  { title: "Apple MacBook Air", description: "M2 chip, lightweight laptop", category: "Electronics", price: 150000 },
  { title: "Dell XPS 13", description: "High-performance Windows laptop", category: "Electronics", price: 130000 },
  { title: "HP Spectre x360", description: "Convertible laptop with touch screen", category: "Electronics", price: 120000 },
  { title: "Canon EOS R5", description: "Professional mirrorless camera", category: "Electronics", price: 250000 },
  { title: "Nikon Z6 II", description: "High-quality mirrorless camera", category: "Electronics", price: 200000 },
  { title: "KitchenAid Mixer", description: "Professional stand mixer", category: "Home Appliances", price: 35000 },
  { title: "Dyson V15 Vacuum", description: "Cordless vacuum cleaner", category: "Home Appliances", price: 40000 },
  { title: "Samsung Refrigerator", description: "Double-door smart fridge", category: "Home Appliances", price: 80000 },
  { title: "LG Washing Machine", description: "Front-load washing machine", category: "Home Appliances", price: 35000 },
  { title: "Sony Bravia 55 inch", description: "4K Smart TV", category: "Electronics", price: 70000 },
  { title: "LG OLED 65 inch", description: "Premium OLED 4K TV", category: "Electronics", price: 150000 },
  { title: "Apple Watch Series 9", description: "Smart wearable", category: "Electronics", price: 45000 },
  { title: "Fitbit Charge 6", description: "Fitness tracker", category: "Electronics", price: 15000 },
  { title: "Ray-Ban Sunglasses", description: "Stylish UV protection sunglasses", category: "Accessories", price: 12000 },
  { title: "Fossil Leather Wallet", description: "Premium leather wallet", category: "Accessories", price: 5000 },
  { title: "Amazon Echo Dot", description: "Smart speaker with Alexa", category: "Electronics", price: 4500 },
  { title: "Google Nest Hub", description: "Smart display", category: "Electronics", price: 7000 },
  { title: "Logitech MX Master 3", description: "Wireless ergonomic mouse", category: "Electronics", price: 8000 }
];

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("MongoDB connected...");

    // Clear existing items (optional)
    await Item.deleteMany({});
    console.log("Existing products cleared.");

    // Insert default products
    await Item.insertMany(defaultProducts);
    console.log("30 default products added!");

    mongoose.disconnect();
    console.log("Seeding completed.");
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  });
