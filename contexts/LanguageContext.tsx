"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode
} from "react";

type Language = "en" | "ar";

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: (en: string, ar: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({
  children,
  defaultLanguage = "en"
}: {
  children: ReactNode;
  defaultLanguage?: Language;
}) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-lang");
    if (stored === "en" || stored === "ar") {
      setLanguageState(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolio-lang", language);
    document.documentElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  const t = useCallback(
    (en: string, ar: string) => (language === "ar" ? ar : en),
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      toggleLanguage,
      setLanguage,
      isRTL: language === "ar",
      t
    }),
    [language, toggleLanguage, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
