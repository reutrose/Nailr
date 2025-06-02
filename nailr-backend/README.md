# Nailr Backend - Node.js API

This is the backend service for the Nailr platform — a RESTful API built with Node.js, Express, and MongoDB. It handles authentication, business data, posts, reviews, messaging, and real-time features.

## 🚀 Tech Stack

- **Node.js + Express 5**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Socket.IO** – Real-time communication
- **Multer** – File uploads
- **Joi** – Input validation
- **Morgan / Custom logger** – Request logging
- **dotenv / config / chalk** – Env management and readability

## 📁 Folder Structure

```
nailr-backend/
├── app.js                  # Entry point
├── config/                 # App config files
├── collections/            # Feature folders (users, businesses, posts, etc.)
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routes
│   ├── controllers/        # Logic per route
│   └── dataServices/       # Data access logic (DB queries)
├── middlewares/            # Custom middleware
├── utils/                  # Utility functions (auth, error handling)
├── uploads/                # Uploaded assets (e.g., avatars)
├── .env                    # Environment variables
└── package.json
```

## 🔐 Authentication

- **JWT Token** issued upon login (`jsonwebtoken`)
- Tokens are passed via the `x-auth-token` header
- Roles include: `user`, `admin`

## 🌐 API Endpoints

> This is a summary. See full documentation in each route/controller file.

### 🧑 Users

- `POST /users/register` – Register new user
- `POST /users/login` – Login & receive JWT
- `GET /users/profile` – Authenticated profile access
- `PUT /users/:id/profile` – Update profile, including avatar upload

### 🏢 Businesses

- `GET /businesses/` – All businesses
- `POST /businesses/` – Create business
- `GET /businesses/:id` – Get by ID
- `PUT /businesses/:id` – Update (auth required)
- `DELETE /businesses/:id` – Delete (admin only)

### 📝 Posts & Reviews

- `POST /posts/` – Create a post
- `GET /posts/` – Retrieve posts
- `PUT /posts/:id` – Update post
- `DELETE /posts/:id` – Delete post
- `POST /reviews/` – Submit a review
- `GET /reviews/business/:id` – Get reviews for business

### 💬 Messages

- `POST /messages/` – Send message
- `GET /messages/:conversationId` – Get messages for a conversation

### 📢 Notifications

- `GET /notifications/` – Fetch user notifications

## ⚙️ .env Configuration

```env
PORT=8181
MONGO_URI=mongodb://localhost:27017/nailr
SECRET_WORD=your_jwt_secret
```

## 🧪 Run Locally

```bash
npm install
npm run dev
```

> Make sure MongoDB is running locally or provide a cloud connection string.

## ✅ Best Practices

- Modular architecture: Separation of routes, services, controllers
- Validation with Joi before DB operations
- Centralized error handler
- Passwords hashed using bcrypt

## 🧼 Logging & Debugging

- Uses `chalk` for colorful logs
- `morgan` enabled in development
- Custom logging available in `/utils/logsService.js`

## 📄 License

This code is part of a final project for HackerU’s Full-Stack Web Development program.

## 🧪 Initial Data Seeding

The backend includes an `initialData` script that runs automatically on server start (once) if the database is empty. This script:

- Creates test users, businesses, posts, and reviews
- Populates the database with realistic mock data for development/testing

This auto-seed logic is useful for showcasing the full functionality of the platform immediately after cloning and running the app.
