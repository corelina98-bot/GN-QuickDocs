# GN QuickDocs — Operations Manual

This manual covers day-to-day operations: available scripts, database
management, adding/removing content, and troubleshooting.

---

## 1. Available npm Scripts

### Backend (`server/`)
| Command | Action |
|---------|--------|
| `npm run dev` | Start the API with **nodemon** (auto-restart on file changes) |
| `npm start` | Start the API with plain `node server.js` |
| `npm run seed` | Seed/refresh instruction-sheet PDFs (idempotent) |
| `node seed.js` | Seed provinces & districts into MongoDB |

### Frontend (`client/`)
| Command | Action |
|---------|--------|
| `npm run dev` | Start the **Vite** dev server (hot reload) |
| `npm run build` | Build a production bundle into `client/dist` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## 2. Database Management (MongoDB)

### 2.1 Collections used
| Collection | Contents |
|-----------|----------|
| `users` | Registered users (hashed passwords) |
| `documents` | User-authored documents |
| `locations` | 9 provinces + districts + GN divisions |
| `instructionsheets` | Instruction-sheet metadata records |
| `fs.files` / `fs.chunks` | GridFS buckets holding PDF binaries |

### 2.2 Re-seeding locations
The location seed **clears** the `locations` collection first:
```bash
cd server
node seed.js
```
View the result in `server/seed_log.txt`.

### 2.3 Re-seeding instruction sheets
The instruction-sheet seed is **idempotent** — it skips services that already
have a sheet:
```bash
cd server
npm run seed
```

### 2.4 Adding a new province/district/GN division
1. Edit `server/data/locationSeed.js` / `server/data/colomboDivisions.js`.
2. Re-run the location seed:
   ```bash
   cd server
   node seed.js
   ```

### 2.5 Adding a new instruction-sheet service
1. Add a service entry to the `sheets` array in
   `server/seed/seedInstructionSheets.js` (title, subtitle, required docs).
2. Add the service to `client/src/data/servicesData.js` with
   `instructionSheet: true` and its `documentKeys`.
3. Add the corresponding translations to `en.json`, `si.json`, `ta.json`.
4. Re-run the seed:
   ```bash
   cd server
   npm run seed
   ```

---

## 3. Adding a New Service (Frontend Content)

The services taxonomy lives in `client/src/data/servicesData.js`. To add a new
category or sub-service:

1. **Add the structure** in `servicesData.js` (icon name, `subServices`,
   `documentKeys`).
2. **Add translations** for the category label, sub-service label, and each
   document to all three locale files:
   - `client/src/locales/en.json`
   - `client/src/locales/si.json`
   - `client/src/locales/ta.json`
3. Frontend service screens update automatically — **no new components needed**.

---

## 4. Adding / Editing Translations

Translation files are JSON objects keyed by section:
```json
{
  "dashboard": { "title": "Dashboard", "services": "Services" },
  "services": { "title": "Services" }
}
```

After editing, the Vite dev server hot-reloads; the header language switch
(EN/SI/TA) instantly reflects changes.

---

## 5. Theming / Design

- Central theme file: **`client/src/styles/theme.css`**.
- Light theme is the default (`:root, [data-theme="light"]`).
- Dark theme is under `[data-theme="dark"]`.
- Components reference CSS variables, so editing this one file themes the whole
  app. Theme choice is persisted in `localStorage` (`gn-theme`).

---

## 6. AI Assistant (Groq)

### 6.1 Configuration
Set these in `server/.env`:
```
GROQ_API_KEY=<your key>
GROQ_MODEL=llama-3.3-70b-versatile   # optional
```
The key is read only server-side and never exposed to the client or logs.

### 6.2 Behavior
- Uses the OpenAI-compatible Groq chat endpoint.
- 30-second request timeout.
- Handles rate limits (429) and timeouts with friendly messages.
- Supports full conversation history and the active UI language.

### 6.3 Verify the integration
```bash
curl -X POST http://localhost:5000/api/ai/test \
  -H "Content-Type: application/json" \
  -d '{"question":"Hello"}'
```

---

## 7. Security Notes

- Passwords are **hashed** with `bcryptjs` (never stored plaintext).
- JWT tokens expire after **30 days**.
- AI API key is server-side only.
- `.env` files are git-ignored.
- Uploaded files are validated (must be `.pdf`, ≤ 5 MB).

---

## 8. Troubleshooting

### Q: The server prints `GROQ_API_KEY is not configured`
The AI feature needs a key. The rest of the app still works. Add
`GROQ_API_KEY` to `server/.env` and restart.

### Q: `MongoDB Connected` never appears
MongoDB isn't running or `MONGO_URI` is wrong.
- Start MongoDB (or use Atlas).
- Verify `MONGO_URI` in `server/.env`.

### Q: Browser shows CORS errors
The `CLIENT_URL` in `server/.env` doesn't match the Vite port.
Set it to the exact dev origin (e.g. `http://localhost:5173`).

### Q: `npm: ENOENT ... package.json`
You ran a command from the wrong folder. Always `cd` into `client/` or
`server/` first — there is no root `package.json`.

### Q: Instruction sheet modal shows "unavailable"
- The sheet may not be seeded. Run `npm run seed` in `server/`.
- Check the backend is running and the route matches the service slugs.

### Q: AI Assistant times out / fails
- Verify `GROQ_API_KEY`.
- Check for rate limiting (429) — retry shortly.
- Confirm network access to `api.groq.com`.

---

## 9. Deployment Checklist

Before deploying:

1. Set production `MONGO_URI`, `JWT_SECRET`, `GROQ_API_KEY`, `CLIENT_URL`.
2. `cd client && npm run build` to produce `client/dist`.
3. Serve `client/dist` statically (Nginx/Vercel/Netlify) and proxy `/api` to the
   Express server.
4. Run the seed scripts against the production database.
5. Verify HTTPS is configured in production.
