// client/src/pages/GNDetails.jsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { MapPin } from "lucide-react";
import Header from "../components/Header";
import LocationModal from "../components/LocationModal";
import "./GNDetails.css";

function GNDetails() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [showMap, setShowMap] = useState(false);

  // Read the selected GN division's officer data passed from the list page.
  const { officerName = "", contactNo = "" } = location.state || {};

  // Officer name is a multilingual object ({ en, si, ta }); pick the active
  // language, falling back to English.
  const localizedOfficerName =
    officerName && typeof officerName === "object"
      ? officerName[i18n.language] || officerName.en || ""
      : officerName;

  const [details] = useState({
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
<input type="text" value={localizedOfficerName} readOnly />
          </div>
<div className="gn-details-row">
            <span className="gn-details-label">{t("gnDetails.contactNo")}</span>
            <span>:</span>
            <input type="text" value={contactNo} readOnly />
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
