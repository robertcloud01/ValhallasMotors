import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FeaturedCars } from "@/components/sections/FeaturedCars";
import { RuneStrip } from "@/components/ui/RuneStrip";
import { DNASection } from "@/components/sections/DNA";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-petrol text-white selection:bg-gold selection:text-black">
      <Navbar />
      <Hero />
      <FeaturedCars />
      <RuneStrip />
      <DNASection />
      <Testimonials />
      <Footer />
    </main>
  );
}
