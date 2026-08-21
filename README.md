# 🚀 TechGear — AI-Powered E-Commerce Platform

A full-stack modern e-commerce platform built with the **MERN stack**, designed to provide a complete online shopping experience with secure authentication, product management, cart and checkout functionality, order management, payments, and an AI-powered customer support experience.

---

## 📌 Overview

TechGear is a full-stack e-commerce application where customers can browse products, search and filter products, manage their shopping cart, place orders, and securely make payments.

The platform also includes an **AI-powered customer support agent** that helps users with product-related questions, shopping guidance, pricing information, order-related queries, and general customer support.

The project is built with a scalable architecture using **React, TypeScript, Node.js, Express.js, and MongoDB**.

---

## ✨ Features

### 🔐 Authentication & Authorization

* User registration
* User login
* JWT-based authentication
* Protected routes
* Secure password hashing
* Forgot password functionality
* Reset password functionality
* User session management
* Role-based authorization

### 🛍️ E-Commerce

* Product listing
* Product details
* Product categories
* Product search
* Product filtering
* Product sorting
* Related products
* Product images
* Product availability
* Shopping cart
* Cart quantity management
* Checkout flow
* Order creation
* Order tracking

### 💳 Payments

* Secure payment integration
* Payment processing
* Order payment status
* Payment verification
* Secure server-side payment handling

### 🤖 AI Customer Support Agent

The platform includes an AI-powered shopping assistant that can help customers with:

* Product recommendations
* Product information
* Pricing questions
* Shopping guidance
* Order-related questions
* Delivery-related questions
* Payment-related questions
* General customer support

The AI agent is designed to provide a conversational shopping experience instead of requiring customers to manually search through the website.

### 📦 Order Management

* Create orders
* View orders
* Order details
* Order status
* Payment status
* Customer order history

### 👤 User Management

* User profile
* Account information
* Authentication
* Password management
* Order history

### 🎨 Modern UI

* Responsive design
* Mobile-friendly interface
* Modern e-commerce layout
* Reusable React components
* Product cards
* Category sections
* Featured products
* CTA sections
* Responsive navigation

---

## 🏗️ Project Architecture

```text
TechGear
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── context/
│   │   ├── types/
│   │   ├── assets/
│   │   └── App.tsx
│   │
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── config/
│   │   └── server.ts
│   │
│   ├── package.json
│   └── ...
│
├── .gitignore
├── .env.example
├── README.md
└── package.json
```

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Axios
* Lucide React / React Icons

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT
* bcrypt.js

### AI

* AI API integration
* AI-powered customer support
* Product recommendation assistance
* Conversational shopping experience

### Payments

* Stripe

### Development Tools

* Git
* GitHub
* VS Code
* Postman

---

## 🔄 Application Flow

```text
User
 │
 ▼
Landing Page
 │
 ▼
Browse Products
 │
 ├── Search
 ├── Filter
 ├── Categories
 └── Product Details
        │
        ▼
     Add to Cart
        │
        ▼
      Checkout
        │
        ▼
      Payment
        │
        ▼
       Order
```

### AI Support Flow

```text
Customer
   │
   ▼
AI Shopping Assistant
   │
   ├── Product Questions
   ├── Product Recommendations
   ├── Pricing Questions
   ├── Delivery Questions
   ├── Payment Questions
   └── Order Support
   │
   ▼
AI Response
```

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

Move into the project:

```bash
cd YOUR_REPOSITORY
```

---

## 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 3. Install Backend Dependencies

Open another terminal:

```bash
cd backend
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

OPENAI_API_KEY=your_ai_api_key

STRIPE_SECRET_KEY=your_stripe_secret_key

STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

> Never commit your `.env` file to GitHub.

Use `.env.example` to document the required environment variables.

---

# ▶️ Running the Project

## Start Backend

```bash
cd backend
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

---

## Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Frontend will normally run on:

```text
http://localhost:5173
```

---

# 📡 API Structure

Example API structure:

```text
/api/auth
/api/users
/api/products
/api/categories
/api/cart
/api/orders
/api/payments
/api/ai
```

---

# 🔒 Security

The application implements several security practices:

* Password hashing using bcrypt
* JWT authentication
* Protected API routes
* Environment variables for secrets
* Server-side payment processing
* Input validation
* Role-based authorization
* CORS configuration

Sensitive credentials should always remain inside environment variables.

---

# 📱 Responsive Design

The application is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

---

# 🧪 Testing

Run the frontend tests if configured:

```bash
npm test
```

Run backend tests if configured:

```bash
npm test
```

API endpoints can also be tested using Postman.

---

# 🚀 Production Build

Frontend:

```bash
cd frontend
npm run build
```

Backend:

```bash
cd backend
npm start
```

---

# 📸 Screenshots

Add your project screenshots here.

Example:

```text
screenshots/
├── home.png
├── products.png
├── product-details.png
├── cart.png
├── checkout.png
├── dashboard.png
└── ai-agent.png
```

Then add them to this README:

```markdown
![Home Page](screenshots/home.png)

![Products](screenshots/products.png)

![AI Assistant](screenshots/ai-agent.png)
```

---

# 🌟 Future Improvements

Possible future improvements include:

* Advanced AI product recommendations
* AI-powered order tracking
* Voice-based shopping assistant
* Admin dashboard
* Advanced analytics
* Product reviews and ratings
* Wishlist
* Coupons and discount system
* Email notifications
* Inventory management
* Real-time order updates
* AI-powered sales analytics

---

# 👨‍💻 Author

**Akash Khan**

Full Stack MERN Developer | AI Automation Engineer

---

# 📄 License

This project is created for learning, development, and portfolio purposes.
