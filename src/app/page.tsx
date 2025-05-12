"use client";

import { useState, useRef, useEffect } from "react";
import { TabType } from "@/types";

import ProjectsList from "@/components/projectList";
import Navigation from "@/components/navigation";
import SocialLinks from "@/components/socialLinks";
import SkillsList from "@/components/skillsList";
import ExperienceList from "@/components/expList";
import BlogList from "@/components/postsList";
import BackToTop from "@/components/backToTop";
import ScrollProgressIndicator from "@/components/scrollProgress";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("projects");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const projectsRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const blogRef = useRef<HTMLElement>(null);

  const handleNavClick = (tabId: TabType) => {
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }

    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      const sections = [
        { id: "projects", ref: projectsRef },
        { id: "exp", ref: experienceRef },
        { id: "skills", ref: skillsRef },
        { id: "blog", ref: blogRef },
      ];

      for (const section of sections) {
        if (!section.ref.current) continue;

        const rect = section.ref.current.getBoundingClientRect();
        const offsetTop = window.scrollY + rect.top;
        const offsetBottom = offsetTop + rect.height;

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          if (activeTab !== section.id) {
            setActiveTab(section.id as TabType);
          }
          break;
        }
      }
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", throttledScroll);
  }, [activeTab]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-night">
      <ScrollProgressIndicator />

      <BackToTop />

      {/* Mobile Header */}
      <div className="bg-card-custom  md:hidden sticky top-0 z-30 bg-night px-4 py-4  border-dusk">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Yevhenii Atlanov</h1>
          <button onClick={toggleMobileMenu} className="text-white p-2">
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

      {/* Layout 12-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 md:gap-8">
        {/* Fixed column + borders */}
        <div className="hidden md:block md:col-span-5 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
          <div className="p-8 md:p-14 flex flex-col h-full">
            <div className="flex-grow">
              <header className="mb-16">
                <h1 className="text-5xl font-bold mb-6">Yevhenii Atlanov</h1>
                <h2 className="text-xl mb-12">
                  Full Stack Engineer | Typescript, Web3, ML
                </h2>

                <p className="text-sm mb-6">
                  Full-Stack Engineer with 10+ years of experience, specializing
                  in full-cycle development in NodeJS, React.js, TypeScript.
                </p>

                <p className="text-sm mb-6">
                  In my spare time, I learn Python and Golang and work on my pet
                  ML project{" "}
                  <a
                    href="https://cashnews.ch"
                    target="_blank"
                    className="underline hover:text-gray-300"
                  >
                    Cashnews
                  </a>{" "}
                  and e-commerce project{" "}
                  <a
                    href="https://dropster.ch"
                    target="_blank"
                    className="underline hover:text-gray-300"
                  >
                    Dropster
                  </a>
                  .
                </p>
              </header>

              <Navigation activeTab={activeTab} setActiveTab={handleNavClick} />
            </div>

            <footer className="mt-12">
              <div className="flex items-center space-x-6">
                <SocialLinks />
              </div>
            </footer>
          </div>
        </div>

        {/* Scrollable left column */}
        <div className="col-span-1 md:col-span-7">
          <div className="p-4 md:p-8 lg:p-14">
            {/* Mobile intro */}
            <div className="md:hidden pt-4 mb-10">
              <h2 className="text-xl mb-4">
                Full Stack Engineer | Typescript, Web3, ML
              </h2>

              <p className="text-sm mb-4">
                Full-Stack Engineer with 10+ years of experience, specializing
                in full-cycle development in NodeJS, React.js, TypeScript.
              </p>

              <p className="text-sm mb-4">
                In my spare time, I learn Python and Golang and work on my pet
                ML project{" "}
                <a
                  href="https://cashnews.ch"
                  target="_blank"
                  className="underline hover:text-gray-300"
                >
                  Cashnews
                </a>{" "}
                and e-commerce project{" "}
                <a
                  href="https://dropster.ch"
                  target="_blank"
                  className="underline hover:text-gray-300"
                >
                  Dropster
                </a>
                .
              </p>
            </div>

            <div className="space-y-32">
              <section ref={projectsRef} id="projects" className="scroll-mt-20">
                <ProjectsList />
              </section>

              <section ref={experienceRef} id="exp" className="scroll-mt-20">
                <ExperienceList />
              </section>

              <section ref={skillsRef} id="skills" className="scroll-mt-20">
                <SkillsList />
              </section>

              <section ref={blogRef} id="blog" className="scroll-mt-20">
                <BlogList />
              </section>
            </div>

            <div className="md:hidden py-8 mt-8">
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
