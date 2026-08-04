// client/src/pages/DocumentChecklist.jsx
import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CheckSquare, Eye } from "lucide-react";
import * as Icons from "lucide-react";
import Header from "../components/Header";
import servicesData from "../data/servicesData";
import "./DocumentChecklist.css";

function DocumentChecklist() {
  const { t } = useTranslation();
  const { categorySlug, subServiceSlug } = useParams();
  const [previewDoc, setPreviewDoc] = useState(null);

  const category = servicesData[categorySlug];
  const subService = category?.subServices?.[subServiceSlug];

  if (!category || !subService) return <Navigate to="/services" replace />;

  const Icon = Icons[subService.icon] ?? Icons.CircleHelp;

  return (
    <div className="gn-page">
      <Header
        title={category.label}
        crumbs={[
          { label: t("dashboard.title"), to: "/dashboard" },
          { label: t("services.title"), to: "/services" },
          { label: category.label, to: `/services/${categorySlug}` },
          { label: subService.label },
        ]}
        showBack
      />

      <div className="gn-page-body">
        <div className="gn-checklist-heading">
          <span className="gn-checklist-icon"><Icon size={22} strokeWidth={1.6} /></span>
          <span className="gn-checklist-title font-display">{subService.label}</span>
        </div>

        {subService.documents.length === 0 ? (
          <p className="gn-empty-note">{t("services.comingSoon")}</p>
        ) : (
          <ul className="gn-checklist">
            {subService.documents.map((doc, i) => (
              <li key={i} className="gn-checklist-item">
                <CheckSquare size={18} className="gn-check-icon" />
                <span className="gn-check-text">{i + 1}. {doc}</span>
                <button
                  className="gn-sample-btn"
                  onClick={() => setPreviewDoc(doc)}
                  aria-label={`View sample of ${doc}`}
                  title={t("services.viewSample")}
                >
                  <Eye size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {previewDoc && (
        <div className="gn-modal-backdrop" onClick={() => setPreviewDoc(null)}>
          <div className="gn-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display">{previewDoc}</h3>
            <p className="gn-empty-note">
              {t("services.sampleComingSoon")}
              {/* Swap this for an actual sample image/PDF preview once assets are ready:
                  <img src={`/samples/${subServiceSlug}-${i}.png`} alt={previewDoc} /> */}
            </p>
            <button className="gn-modal-close" onClick={() => setPreviewDoc(null)}>
              {t("common.close")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentChecklist;
