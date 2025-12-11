import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getCarById } from "@/services/cars";
import { CarGallery } from "@/components/cars/CarGallery";
import { Button } from "@/components/ui/Button";
import { WhatsappLogo, FileText } from "@phosphor-icons/react/dist/ssr";
import { CloudinaryVideo } from "@/components/media/CloudinaryVideo";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

// Ensure params is awaited in Next.js 15+ compatible way
// Helper to determine image source (Cloudinary ID vs Absolute URL)
const getImageUrl = (src: string) => {
    if (!src) return "/placeholder-car.jpg"; // Basic fallback
    if (src.startsWith("http")) return src;
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo"}/image/upload/${src}`;
};

export default async function CarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const car = await getCarById(id);

    if (!car) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Veículo não encontrado</h1>
                    <Link href="/estoque" className="text-gold hover:underline">Voltar para o estoque</Link>
                </div>
            </div>
        );
    }

    const mainImage = getImageUrl(car.thumbnail || car.images?.[0]);

    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            {/* Hero */}
            <section className="relative h-[80vh] w-full">
                <Image
                    src={mainImage}
                    alt={car.model}
                    fill
                    className="object-cover"
                    priority
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-20">
                    <div className="container mx-auto">
                        <span className="text-gold uppercase tracking-[0.2em] font-bold mb-2 block">{car.brand}</span>
                        <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight mb-4">{car.model}</h1>
                        <p className="text-2xl md:text-3xl font-light text-silver">{car.price}</p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-20 bg-premium-black relative">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">

                    {/* Left Column: Description & Gallery */}
                    <div className="lg:col-span-2">
                        <div className="mb-12">
                            <h2 className="text-2xl font-display font-bold mb-6">Sobre o Veículo</h2>
                            <p className="text-silver/80 leading-relaxed text-lg whitespace-pre-line">
                                {car.description}
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-display font-bold mb-6">Especificações</h2>
                            <div className="grid grid-cols-2 gap-y-6 gap-x-12 border-t border-white/10 pt-6">
                                <div>
                                    <span className="text-silver/40 text-sm uppercase tracking-widest block mb-1">Ano</span>
                                    <span className="text-xl font-medium">{car.year}</span>
                                </div>
                                <div>
                                    <span className="text-silver/40 text-sm uppercase tracking-widest block mb-1">Quilometragem</span>
                                    <span className="text-xl font-medium">{car.km} km</span>
                                </div>
                                <div>
                                    <span className="text-silver/40 text-sm uppercase tracking-widest block mb-1">Potência</span>
                                    <span className="text-xl font-medium">{car.power}</span>
                                </div>
                                <div>
                                    <span className="text-silver/40 text-sm uppercase tracking-widest block mb-1">Categoria</span>
                                    <span className="text-xl font-medium">{car.category}</span>
                                </div>
                            </div>
                        </div>

                        {car.video && (
                            <div className="mb-12">
                                <h2 className="text-2xl font-display font-bold mb-6">Vídeo do Veículo</h2>
                                <div className="rounded-xl overflow-hidden border border-white/10 aspect-video bg-premium-carbon">
                                    <CloudinaryVideo
                                        src={car.video}
                                        controls={true}
                                        autoPlay={false}
                                        muted={false}
                                    />
                                </div>
                            </div>
                        )}

                        <CarGallery images={car.images} />
                    </div>

                    {/* Right Column: Sticky Contact */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 p-8 rounded-xl bg-premium-carbon border border-white/5 space-y-6">
                            <h3 className="text-2xl font-display font-bold">Interessado?</h3>
                            <p className="text-silver/60">Entre em contato com nossos consultores para mais detalhes sobre esta máquina.</p>

                            <Link
                                href={`https://wa.me/5511999999999?text=Olá, tenho interesse no veículo ${car.brand} ${car.model}`}
                                target="_blank"
                                className="block w-full"
                            >
                                <Button className="w-full" size="lg" leftIcon={<WhatsappLogo size={24} weight="fill" />}>
                                    Falar no WhatsApp
                                </Button>
                            </Link>
                            <Button variant="outline" className="w-full" leftIcon={<FileText size={24} />}>
                                Solicitar Ficha Técnica
                            </Button>

                            <div className="pt-6 border-t border-white/5 text-center">
                                <p className="text-sm text-silver/40">Garantia de procedência e blindagem nível III-A disponível.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
