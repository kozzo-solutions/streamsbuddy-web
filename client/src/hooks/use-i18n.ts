import { useState, useEffect, useCallback } from 'react';
import { translations, type Language, type TranslationKey } from '@/lib/i18n';

export function useI18n() {
  const [language, setLanguage] = useState<Language>(() => {
    // Auto-detect browser language
    const browserLang = navigator.language || navigator.languages[0];
    return browserLang.startsWith('en') ? 'en' : 'fr';
  });

  const translate = useCallback((key: TranslationKey): string => {
    return translations[language][key] || key;
  }, [language]);

  const changeLanguage = useCallback((newLanguage: Language) => {
    setLanguage(newLanguage);
  }, []);

  return {
    language,
    translate,
    changeLanguage,
    t: translate
  };
}
