// client/src/pages/GNDivisionList.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import Header from "../components/Header";
import api from "../api/axios";
import "./GNDivisionList.css";

// Fetches provinces (with their districts) from GET /api/locations.
// The province dropdown lists all provinces, and the district dropdown
// is filtered based on the currently selected province.
function GNDivisionList() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [gnDivision, setGnDivision] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const { data } = await api.get("/locations");
        setLocations(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load locations");
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  // Reset the district whenever the selected province changes.
  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
    setDistrict("");
  };

// Reset the GN division whenever the selected district changes.
  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setGnDivision("");
  };

  const selectedProvince = locations.find((loc) => loc.name === province);
  const districts = selectedProvince ? selectedProvince.districts : [];

  // The selected district's nested GN divisions (districts are objects now).
  const selectedDistrictData = districts.find((d) => d.name === district);
  const divisions = selectedDistrictData ? selectedDistrictData.divisions : [];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/grama-niladhari/details", {
      state: { province, district, gnDivision, searchTerm },
    });
  };

  return (
    <div className="gn-page">
      <Header
        title={t("gnList.title")}
        crumbs={[{ label: t("dashboard.title"), to: "/dashboard" }, { label: t("gnList.title") }]}
        showBack
      />

      <div className="gn-page-body gn-gnlist-body">
        <div className="gn-search-row">
          <Search size={18} className="gn-search-icon" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("common.search")}
            className="gn-search-input"
          />
        </div>

        <h2 className="gn-browse-heading font-display">{t("gnList.browseHeading")}</h2>

        {loading && <p className="gn-list-status">Loading locations…</p>}
        {error && <p className="gn-list-status gn-list-error">{error}</p>}

        {!loading && !error && (
          <form className="gn-filter-form" onSubmit={handleSearch}>
            <label className="gn-filter-row">
              <span>{t("gnList.province")}</span>
              <select value={province} onChange={handleProvinceChange}>
                <option value="">—</option>
                {locations.map((p) => (
                  <option key={p._id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </label>

<label className="gn-filter-row">
              <span>{t("gnList.district")}</span>
              <select value={district} onChange={handleDistrictChange}>
                <option value="">—</option>
                {districts.map((d) => (
                  <option key={d.name} value={d.name}>{d.name}</option>
                ))}
              </select>
            </label>

            <label className="gn-filter-row">
              <span>{t("gnList.gnDivision")}</span>
              <select value={gnDivision} onChange={(e) => setGnDivision(e.target.value)}>
                <option value="">—</option>
                {divisions.map((g) => (
                  <option key={g._id || g.code} value={g.name}>{g.name}</option>
                ))}
              </select>
            </label>

            <button type="submit" className="gn-search-submit">{t("common.search")}</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default GNDivisionList;
