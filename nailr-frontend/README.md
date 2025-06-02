# Nailr Frontend - React Client

This is the frontend client for the Nailr platform — a responsive and modern web application for connecting clients with professional tradespeople.

## ⚛️ Built With

- **React 19** – Fast, modern UI framework
- **Vite** – Lightning-fast build tool
- **Bootstrap 5** – Responsive grid and UI components
- **Material UI (MUI)** – Iconography and components
- **Formik + Yup** – Form handling and validation
- **Framer Motion** – Animation
- **React Router DOM v6** – Client-side routing
- **Axios** – HTTP client for API calls
- **Socket.io-client** – Real-time messaging
- **React Toastify + Confetti** – Visual feedback (toasts, effects)

## 🛠️ Available Scripts

In the project directory, you can run:

```bash
npm run dev       # Launch development server
npm run build     # Build for production
npm run preview   # Preview production build
```

## 📁 Project Structure

```
nailr-frontend/
├── public/                # Static assets
├── src/
│   ├── assets/            # Images, fonts, SCSS
│   ├── components/        # Reusable UI components
│   ├── contexts/          # React context providers
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Route-based views
│   ├── services/          # API calls (Axios)
│   ├── utils/             # Helper functions
│   └── main.jsx           # Entry point
├── .env                   # Environment variables (e.g. VITE_API_URL)
├── index.html             # App HTML shell
└── vite.config.js         # Vite configuration
```

## ⚙️ .env Example

Create a `.env` file in the root of `nailr-frontend/`.

```
`.env` file is attached to assignment.
```

## 🧪 Code Standards

- Clean JSX and SCSS modules
- Validations and accessibility applied where needed
- Responsive design for all screen sizes
- Uses `classnames` and MUI for styling flexibility

## 📦 Deployment

Build the frontend with:

```bash
npm run build
```

The output will be in the `dist/` folder. Deploy using services like Vercel, Netlify, or Surge.

## 📄 License

This code is provided as part of an academic full-stack final project at HackerU College.
