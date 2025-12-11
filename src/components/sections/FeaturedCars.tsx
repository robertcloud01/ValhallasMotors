"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "@phosphor-icons/react";
import { getCars, type Car } from "@/services/cars";
import Link from "next/link";
import { generateAltText } from "@/lib/cloudinary";

function CarCard({ car }: { car: Car }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const imageUrl = car.thumbnail || car.images[0];
    const altText = generateAltText(car.brand, car.model, car.year);

    return (
        <Link href={`/estoque/${car.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-full h-[500px] rounded-xl bg-premium-carbon group cursor-pointer perspective-1000"
            >
                <div
                    style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
                    className="absolute inset-4 rounded-lg overflow-hidden shadow-2xl"
                >
                    <CloudinaryImage
                        src={imageUrl}
                        alt={altText}
                        width={600}
                        height={400}
                        preset="card"
                        className="transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="text-gold text-xs font-bold tracking-widest uppercase mb-2 block">{car.year}</span>
                        <h3 className="text-3xl font-bold text-white mb-2 font-display">{car.brand} {car.model}</h3>
                        <p className="text-silver/80 text-lg mb-6">{car.price}</p>

                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            <Button variant="outline" size="sm" className="w-full border-white/40 hover:bg-white hover:text-black hover:border-white">
                                Ver Detalhes
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

export function FeaturedCars() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCars() {
            const allCars = await getCars();
            // Show only first 3
            setCars(allCars.slice(0, 3));
            setLoading(false);
        }
        fetchCars();
    }, []);

    return (
        <section className="py-32 bg-premium-black relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[128px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h2 className="text-gold uppercase tracking-[0.2em] mb-4 text-sm font-semibold">
                            Acervo Exclusivo
                        </h2>
                        <h3 className="text-5xl md:text-6xl font-bold text-white font-display">
                            Destaques da Coleção
                        </h3>
                    </motion.div>
                    <Link href="/estoque">
                        <Button variant="link" rightIcon={<ArrowUpRight />} className="text-white mt-8 md:mt-0">
                            Ver Todos os Veículos
                        </Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 perspective-origin-center">
                        {cars.map((car) => (
                            <CarCard key={car.id} car={car} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
