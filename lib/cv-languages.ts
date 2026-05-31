// Keep in sync with scripts/generate-cv.mjs (LANGS).
export type CvLanguage = { code: string; native: string; en: string };

export const cvLanguages: CvLanguage[] = [
  { code: "en", native: "English", en: "English" },
  { code: "fr", native: "Français", en: "French" },
  { code: "es", native: "Español", en: "Spanish" },
  { code: "pt", native: "Português", en: "Portuguese" },
  { code: "de", native: "Deutsch", en: "German" },
  { code: "it", native: "Italiano", en: "Italian" },
  { code: "zh", native: "中文", en: "Chinese" },
  { code: "ja", native: "日本語", en: "Japanese" },
  { code: "ko", native: "한국어", en: "Korean" },
  { code: "ru", native: "Русский", en: "Russian" },
  { code: "ar", native: "العربية", en: "Arabic" },
  { code: "hi", native: "हिन्दी", en: "Hindi" },
];

export const cvPath = (code: string) => `/cv/noam-benjamin-cv-${code}.pdf`;
