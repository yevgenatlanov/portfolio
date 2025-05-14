import type { Meta, StoryObj } from "@storybook/react";
import ExperienceCard from "../components/expCard";
import { Experience } from "../types";

const meta: Meta<typeof ExperienceCard> = {
  title: "Components/ExperienceCard",
  component: ExperienceCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ExperienceCard>;

const mockExperience: Experience = {
  id: "example",
  company: "Example Company",
  title: "Senior Full-Stack Developer",
  location: "Berlin, Germany",
  type: "Remote",
  startDate: "Jan 2022",
  endDate: "Present",
  achievements: [
    "Led development of scalable microservices architecture serving 10M+ users",
    "Reduced page load time by 40% through optimized React components and server-side rendering",
    "Implemented CI/CD pipeline reducing deployment time from hours to minutes",
    "Mentored junior developers and conducted code reviews to maintain code quality",
  ],
  technologies: [
    "React",
    "Node.js",
    "TypeScript",
    "GraphQL",
    "PostgreSQL",
    "AWS",
  ],
  teamSize: "8 developers",
};

export const Default: Story = {
  args: {
    experience: mockExperience,
  },
};

export const HybridWorkType: Story = {
  args: {
    experience: {
      ...mockExperience,
      type: "Hybrid",
    },
  },
};

export const PastPosition: Story = {
  args: {
    experience: {
      ...mockExperience,
      endDate: "Dec 2023",
    },
  },
};

export const WithManyTechnologies: Story = {
  args: {
    experience: {
      ...mockExperience,
      technologies: [
        "React",
        "Node.js",
        "TypeScript",
        "GraphQL",
        "PostgreSQL",
        "Redis",
        "Docker",
        "Kubernetes",
        "AWS",
        "CI/CD",
        "Jest",
        "Cypress",
      ],
    },
  },
};
