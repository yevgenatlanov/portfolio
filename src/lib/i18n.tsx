"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import enMessages from "@/lang/en.json";
import deMessages from "@/lang/de.json";

const messages = {
  en: enMessages,
  de: deMessages,
};

type Locale = "en" | "de";
const locales: Locale[] = ["en", "de"];

function getInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }

  const savedLocale = localStorage.getItem("locale");

  if (savedLocale && locales.includes(savedLocale as Locale)) {
    return savedLocale as Locale;
  }

  const browserLang = navigator.language.split("-")[0];
  return browserLang === "de" ? "de" : "en";
}

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (
    key: string,
    options?: { fallback?: string; params?: Record<string, string | number> }
  ) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    localStorage.setItem("locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const t = (
    key: string,
    options?: { fallback?: string; params?: Record<string, string | number> }
  ) => {
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = messages[locale];

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }

    if (value === undefined) {
      return options?.fallback || key;
    }

    if (options?.params && typeof value === "string") {
      return Object.entries(options.params).reduce(
        (str, [paramKey, paramValue]) =>
          str.replace(`{${paramKey}}`, String(paramValue)),
        value
      );
    }

    return value;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
