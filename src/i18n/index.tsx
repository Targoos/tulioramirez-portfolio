import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { es } from './es';
import { en } from './en';

export type Language = 'ES' | 'EN';
export type Translations = typeof es;

interface LanguageContextType {
  language: Language;
  t: Translations;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('portfolio-lang');
    return stored === 'EN' ? 'EN' : 'ES';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-lang', language);
    document.documentElement.lang = language === 'ES' ? 'es' : 'en';
  }, [language]);

  const toggleLanguage = () => setLanguage((prev) => (prev === 'ES' ? 'EN' : 'ES'));

  const t = (language === 'ES' ? es : en) as Translations;

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
