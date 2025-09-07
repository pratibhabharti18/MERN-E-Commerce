const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config(); // load .env variables

const authRoutes = require("./routes/auth");
const itemRoutes = require("./routes/item");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", itemRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

// DB connection & Server start
const dbURI = process.env.MONGO_URI;
const port = process.env.PORT || 4000;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .then(() =>
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    )
  )
  .catch((err) => console.error("MongoDB connection error:", err));

// Example: Access JWT and Stripe keys anywhere
const jwtSecret = process.env.JWT_SECRET;
const stripeKey = process.env.STRIPE_API_KEY;
