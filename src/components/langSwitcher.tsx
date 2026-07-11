"use client";

import { useI18n } from "@/lib/i18n";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useI18n();

  const getLanguageName = (localeCode: string) => {
    const languages: Record<string, string> = {
      en: "English",
      de: "Deutsch",
    };
    return languages[localeCode] || localeCode;
  };

  const getLanguageCode = (localeCode: string) => {
    const codes: Record<string, string> = {
      en: "EN",
      de: "DE",
    };
    return codes[localeCode] || localeCode.toUpperCase();
  };

  const handleLocaleChange = (newLocale: "en" | "de") => {
    if (newLocale !== locale) {
      setLocale(newLocale);
    }
  };

  return (
    <div className={`language-switcher ${className}`.trim()} aria-label="Change language" role="group">
      {["en", "de"].map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => handleLocaleChange(loc as "en" | "de")}
          className={`control-btn lang-switch-btn${loc === locale ? " is-active" : ""}`}
          title={getLanguageName(loc)}
          aria-pressed={loc === locale}
        >
          {getLanguageCode(loc)}
        </button>
      ))}
    </div>
  );
}
