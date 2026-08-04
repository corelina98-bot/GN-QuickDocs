// client/src/components/LocationModal.jsx
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import "./LocationModal.css";

/**
 * Simple map popup. Uses an embedded Google Maps iframe (no API key needed
 * for basic embeds), so it works immediately. Swap for @react-google-maps/api
 * or Leaflet later if you need markers/interactivity beyond a static embed.
 */
function LocationModal({ lat, lng, onClose }) {
  const { t } = useTranslation();
  const mapSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <div className="gn-modal-backdrop" onClick={onClose}>
      <div className="gn-location-modal" onClick={(e) => e.stopPropagation()}>
        <div className="gn-location-modal-header">
          <span className="font-display">{t("gnDetails.locationTitle")}</span>
          <button onClick={onClose} aria-label="Close map" className="gn-modal-x">
            <X size={18} />
          </button>
        </div>
        <iframe
          title="GN office location"
          src={mapSrc}
          width="100%"
          height="320"
          style={{ border: 0, borderRadius: "8px" }}
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default LocationModal;
