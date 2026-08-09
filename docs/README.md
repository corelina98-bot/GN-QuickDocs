# GN QuickDocs — Documentation Index

Welcome to the GN QuickDocs documentation. Use the links below to jump to the
right guide.

| Document | Purpose |
|----------|---------|
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | Project overview, system architecture, directory structure, and data flow |
| **[SETUP.md](./SETUP.md)** | Prerequisites, environment variables, installation, and running the app |
| **[API.md](./API.md)** | Complete REST API endpoint reference |
| **[OPERATIONS.md](./OPERATIONS.md)** | npm scripts, database management, adding content, and troubleshooting |

---

## Quick Start

```bash
# 1. Backend
cd server
npm install
# create server/.env  (see SETUP.md for the required variables)
node seed.js                 # seed provinces/districts
npm run seed                 # seed instruction-sheet PDFs
npm run dev                  # start API on :5000

# 2. Frontend (new terminal)
cd client
npm install
# create client/.env  (VITE_API_URL=http://localhost:5000/api)
npm run dev                  # start Vite on :5173
```

Open <http://localhost:5173> to use the app.

---

## Technology Stack at a Glance

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 18, Vite 5, react-router-dom v7, react-i18next (EN/SI/TA), axios, lucide-react |
| **Backend** | Node.js, Express 5, Mongoose 9, JWT auth, bcryptjs, multer, pdfkit |
| **Database** | MongoDB (collections + GridFS for PDF binaries) |
| **AI** | Groq (llama-3.3-70b-versatile) via OpenAI-compatible API |
| **Maps** | Google Maps iframe embed (no API key) |

For detailed explanations, see [ARCHITECTURE.md](./ARCHITECTURE.md).
