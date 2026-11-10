import type { Metadata } from "next";
import localFont from "next/font/local";
import { pageMetadata, publicOrigin } from "@/lib/editorial-seo";
import "./globals.css";
import "./editorial.css";

const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});
const plusJakarta = localFont({
  src: "../../node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2",
  variable: "--font-neue-haas",
  weight: "200 800",
  display: "swap",
  preload: false,
});
const origin = publicOrigin();

export const metadata: Metadata = {
  ...pageMetadata("Forma em movimento", "Uma coleção editorial sobre a forma, a engenharia e o propósito de cada carro.", "/"),
  ...(origin ? { metadataBase: origin } : {}),
  title: { default: "Valhallas Motors | Forma em movimento", template: "%s | Valhallas Motors" },
  robots: { index: Boolean(origin), follow: Boolean(origin) },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={`${inter.variable} ${plusJakarta.variable}`}><body className="antialiased min-h-screen">{children}</body></html>;
}
