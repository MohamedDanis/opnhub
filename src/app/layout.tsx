import type { Metadata } from "next";
import { Inter, Rethink_Sans } from "next/font/google";
import "./globals.css";
import Lenis from "@/components/Lenis";

const inter = Inter({ subsets: ["latin"] });
const rethink = Rethink_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OPNHUB | Discover open-source projects from GitHub",
  description: "Discover open-source projects from GitHub, categorized by programming language, with this intuitive web app.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "pwa", "next-pwa","github","open-source","projects","programming","language"],
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#fff" }],
  authors: [
    {
      name: "MohamedDanis",
      url: "https://www.linkedin.com/in/mohamed-danis/",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "/icon-128x128.png" },
    { rel: "icon", url: "/favicon.ico" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rethink.className}>
        {/* <Lenis> */}
          {children}
        {/* </Lenis> */}
      </body>
    </html>
  );
}
