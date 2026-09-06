"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations } from './types';
import { hu } from './hu';
import { en } from './en';
import { de } from './de';
import { fr } from './fr';

const translationsMap: Record<Language, Translations> = {
  hu,
  en,
  de,
  fr,
};

interface I18nContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextProps>({
  language: 'hu',
  setLanguage: () => {},
  t: hu,
});

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('hu');

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('sorsai_lang') as Language;
      if (savedLang && ['hu', 'en', 'de', 'fr'].includes(savedLang)) {
        setLanguageState(savedLang);
      }
    } catch {
      // Ignore if localStorage is unavailable
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('sorsai_lang', lang);
      document.documentElement.lang = lang;
    } catch {
      // Ignore
    }
  };

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t: translationsMap[language] || hu,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => useContext(I18nContext);

export const getStaticTranslation = (lang: Language): Translations => {
  return translationsMap[lang] || hu;
};
