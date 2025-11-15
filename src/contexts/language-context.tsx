"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { content, type Language, type LanguageContent } from "@/lib/i18n";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: LanguageContent;
};

const LanguageContext = createContext<LanguageContextValue>({
  language: "es",
  setLanguage: () => {},
  t: content.es
});

function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return "es";
  }
  const stored = window.localStorage.getItem("kerdos-language");
  if (stored === "pt" || stored === "es") {
    return stored;
  }
  const browser = window.navigator.language.toLowerCase();
  if (browser.startsWith("pt")) {
    return "pt";
  }
  return "es";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    setLanguageState(getInitialLanguage());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem("kerdos-language", language);
    document.documentElement.lang = language === "pt" ? "pt-BR" : "es-CR";
  }, [language]);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: content[language]
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
