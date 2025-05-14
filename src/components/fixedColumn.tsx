"use client";

import { TabType } from "@/types";
import { useI18n } from "@/lib/i18n";
import Navigation from "@/components/navigation";
import SocialLinks from "@/components/socialLinks";

interface ContentFixedColumnProps {
  activeTab: TabType;
}

export default function ContentFixedColumn({
  activeTab,
}: ContentFixedColumnProps) {
  const { t } = useI18n();

  const handleNavClick = (tabId: TabType) => {
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="p-8 md:p-14 flex flex-col h-full">
      <div className="flex-grow">
        <header className="mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Yevhenii Atlanov
          </h1>
          <h2 className="text-xl mb-12 text-foreground">{t("header.title")}</h2>

          <p className="text-sm mb-6">{t("header.intro1")}</p>

          <p className="text-sm mb-6">{t("header.intro2")}</p>
        </header>

        <Navigation activeTab={activeTab} setActiveTab={handleNavClick} />
      </div>

      <footer className="mt-12">
        <div className="flex items-center space-x-6">
          <SocialLinks />
        </div>
      </footer>
    </div>
  );
}
