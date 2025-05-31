import { translations, type Language, type TranslationKey } from "@/lib/i18n";
import { createContext, ReactNode, useCallback, useState } from "react";

type I18nContextType = {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
};

export const I18nContext = createContext<I18nContextType | undefined>(
  undefined
);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const browserLang = navigator.language || navigator.languages[0];
    return browserLang.startsWith("en") ? "en" : "fr";
  });

  const t = useCallback(
    (key: TranslationKey) => translations[language][key] || key,
    [language]
  );

  const changeLanguage = useCallback((lang: Language) => setLanguage(lang), []);

  return (
    <I18nContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}
