import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FeaturedCars } from "@/components/sections/FeaturedCars";
import { DNASection } from "@/components/sections/DNA";
import { MotionExperience } from "@/components/sections/MotionExperience";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#090b0d] text-[#f3f1ed] selection:bg-[#c9b18a] selection:text-black">
      <Navbar />
      <Hero />
      <FeaturedCars />
      <MotionExperience />
      <DNASection />
      <section className="border-t border-white/10 bg-[#d9d3c7] px-6 py-28 text-[#151719] sm:px-10 lg:px-20 lg:py-44">
        <div className="mx-auto max-w-[1440px]">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[.27em]">Valhallas Motors / The perspective</p>
          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
            <h2 className="max-w-5xl font-display text-[clamp(3.5rem,8.4vw,9rem)] font-semibold uppercase leading-[.88] tracking-[-.072em]">A raridade está nos detalhes.</h2>
            <Link href="/sobre" className="shrink-0 border-b border-[#151719] pb-4 text-xs font-semibold uppercase tracking-[.18em] transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4">
              Conheça o conceito ↗
            </Link>
          </div>
          <div className="mt-20 flex flex-col justify-between gap-5 border-t border-[#151719]/25 pt-5 text-xs uppercase tracking-[.13em] text-[#151719]/65 sm:flex-row">
            <span>Direção editorial / Automotive experience</span>
            <span>Projeto conceitual — veículos e valores ilustrativos</span>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
