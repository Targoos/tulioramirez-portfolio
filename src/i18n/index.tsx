import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { es } from "./es";
import { en } from "./en";

export type Language = "ES" | "EN";

export interface Translations {
  nav: {
    items: readonly string[];
    availableForWork: string;
    ariaLabel: string;
    changeLanguage: string;
    openMenu: string;
    closeMenu: string;
    mobileMenuLabel: string;
    mobileMenuMobileLabel: string;
    bottomNavLabel: string;
  };
  hero: {
    tagline: string;
    quote: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    sectionLabel: string;
    quoteBefore: string;
    quoteHighlight: string;
    quoteAfter: string;
    paragraph: string;
    stats: readonly string[];
  };
  stack: {
    activelyGrowing: string;
  };
  projects: {
    clickLabel: string;
  };
  contact: {
    headingLine1: string;
    headingLine2: string;
    headingHighlight: string;
    whatsappMessage: string;
    form: {
      nameLabel: string;
      subjectLabel: string;
      emailLabel: string;
      messageLabel: string;
      submitButton: string;
      errorMessage: string;
    };
  };
  footer: {
    copyright: string;
  };
  chat: {
    buttonLabel: string;
    subtitle: string;
    close: string;
    greeting: string;
    placeholder: string;
    processing: string;
  };
}

const TRANSLATIONS: Record<Language, Translations> = { ES: es, EN: en };

interface LanguageContextType {
  language: Language;
  t: Translations;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem("portfolio-lang");
    return stored === "EN" ? "EN" : "ES";
  });

  useEffect(() => {
    localStorage.setItem("portfolio-lang", language);
    document.documentElement.lang = language === "ES" ? "es" : "en";
  }, [language]);

  const toggleLanguage = () => setLanguage((prev) => (prev === "ES" ? "EN" : "ES"));

  return (
    <LanguageContext.Provider value={{ language, t: TRANSLATIONS[language], toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
