import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateContent = async (req, res) => {
  const { prompt, language } = req.body;
  try {
    const completion = await openai.chat.completions.create({
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