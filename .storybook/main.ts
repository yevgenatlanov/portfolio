import type { StorybookConfig } from "@storybook/experimental-nextjs-vite";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test",
  ],
  framework: {
    name: "@storybook/experimental-nextjs-vite",
    options: {},
  },
  staticDirs: ["../public"],
  viteFinal: async (config) => {
    if (!config) return config;

    // Add resolve configuration
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};

    // Set up aliases for your project structure
    Object.assign(config.resolve.alias, {
      "@": path.resolve(__dirname, "../src"),
      "@/components": path.resolve(__dirname, "../src/components"),
      "@/lib": path.resolve(__dirname, "../src/lib"),
      "@/types": path.resolve(__dirname, "../src/types"),
      "@/theme": path.resolve(__dirname, "../src/theme"),
      "@/data": path.resolve(__dirname, "../src/data"),
      "@/messages": path.resolve(__dirname, "../src/messages"),
      "@/lang": path.resolve(__dirname, "../src/messages"),
    });

    // Add any other Vite configurations
    return config;
  },
};
export default config;
