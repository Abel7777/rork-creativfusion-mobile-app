import createContextHook from '@nkzw/create-context-hook';
import { useState, useEffect } from 'react';
import { useTranslation, TFunction } from 'react-i18next';
import { getLocales } from 'expo-localization';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => void;
  t: TFunction;
}

export const [LanguageProvider, useLanguage] = createContextHook((): LanguageContextType => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    const deviceLanguage = getLocales()[0]?.languageCode || 'en';
    const targetLanguage = deviceLanguage.startsWith('de') ? 'de' : 'en';
    if (i18n.language !== targetLanguage) {
      i18n.changeLanguage(targetLanguage);
      setCurrentLanguage(targetLanguage);
    }
  }, []);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  };

  return {
    currentLanguage,
    changeLanguage,
    t,
  };
});