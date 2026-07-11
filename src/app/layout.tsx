import { ThemeProvider } from "@/theme/themeProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { I18nProvider } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yevhenii Atlanov | Визионер · Практик",
  description:
    "Портфолио Yevhenii Atlanov — Full Stack Engineer. Дуальность: визионер и практик, свет и тьма, идея и реализация.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "history.scrollRestoration && (history.scrollRestoration = 'manual'); window.scrollTo({ top: 0, left: 0, behavior: 'auto' });",
          }}
        />
      </head>
      <body className={`${inter.variable} font-inter antialiased`}>
        <I18nProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
