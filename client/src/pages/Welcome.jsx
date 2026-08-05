// client/src/pages/Welcome.jsx
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="gn-welcome" onClick={() => navigate("/dashboard")} role="button" tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && navigate("/dashboard")}
      aria-label="Enter GN QuickDocs">

      <div className="gn-welcome-bg" aria-hidden="true">
        <span className="gn-drift gn-drift-1" />
        <span className="gn-drift gn-drift-2" />
        <span className="gn-drift gn-drift-3" />
        <span className="gn-drift gn-drift-4" />
      </div>

<div className="gn-welcome-content">
        <div className="gn-welcome-logo">
          <div className="gn-welcome-logo-circle">
            <span className="gn-welcome-logo-text">GN</span>
            <span className="gn-welcome-logo-sub">QUICKDOCS</span>
          </div>
        </div>
        <h1 className="gn-welcome-title font-display">WELCOME</h1>
        <p className="gn-welcome-hint">Tap anywhere to begin</p>
      </div>
    </div>
  );
}

export default Welcome;
