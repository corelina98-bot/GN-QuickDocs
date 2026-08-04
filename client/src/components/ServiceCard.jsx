// client/src/components/ServiceCard.jsx
import { Link } from "react-router-dom";
import "./ServiceCard.css";

/**
 * A single tappable card with an icon and label.
 * Used for: Dashboard's "Grama Niladhari" / "Services" tiles,
 * the Services grid, and every category's sub-service grid.
 *
 * Props:
 * - icon: a lucide-react icon component (already imported by the parent)
 * - label: string
 * - to: route to navigate to on click
 */
function ServiceCard({ icon: Icon, label, to }) {
  return (
    <Link to={to} className="gn-service-card">
      <span className="gn-service-icon">
        <Icon size={26} strokeWidth={1.6} />
      </span>
      <span className="gn-service-label">{label}</span>
    </Link>
  );
}

export default ServiceCard;
