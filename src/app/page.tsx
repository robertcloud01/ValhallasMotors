import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FeaturedCars } from "@/components/sections/FeaturedCars";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <FeaturedCars />

      {/* Experience Section Placeholder */}
      <section className="py-32 bg-premium-carbon text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-display font-bold mb-8">Experiência Simplesmente Premium</h2>
          <p className="text-silver/60 max-w-2xl mx-auto">Em breve: Uma jornada imersiva pelo mundo automotivo de luxo.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
