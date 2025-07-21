import createContextHook from '@nkzw/create-context-hook';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as Localization from 'expo-localization';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => void;
  t: (key: string) => string;
}

export const [LanguageProvider, useLanguage] = createContextHook((): LanguageContextType => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    const deviceLanguage = Localization.locale.startsWith('de') ? 'de' : 'en';
    if (i18n.language !== deviceLanguage) {
      i18n.changeLanguage(deviceLanguage);
      setCurrentLanguage(deviceLanguage);
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