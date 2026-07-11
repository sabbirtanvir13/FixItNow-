# 🔧 FixItNow - Home Service Marketplace API

A robust RESTful Backend API for a Home Service Marketplace where customers can find skilled technicians, book services, make online payments, and leave reviews. Technicians can manage their profiles, services, availability, and bookings, while admins oversee the entire platform.

---

## 🚀 Live API

https://your-render-url.onrender.com

---

## 📄 API Documentation

https://your-render-url.onrender.com/api-docs

---

## ✨ Features

### 🔓 Authentication
- JWT Authentication
- Role Based Authorization
- Secure Password Hashing
- Profile Management

### 👤 Customer
- Register & Login
- Browse Services
- View Technician Profile
- Book Technicians
- Track Booking Status
- Make Online Payment
- Payment History
- Leave Reviews

### 🛠 Technician
- Register & Login
- Create & Update Profile
- Manage Availability
- View Bookings
- Accept / Decline Booking
- Update Booking Status
- Complete Jobs

### 👨‍💼 Admin
- Manage Users
- Ban / Unban Users
- Manage Categories
- View All Bookings

### 💳 Payment
- Stripe / SSLCommerz Integration
- Payment Verification
- Payment History
- Transaction Tracking

### ⭐ Reviews
- Review after completed booking
- Technician Ratings

### 🛡 Security
- JWT Authentication
- Password Hashing
- Input Validation
- Global Error Handling
- 404 Route Handling

---

# 🛠 Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT
- Bcrypt
- Zod
- Stripe / SSLCommerz
- ESLint
- Prettier

---

# 📂 Folder Structure

```
src
│
├── app
│   ├── modules
│   ├── middleware
│   ├── routes
│   ├── config
│   ├── utils
│   └── errors
│
├── prisma
│
├── server.ts
└── app.ts
```

---

# 📦 Installation

Clone the repository

```bash
git clone https://github.com/your-username/fixitnow-backend.git
```

Go to project directory

```bash
cd fixitnow-backend
```

Install dependencies

```bash
npm install
```

Create environment file

```
.env
```

Run Prisma Migration

```bash
npx prisma migrate dev
```

Generate Prisma Client

```bash
npx prisma generate
```

Run Development Server

```bash
npm run dev
```

Build Project

```bash
npm run build
```

Start Production

```bash
npm start
```

---

# 🔑 Environment Variables

```
PORT=

DATABASE_URL=

JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=

JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRES_IN=

BCRYPT_SALT_ROUNDS=

STRIPE_SECRET_KEY=

SSL_STORE_ID=
SSL_STORE_PASSWORD=
SSL_PAYMENT_API=
SSL_VALIDATION_API=

NODE_ENV=
```

---

# 📌 Main API Endpoints

## Authentication

```
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
```

## Categories

```
GET /api/categories
POST /api/admin/categories
GET /api/admin/categories
```

## Services

```
GET /api/services
POST /api/services
```

## Technicians

```
GET /api/technicians
GET /api/technicians/:id

PUT /api/technician/profile
PUT /api/technician/availability
GET /api/technician/bookings

PATCH /api/technician/bookings/:id
```

## Bookings

```
POST /api/bookings
GET /api/bookings
GET /api/bookings/:id
```

## Payments

```
POST /api/payments/create
POST /api/payments/confirm

GET /api/payments
GET /api/payments/:id
```

## Reviews

```
POST /api/reviews
```

## Admin

```
GET /api/admin/users
PATCH /api/admin/users/:id

GET /api/admin/bookings
```

---

# 📊 Booking Flow

```
REQUESTED
      │
      ▼
ACCEPTED
      │
      ▼
PAID
      │
      ▼
IN_PROGRESS
      │
      ▼
COMPLETED
```

Customer can cancel a booking before **IN_PROGRESS**.

---

# ❌ Error Response

Example

```json
{
  "success": false,
  "statusCode": 404,
  "message": "Booking not found"
}
```

Global Error Handler

```json
{
  "success": false,
  "statusCode": 500,
  "message": "Something went wrong"
}
```

---

# ✅ Tested Features

- Authentication
- Authorization
- CRUD Operations
- Booking Workflow
- Payment Flow
- Review System
- Admin Operations
- Validation Errors
- Global Error Handler
- 404 Not Found Handler

---

# 👨‍💻 Author

**Sabbir Dev**

GitHub:
https://github.com/your-github

LinkedIn:
https://linkedin.com/in/your-linkedin

---

# 📜 License

This project is developed for educational purposes.
