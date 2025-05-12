"use client";

import React from "react";
import { SocialLinkProps } from "../types";
import { Icon } from "@iconify/react";
import githubIcon from "@iconify/icons-mdi/github";
import linkedinIcon from "@iconify/icons-mdi/linkedin";
import pdfIcon from "@iconify/icons-mdi/file-pdf-box-outline";
import emailIcon from "@iconify/icons-mdi/alternate-email";

const SocialLinks: React.FC = () => {
  const socialLinks: SocialLinkProps[] = [
    {
      href: "https://github.com/yevgenatlanov",
      label: "GitHub",
      icon: <Icon icon={githubIcon} width="24" height="24" />,
    },
    {
      href: "https://linkedin.com/in/yevhenii-atlanov",
      label: "LinkedIn",
      icon: <Icon icon={linkedinIcon} width="24" height="24" />,
    },
    {
      href: "https://atlanov.me/Atlanov-full-stack-developer.pdf",
      label: "My CV",
      icon: <Icon icon={pdfIcon} width="24" height="24" />,
    },
    {
      href: "mailto:me@atlanov.me",
      label: "Contact",
      icon: <Icon icon={emailIcon} width="24" height="24" />,
    },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors flex items-center"
          aria-label={link.label}
        >
          {link.icon}
          <span className="ml-2 md:inline">{link.label}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
