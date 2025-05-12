import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yevhenii Atlanov | Full Stack Engineer",
  description:
    "Portfolio of Yevhenii Atlanov, Full Stack Engineer specializing in TypeScript, Web3, and ML",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={`${inter.className} bg-[#151515] text-white h-full`}>
        {children}
      </body>
    </html>
  );
}
