# Dhaneshwari

Full-stack hotel website with separate frontend and backend apps.

## Project structure

- `frontend` - React + Vite application
- `backend` - Node.js + Express + MongoDB API

## Tech stack

- Frontend: React, Vite, Redux Toolkit, React Router, Tailwind CSS, Axios
- Backend: Node.js, Express, MongoDB (Mongoose), JWT Auth, Passport, Nodemailer

## Prerequisites

- Node.js 18+ (recommended LTS)
- npm
- MongoDB database (local or Atlas)

## Backend setup

### 1) Install dependencies

```bash
cd backend
npm install
```

### 2) Create backend environment file

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret

FRONTEND_URLS=http://localhost:5173,https://dhaneshwari-alpha.vercel.app
FRONTEND_URL=http://localhost:5173
SITE_URL=https://dhaneshwari-alpha.vercel.app

EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Notes:
- `MONGO_URI` and `JWT_SECRET` are required.
- Email and Google variables are required only if you use those features.

### 3) Seed initial data (recommended)

```bash
npm run seed
```

### 4) Run backend

```bash
npm run dev
```

Backend URL: `http://localhost:5000`

## Frontend setup

### 1) Install dependencies

```bash
cd frontend
npm install
```

### 2) Create frontend environment files

Create:

- `frontend/.env.development`
- `frontend/.env.production`

```env
# .env.development
VITE_API_BASE_URL=http://localhost:5000/api

# .env.production
VITE_API_BASE_URL=https://dhaneshwari.onrender.com/api
```

### 3) Run frontend

```bash
npm run dev
```

Frontend URL: `http://localhost:5173`

## Run both apps together

Use two terminals.

Terminal 1:
```bash
cd backend
npm run dev
```

Terminal 2:
```bash
cd frontend
npm run dev
```

## Available scripts

### Backend

- `npm run dev` - start backend with nodemon
- `npm run seed` - seed database content

### Frontend

- `npm run dev` - start Vite dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## Main API routes

- `/api/auth`
- `/api/admin`
- `/api/rooms`
- `/api/bookings`
- `/api/attractions`
- `/api/blogs`
- `/api/gallery`
- `/api/testimonials`
- `/api/amenities`
- `/api/promotions`
- `/api/contact`
- `/api/faqs`
- `/api/slider`

## Troubleshooting

- If API data does not show in UI, check backend is running and `VITE_API_BASE_URL` is correct.
- If DB collections are empty, run:
  - `cd backend && npm run seed`
- If CORS issues occur, ensure `FRONTEND_URLS` in backend `.env` includes both local and live frontend URLs.
- If auth fails, verify `JWT_SECRET` and token storage in browser localStorage.

## Deployment variables

### Vercel (Frontend)

- `VITE_API_BASE_URL=https://dhaneshwari.onrender.com/api`

### Render (Backend)

- `PORT=5000`
- `MONGO_URI=<your-prod-mongo-uri>`
- `JWT_SECRET=<your-secret>`
- `FRONTEND_URL=https://dhaneshwari-alpha.vercel.app`
- `FRONTEND_URLS=https://dhaneshwari-alpha.vercel.app,http://localhost:5173`
- `SITE_URL=https://dhaneshwari-alpha.vercel.app`
- `EMAIL_USER`, `EMAIL_PASS`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` (if features are used)
