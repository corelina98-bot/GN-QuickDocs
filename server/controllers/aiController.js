// server/controllers/aiController.js
import OpenAI from "openai";

let openai;

// Created lazily (on first request) instead of at import time, so it never
// runs before dotenv.config() has loaded your .env file.
function getOpenAIClient() {
  if (!openai) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
}

export const generateContent = async (req, res) => {
  const { prompt, language } = req.body;
  try {
    const client = getOpenAIClient();
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a writing assistant. Respond in ${language || "English"}.`,
        },
        { role: "user", content: prompt },
      ],
    });
    res.json({ result: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ message: "AI request failed", error: error.message });
  }
};