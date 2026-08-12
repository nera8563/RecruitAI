# 🚀 MockMate (MERN Stack)

**MockMate** is a full-stack AI-powered mock interview platform that helps users
practice personalized, voice-based interviews with instant feedback.

This is a full rewrite of the original Next.js + Firebase + Neon/Drizzle project
into a plain **MERN stack** (MongoDB, Express, React, Node.js) with the exact same UI.

---

## ✨ Features

- 🔐 **Authentication** – Email/password sign-up & sign-in, JWT stored in an httpOnly cookie (Express + bcrypt + jsonwebtoken), replaces Firebase Auth.
- 🧠 **AI-Powered Interviewer** – Google Gemini evaluates the interview transcript (called securely from the backend).
- 🗣️ **Voice Assistant** – Uses ElevenLabs (`@11labs/react`) to run the live voice conversation.
- 📋 **Instant Feedback** – AI evaluates responses and gives instant suggestions.
- 📊 **Dashboard** – Track and manage interview history and feedback.
- 💾 **MongoDB Database** – Stores users and feedback records (Mongoose), replaces PostgreSQL/Drizzle.
- 🖥️ **Modern UI** – Same clean, dark, responsive design, rebuilt with React + Tailwind CSS.

---

## 🛠️ Tech Stack

| Category      | Technologies Used                                   |
|---------------|------------------------------------------------------|
| Frontend      | React (Vite), React Router, Tailwind CSS             |
| Backend       | Node.js, Express.js                                  |
| Database      | MongoDB (Mongoose)                                    |
| Auth          | JWT + httpOnly cookies + bcrypt                       |
| AI            | Google Gemini (`@google/generative-ai`), ElevenLabs   |

---

## 📁 Project Structure

```
mockmate-mern/
├── backend/                 # Express + MongoDB API
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/auth.js
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/                 # React (Vite) app
    ├── public/                # images, covers, favicon
    ├── src/
    │   ├── api/axios.js
    │   ├── components/
    │   ├── context/AuthContext.jsx
    │   ├── pages/
    │   ├── constants/
    │   ├── lib/utils.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── .env.example
```

---

## 📦 Installation & Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:

```
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

MONGO_URI=mongodb://127.0.0.1:27017/mockmate
JWT_SECRET=replace-this-with-a-long-random-secret
GEMINI_API_KEY=your-gemini-api-key
```

Run it:

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `frontend/.env`:

```
VITE_API_URL=http://localhost:5000/api
VITE_AI_AGENT_ID=your-elevenlabs-agent-id
```

Run it:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Environment Variables Needed

| Variable                | Where           | Purpose                                          |
|--------------------------|-----------------|---------------------------------------------------|
| `MONGO_URI`              | backend         | MongoDB connection string (local or Atlas)         |
| `JWT_SECRET`              | backend         | Secret used to sign session JWTs                  |
| `GEMINI_API_KEY`          | backend         | Google AI Studio key for transcript evaluation      |
| `CLIENT_URL`               | backend         | Frontend origin, used for CORS                    |
| `VITE_API_URL`             | frontend        | Backend API base URL                              |
| `VITE_AI_AGENT_ID`         | frontend        | ElevenLabs Conversational AI agent ID              |

---

## 🔁 What changed vs the original project

| Original (Next.js)                     | This MERN version                              |
|------------------------------------------|-------------------------------------------------|
| Firebase Auth + Firestore                | Express + MongoDB (Mongoose) + JWT cookie auth   |
| Neon Postgres + Drizzle ORM              | MongoDB `Feedback` collection                    |
| Gemini called from the client (`NEXT_PUBLIC_GEMINI_API`) | Gemini called from the Express backend (key stays server-side) |
| Next.js file-based routing + server layouts | React Router with `ProtectedRoute` / `PublicRoute` |
| `@11labs/react` voice hook (client)       | Same hook, unchanged — works in any React app     |

All Tailwind styling, colors, gradients, and component layout were kept identical
to the original design.

---

## 🔮 Future Improvements

- 📅 Interview scheduling with calendar integration
- 📈 Performance analytics dashboard
- 📤 Export feedback to PDF
- 🧠 Resume/job-based AI customization
