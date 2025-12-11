import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google"; // Using Plus Jakarta as a proxy for premium display font
import "./globals.css";
import { registerGSAP } from "@/lib/gsap";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-neue-haas", // Mapping to our internal name for consistency
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

import { Preloader } from "@/components/ui/Preloader";

registerGSAP();

export const metadata: Metadata = {
  title: "Valhallas Motors | Exotic Cars",
  description: "Onde performance encontra o luxo absoluto. A sua concessionária de veículos exóticos.",
};

// ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="antialiased min-h-screen selection:bg-gold selection:text-black">
        <Preloader />
        {children}
      </body>
    </html>
  );
}
