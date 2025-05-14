"use client";

import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  const getLanguageName = (localeCode: string) => {
    const languages: Record<string, string> = {
      en: "English",
      de: "Deutsch",
    };
    return languages[localeCode] || localeCode;
  };

  const getLanguageFlag = (localeCode: string) => {
    const flags: Record<string, string> = {
      en: "🇬🇧",
      de: "🇩🇪",
    };
    return flags[localeCode] || "";
  };

  const handleLocaleChange = (newLocale: "en" | "de") => {
    if (newLocale !== locale) {
      setLocale(newLocale);
      // Force a page refresh to ensure all components use the new locale
      // This is optional but ensures consistent language across the app
      // window.location.reload();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" title="Change language">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {["en", "de"].map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLocaleChange(loc as "en" | "de")}
            className={loc === locale ? "bg-secondary/50" : ""}
          >
            <span className="mr-2">{getLanguageFlag(loc)}</span>
            {getLanguageName(loc)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
