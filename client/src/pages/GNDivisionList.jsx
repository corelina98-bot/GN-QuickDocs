// client/src/pages/GNDivisionList.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import api from "../api/axios";
import "./GNDivisionList.css";

// Fetches provinces (with their districts) from GET /api/locations.
// The province dropdown lists all provinces, and the district dropdown
// is filtered based on the currently selected province.
// Returns the localized name for a given `name` object ({ en, si, ta })
// based on the currently active language. Falls back to English.
function localize(name, lng) {
  if (!name) return "";
  if (typeof name === "string") return name;
  return name[lng] || name.en || "";
}

function GNDivisionList() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [gnDivision, setGnDivision] = useState("");
  const [formError, setFormError] = useState("");

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

const selectedProvince = locations.find((loc) => loc._id === province);
  const districts = selectedProvince ? selectedProvince.districts : [];

  // Districts are objects; match by stable id (falling back to en name).
  const selectedDistrictData = districts.find(
    (d) => d._id === district || d.name?.en === district || d.name === district
  );
  const divisions = selectedDistrictData ? selectedDistrictData.divisions : [];

const handleSearch = (e) => {
    e.preventDefault();

    // Require all three selections before allowing navigation.
    if (!province || !district || !gnDivision) {
      setFormError(t("gnList.requiredSelection"));
      return;
    }
    setFormError("");

    // Find the selected GN division to carry its officer data to details.
    const selectedDivision = divisions.find(
      (g) => g._id === gnDivision || g.code === gnDivision
    );

navigate("/grama-niladhari/details", {
      state: {
        province,
        district,
        gnDivision,
        divisionName: selectedDivision
          ? localize(selectedDivision.name, i18n.language)
          : "",
        officerName: selectedDivision?.officerName || "",
        contactNo: selectedDivision?.contactNo || "",
      },
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
                  <option key={p._id} value={p._id}>{localize(p.name, i18n.language)}</option>
                ))}
              </select>
            </label>

<label className="gn-filter-row">
              <span>{t("gnList.district")}</span>
              <select value={district} onChange={handleDistrictChange}>
                <option value="">—</option>
{districts.map((d) => (
                  <option key={d.name?.en || d.name} value={d.name?.en || d.name}>{localize(d.name, i18n.language)}</option>
                ))}
              </select>
            </label>

            <label className="gn-filter-row">
              <span>{t("gnList.gnDivision")}</span>
              <select value={gnDivision} onChange={(e) => setGnDivision(e.target.value)}>
                <option value="">—</option>
{divisions.map((g) => (
                  <option key={g._id || g.code} value={g._id || g.code}>{localize(g.name, i18n.language)}</option>
                ))}
              </select>
            </label>

<button type="submit" className="gn-search-submit">{t("common.search")}</button>
            {formError && <p className="gn-list-error">{formError}</p>}
          </form>
        )}
      </div>
    </div>
  );
}

export default GNDivisionList;
