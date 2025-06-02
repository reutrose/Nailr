# Nailr - For Jobs Well Done 🛠️

Nailr is a full-stack MERN platform designed to connect hands-on professionals with clients seeking reliable, skilled trade services. The platform supports real-time messaging, anonymous reviews, user authentication, and content-rich portfolios for workers.

## 📁 Project Structure

```
Nailr/
├── nailr-backend/     # Node.js + Express API + MongoDB
├── nailr-frontend/    # React + Vite + Bootstrap UI
├── README.md          # Project overview
```

## 🌐 Live Preview

>

## 🧱 Tech Stack

- **Frontend**: React 19, Vite, Bootstrap 5, MUI, Framer Motion, Formik + Yup
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT-based
- **Real-time Features**: Socket.IO
- **File Uploads**: Multer
- **Validation**: Joi (Backend), Yup (Frontend)

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/reutrose/Nailr.git
```

### 2. Set up the Backend

```bash
cd nailr-backend
npm install
npm run dev
```

Create a `.env` file in `nailr-backend/`:

```env
Files attached to assignment.
```

### 3. Set up the Frontend

```bash
cd ../nailr-frontend
npm install
npm run dev
```

## 🔒 Bonus Features

- **Login Inactivity Timeout:** Users are automatically logged out after 4 hours of inactivity. Movement and keyboard interaction reset the timer, and a toast notification informs users when they are logged out.

- **Request Rate Limiting:** A backend rate limiter restricts each IP address to a maximum of 1000 requests per 24 hours. If the limit is reached, users are redirected to a dedicated "Too Many Requests" page.

- **Profile Picture Management:** Users can upload, update, and display profile avatars using file upload via Multer. Avatars are securely stored and displayed throughout the platform.

## 📖 Documentation

- See [nailr-backend/README.md](./nailr-backend/README.md) for API routes and backend logic
- See [nailr-frontend/README.md](./nailr-frontend/README.md) for UI structure and component logic

## 📄 License

This project is open for academic use as part of HackerU's Final Full-Stack Project submission.

---
