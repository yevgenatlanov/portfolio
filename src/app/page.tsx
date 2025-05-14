"use client";

import { useState, useRef, useEffect } from "react";
import { TabType } from "@/types";

import ProjectsList from "@/components/projectList";
import SocialLinks from "@/components/socialLinks";
import SkillsList from "@/components/skillsList";
import ExperienceList from "@/components/expList";
import BlogList from "@/components/postsList";
import BackToTop from "@/components/backToTop";
import ScrollProgressIndicator from "@/components/scrollProgress";
import { useI18n } from "@/lib/i18n";
import ContentFixedColumn from "@/components/fixedColumn";
import MobileHeader from "@/components/mobileNav";

export default function Home() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<TabType>("projects");

  const projectsRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const blogRef = useRef<HTMLElement>(null);

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

  return (
    <div className="min-h-screen bg-night">
      <ScrollProgressIndicator />

      <BackToTop />

      <MobileHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Layout 12-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 md:gap-8">
        {/* Fixed column + borders */}
        <div className="hidden md:block md:col-span-5 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
          <ContentFixedColumn activeTab={activeTab} />
        </div>

        {/* Scrollable left column */}
        <div className="col-span-1 md:col-span-7">
          <div className="p-4 md:p-8 lg:p-14">
            {/* Mobile intro */}
            <div className="md:hidden pt-4 mb-10">
              <h2 className="text-xl mb-4">{t("header.title")}</h2>

              <p className="text-sm mb-4">{t("header.intro1")}</p>

              <p className="text-sm mb-4">{t("header.intro2")}</p>
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
