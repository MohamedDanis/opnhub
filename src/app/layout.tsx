import type { Metadata } from "next";
import { Inter, Rethink_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });
const rethink = Rethink_Sans({ subsets: ["latin"] });
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  title: "OPNHUB | Discover open-source projects from GitHub",
  description:
    "Discover open-source projects from GitHub, categorized by programming language, with this intuitive web app.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: [
    "nextjs",
    "pwa",
    "next-pwa",
    "github",
    "open-source",
    "projects",
    "programming",
    "language",
  ],
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
    <html lang="en" className={grotesk.variable}>
      <Analytics />
      <SpeedInsights />
      <body className={rethink.className}>{children}</body>
      <Script id="clarity" strategy="afterInteractive">
        {`
             (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "p8lbkeh3p6");
          `}
      </Script>
    </html>
  );
}
