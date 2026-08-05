import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import ta from "./locales/ta.json";
import si from "./locales/si.json";

const SUPPORTED_LANGUAGES = ["en", "si", "ta"];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ta: { translation: ta },
      si: { translation: si },
    },
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGUAGES,
    nonExplicitSupportedLngs: true,
    interpolation: { escapeValue: false },
    detection: {
      // Persist the chosen language so it stays selected across page navigations
      // and browser sessions.
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "gn_quickdocs_lang",
    },
  });

// Keep the <html lang="..."> attribute in sync with the active language.
i18n.on("languageChanged", (lng) => {
  const normalized = SUPPORTED_LANGUAGES.includes(lng) ? lng : "en";
  document.documentElement.lang = normalized;
});

export default i18n;
