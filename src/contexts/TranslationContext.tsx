
import React, { createContext, ReactNode } from 'react';
import { useTranslation as useI18next } from 'react-i18next';

interface TranslationContextType {
  t: (key: string, options?: any) => string;
  language: string;
  changeLanguage: (lang: string) => void;
}

export const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const { t, i18n } = useI18next();

  const changeLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang);
  };

  const value = {
    t,
    language: i18n.language,
    changeLanguage
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};
