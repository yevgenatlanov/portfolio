"use client";

import React from "react";
import { SocialLinkProps } from "../types";
import { Icon } from "@iconify/react";
import githubIcon from "@iconify/icons-mdi/github";
import linkedinIcon from "@iconify/icons-mdi/linkedin";
import pdfIcon from "@iconify/icons-mdi/file-pdf-box-outline";
import emailIcon from "@iconify/icons-mdi/alternate-email";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SocialLinks: React.FC = () => {
  const socialLinks: SocialLinkProps[] = [
    {
      href: "https://github.com/yevgenatlanov",
      label: "GitHub",
      icon: <Icon icon={githubIcon} width="34" height="34" />,
    },
    {
      href: "https://linkedin.com/in/yevhenii-atlanov",
      label: "LinkedIn",
      icon: <Icon icon={linkedinIcon} width="34" height="34" />,
    },
    {
      href: "https://atlanov.me/Atlanov-full-stack-developer.pdf",
      label: "My CV",
      icon: <Icon icon={pdfIcon} width="34" height="34" />,
    },
    {
      href: "mailto:me@atlanov.me",
      label: "Contact",
      icon: <Icon icon={emailIcon} width="34" height="34" />,
    },
  ];

  return (
    <div className="flex justify-between w-full">
      {/* <LanguageSwitcher />
      <ModeToggle /> */}
      <TooltipProvider>
        {socialLinks.map((link, key) => (
          <Tooltip key={key}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="lg"
                asChild
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
              <p>{link.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

export default SocialLinks;
