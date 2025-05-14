"use client";

import { NavigationProps, NavItem } from "@/types";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { memo } from "react";

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const { t } = useI18n();

  const navItems: NavItem[] = [
    { id: "projects", label: t("navigation.projects"), number: "01" },
    { id: "exp", label: t("navigation.experience"), number: "02" },
    { id: "skills", label: t("navigation.skills"), number: "03" },
    { id: "blog", label: t("navigation.blog"), number: "04" },
  ];

  return (
    <nav className="py-2" aria-label="Main Navigation">
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.id} className="flex items-center">
            <span
              className="text-sm mr-3 w-6 text-muted-foreground"
              aria-hidden="true"
            >
              {item.number}
            </span>
            <button
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "relative flex items-center transition-colors duration-300",
                activeTab === item.id
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground/80"
              )}
              aria-current={activeTab === item.id ? "page" : undefined}
            >
              <div
                className="mr-3 transition-all duration-300"
                aria-hidden="true"
              >
                {activeTab === item.id ? (
                  <div className="w-16 h-px bg-primary"></div>
                ) : (
                  <div className="w-6 h-px bg-muted-foreground"></div>
                )}
              </div>
              <span className="uppercase text-sm tracking-wider">
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default memo(Navigation);
