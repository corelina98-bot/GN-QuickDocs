// client/src/data/servicesData.js
//
// Single source of truth for the Services > Category > Sub-service > Checklist
// screens. Add a new service by adding an entry here — no new components needed,
// CategoryDetail.jsx and DocumentChecklist.jsx read everything from this file.
//
// icon names refer to lucide-react icon component names (imported where used).

const servicesData = {
  "civil-registrations": {
    label: "Civil Registrations",
    icon: "UserRound",
    subServices: {
      "registration-of-past-births": {
        label: "Registration of Past Births",
        icon: "Baby",
        documents: [
          "Pension Award Letter / Pension File",
          "National Identity Card (NIC)",
          "Marriage certificate of parents (if applicable)",
          "Affidavit confirming birth details (if record missing)",
          "Two witnesses' statements confirming birth details",
        ],
      },
      "providing-report-on-death-persons": {
        label: "Providing Report on Death Persons",
        icon: "Ribbon",
        documents: [
          "Medical certificate of cause of death",
          "National Identity Card of the deceased",
          "Informant's NIC",
          "If death occurred outside hospital – police report may be required",
        ],
      },
      "issuing-of-character-resident-certificate": {
        label: "Issuing of Character/Resident Certificate",
        icon: "FileBadge",
        documents: [
          "Identity Card",
          "Proof of residence (utility bills, property documents, or witnesses)",
          "Grama Niladhari's verification of residence",
          "Affidavit confirming birth details (if record missing)",
          "Two witnesses' statements confirming birth details",
        ],
      },
      "certifying-identity-card-applications": {
        label: "Certifying Identity Card Applications",
        icon: "IdCard",
        documents: [
          "Completed NIC application form",
          "Birth certificate",
          "Proof of residence",
          "Photograph (as per Department of Registration of Persons guidelines)",
        ],
      },
    },
  },

  "payment-of-pensions": {
    label: "Payment of Pensions",
    icon: "HandCoins",
    subServices: {
      "for-new-pensioners": {
        label: "For New Pensioners",
        icon: "Accessibility",
        documents: [
          "Pension Award Letter / Pension File",
          "National Identity Card (NIC)",
          "Bank Account Details",
          "Grama Niladhari Certificate / Residency Confirmation",
          "Birth Certificate",
          "Retirement Letter / Last Salary Slip",
          "Photographs (passport-size — for identity confirmation)",
          "Duly completed Pension Application Form (Form P1 or equivalent)",
        ],
      },
      "for-ongoing-pension-payments": {
        label: "For Ongoing Pension Payments",
        icon: "Users",
        documents: [
          "Life Certificate (certified annually, usually by Grama Niladhari or Divisional Secretary)",
          "National Identity Card",
          "Bank Passbook / Account Details",
        ],
      },
      "for-change-of-address-or-bank": {
        label: "For Change of Address or Bank",
        icon: "Landmark",
        documents: [
          "Request Letter by Pensioner",
          "New Bank Account Details (Certified by Bank)",
          "NIC Copy",
          "Grama Niladhari Certificate (New Residence Confirmation)",
          "Original Pension Card / Book (if applicable)",
        ],
      },
      "for-restoration-or-resumption-of-pension": {
        label: "For Restoration or Resumption of Pension",
        icon: "RefreshCcw",
        documents: [],
      },
      "for-nominee-heirs": {
        label: "For Nominee / Heirs (After Death of Pensioner)",
        icon: "HeartHandshake",
        documents: [],
      },
    },
  },

  "samurdhi-program": { label: "Samurdhi Program", icon: "Users", subServices: {} },
  "issuance-of-permit": { label: "Issuance of Permit", icon: "ScrollText", subServices: {} },
  "land-administration": { label: "Land Administration", icon: "Landmark", subServices: {} },
  "procurements": { label: "Procurements", icon: "Truck", subServices: {} },
  "issuing-of-certificate": { label: "Issuing of Certificate", icon: "FileBadge2", subServices: {} },
  "social-welfare": { label: "Social Welfare", icon: "Globe2", subServices: {} },
  "fill-progress-form": { label: "Fill Progress Form", icon: "ClipboardList", subServices: {} },
};

export default servicesData;
