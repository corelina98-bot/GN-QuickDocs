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
  "identity-verification-certificates": {
    icon: "FileBadge",
    subServices: {
      "residence-certificate": {
        icon: "Home",
        instructionSheet: true,
        documentKeys: [
          "serviceContent.identity-verification-certificates.subServices.residence-certificate.documents.0",
          "serviceContent.identity-verification-certificates.subServices.residence-certificate.documents.1",
          "serviceContent.identity-verification-certificates.subServices.residence-certificate.documents.2",
          "serviceContent.identity-verification-certificates.subServices.residence-certificate.documents.3",
"serviceContent.identity-verification-certificates.subServices.residence-certificate.documents.4",
        ],
      },
      "character-certificate": {
        icon: "ShieldCheck",
        instructionSheet: true,
        documentKeys: [
          "serviceContent.identity-verification-certificates.subServices.character-certificate.documents.0",
          "serviceContent.identity-verification-certificates.subServices.character-certificate.documents.1",
          "serviceContent.identity-verification-certificates.subServices.character-certificate.documents.2",
          "serviceContent.identity-verification-certificates.subServices.character-certificate.documents.3",
        ],
      },
      "income-certificate": {
        icon: "Wallet",
        instructionSheet: true,
        documentKeys: [
          "serviceContent.identity-verification-certificates.subServices.income-certificate.documents.0",
          "serviceContent.identity-verification-certificates.subServices.income-certificate.documents.1",
          "serviceContent.identity-verification-certificates.subServices.income-certificate.documents.2",
          "serviceContent.identity-verification-certificates.subServices.income-certificate.documents.3",
        ],
      },
      "life-certificate": {
        icon: "HeartPulse",
        instructionSheet: true,
        documentKeys: [
          "serviceContent.identity-verification-certificates.subServices.life-certificate.documents.0",
          "serviceContent.identity-verification-certificates.subServices.life-certificate.documents.1",
          "serviceContent.identity-verification-certificates.subServices.life-certificate.documents.2",
          "serviceContent.identity-verification-certificates.subServices.life-certificate.documents.3",
        ],
      },
    },
  },

  "electoral-civil-registrations": {
    icon: "ScrollText",
    subServices: {
      "voter-registration-electoral-roll": {
        icon: "Vote",
        documentKeys: [
          "serviceContent.electoral-civil-registrations.subServices.voter-registration-electoral-roll.documents.0",
          "serviceContent.electoral-civil-registrations.subServices.voter-registration-electoral-roll.documents.1",
          "serviceContent.electoral-civil-registrations.subServices.voter-registration-electoral-roll.documents.2",
          "serviceContent.electoral-civil-registrations.subServices.voter-registration-electoral-roll.documents.3",
        ],
      },
      "verification-birth-death-marriage": {
        icon: "FileCheck",
        documentKeys: [
          "serviceContent.electoral-civil-registrations.subServices.verification-birth-death-marriage.documents.0",
          "serviceContent.electoral-civil-registrations.subServices.verification-birth-death-marriage.documents.1",
          "serviceContent.electoral-civil-registrations.subServices.verification-birth-death-marriage.documents.2",
        ],
      },
    },
  },

  "land-permits-local-industry": {
    icon: "MapPin",
    subServices: {
      "tree-felling-timber-transport": {
        icon: "TreePine",
        documentKeys: [
          "serviceContent.land-permits-local-industry.subServices.tree-felling-timber-transport.documents.0",
          "serviceContent.land-permits-local-industry.subServices.tree-felling-timber-transport.documents.1",
          "serviceContent.land-permits-local-industry.subServices.tree-felling-timber-transport.documents.2",
          "serviceContent.land-permits-local-industry.subServices.tree-felling-timber-transport.documents.3",
        ],
      },
      "animal-cattle-transport": {
        icon: "PawPrint",
        documentKeys: [
          "serviceContent.land-permits-local-industry.subServices.animal-cattle-transport.documents.0",
          "serviceContent.land-permits-local-industry.subServices.animal-cattle-transport.documents.1",
          "serviceContent.land-permits-local-industry.subServices.animal-cattle-transport.documents.2",
        ],
      },
      "event-public-loudspeaker": {
        icon: "Megaphone",
        documentKeys: [
          "serviceContent.land-permits-local-industry.subServices.event-public-loudspeaker.documents.0",
          "serviceContent.land-permits-local-industry.subServices.event-public-loudspeaker.documents.1",
          "serviceContent.land-permits-local-industry.subServices.event-public-loudspeaker.documents.2",
          "serviceContent.land-permits-local-industry.subServices.event-public-loudspeaker.documents.3",
        ],
      },
    },
  },

  "welfare-social-relief": {
    icon: "HandCoins",
    subServices: {
      "social-welfare-application": {
        icon: "HeartHandshake",
        documentKeys: [
          "serviceContent.welfare-social-relief.subServices.social-welfare-application.documents.0",
          "serviceContent.welfare-social-relief.subServices.social-welfare-application.documents.1",
          "serviceContent.welfare-social-relief.subServices.social-welfare-application.documents.2",
          "serviceContent.welfare-social-relief.subServices.social-welfare-application.documents.3",
        ],
      },
      "disaster-compensation-damage": {
        icon: "Umbrella",
        documentKeys: [
          "serviceContent.welfare-social-relief.subServices.disaster-compensation-damage.documents.0",
          "serviceContent.welfare-social-relief.subServices.disaster-compensation-damage.documents.1",
          "serviceContent.welfare-social-relief.subServices.disaster-compensation-damage.documents.2",
          "serviceContent.welfare-social-relief.subServices.disaster-compensation-damage.documents.3",
        ],
      },
    },
  },
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
        instructionSheet: sub.instructionSheet || false,
      };
    });
    localized[categorySlug] = locCategory;
  });
  return localized;
}

export default servicesData;
