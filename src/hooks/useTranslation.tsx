
import { useContext } from 'react';
import { TranslationContext } from '@/contexts/TranslationContext';

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    // Fallback básico
    return {
      t: (key: string) => key,
      language: 'es',
      changeLanguage: () => {},
    };
  }
  return context;
};
