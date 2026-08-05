// client/src/pages/AIAssistant.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../api/axios";
import Header from "../components/Header";
import "./AIAssistant.css";

function AIAssistant() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const question = location.state?.question ?? "";

  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!question) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError("");
    setAnswer("");

    api
      .post("/ai/generate", { prompt: question, language: i18n.language })
      .then((res) => {
        if (!cancelled) setAnswer(res.data.result || "");
      })
      .catch((err) => {
        if (cancelled) return;
        if (err.response?.status === 429) {
          setError(
            "The AI service is busy right now. Please wait a moment and try again."
          );
        } else {
          setError(
            err.response?.data?.message ||
              "Something went wrong. Please try again."
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [question, i18n.language]);

  return (
    <div className="gn-page">
      <Header
        title={t("aiAssistant.title")}
        crumbs={[
          { label: t("dashboard.title"), to: "/dashboard" },
          { label: t("aiAssistant.title") },
        ]}
        showBack
      />

      <div className="gn-page-body">
        <div className="gn-ai-problem font-display">
          {question || t("aiAssistant.noQuestion")}
        </div>

        <div className="gn-ai-answer font-display">
          {loading && <span className="gn-ai-loading">{t("aiAssistant.thinking")}</span>}
          {error && <span className="gn-ai-error">{error}</span>}
          {!loading && !error && answer}
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;
