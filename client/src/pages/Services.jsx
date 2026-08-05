// client/src/pages/Services.jsx
import { useTranslation } from "react-i18next";
import * as Icons from "lucide-react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import { getLocalizedServices } from "../data/servicesData";
import "./Grid.css";

function Services() {
  const { t } = useTranslation();
  const services = getLocalizedServices(t);

  return (
    <div className="gn-page">
      <Header
        title={t("services.title")}
        crumbs={[{ label: t("dashboard.title"), to: "/dashboard" }, { label: t("services.title") }]}
      />

      <div className="gn-page-body">
        <div className="gn-grid gn-grid-3">
          {Object.entries(services).map(([slug, category]) => {
            const Icon = Icons[category.icon] ?? Icons.CircleHelp;
            return (
              <ServiceCard
                key={slug}
                icon={Icon}
                label={category.label}
                to={`/services/${slug}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Services;
