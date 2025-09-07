const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const itemRoutes = require("./routes/item");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");

const app = express();

// Middleware
app.use(express.json());

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// API Routes
app.use("/api", authRoutes);
app.use("/api", itemRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "client", "build");
  app.use(express.static(buildPath));

  // Catch-all for React Router
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(buildPath, "index.html"));
  });
}

// Database & Server
const dbURI = process.env.MONGO_URI;
const port = process.env.PORT || 4000;

mongoose.connect(dbURI)
  .then(() => console.log("MongoDB connected successfully"))
  .then(() => app.listen(port, () => console.log(`Server running on port ${port}`)))
  .catch(err => console.error("MongoDB connection error:", err));
