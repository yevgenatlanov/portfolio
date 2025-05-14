import { I18nProvider } from "../src/lib/i18n";
import { ThemeProvider } from "../src/theme/themeProvider";

export const i18nDecorator = (Story) => (
  <I18nProvider>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="p-4 bg-background text-foreground">
        <Story />
      </div>
    </ThemeProvider>
  </I18nProvider>
);
