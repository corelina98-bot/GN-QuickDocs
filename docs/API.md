# GN QuickDocs — API Reference

This document describes every REST endpoint exposed by the backend
(`server/`). The base URL is `http://localhost:5000/api` (configurable via
`VITE_API_URL` on the client and `PORT` on the server).

---

## Authentication

Two endpoints manage users. Successful auth returns a **JWT token** that must be
sent as an `Authorization: Bearer <token>` header for protected routes.

### POST /api/auth/register
Registers a new user.

**Request body (JSON):**
```json
{
  "name": "Kamal Perera",
  "email": "kamal@example.com",
  "password": "secret123"
}
```

**Response `201 Created`:**
```json
{
  "_id": "64f0...",
  "name": "Kamal Perera",
  "email": "kamal@example.com",
  "token": "eyJhbGciOi..."
}
```
Returns `400` if the email is already registered.

---

### POST /api/auth/login
Logs in an existing user.

**Request body (JSON):**
```json
{
  "email": "kamal@example.com",
  "password": "secret123"
}
```

**Response `200 OK`:** same shape as register (includes `token`).
Returns `401` on invalid credentials.

---

## Protected Routes

The following routes require a valid JWT:
```
Authorization: Bearer <token>
```

### Documents (`/api/documents`)
User-authored documents. All CRUD operations are scoped to the authenticated
user.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/documents` | Create a document |
| GET | `/api/documents` | List the user's documents (newest first) |
| PUT | `/api/documents/:id` | Update a document |
| DELETE | `/api/documents/:id` | Delete a document |

**Create/Update body:**
```json
{
  "title": "My Certificate Notes",
  "content": "Optional content",
  "language": "en"
}
```

---

## Public Routes

### AI Assistant (`/api/ai`)

#### POST /api/ai/generate
Generates AI content via **Groq**. Public (no auth).

**Request body (JSON):**
```json
{
  "messages": [
    { "role": "user", "content": "What documents do I need for a residence certificate?" }
  ],
  "language": "en"
}
```
> `messages` is the full conversation history (keeps context). A single `prompt`
> field is also accepted for backward compatibility.

**Response `200 OK`:**
```json
{
  "result": "You will need your NIC, Householder Register, ..."
}
```
Possible errors: `429` (rate limited), `500` (missing key), timeout after 30s.

#### POST /api/ai/test
Provider-neutral smoke-test endpoint.

**Request body (JSON):**
```json
{ "question": "Hello" }
```

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Hello! How can I assist you?"
}
```

---

### Locations (`/api/locations`)

#### GET /api/locations
Returns all provinces, each with its embedded districts and (where present)
GN divisions. Sorted alphabetically by English name.

**Response `200 OK`:** array of locations:
```json
[
  {
    "_id": "64f0...",
    "name": { "en": "Western", "si": "බස්නාහිර", "ta": "மேற்கு" },
    "districts": [
      {
        "name": { "en": "Colombo", "si": "කොළඹ", "ta": "கொழும்பு" },
        "divisions": [ { "code": "005", "name": { "en": "Sammantranapura", "si": "...", "ta": "..." } } ]
      }
    ]
  }
]
```

---

### Instruction Sheets (`/api/services`)

#### GET /api/services/:serviceCategory/:subServiceSlug/instruction-sheet
**Public.** Streams an instruction-sheet PDF for a service within a category.
The PDF binary is read from **GridFS** and returned with
`Content-Type: application/pdf`.

**Example:**
```
GET /api/services/identity-verification-certificates/residence-certificate/instruction-sheet
```

**Response `200 OK`:** PDF stream (inline; supports download via
`Content-Disposition`).
Returns `404` if the sheet does not exist.

---

#### POST /api/services/instruction-sheets
**Authenticated.** Uploads or replaces an instruction-sheet PDF.

**Multipart form-data:**
- `file` — the PDF file (required, max **5 MB**, must be `.pdf`)
- `service` — service slug (required)
- `serviceCategory` — category slug (required)
- `description` — optional note

If a sheet already exists for the same `service`, it is **replaced** (old GridFS
file deleted) rather than duplicated.

**Response `201 Created`:** the created `InstructionSheet` metadata record.
Returns `400` for missing file / invalid type / too large.

---

#### DELETE /api/services/instruction-sheets/:id
**Authenticated.** Deletes an instruction sheet by its metadata `id` (also
removes the GridFS binary).

**Response `200 OK`:** `{ "message": "Instruction sheet deleted" }`
Returns `404` if not found.

---

## Instruction Sheet Metadata Fields

The `InstructionSheet` model stores metadata (the binary lives in GridFS):

| Field | Type | Description |
|-------|------|-------------|
| `filename` | String | Stable GridFS filename (unique) |
| `originalName` | String | Human-friendly original name |
| `contentType` | String | e.g. `application/pdf` |
| `service` | String | Service slug (e.g. `residence-certificate`) |
| `serviceCategory` | String | Category slug |
| `description` | String | Optional note |
| `fileSize` | Number | PDF size in bytes |
| `fileId` | ObjectId | GridFS file id |

---

## Error Format

Unless noted, errors follow the shape:
```json
{
  "message": "Human-readable error description"
}
```

Common status codes:
- `400` — bad request / validation failure
- `401` — missing or invalid token / bad credentials
- `404` — resource not found
- `500` — server error
