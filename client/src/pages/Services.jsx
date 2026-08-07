// client/src/pages/Services.jsx
import { useTranslation } from "react-i18next";
import * as Icons from "lucide-react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import { getLocalizedServices } from "../data/servicesData";
import { gridClassFor } from "../utils/gridLayout";
import "./Grid.css";

function Services() {
  const { t } = useTranslation();
  const services = getLocalizedServices(t);
  const categories = Object.entries(services);

  return (
    <div className="gn-page">
      <Header
        title={t("services.title")}
        crumbs={[{ label: t("dashboard.title"), to: "/dashboard" }, { label: t("services.title") }]}
        showBack
      />

      <div className="gn-page-body">
        <div className={`gn-grid ${gridClassFor(categories.length)}`}>
          {categories.map(([slug, category]) => {
            const Icon = Icons[category.icon] ?? Icons.CircleHelp;
            return (
              <ServiceCard
                key={slug}
                size="xl"
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
