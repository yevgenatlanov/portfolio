"use client";

import { TabType } from "@/types";
import { useI18n } from "@/lib/i18n";
import Navigation from "@/components/navigation";
import SocialLinks from "@/components/socialLinks";
import Link from "next/link";

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
    <div className="flex h-full flex-col border-r border-white/8 p-8 md:p-14">
      <div className="flex-grow">
        <header className="mb-16 max-w-xl">
          <Link href={`/`} passHref>
            <h1 className="mb-5 text-5xl font-semibold leading-[0.92] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Yevhenii Atlanov
            </h1>
          </Link>
          <h2 className="mb-10 max-w-md text-xl font-medium leading-8 text-foreground/88 md:text-2xl">
            {t("header.title")}
          </h2>

          <p className="mb-6 max-w-lg text-[0.96rem] leading-8 text-muted-foreground">
            {t("header.intro1")}
          </p>

          <p className="mb-6 max-w-lg text-[0.96rem] leading-8 text-muted-foreground">
            {t("header.intro2")}
          </p>
        </header>

        <Navigation activeTab={activeTab} setActiveTab={handleNavClick} />
      </div>

      <footer className="mt-12 border-t border-white/10 pt-8">
        <div className="flex items-center space-x-6">
          <SocialLinks />
        </div>
      </footer>
    </div>
  );
}
