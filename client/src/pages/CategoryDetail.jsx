// client/src/pages/CategoryDetail.jsx
import { useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as Icons from "lucide-react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import { getLocalizedServices } from "../data/servicesData";
import { gridClassFor } from "../utils/gridLayout";
import "./Grid.css";

function CategoryDetail() {
  const { t } = useTranslation();
  const { categorySlug } = useParams();
  const services = getLocalizedServices(t);
  const category = services[categorySlug];

  if (!category) return <Navigate to="/services" replace />;

  const subServices = Object.entries(category.subServices);

  return (
    <div className="gn-page">
      <Header
        title={category.label}
        crumbs={[
          { label: t("dashboard.title"), to: "/dashboard" },
          { label: t("services.title"), to: "/services" },
          { label: category.label },
        ]}
        showBack
      />

      <div className="gn-page-body">
        {subServices.length === 0 ? (
          <p className="gn-empty-note">{t("services.comingSoon")}</p>
        ) : (
          <div className={`gn-grid ${gridClassFor(subServices.length)}`}>
            {subServices.map(([slug, sub]) => {
              const Icon = Icons[sub.icon] ?? Icons.CircleHelp;
              return (
                <ServiceCard
                  key={slug}
                  size="lg"
                  icon={Icon}
                  label={sub.label}
                  to={`/services/${categorySlug}/${slug}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryDetail;
