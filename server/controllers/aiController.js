// server/controllers/aiController.js
// Groq is the only supported AI provider.
// The API key is read only from process.env.GROQ_API_KEY and is never
// exposed to the frontend, logs, or error messages.

const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "llama-3.3-70b-versatile";

// Created lazily (on first request) instead of at import time, so it never
// runs before dotenv.config() has loaded your .env file.
function getGroqConfig() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    const error = new Error(
      "GROQ_API_KEY is not configured. Add it to server/.env and restart the server."
    );
    error.status = 500;
    throw error;
  }
  return {
    apiKey,
    model: process.env.GROQ_MODEL || DEFAULT_MODEL,
  };
}

async function callGroq({ messages, language }) {
  const { apiKey, model } = getGroqConfig();

  // 30s timeout so a slow response does not hang the request.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(GROQ_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: `You are a writing assistant. Respond in ${language || "English"}.`,
          },
          ...messages,
        ],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      let detail = "";
      try {
        const body = await response.json();
        detail = body?.error?.message || "";
      } catch {
        // ignore body parse errors
      }
      if (response.status === 429) {
        throw new Error("AI service is rate limited. Please try again shortly.");
      }
      throw new Error(`AI request failed with status ${response.status}${detail ? `: ${detail}` : ""}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("AI service returned an invalid response.");
    }
    return content;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("AI request timed out. Please try again.");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export const generateContent = async (req, res) => {
  const { prompt, messages, language } = req.body;
  try {
    // Prefer an explicit conversation history; fall back to a single prompt
    // for backward compatibility with the Dashboard initial question.
    const history = Array.isArray(messages) && messages.length
      ? messages
      : [{ role: "user", content: prompt }];
    const content = await callGroq({ messages: history, language });
    res.json({ result: content });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

// Provider-neutral test endpoint used to verify the Groq integration.
// Accepts { question: "Hello" } and returns { success, message }.
export const testAI = async (req, res) => {
  const { question } = req.body;
  try {
    const content = await callGroq({ messages: [{ role: "user", content: question || "Hello" }], language: "English" });
    res.json({ success: true, message: content });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ success: false, message: error.message });
  }
};
