

# 🛒 MERN E-Commerce Store

A **full-stack e-commerce application** built with **MERN (MongoDB, Express, React, Node.js)**. Users can browse products, add them to a cart, place orders, and view order history. Stripe integration allows payment processing.

---

## 🚀 Features

* User authentication with **JWT**
* Browse **products** with category and price details
* **Add to Cart** and **update quantity**
* **Place orders** and view order history
* **Stripe checkout integration**
* Responsive design using **Reactstrap & Bootstrap**
* Admin-ready: easily extendable for **product management**

---

## 📦 Technologies Used

* **Frontend:** React, Redux, React-Router, Reactstrap, Bootstrap
* **Backend:** Node.js, Express.js
* **Database:** MongoDB with Mongoose
* **Authentication:** JWT
* **Payment:** Stripe API

---

## 🔧 Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/tsujit74/mern-ecommerce.git
cd mern-ecommerce
```

### 2. Install dependencies

```bash
npm install
cd client
npm install
```

### 3. Create `.env` file

At the root of the project:

```env
PORT=4000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=your_jwt_secret
STRIPE_API_KEY=your_stripe_secret
```

### 4. Add default products to database (optional)

You can run a script to seed initial products:

```bash
node seedProducts.js
```

*(Make sure `seedProducts.js` uses your `Item` model.)*

### 5. Run the application

**Backend:**

```bash
npm run server
```

**Frontend:**

```bash
cd client
npm start
```

The app will run on: `http://localhost:3000`

---

## 🗂 Project Structure

```
mern-ecommerce/
├── client/           # React frontend
├── models/           # MongoDB models
├── routes/           # Express API routes
├── actions/          # Redux actions
├── reducers/         # Redux reducers
├── server.js         # Main server file
├── .env              # Environment variables
└── README.md
```

---

## 🔑 Environment Variables

| Variable         | Description                       |
| ---------------- | --------------------------------- |
| MONGO\_URI       | MongoDB connection string         |
| JWT\_SECRET      | Secret key for JWT authentication |
| STRIPE\_API\_KEY | Stripe secret key for payments    |
| PORT             | Server port (default 4000)        |

---

## 📈 Available Scripts

**Frontend:**

```bash
npm start          # Start React app in development
npm run build      # Build React app for production
```

**Backend:**

```bash
npm run server     # Start Node.js backend with nodemon
```

---

## ⚡ Usage

1. Register a new account
2. Browse products on the homepage
3. Add products to your cart
4. Update quantity or remove items
5. Proceed to checkout and complete payment via Stripe
6. View your orders under **Orders** page

---

## 📝 License

This project is **open-source** and free to use for educational purposes.
