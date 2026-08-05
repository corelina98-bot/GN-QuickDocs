// client/src/components/ServiceCard.jsx
import { Link } from "react-router-dom";
import "./ServiceCard.css";

/**
 * A single tappable card with an icon and label, centered and stacked
 * (icon above label) to match every card in the GN QuickDocs mockups —
 * the Dashboard's "Grama Niladhari" / "Services" tiles, the Services grid,
 * and every category's sub-service grid.
 *
 * Props:
 * - icon: a lucide-react icon component (already imported by the parent)
 * - label: string
 * - to: route to navigate to on click
 * - size: "md" (default, used in grids) | "lg" (used for the two big
 *         Dashboard hero tiles seen in IMG1/IMG2)
 */
function ServiceCard({ icon: Icon, label, to, size = "md" }) {
  return (
    <Link to={to} className={`gn-service-card gn-service-card--${size}`}>
      <span className="gn-service-icon">
        <Icon size={size === "lg" ? 36 : 24} strokeWidth={1.5} />
      </span>
      <span className="gn-service-label font-display">{label}</span>
    </Link>
  );
}

export default ServiceCard;
