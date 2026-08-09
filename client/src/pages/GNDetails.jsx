// client/src/pages/GNDetails.jsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MapPin } from "lucide-react";
import Header from "../components/Header";
import LocationModal from "../components/LocationModal";
import "./GNDetails.css";

function GNDetails() {
  const { t } = useTranslation();
  const [showMap, setShowMap] = useState(false);

  // Read-only display fields for now — wire these to a real GET /api/gn/:id
  // once the backend endpoint for a specific GN officer's record exists.
  const [details] = useState({
    name: "",
    contactNo: "",
    address: "",
    availableDates: "",
    // Placeholder coordinates — replace with the real GN office location.
    lat: 6.9271,
    lng: 79.8612,
  });

  return (
    <div className="gn-page">
      <Header
        title={t("gnDetails.title")}
        crumbs={[
          { label: t("dashboard.title"), to: "/dashboard" },
          { label: t("gnList.title"), to: "/grama-niladhari" },
          { label: t("gnDetails.title") },
        ]}
        showBack
      />

      <div className="gn-page-body gn-gndetails-body">
        <div className="gn-details-form">
          <div className="gn-details-row">
            <span className="gn-details-label">{t("gnDetails.name")}</span>
            <span>:</span>
            <input type="text" value={details.name} readOnly />
          </div>
          <div className="gn-details-row">
            <span className="gn-details-label">{t("gnDetails.contactNo")}</span>
            <span>:</span>
            <input type="text" value={details.contactNo} readOnly />
          </div>
          <div className="gn-details-row">
            <span className="gn-details-label">{t("gnDetails.address")}</span>
            <span>:</span>
            <input type="text" value={details.address} readOnly />
          </div>
          <div className="gn-details-row">
            <span className="gn-details-label">{t("gnDetails.availableDates")}</span>
            <span>:</span>
            <input type="text" value={details.availableDates} readOnly />
          </div>

          <button className="gn-location-btn" onClick={() => setShowMap(true)}>
            <MapPin size={16} />
            {t("gnDetails.viewLocation")}
          </button>
        </div>
      </div>

      {showMap && (
        <LocationModal
          lat={details.lat}
          lng={details.lng}
          onClose={() => setShowMap(false)}
        />
      )}
    </div>
  );
}

export default GNDetails;
