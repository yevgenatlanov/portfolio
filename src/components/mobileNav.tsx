"use client";

import { useState } from "react";
import { TabType } from "@/types";
import Navigation from "@/components/navigation";
import SocialLinks from "@/components/socialLinks";

interface MobileHeaderProps {
  activeTab: TabType;
  setActiveTab: (tabId: TabType) => void;
}

export default function MobileHeader({
  activeTab,
  setActiveTab,
}: MobileHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (tabId: TabType) => {
    setActiveTab(tabId);

    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <div className="bg-card md:hidden sticky top-0 z-30 bg-night px-4 py-4 border-dusk">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-foreground">Yevhenii Atlanov</h1>
        <button
          onClick={toggleMobileMenu}
          className="text-foreground p-2"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="pt-4 animate-fadeIn">
          <Navigation activeTab={activeTab} setActiveTab={handleNavClick} />
          <div className="mt-6 pt-4">
            <SocialLinks />
          </div>
        </div>
      )}
    </div>
  );
}
