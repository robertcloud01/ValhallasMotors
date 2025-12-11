"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, CaretLeft, CaretRight } from "@phosphor-icons/react";

interface CarGalleryProps {
    images: string[];
}

// Helper to determine image source
const getImageUrl = (src: string) => {
    if (!src) return "/placeholder-car.jpg";
    if (src.startsWith("http")) return src;
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo"}/image/upload/${src}`;
};

export function CarGallery({ images }: CarGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const openLightbox = (index: number) => setSelectedImage(index);
    const closeLightbox = () => setSelectedImage(null);

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImage === null) return;
        setSelectedImage((selectedImage + 1) % images.length);
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImage === null) return;
        setSelectedImage((selectedImage - 1 + images.length) % images.length);
    };

    return (
        <div className="py-12">
            <h3 className="text-2xl font-display font-bold mb-6 text-white">Galeria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`relative cursor-pointer overflow-hidden rounded-lg group ${index === 0 ? "md:col-span-2 md:row-span-2 h-[400px]" : "h-48"}`}
                        onClick={() => openLightbox(index)}
                    >
                        <Image
                            src={getImageUrl(img)}
                            alt={`Car image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-white/10 transition-colors duration-300" />
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={closeLightbox}
                    >
                        <button onClick={closeLightbox} className="absolute top-4 right-4 text-white hover:text-gold p-2">
                            <X size={32} />
                        </button>

                        <button onClick={prevImage} className="absolute left-4 text-white hover:text-gold p-2 hidden md:block">
                            <CaretLeft size={48} />
                        </button>

                        <div className="relative w-full max-w-6xl h-[80vh]">
                            <Image
                                src={getImageUrl(images[selectedImage])}
                                alt="Lightbox image"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <button onClick={nextImage} className="absolute right-4 text-white hover:text-gold p-2 hidden md:block">
                            <CaretRight size={48} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
