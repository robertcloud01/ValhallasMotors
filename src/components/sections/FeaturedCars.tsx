"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, Engine, Timer, Trophy } from "@phosphor-icons/react";
import { getCars, type Car } from "@/services/cars";
import Link from "next/link";
import { generateAltText, buildVideoUrl, isCloudinaryUrl } from "@/lib/cloudinary";

function CarCard({ car }: { car: Car }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

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

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.log("Video play suppressed or failed", error);
                });
            }
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    const imageUrl = car.thumbnail || car.images[0];
    const altText = generateAltText(car.brand, car.model, car.year);

    // Video Logic
    let videoUrl = "";
    if (car.video) {
        if (isCloudinaryUrl(car.video)) {
            videoUrl = car.video;
        } else {
            videoUrl = buildVideoUrl(car.video);
        }
    }

    return (
        <Link href={`/estoque/${car.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-full h-[550px] rounded-sm bg-carbon group cursor-pointer perspective-1000 overflow-hidden border border-white/5 hover:border-gold/30 transition-colors duration-500"
            >
                <div
                    style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
                    className="relative w-full h-full flex flex-col"
                >
                    {/* Image & Video Area */}
                    <div className="relative h-[65%] w-full overflow-hidden bg-black">
                        {/* Video Layer */}
                        {videoUrl && (
                            <div className={`absolute inset-0 z-10 transition-opacity duration-700 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                                <video
                                    ref={videoRef}
                                    src={videoUrl}
                                    className="w-full h-full object-cover"
                                    muted
                                    loop
                                    playsInline
                                    preload="none"
                                />
                            </div>
                        )}

                        {/* Image Layer */}
                        <div className={`w-full h-full transition-opacity duration-700 ${isHovered && videoUrl ? 'opacity-0' : 'opacity-100'}`}>
                            <CloudinaryImage
                                src={imageUrl}
                                alt={altText}
                                width={800}
                                height={600}
                                preset="card"
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent opacity-90 pointer-events-none z-20" />

                        {/* Overlay Shine */}
                        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-white/10 to-transparent mix-blend-overlay z-30" />
                    </div>

                    {/* Info Area */}
                    <div className="relative flex-1 p-8 flex flex-col justify-end bg-gradient-to-b from-transparent to-black/40 z-30">
                        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                            <span className="text-gold text-[10px] font-bold tracking-[0.3em] uppercase mb-3 block">
                                {car.year} Collection
                            </span>
                            <h3 className="text-3xl font-display font-bold text-white mb-2 leading-none uppercase tracking-wide">
                                {car.brand} <span className="text-silver">{car.model}</span>
                            </h3>
                            <div className="h-[1px] w-12 bg-gold/50 my-4" />

                            <p className="text-xl text-white font-light tracking-wide">{car.price}</p>
                        </div>

                        {/* Hover Action */}
                        <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-bold">
                            Ver Detalhes <ArrowUpRight weight="bold" />
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
        <section className="py-32 bg-petrol relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-radial from-carbon to-transparent opacity-40 blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-gold uppercase tracking-[0.2em] mb-4 text-xs font-bold flex items-center gap-3">
                            <span className="w-6 h-[1px] bg-gold" /> Acervo Exclusivo
                        </h2>
                        <h3 className="text-5xl md:text-6xl font-bold text-white font-display uppercase tracking-tight">
                            Destaques <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-silver to-white/20">da Coleção</span>
                        </h3>
                    </motion.div>

                    <Link href="/estoque">
                        <Button variant="link" rightIcon={<ArrowUpRight />} className="text-white mt-8 md:mt-0 hover:text-gold transition-colors">
                            Ver Inventário Completo
                        </Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cars.map((car) => (
                            <CarCard key={car.id} car={car} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
