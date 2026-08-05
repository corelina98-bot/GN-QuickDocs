// Uses Google's Gemini API via the official @google/genai SDK.
import { GoogleGenAI } from "@google/genai";

// Models to try in order. gemini-2.0-flash is the primary; fallbacks are
// here in case a model is deprecated or unavailable on the configured account.
const MODEL_ORDER = ["gemini-2.0-flash", "gemini-2.5-flash"];

export const generateContent = async (req, res) => {
  const { prompt, language } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res
      .status(500)
      .json({ message: "GEMINI_API_KEY is not configured on the server" });
  }

  const systemInstruction = `You are a helpful writing assistant for GN QuickDocs, a platform helping citizens access Grama Niladhari (GN) services. Respond clearly and concisely in ${
    language || "English"
  }.`;

  const ai = new GoogleGenAI({ apiKey });

  let lastError = null;

  // Try each model until one succeeds.
  for (const model of MODEL_ORDER) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          systemInstruction,
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      });

      const text = response?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text)
        .join("")
        .trim();

      if (!text) {
        lastError = new Error("AI returned no content");
        continue;
      }

      return res.json({ result: text, model });
    } catch (err) {
      lastError = err;
      console.error(`AI request failed for model "${model}":`, err.message);
    }
  }

  // All models failed. Inspect the error to give a helpful message.
  const status = lastError?.status || lastError?.cause?.status || 500;
  const message = lastError?.message || "AI request failed";

  // Quota exceeded (429) and auth/token issues (401/403) are configuration
  // problems the user can resolve — surface them clearly.
  if (status === 429) {
    return res.status(503).json({
      message:
        "The AI service is temporarily out of quota. Please add a valid GEMINI_API_KEY (starting with AIza) with available quota, or check your billing.",
      error: message,
    });
  }

  if (status === 400 || status === 401 || status === 403) {
    return res.status(502).json({
      message:
        "The AI service rejected the request. Please verify your GEMINI_API_KEY is valid and has access to the Gemini API.",
      error: message,
    });
  }

  return res
    .status(500)
    .json({ message: "AI request failed", error: message });
};
