# GN QuickDocs

### AI-Powered Digital Assistant for Grama Niladhari Services

GN QuickDocs is a centralized digital platform designed to help Sri Lankan citizens quickly understand and access **Grama Niladhari (GN) services**. The platform provides information about government-related services, required documents, service procedures, GN division details, and an AI-powered assistant.

The system is designed with **Sinhala, Tamil, and English** language support to make government service information more accessible to citizens.

---

## 📌 Table of Contents

* [About the Project](#-about-the-project)
* [Problem](#-problem)
* [Objectives](#-objectives)
* [Key Features](#-key-features)
* [AI Assistant](#-ai-assistant)
* [Multilingual Support](#-multilingual-support)
* [Technology Stack](#-technology-stack)
* [System Architecture](#-system-architecture)
* [Project Structure](#-project-structure)
* [Installation](#-installation)
* [Environment Variables](#-environment-variables)
* [Running the Project](#-running-the-project)
* [API Endpoints](#-api-endpoints)
* [Database](#-database)
* [Future Enhancements](#-future-enhancements)
* [Project Team](#-project-team)

---

## 🌐 About the Project

GN QuickDocs aims to simplify access to information about Grama Niladhari services by providing citizens with a single digital platform.

Instead of searching through different sources or visiting a GN office just to find out which documents are required, users can browse available services, select a specific service, view its document checklist, and ask the AI assistant questions.

The application follows a **MERN-based architecture** with a React/Vite frontend and an Express/Node.js backend connected to MongoDB.

---

## ❗ Problem

Citizens may face difficulties when accessing government and Grama Niladhari services because:

* Information about services can be difficult to find.
* Required documents may not be clearly understood.
* Citizens may need to visit GN offices multiple times.
* Government information may be available in formats that are difficult for some users to understand.
* Language barriers can make accessing information more difficult.
* Citizens may not know which GN division or service is relevant to them.

GN QuickDocs addresses these challenges by bringing important service information into one accessible platform.

---

## 🎯 Objectives

The main objectives of GN QuickDocs are to:

* Provide centralized information about GN services.
* Display required documents for individual services.
* Help citizens understand government service procedures.
* Provide an AI-powered assistant for questions related to services.
* Support Sinhala, Tamil, and English.
* Provide GN division information and office location details.
* Reduce unnecessary visits to GN offices.
* Improve accessibility to government service information.
* Provide a simple and user-friendly digital experience.

---

## ✨ Key Features

### 👤 User Authentication

Users can:

* Register an account.
* Log in securely.
* Access authenticated services.
* Manage their documents.

Authentication is implemented using:

* JWT
* bcryptjs
* Express middleware

Passwords are securely hashed before being stored in the database.

---

### 🏛️ Grama Niladhari Services

Users can browse available GN-related services through categorized service cards.

Current service categories include:

* Civil Registrations
* Payment of Pensions
* Samurdhi Program
* Issuance of Permit
* Land Administration
* Procurements
* Issuing of Certificate
* Social Welfare
* Fill Progress Form

Service information is maintained through a centralized service data structure, allowing additional services to be added without creating completely new components.

---

### 📋 Document Checklist

Users can select a service and view the documents required for that service.

Example categories include:

#### Civil Registrations

* Registration of Past Births
* Providing Report on Death Persons
* Issuing of Character/Resident Certificate
* Certifying Identity Card Applications

#### Payment of Pensions

* For New Pensioners
* For Ongoing Pension Payments
* For Change of Address or Bank
* For Restoration or Resumption of Pension
* For Nominee / Heirs

The project uses a centralized `servicesData.js` structure for service categories, sub-services, and document checklists.

---

### 🤖 AI Assistant

GN QuickDocs includes an AI Assistant that allows users to ask questions about GN services.

Users can enter a question from the dashboard and receive an AI-generated response.

The frontend sends the question to:

```text
POST /api/ai/generate
```

The backend communicates with the AI provider so that the API key is not exposed to the frontend.

The current implementation uses OpenAI's API as an example, with the ability to use another AI provider such as Gemini if required.

---

### 🌍 Multilingual Support

GN QuickDocs supports three languages:

| Language     | Code |
| ------------ | ---- |
| 🇬🇧 English | `en` |
| 🇱🇰 Sinhala | `si` |
| 🇱🇰 Tamil   | `ta` |

The application uses:

* `i18next`
* `react-i18next`
* `i18next-browser-languagedetector`

The interface includes a language switcher allowing users to change between English, Sinhala, and Tamil.

---

### 📍 GN Division Information

The application provides a section for browsing Grama Niladhari divisions.

Users can access information such as:

* Province
* District
* GN Division
* GN officer name
* Contact number
* Email
* Available dates
* Office location

The application also includes a map modal for displaying GN office locations.

---

### 🗺️ Office Location

GN QuickDocs can display GN office locations using an embedded Google Maps interface.

Users can open a location from the GN details page and view the office location on a map.

---

### 📄 Document Management

Authenticated users can create, view, update, and delete documents.

Document information includes:

* Document title
* Content
* Language
* User ownership
* Created date
* Updated date

---

## 🧠 AI Assistant Architecture

The AI functionality follows a backend-proxy approach.

```text
┌─────────────────────┐
│      React UI       │
│     Dashboard       │
└──────────┬──────────┘
           │
           │ User Question
           ▼
┌─────────────────────┐
│   Express Backend   │
│   /api/ai/generate  │
└──────────┬──────────┘
           │
           │ API Request
           ▼
┌─────────────────────┐
│     AI Provider     │
│ OpenAI / Gemini etc.│
└──────────┬──────────┘
           │
           │ AI Response
           ▼
┌─────────────────────┐
│    React UI         │
│   Display Answer    │
└─────────────────────┘
```

The API key remains on the backend and is stored in the server environment variables rather than being exposed to the frontend.

---

## 🛠️ Technology Stack

### Frontend

* React
* Vite
* JavaScript
* React Router
* Axios
* i18next
* React-i18next
* Lucide React
* CSS

The current frontend uses Vite and React.

### Backend

* Node.js
* Express.js
* Mongoose
* JWT
* bcryptjs
* CORS
* dotenv
* Nodemon

The backend structure includes authentication, document, and AI routes/controllers.

### Database

* MongoDB
* MongoDB Atlas
* Mongoose

### AI

* OpenAI API
* GPT-based AI assistant
* Backend-proxied AI requests

### Maps

* Google Maps Embed

---

## 🏗️ System Architecture

GN QuickDocs follows a three-layer architecture:

```text
                 ┌───────────────────────┐
                 │       FRONTEND        │
                 │     React + Vite      │
                 │                       │
                 │ Dashboard             │
                 │ Services              │
                 │ AI Assistant          │
                 │ GN Details            │
                 │ Document Checklist    │
                 └───────────┬───────────┘
                             │
                         REST API
                             │
                 ┌───────────▼───────────┐
                 │        BACKEND        │
                 │ Node.js + Express.js  │
                 │                       │
                 │ Authentication        │
                 │ Documents             │
                 │ AI Integration        │
                 │ Middleware            │
                 └───────────┬───────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
       ┌────────▼────────┐      ┌────────▼────────┐
       │    MongoDB      │      │   AI Provider   │
       │    Database     │      │ OpenAI / Gemini │
       └─────────────────┘      └─────────────────┘
```

---

## 📁 Project Structure

```text
GN-Quickdocs/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── locales/
│   │   │   ├── en.json
│   │   │   ├── si.json
│   │   │   └── ta.json
│   │   ├── data/
│   │   │   └── servicesData.js
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── styles/
│   │   ├── i18n.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Document.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── documentRoutes.js
│   │   └── aiRoutes.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── documentController.js
│   │   └── aiController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

This follows the monorepo structure defined in the project plan.

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

```bash
cd GN-Quickdocs
```

---

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

The frontend uses packages including Axios, i18next, React, React Router, React-i18next, and Lucide React.

---

### 3. Install Backend Dependencies

Open another terminal:

```bash
cd server
npm install
```

If creating the backend from scratch:

```bash
npm install express mongoose dotenv cors bcryptjs jsonwebtoken openai
npm install -D nodemon
```

---

## 🔐 Environment Variables

### Backend

Create:

```text
server/.env
```

Add:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_long_random_secret

CLIENT_URL=http://localhost:5173

OPENAI_API_KEY=your_ai_api_key
```

> ⚠️ **Important:** Never commit `.env` files or API keys to GitHub.

The project configuration uses environment variables for MongoDB, JWT authentication, frontend CORS configuration, and the AI API key.

---

### Frontend

Create:

```text
client/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

The frontend Axios client uses this environment variable as its API base URL.

---

## ▶️ Running the Project

### Start Backend

```bash
cd server
npm run dev
```

Backend:

```text
http://localhost:5000
```

---

### Start Frontend

Open another terminal:

```bash
cd client
npm run dev
```

Frontend:

```text
http://localhost:5173
```

The Vite development server is configured to run on port `5173`.

---

## 🔌 API Endpoints

### Authentication

#### Register

```http
POST /api/auth/register
```

#### Login

```http
POST /api/auth/login
```

---

### Documents

All document routes require authentication.

#### Create Document

```http
POST /api/documents
```

#### Get User Documents

```http
GET /api/documents
```

#### Update Document

```http
PUT /api/documents/:id
```

#### Delete Document

```http
DELETE /api/documents/:id
```

---

### AI Assistant

#### Generate AI Response

```http
POST /api/ai/generate
```

Example request:

```json
{
  "prompt": "What documents are required for registering a past birth?",
  "language": "en"
}
```

Example response:

```json
{
  "result": "The required documents include..."
}
```

---

## 🗄️ Database

GN QuickDocs uses **MongoDB** as its database and **Mongoose** as the ODM.

### User Collection

The User model contains:

```text
User
├── name
├── email
├── password
├── preferredLanguage
├── createdAt
└── updatedAt
```

### Document Collection

The Document model contains:

```text
Document
├── user
├── title
├── content
├── language
├── createdAt
└── updatedAt
```

Documents are associated with their authenticated users using MongoDB ObjectId references.

---

## 🔒 Security

The project includes several security mechanisms:

* Password hashing using bcryptjs.
* JWT-based authentication.
* Protected API routes.
* Environment variables for sensitive credentials.
* Backend-proxied AI API requests.
* User-specific document access.

JWT middleware verifies authentication tokens before allowing access to protected resources.

---

## 🌍 Multilingual User Interface

GN QuickDocs is designed for Sri Lankan users and provides:

```text
English
   │
   ├── Dashboard
   ├── Services
   ├── AI Assistant
   └── GN Information

Sinhala
   │
   ├── Dashboard
   ├── Services
   ├── AI Assistant
   └── GN Information

Tamil
   │
   ├── Dashboard
   ├── Services
   ├── AI Assistant
   └── GN Information
```

Users can switch languages directly from the application interface.

---

## 🚀 Future Enhancements

Potential future improvements include:

* 🎤 Voice-based AI interaction.
* 🗣️ Sinhala and Tamil voice input.
* 🔊 AI-generated voice responses.
* 📚 RAG-based AI using official Sri Lankan administrative documents.
* 📍 Real-time GN officer availability.
* 📅 Appointment/availability checking.
* 🗺️ Interactive GN division maps.
* 📄 Downloadable government application forms.
* 🖼️ Sample document previews.
* 🔔 Notifications and reminders.
* 📱 Progressive Web App support.
* 🔐 More advanced role-based administration.
* 📊 Administrative analytics dashboard.

## The current project plan specifically identifies voice input as an area that can be connected through the Web Speech API and recommends adding the AI assistant after the core CRUD functionality is working.

## 🧪 Recommended Development Order

The recommended development sequence is:

```text
1. Backend Setup
       ↓
2. Authentication
       ↓
3. Frontend Login/Register
       ↓
4. Document CRUD
       ↓
5. Multilingual Support
       ↓
6. AI Assistant
       ↓
7. Deployment
       ↓
8. End-to-End Testing
```

The project plan recommends testing authentication first, then connecting the frontend, implementing document CRUD, adding i18next, integrating the AI assistant, and finally deploying the backend and frontend.

---

## 🚀 Deployment

The planned deployment architecture is:

```text
              Internet
                  │
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
     Vercel              Render
   React Frontend      Node/Express API
                            │
                            ▼
                       MongoDB Atlas
                            │
                            ▼
                       AI Provider
```

The project plan proposes deploying the frontend using **Vercel** and the backend using **Render**, followed by configuring CORS and environment variables.

---

## 🤝 Contributing

Contributions are welcome.

### Steps

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Commit your changes.

```bash
git add .
git commit -m "Add your feature"
```

5. Push the branch.

```bash
git push origin feature/your-feature
```

6. Create a Pull Request.

---

## 📄 License

This project is developed for educational and project development purposes.

---

## 👩‍💻 Project Team

**GN QuickDocs Development Team**

Sri Lanka 🇱🇰

---

## 💡 Vision

> **Making Grama Niladhari services simpler, faster, and more accessible for every citizen.**

GN QuickDocs aims to bridge the gap between citizens and government services through accessible digital information, multilingual support, and AI-powered assistance.
