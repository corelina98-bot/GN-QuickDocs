// client/src/components/LocationModal.jsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { X, Plus, Minus, RotateCcw } from "lucide-react";
import "./LocationModal.css";

/**
 * Simple map popup. Uses an embedded Google Maps iframe (no API key needed
 * for basic embeds), so it works immediately. Swap for @react-google-maps/api
 * or Leaflet later if you need markers/interactivity beyond a static embed.
 *
 * The popup also exposes map size controls (+ enlarge, - shrink, restore)
 * so users can increase or reduce the map size from its default.
 */
// Clamp the default map width so it never exceeds the viewport on mobile.
const DEFAULT_WIDTH = Math.min(420, (typeof window !== "undefined" ? window.innerWidth : 420) - 48);
const DEFAULT_HEIGHT = 320;
const MIN_WIDTH = 260;
const MAX_WIDTH = 960;
const STEP = 60;

function LocationModal({ lat, lng, onClose }) {
  const { t } = useTranslation();
  const mapSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  const [size, setSize] = useState({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });

  const enlarge = () =>
    setSize((s) => ({ width: Math.min(s.width + STEP, MAX_WIDTH), height: s.height + STEP * 0.75 }));

  const shrink = () =>
    setSize((s) => ({ width: Math.max(s.width - STEP, MIN_WIDTH), height: Math.max(s.height - STEP * 0.75, 160) }));

  const restore = () => setSize({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });

  return (
    <div className="gn-modal-backdrop" onClick={onClose}>
      <div className="gn-location-modal" onClick={(e) => e.stopPropagation()}>
        <div className="gn-location-modal-header">
          <span className="font-display">{t("gnDetails.locationTitle")}</span>

          <div className="gn-map-controls">
            <button onClick={shrink} aria-label="Reduce map size" className="gn-map-ctrl-btn" title="Reduce map size">
              <Minus size={16} />
            </button>
            <button onClick={enlarge} aria-label="Increase map size" className="gn-map-ctrl-btn" title="Increase map size">
              <Plus size={16} />
            </button>
            <button onClick={restore} aria-label="Restore default map size" className="gn-map-ctrl-btn" title="Restore default size">
              <RotateCcw size={16} />
            </button>
            <button onClick={onClose} aria-label="Close map" className="gn-modal-x">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="gn-location-map-frame" style={{ width: size.width }}>
          <iframe
            title="GN office location"
            src={mapSrc}
            width="100%"
            height={size.height}
            style={{ border: 0, borderRadius: "8px" }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default LocationModal;
