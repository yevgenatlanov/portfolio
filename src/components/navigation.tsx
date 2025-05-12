"use client";

import { NavigationProps, NavItem } from "@/types";

export default function Navigation({
  activeTab,
  setActiveTab,
}: NavigationProps) {
  const navItems: NavItem[] = [
    { id: "projects", label: "PET PROJECTS", number: "01" },
    { id: "exp", label: "EXPERIENCE", number: "02" },
    { id: "skills", label: "SKILLS", number: "03" },
    { id: "blog", label: "BLOG", number: "04" },
  ];

  return (
    <nav className="py-2">
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.id} className="flex items-center">
            <span className="text-sm mr-3 w-6 text-gray-400">
              {item.number}
            </span>
            <button
              onClick={() => setActiveTab(item.id)}
              className={`relative flex items-center transition-colors duration-300 ${
                activeTab === item.id
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <div className="mr-3 transition-all duration-300">
                {activeTab === item.id ? (
                  <div className="w-16 h-px bg-white"></div>
                ) : (
                  <div className="w-6 h-px bg-gray-500"></div>
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
}
