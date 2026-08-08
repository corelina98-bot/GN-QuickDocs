import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";

dotenv.config();
connectDB();

// Validate that the Groq API key is configured before starting.
// We log a clear, helpful message but do not crash with an unclear error.
if (!process.env.GROQ_API_KEY) {
  console.error(
    "GROQ_API_KEY is not configured. Add it to server/.env and restart the server."
  );
}

const app = express();

// Allow requests from the configured CLIENT_URL as well as any
// localhost-based dev origin (Vite can pick a different port, e.g. 5173/5174).
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser requests (curl, tests) and known local origins.
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(null, false);
    },
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/locations", locationRoutes);

app.get("/", (req, res) => res.send("GN QuickDocs API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
