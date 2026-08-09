# GN QuickDocs — Setup Guide

This guide walks you through installing and running the GN QuickDocs project
locally on **Windows / macOS / Linux**.

---

## 1. Prerequisites

Make sure the following are installed on your machine:

| Tool | Version | Purpose |
|------|---------|---------|
| **Node.js** | v18+ (v20 recommended) | Runs the JS frontend & backend |
| **npm** | v9+ | Package manager (ships with Node) |
| **MongoDB** | v6+ (local or Atlas) | Database |
| **Git** | any recent | Clone the repo (optional) |

> 🔑 **AI feature**: To use the AI Assistant you also need a **Groq API key**.
> Sign up at <https://console.groq.com> and create an API key. The app still runs
> without it, but the AI chat will return an error.

---

## 2. Environment Variables

### 2.1 Server (`server/.env`)
Create a file named `.env` inside the `server/` directory:

```env
# MongoDB connection string (local or Atlas)
# Local example:
MONGO_URI=mongodb://127.0.0.1:27017/gn_quickdocs

# Atlas example:
# MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/gn_quickdocs

# JWT secret used to sign auth tokens (change this!)
JWT_SECRET=change_this_to_a_long_random_string

# Port the API listens on (default 5000)
PORT=5000

# Allowed browser origin(s) for CORS (comma not needed; single origin ok)
CLIENT_URL=http://localhost:5173

# Groq API key for the AI Assistant (optional for the rest of the app)
GROQ_API_KEY=your_groq_api_key_here

# Optional: override the default AI model
# GROQ_MODEL=llama-3.3-70b-versatile
```

> ⚠️ `.env` is git-ignored (see `server/.gitignore`). Never commit secrets.

### 2.2 Client (`client/.env`)
Create a file named `.env` inside the `client/` directory:

```env
# Base URL of the backend API
VITE_API_URL=http://localhost:5000/api
```

---

## 3. Installing Dependencies

Open a terminal in the project root and install each workspace separately.

### Backend
```bash
cd server
npm install
```

### Frontend
```bash
cd client
npm install
```

> ℹ️ There is **no root-level `package.json`** — the project is split into
> `server/` and `client/` workspaces. Always run `npm install` inside each folder.

---

## 4. Starting MongoDB

Make sure MongoDB is running before starting the server.

- **Local install**: start the `mongod` service (e.g., `net start MongoDB` on
  Windows, or via brew/services on macOS/Linux).
- **Docker** (optional):
  ```bash
  docker run --name gn-mongo -p 27017:27017 -d mongo
  ```
- **MongoDB Atlas**: use your Atlas connection string in `MONGO_URI` (no local
  server needed).

---

## 5. Database Seeding

The database needs initial data for **locations** (provinces/districts) and
**instruction sheets** (sample PDFs). Seeding is **idempotent** — safe to re-run.

### 5.1 Seed provinces & districts (all 9 provinces + Sri Lanka districts)
```bash
cd server
node seed.js
```
This clears the `locations` collection and inserts the data from
`server/data/locationSeed.js`. A log is written to `server/seed_log.txt`.

### 5.2 Seed instruction-sheet PDFs
```bash
cd server
npm run seed
```
This runs `server/seed/seedInstructionSheets.js`, which for each configured
service generates a professional sample PDF (via `pdfkit`), stores it in GridFS,
and creates the metadata record. If a sheet already exists for a service, it is
**skipped** (no duplicates).

> The generated PDFs are clearly marked **"SAMPLE / DEVELOPMENT DOCUMENT"** and
> are **not official government forms**.

---

## 6. Running the Application

You need **two terminals** — one for the backend, one for the frontend.

### Terminal 1 — Backend (from `server/`)
```bash
cd server
npm run dev          # uses nodemon (auto-reload)
# OR
npm start            # plain node, no auto-reload
```
Expected output: `MongoDB Connected: ...` and `Server running on port 5000`.

### Terminal 2 — Frontend (from `client/`)
```bash
cd client
npm run dev          # starts Vite dev server
```
Open the printed URL (usually <http://localhost:5173>).

---

## 7. Verifying It Works

1. **Landing page** — visit <http://localhost:5173>, tap to enter the Dashboard.
2. **Tabs / navigation** — browse Services and Grama Niladhari.
3. **Language switch** — use EN / SI / TA in the header.
4. **Theme toggle** — switch light/dark.
5. **Locations** — the GN Division List should show provinces from MongoDB.
6. **Instruction sheets** — open a Document Checklist and click "Instruction
   Sheet" to preview/download a PDF.
7. **AI Assistant** — type a question on the Dashboard and send it (requires a
   valid `GROQ_API_KEY`).

---

## 8. Building for Production

```bash
cd client
npm run build        # outputs static files to client/dist
npm run preview      # preview the production build locally
```

The backend serves the API; in production you would serve `client/dist` via a
static host (Nginx, Vercel, Netlify, etc.) or via Express static middleware.

---

## 9. Common Setup Issues

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `GROQ_API_KEY is not configured` log | Missing/wrong key in `server/.env` | Add a valid `GROQ_API_KEY` and restart |
| `MongoDB Connected` never prints | MongoDB not running / wrong URI | Start MongoDB, verify `MONGO_URI` |
| CORS error in browser console | `CLIENT_URL` mismatch | Set `CLIENT_URL` to the actual Vite port (e.g. `http://localhost:5173`) |
| `ENOENT ... package.json` during build | Command run from wrong folder | `cd` into `client/` before `npm run build` |
| AI Assistant error/timeout | No key, rate limit, or network | Verify key, retry later, check `GROQ_MODEL` |
