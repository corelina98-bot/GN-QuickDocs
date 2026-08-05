//
// Single source of truth for the Services > Category > Sub-service > Checklist
// screens. Add a new service by adding an entry here — no new components needed,
// CategoryDetail.jsx and DocumentChecklist.jsx read everything from this file.
//
// icon names refer to lucide-react icon component names (imported where used).
//
// Localization: structure, icons and slugs live here. Human-readable labels and
// checklist documents are fetched from the i18n locale files via
// getLocalizedServices(t). That way switching EN/SI/TA on the header instantly
// translates every service screen.

const servicesData = {
  "civil-registrations": {
    icon: "UserRound",
    subServices: {
      "registration-of-past-births": {
        icon: "Baby",
        documentKeys: [
          "serviceContent.civil-registrations.subServices.registration-of-past-births.documents.0",
          "serviceContent.civil-registrations.subServices.registration-of-past-births.documents.1",
          "serviceContent.civil-registrations.subServices.registration-of-past-births.documents.2",
          "serviceContent.civil-registrations.subServices.registration-of-past-births.documents.3",
          "serviceContent.civil-registrations.subServices.registration-of-past-births.documents.4",
        ],
      },
      "providing-report-on-death-persons": {
        icon: "Ribbon",
        documentKeys: [
          "serviceContent.civil-registrations.subServices.providing-report-on-death-persons.documents.0",
          "serviceContent.civil-registrations.subServices.providing-report-on-death-persons.documents.1",
          "serviceContent.civil-registrations.subServices.providing-report-on-death-persons.documents.2",
          "serviceContent.civil-registrations.subServices.providing-report-on-death-persons.documents.3",
        ],
      },
      "issuing-of-character-resident-certificate": {
        icon: "FileBadge",
        documentKeys: [
          "serviceContent.civil-registrations.subServices.issuing-of-character-resident-certificate.documents.0",
          "serviceContent.civil-registrations.subServices.issuing-of-character-resident-certificate.documents.1",
          "serviceContent.civil-registrations.subServices.issuing-of-character-resident-certificate.documents.2",
          "serviceContent.civil-registrations.subServices.issuing-of-character-resident-certificate.documents.3",
          "serviceContent.civil-registrations.subServices.issuing-of-character-resident-certificate.documents.4",
        ],
      },
      "certifying-identity-card-applications": {
        icon: "IdCard",
        documentKeys: [
          "serviceContent.civil-registrations.subServices.certifying-identity-card-applications.documents.0",
          "serviceContent.civil-registrations.subServices.certifying-identity-card-applications.documents.1",
          "serviceContent.civil-registrations.subServices.certifying-identity-card-applications.documents.2",
          "serviceContent.civil-registrations.subServices.certifying-identity-card-applications.documents.3",
        ],
      },
    },
  },

  "payment-of-pensions": {
    icon: "HandCoins",
    subServices: {
      "for-new-pensioners": {
        icon: "Accessibility",
        documentKeys: [
          "serviceContent.payment-of-pensions.subServices.for-new-pensioners.documents.0",
          "serviceContent.payment-of-pensions.subServices.for-new-pensioners.documents.1",
          "serviceContent.payment-of-pensions.subServices.for-new-pensioners.documents.2",
          "serviceContent.payment-of-pensions.subServices.for-new-pensioners.documents.3",
          "serviceContent.payment-of-pensions.subServices.for-new-pensioners.documents.4",
          "serviceContent.payment-of-pensions.subServices.for-new-pensioners.documents.5",
          "serviceContent.payment-of-pensions.subServices.for-new-pensioners.documents.6",
          "serviceContent.payment-of-pensions.subServices.for-new-pensioners.documents.7",
        ],
      },
      "for-ongoing-pension-payments": {
        icon: "Users",
        documentKeys: [
          "serviceContent.payment-of-pensions.subServices.for-ongoing-pension-payments.documents.0",
          "serviceContent.payment-of-pensions.subServices.for-ongoing-pension-payments.documents.1",
          "serviceContent.payment-of-pensions.subServices.for-ongoing-pension-payments.documents.2",
        ],
      },
      "for-change-of-address-or-bank": {
        icon: "Landmark",
        documentKeys: [
          "serviceContent.payment-of-pensions.subServices.for-change-of-address-or-bank.documents.0",
          "serviceContent.payment-of-pensions.subServices.for-change-of-address-or-bank.documents.1",
          "serviceContent.payment-of-pensions.subServices.for-change-of-address-or-bank.documents.2",
          "serviceContent.payment-of-pensions.subServices.for-change-of-address-or-bank.documents.3",
          "serviceContent.payment-of-pensions.subServices.for-change-of-address-or-bank.documents.4",
        ],
      },
      "for-restoration-or-resumption-of-pension": {
        icon: "RefreshCcw",
        documentKeys: [
          "serviceContent.payment-of-pensions.subServices.for-restoration-or-resumption-of-pension.documents.0",
          "serviceContent.payment-of-pensions.subServices.for-restoration-or-resumption-of-pension.documents.1",
          "serviceContent.payment-of-pensions.subServices.for-restoration-or-resumption-of-pension.documents.2",
          "serviceContent.payment-of-pensions.subServices.for-restoration-or-resumption-of-pension.documents.3",
          "serviceContent.payment-of-pensions.subServices.for-restoration-or-resumption-of-pension.documents.4",
        ],
      },
      "for-nominee-heirs": {
        icon: "HeartHandshake",
        documentKeys: [
          "serviceContent.payment-of-pensions.subServices.for-nominee-heirs.documents.0",
          "serviceContent.payment-of-pensions.subServices.for-nominee-heirs.documents.1",
          "serviceContent.payment-of-pensions.subServices.for-nominee-heirs.documents.2",
          "serviceContent.payment-of-pensions.subServices.for-nominee-heirs.documents.3",
          "serviceContent.payment-of-pensions.subServices.for-nominee-heirs.documents.4",
          "serviceContent.payment-of-pensions.subServices.for-nominee-heirs.documents.5",
          "serviceContent.payment-of-pensions.subServices.for-nominee-heirs.documents.6",
        ],
      },
    },
  },

  "samurdhi-program": { icon: "Users", subServices: {} },
  "issuance-of-permit": { icon: "ScrollText", subServices: {} },
  "land-administration": { icon: "Landmark", subServices: {} },
  "procurements": { icon: "Truck", subServices: {} },
  "issuing-of-certificate": { icon: "FileBadge2", subServices: {} },
  "social-welfare": { icon: "Globe2", subServices: {} },
  "fill-progress-form": { icon: "ClipboardList", subServices: {} },
};

/**
 * Returns a localized copy of servicesData where every label and checklist
 * document is resolved through the i18next `t` function.
 *
 * @param {Function} t - the i18next translation function from useTranslation()
 * @returns {Object} a services data object with localized labels/documents
 */
export function getLocalizedServices(t) {
  const localized = {};
  Object.entries(servicesData).forEach(([categorySlug, category]) => {
    const locCategory = {
      label: t(`serviceContent.${categorySlug}.label`),
      icon: category.icon,
      subServices: {},
    };
    Object.entries(category.subServices || {}).forEach(([subSlug, sub]) => {
      locCategory.subServices[subSlug] = {
        icon: sub.icon,
        label: t(`serviceContent.${categorySlug}.subServices.${subSlug}.label`),
        documents: (sub.documentKeys || []).map((key) => t(key)),
      };
    });
    localized[categorySlug] = locCategory;
  });
  return localized;
}

export default servicesData;
