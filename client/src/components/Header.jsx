// client/src/components/Header.jsx
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, ArrowLeft } from "lucide-react";
import "./Header.css";

/**
 * Shared header used on every screen after the splash page.
 *
 * Props:
 * - title: string shown large in the header bar (e.g. "Dashboard", "Services")
 * - crumbs: [{ label, to }] — rendered as "Dashboard > Services > Civil Registration"
 *           the LAST crumb is shown as plain text (current page), the rest are links
 * - showBack: boolean — shows a back arrow above the crumb row (used on detail screens)
 * - onBack: function — called when the back arrow is clicked (defaults to browser back)
 */
function Header({ title, crumbs = [], showBack = false, onBack }) {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", label: "EN" },
    { code: "si", label: "SI" },
    { code: "ta", label: "TA" },
  ];

  return (
    <div className="gn-header-wrap">
      <div className="gn-header-bar">
        <Link to="/dashboard" className="gn-logo" aria-label="Go to dashboard">
          <span className="gn-logo-circle">
            <span className="gn-logo-text">GN</span>
          </span>
        </Link>

        <h1 className="gn-header-title font-display">{title}</h1>

        <button
          className="gn-menu-btn"
          aria-label="Open menu"
          onClick={() => { /* wire up a drawer/menu here later */ }}
        >
          <Menu size={22} />
        </button>
      </div>

      <div className="gn-subbar">
        {showBack && (
          <button
            className="gn-back-btn"
            onClick={onBack ?? (() => window.history.back())}
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
          </button>
        )}

        <nav className="gn-breadcrumb" aria-label="Breadcrumb">
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <span key={crumb.label}>
                {i > 0 && <span className="gn-crumb-sep"> &gt; </span>}
                {isLast || !crumb.to ? (
                  <span className="gn-crumb-current">{crumb.label}</span>
                ) : (
                  <Link to={crumb.to} className="gn-crumb-link">{crumb.label}</Link>
                )}
              </span>
            );
          })}
        </nav>

        <div className="gn-lang-switch" role="group" aria-label="Select language">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`gn-lang-btn ${i18n.language === lang.code ? "active" : ""}`}
              onClick={() => i18n.changeLanguage(lang.code)}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
