# GN QuickDocs
A centralized digital platform that helps citizens quickly access Grama Niladhari (GN) services by providing clear information about required documents, downloadable application forms, service procedures.

## Documentation

Comprehensive documentation for the project — including detailed explanations of
the technologies used, a setup guide, the API reference, and an operations manual
— is available in the [**`docs/`**](./docs/README.md) folder:

- [**Architecture**](./docs/ARCHITECTURE.md) — system design, tech stack, directory structure, data flow
- [**Setup Guide**](./docs/SETUP.md) — prerequisites, environment variables, install & run
- [**API Reference**](./docs/API.md) — all REST endpoints
- [**Operations Manual**](./docs/OPERATIONS.md) — scripts, database management, troubleshooting

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React 18, Vite 5, react-router-dom, react-i18next (EN/SI/TA), axios, lucide-react |
| Backend | Node.js, Express 5, Mongoose 9, JWT, bcryptjs, multer, pdfkit |
| Database | MongoDB (collections + GridFS for PDFs) |
| AI | Groq (llama-3.3-70b-versatile) |
| Maps | Google Maps iframe embed |

## Quick Start

```bash
# Backend
cd server
npm install
# create server/.env (see docs/SETUP.md)
node seed.js          # seed provinces/districts
npm run seed          # seed instruction-sheet PDFs
npm run dev           # API on :5000

# Frontend (new terminal)
cd client
npm install
# create client/.env (VITE_API_URL=http://localhost:5000/api)
npm run dev           # Vite on :5173
```

Open <http://localhost:5173>.
