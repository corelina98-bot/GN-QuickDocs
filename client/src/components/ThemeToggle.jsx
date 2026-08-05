// client/src/components/ThemeToggle.jsx
import { Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import "./ThemeToggle.css";

/**
 * Dark/Light mode switch — matches the "🌙 ⚪ Dark" toggle shown top-left
 * in the GN QuickDocs dashboard mockups (IMG1 = light, IMG2 = dark).
 *
 * Props:
 * - compact: renders an icon-only version for use in the smaller sub-page
 *            header bars, instead of the full "Dark"/"Light" labelled switch.
 */
function ThemeToggle({ compact = false }) {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={`gn-theme-toggle ${compact ? "gn-theme-toggle--compact" : ""}`}
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Moon size={compact ? 13 : 15} className="gn-theme-icon-moon" />
      <span className={`gn-theme-track ${isDark ? "is-dark" : ""}`}>
        <span className="gn-theme-thumb" />
      </span>
      {!compact && <span className="gn-theme-label">{theme === "dark" ? "Dark" : "Light"}</span>}
    </button>
  );
}

export default ThemeToggle;
