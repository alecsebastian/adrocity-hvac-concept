import type { Metadata } from "next";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource-variable/dm-sans";
import "./globals.css";
import { Header, Footer } from "@/components/site-shell";
import { Experience } from "@/components/experience";
import { ContactNudge, RevealOnScroll } from "@/components/enhancements";

export const metadata: Metadata = {
  metadataBase: new URL('https://hvac.adrocitystudios.com'),
  title: { default: "Steady Heating & Air — Good air. Steady hands.", template: "%s | Steady Heating & Air" },
  description: "A fictional Columbus heating and cooling company. Explore a custom website and inquiry experience by Adrocity Studios.",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header /><main id="main" tabIndex={-1}>{children}</main><Footer /><Experience /><RevealOnScroll /><ContactNudge /></body></html>;
}
