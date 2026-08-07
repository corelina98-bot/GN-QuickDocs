// client/src/pages/Dashboard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserRound, HeartHandshake, Mic, ArrowUp } from "lucide-react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import "./Dashboard.css";

function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleAsk = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    // AI Assistant screen reads the question via router state
    navigate("/ai-assistant", { state: { question: query } });
  };

  const handleVoice = () => {
    // Hook up the Web Speech API (SpeechRecognition) here.
    // Kept as a stub so the button is wired but non-blocking to build the rest of the app.
    console.log("Voice input not yet implemented");
  };

  return (
    <div className="gn-page">
      <Header title={t("dashboard.title")} variant="hero" />

      <div className="gn-page-body gn-dashboard-body">
        <div className="gn-dashboard-tiles">
          <ServiceCard
            size="lg"
            icon={UserRound}
            label={t("dashboard.gramaNiladhari")}
            to="/grama-niladhari"
          />
          <ServiceCard
            size="lg"
            icon={HeartHandshake}
            label={t("dashboard.services")}
            to="/services"
          />
        </div>

        <div className="gn-ai-block">
          <p className="gn-ai-prompt font-display">{t("dashboard.whatDoYouWantToKnow")}</p>
          <form className="gn-ai-bar" onSubmit={handleAsk}>
            <button type="button" className="gn-ai-icon-btn" onClick={handleVoice} aria-label="Ask by voice">
              <Mic size={18} />
            </button>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("dashboard.askAnything")}
              aria-label={t("dashboard.askAnything")}
            />
            <button type="submit" className="gn-ai-icon-btn gn-ai-send" aria-label="Send question">
              <ArrowUp size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

