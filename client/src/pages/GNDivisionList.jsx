// client/src/pages/GNDivisionList.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import Header from "../components/Header";
import "./GNDivisionList.css";

// Replace with a real fetch to GET /api/gn-divisions?province=&district= once the
// backend endpoint exists. Kept as static placeholders so the form is wireable now.
const PROVINCES = ["Western", "Eastern", "Central", "Southern", "Northern"];
const DISTRICTS = ["Colombo", "Ampara", "Batticaloa", "Kandy", "Galle"];
const GN_DIVISIONS = ["Division 001", "Division 002", "Division 003"];

function GNDivisionList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [gnDivision, setGnDivision] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Swap for a real lookup once the backend endpoint exists; for now go straight
    // to the details screen the mockup shows next.
    navigate("/grama-niladhari/details", { state: { province, district, gnDivision, searchTerm } });
  };

  return (
    <div className="gn-page">
      <Header
        title={t("gnList.title")}
        crumbs={[{ label: t("dashboard.title"), to: "/dashboard" }, { label: t("gnList.title") }]}
      />

      <div className="gn-page-body">
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

        <form className="gn-filter-form" onSubmit={handleSearch}>
          <label className="gn-filter-row">
            <span>{t("gnList.province")}</span>
            <select value={province} onChange={(e) => setProvince(e.target.value)}>
              <option value="">—</option>
              {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>

          <label className="gn-filter-row">
            <span>{t("gnList.district")}</span>
            <select value={district} onChange={(e) => setDistrict(e.target.value)}>
              <option value="">—</option>
              {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </label>

          <label className="gn-filter-row">
            <span>{t("gnList.gnDivision")}</span>
            <select value={gnDivision} onChange={(e) => setGnDivision(e.target.value)}>
              <option value="">—</option>
              {GN_DIVISIONS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </label>

          <button type="submit" className="gn-search-submit">{t("common.search")}</button>
        </form>
      </div>
    </div>
  );
}

export default GNDivisionList;
