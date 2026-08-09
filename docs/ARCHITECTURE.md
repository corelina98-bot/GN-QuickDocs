# GN QuickDocs — Architecture

## 1. Project Overview

**GN QuickDocs** is a centralized digital platform that helps Sri Lankan citizens
quickly access **Grama Niladhari (GN)** services. It provides clear information
about required documents, downloadable application forms, instruction sheets, and
service procedures — all in **three languages** (English, Sinhala, Tamil).

The system is a **full-stack JavaScript application** with:

- A **React single-page application (SPA)** frontend.
- A **Node.js / Express REST API** backend.
- **MongoDB** as the database, including **GridFS** for storing PDF binaries.

---

## 2. High-Level Architecture

```
┌──────────────────────────┐          ┌──────────────────────────┐
│      BROWSER (Client)    │          │      BACKEND (Server)    │
│                          │  HTTP    │                          │
│  React 18 + Vite 5       │◄────────►│  Express 5 + Mongoose 9  │
│  react-router-dom v7     │  JSON /  │                          │
│  react-i18next (EN/SI/TA)│  PDF     │  /api/auth               │
│  axios (HTTP client)     │          │  /api/documents          │
│  lucide-react (icons)    │          │  /api/ai                 │
│                          │          │  /api/locations          │
│  Vite dev server :5173   │          │  /api/services/...       │
└──────────────────────────┘          └────────────┬─────────────┘
                                                   │  Mongoose (ODM)
                                                   ▼
                                          ┌────────────────────┐
                                          │      MongoDB       │
                                          │                    │
                                          │  DB collections:   │
                                          │  users             │
                                          │  documents         │
                                          │  locations         │
                                          │  instructionsheets │
                                          │  fs.files/chunks   │
                                          │    (GridFS PDFs)   │
                                          └────────────────────┘
```

### Request flow (example: viewing an instruction sheet)
1. User clicks "Instruction Sheet" on a Document Checklist page.
2. The React modal builds a URL from `client/src/services/instructionSheetService.js`
   -> `GET /api/services/{category}/{subService}/instruction-sheet`.
3. Express routes the request to `instructionSheetController.getInstructionSheet`.
4. The controller queries the `InstructionSheet` metadata in MongoDB, then streams
   the PDF binary from **GridFS** back to the browser.
5. The PDF renders inside an `<iframe>` in the modal, with a download option.

---

## 3. Directory Structure

```
GN QuickDocs/
├── README.md
├── TODO.md
├── docs/                          # This documentation
│   ├── ARCHITECTURE.md
│   ├── SETUP.md
│   ├── API.md
│   └── OPERATIONS.md
│
├── client/                        # React frontend
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx               # App entry (ThemeProvider + i18n bootstrap)
│       ├── App.jsx                # Route definitions
│       ├── i18n.js                # i18next configuration
│       ├── api/
│       │   └── axios.js           # Shared axios instance (auth token interceptor)
│       ├── components/            # Header, ServiceCard, modals, toggles
│       ├── context/
│       │   └── ThemeContext.jsx   # Light/Dark theme provider
│       ├── data/
│       │   └── servicesData.js    # Services taxonomy (single source of truth)
│       ├── locales/
│       │   ├── en.json            # English translations
│       │   ├── si.json            # Sinhala translations
│       │   └── ta.json            # Tamil translations
│       ├── pages/
│       │   ├── Welcome.jsx        # Splash screen
│       │   ├── Dashboard.jsx      # Home + AI ask box
│       │   ├── AIAssistant.jsx    # Chat with Groq AI
│       │   ├── Services.jsx       # Category grid
│       │   ├── CategoryDetail.jsx # Sub-service grid
│       │   ├── DocumentChecklist.jsx
│       │   ├── GNDivisionList.jsx # Province → District → GN Div picker
│       │   └── GNDetails.jsx      # GN officer details + map
│       ├── services/
│       │   └── instructionSheetService.js  # PDF URL + download helpers
│       ├── styles/
│       │   └── theme.css          # CSS variables for light/dark themes
│       └── utils/
│           └── gridLayout.js      # Responsive grid class helper
│
└── server/                        # Express backend
    ├── server.js                  # App bootstrap + middleware + route mounting
    ├── package.json
    ├── seed.js                    # Seed provinces/districts into MongoDB
    ├── config/
    │   └── db.js                  # Mongoose connection
    ├── controllers/               # Route handlers
    │   ├── aiController.js
    │   ├── authController.js
    │   ├── documentController.js
    │   ├── instructionSheetController.js
    │   └── locationController.js
    ├── middleware/
    │   └── authMiddleware.js      # JWT protect guard
    ├── models/
    │   ├── User.js
    │   ├── Document.js
    │   ├── Location.js
    │   └── InstructionSheet.js
    ├── routes/                    # Express routers
    │   ├── authRoutes.js
    │   ├── documentRoutes.js
    │   ├── aiRoutes.js
    │   ├── instructionSheetRoutes.js
    │   └── locationRoutes.js
    ├── services/
    │   └── gridfsService.js       # GridFS read/write/delete helpers
    ├── seed/
    │   └── seedInstructionSheets.js  # Generate + store sample PDFs
    ├── data/
    │   ├── colomboDivisions.js    # Colombo GN division list
    │   └── locationSeed.js        # 9 provinces + districts
    └── sample-data/
```

---

## 4. Frontend Architecture

### 4.1 Routing (`client/src/App.jsx`)
Uses `react-router-dom` v7 with `BrowserRouter`. Every route renders a page
component that includes a shared `Header`.

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Welcome | Splash screen |
| `/dashboard` | Dashboard | Home + AI ask box |
| `/ai-assistant` | AIAssistant | Chat with AI |
| `/services` | Services | Service category grid |
| `/services/:categorySlug` | CategoryDetail | Sub-services in a category |
| `/services/:categorySlug/:subServiceSlug` | DocumentChecklist | Required documents + instruction sheet |
| `/grama-niladhari` | GNDivisionList | Province/District/GN selector |
| `/grama-niladhari/details` | GNDetails | GN officer details + map |

### 4.2 State Management
- **Theme**: `ThemeContext.jsx` provides `useTheme()` globally. It toggles
  `<html data-theme="light|dark">` and persists the choice in `localStorage`.
- **i18n**: `i18n.js` configures `i18next` with browser language detection and
  `localStorage` caching. Components call `useTranslation()` -> `t()`.
- Everything else uses local React state (`useState`/`useEffect`).

### 4.3 Services Data Model
`client/src/data/servicesData.js` is the **single source of truth** for the
services taxonomy. Human-readable labels and document lists are stored in the
locale JSON files and resolved through `getLocalizedServices(t)`. This means
switching EN/SI/TA instantly translates every service screen without a page reload.

```
servicesData = {
  "<categorySlug>": {
    icon: "LucideIconName",
    subServices: {
      "<subServiceSlug>": {
        icon: "LucideIconName",
        instructionSheet: true|false,
        documentKeys: ["translation.key.document.0", ...]
      }
    }
  }
}
```

**Adding a new service** = add an entry here + add translations to the 3 locale
files. No new components are required.

---

## 5. Backend Architecture

### 5.1 Express App (`server/server.js`)
- Uses `dotenv` for environment config.
- `cors` allows the Vite dev origin(s) and `CLIENT_URL`.
- `express.json()` parses JSON bodies.
- Mounts routers under `/api/*`.
- Validates `GROQ_API_KEY` presence with a helpful log but does not crash.

### 5.2 Data Models (Mongoose)
| Model | Collection | Purpose |
|-------|-----------|---------|
| `User` | users | Auth (bcrypt hashed password), prefers multi-language |
| `Document` | documents | User-authored documents (tied to user) |
| `Location` | locations | Provinces with embedded districts & GN divisions |
| `InstructionSheet` | instructionsheets | Metadata record for PDFs (holds GridFS `fileId`) |

### 5.3 GridFS PDF Storage
PDF binaries are stored in **MongoDB GridFS** (`fs.files` + `fs.chunks` buckets)
rather than inside ordinary documents. `server/services/gridfsService.js` wraps the
native `GridFSBucket`:

- `getBucket()` — lazily creates & caches a bucket bound to the live connection.
- `storeInstructionSheet(buffer, meta)` — uploads a PDF, returns the file id.
- `streamInstructionSheet(fileId, output)` — streams a PDF to the response.
- `deleteInstructionSheet(fileId)` — removes a PDF.

The `InstructionSheet` metadata document stores the GridFS `fileId` so the binary
never needs to be embedded.

### 5.4 AI Integration (Groq)
`server/controllers/aiController.js` calls the **Groq** OpenAI-compatible chat
completions endpoint (`https://api.groq.com/openai/v1/chat/completions`) using the
default model `llama-3.3-70b-versatile`. Key points:

- API key is read only from `process.env.GROQ_API_KEY` — never exposed to the
  frontend or logs.
- 30-second timeout via `AbortController`.
- Handles rate-limit (429) and timeout errors with friendly messages.
- Supports conversation history and language selection.

### 5.5 Authentication
- `bcryptjs` hashes passwords (pre-save hook).
- `jsonwebtoken` issues a 30-day JWT.
- `authMiddleware.js` `protect` guard verifies the `Bearer` token and attaches
  `req.user` (excluding the password).

---

## 6. Data Flow Examples

### 6.1 Browse services and documents
```
Dashboard → /services → /services/:categorySlug → /services/:categorySlug/:subServiceSlug
```
All labels/documents come from `getLocalizedServices(t)` resolved from locale files —
**no API call needed** for the service content itself.

### 6.2 Browse GN divisions
```
GNDivisionList → GET /api/locations  →  provinces (with districts)
             → pick province → pick district → pick GN division
             → navigate to /grama-niladhari/details (state passed via router)
```

### 6.3 Ask the AI assistant
```
Dashboard (type question) → navigate(/ai-assistant, {state:{question}})
AIAssistant → POST /api/ai/generate { messages, language }
            → Groq → returns { result }
```

### 6.4 View/download an instruction sheet
```
DocumentChecklist → InstructionSheetModal → GET /api/services/{cat}/{sub}/instruction-sheet
                 → streams PDF from GridFS → shown in <iframe> / downloadable
```

---

## 7. Design / Theming

The UI uses a **teal-based palette** with a shared CSS-variable theme in
`client/src/styles/theme.css`. Two themes are defined under
`[data-theme="light"]` and `[data-theme="dark"]`. Components reference CSS
variables (e.g., `--ink`, `--card-bg`, `--teal-600`) so theme switching only
requires editing this single file. Fonts: *Playfair Display* (display) + *Inter* (body).

The design includes a circuit-board background texture, adhesive card grids, and a
responsive layout that collapses gracefully on mobile (< 640px, < 420px).
