import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language, TranslationKey } from '../translations';

interface TranslationContextType {
  currentLang: Language;
  setCurrentLang: (lang: Language) => void;
  t: (key: TranslationKey, params?: Record<string, any>) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const getBrowserLanguage = (): Language => {
  const urlLang = window.location.pathname.split('/')[1];
  if (urlLang === 'fr' || urlLang === 'en' || urlLang === 'de') {
    return urlLang as Language;
  }
  const lang = navigator.language.toLowerCase().split('-')[0];
  if (lang === 'fr' || lang === 'en' || lang === 'de') {
    return lang as Language;
  }
  return 'fr';
};

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language') as Language;
    return savedLang || getBrowserLanguage();
  });

  useEffect(() => {
    localStorage.setItem('language', currentLang);
  }, [currentLang]);

  useEffect(() => {
    const urlLang = window.location.pathname.split('/')[1];
    if ((urlLang === 'fr' || urlLang === 'en' || urlLang === 'de') && urlLang !== currentLang) {
      setCurrentLang(urlLang as Language);
    }
  }, []);

  const t = (key: TranslationKey, params?: Record<string, any>): string => {
    const translation = translations[currentLang][key];
    if (typeof translation === 'string' && params) {
      return translation.replace(/\{(\w+)\}/g, (_, k) => params[k]?.toString() || `{${k}}`);
    }
    return translation;
  };

  return (
    <TranslationContext.Provider value={{ currentLang, setCurrentLang, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}; 