// client/src/pages/AIAssistant.jsx
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUp } from "lucide-react";
import api from "../api/axios";
import Header from "../components/Header";
import "./AIAssistant.css";

function AIAssistant() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const initialQuestion = location.state?.question ?? "";

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);

  // Send a message (appends the user message, then calls the API with full history).
  const sendMessage = async (text) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMessage = { role: "user", content };
    const updated = [...messages, userMessage];
    setMessages(updated);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/ai/generate", {
        // Send the full conversation history so the AI keeps context.
        messages: updated,
        language: i18n.language,
      });
      setMessages((prev) => [...prev, { role: "assistant", content: res.data.result }]);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  // Auto-send the question carried over from the Dashboard on first mount.
  useEffect(() => {
    if (initialQuestion) {
      sendMessage(initialQuestion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll to the latest message whenever the conversation updates.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, error]);

  return (
    <div className="gn-page gn-ai-page">
      <Header
        title={t("aiAssistant.title")}
        crumbs={[{ label: t("dashboard.title"), to: "/dashboard" }, { label: t("aiAssistant.title") }]}
        showBack
      />

      <div className="gn-ai-body">
        <div className="gn-ai-conversation">
          {messages.length === 0 && !loading && (
            <div className="gn-ai-start font-display">{t("aiAssistant.startPrompt")}</div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`gn-chat-row ${msg.role === "user" ? "gn-chat-user" : "gn-chat-assistant"}`}>
              <div className={`gn-chat-bubble font-display ${msg.role === "user" ? "gn-bubble-user" : "gn-bubble-assistant"}`}>
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="gn-chat-row gn-chat-assistant">
              <div className="gn-chat-bubble gn-bubble-assistant gn-ai-loading">
                {t("aiAssistant.thinking")}
              </div>
            </div>
          )}

          {error && (
            <div className="gn-ai-error gn-chat-error">{error}</div>
          )}

          <div ref={bottomRef} />
        </div>

        <form className="gn-chat-input-bar" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("aiAssistant.placeholder")}
            aria-label={t("aiAssistant.placeholder")}
            disabled={loading}
          />
          <button
            type="submit"
            className="gn-ai-icon-btn gn-ai-send"
            aria-label={t("aiAssistant.send")}
            disabled={loading || !input.trim()}
          >
            <ArrowUp size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default AIAssistant;
