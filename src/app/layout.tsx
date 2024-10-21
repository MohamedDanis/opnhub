import type { Metadata } from "next";
import { Inter, Rethink_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });
const rethink = Rethink_Sans({ subsets: ["latin"] });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: '--font-grotesk' });

export const metadata: Metadata = {
  title: "OPNHUB | Discover open-source projects from GitHub",
  description: "Discover open-source projects from GitHub, categorized by programming language, with this intuitive web app.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "pwa", "next-pwa", "github", "open-source", "projects", "programming", "language"],
  authors: [
    {
      name: "MohamedDanis",
      url: "https://www.linkedin.com/in/mohamed-danis/",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "/icon-128x128.png" },
    { rel: "icon", url: "/favicon.ico" },
  ],
};

// New viewport export
export const viewport = {
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#aaa" }],
  content: "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={grotesk.variable}>
      <Analytics />
      <SpeedInsights />
      <body className={rethink.className}>
        {children}
      </body>
    </html>
  );
}
