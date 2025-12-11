"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CloudinaryImage } from '@/components/media/CloudinaryImage';
import { generateAltText } from '@/lib/cloudinary';
import { Car } from '@/services/cars';
import { Gauge, Path, Lightning, Calendar } from '@phosphor-icons/react';

interface VehicleCardProps {
    car: Car;
    index?: number;
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
    },
};

export function VehicleCard({ car, index = 0 }: VehicleCardProps) {
    const imageUrl = car.thumbnail || car.images[0];
    const altText = generateAltText(car.brand, car.model, car.year);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94] as any,
            }}
        >
            <Link href={`/estoque/${car.id}`}>
                <div className="group relative bg-premium-carbon rounded-xl overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                        <CloudinaryImage
                            src={imageUrl}
                            alt={altText}
                            width={600}
                            height={400}
                            preset="card"
                            className="transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                        {/* Badge de tipo */}
                        {car.vehicleType && (
                            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs font-bold uppercase tracking-wider text-gold">
                                {car.vehicleType}
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                        {/* Brand + Model */}
                        <div>
                            <span className="text-gold text-xs font-bold tracking-widest uppercase block mb-1">
                                {car.brand}
                            </span>
                            <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors font-display">
                                {car.model}
                            </h3>
                        </div>

                        {/* Price */}
                        <div className="text-2xl font-bold text-white">
                            {car.price}
                        </div>

                        {/* Specs */}
                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2 text-silver/60 text-sm">
                                <Calendar size={16} className="text-gold" />
                                <span>{car.year}</span>
                            </div>
                            <div className="flex items-center gap-2 text-silver/60 text-sm">
                                <Path size={16} className="text-gold" />
                                <span>{car.km.toLocaleString('pt-BR')} km</span>
                            </div>
                            {car.power && (
                                <div className="flex items-center gap-2 text-silver/60 text-sm col-span-2">
                                    <Lightning size={16} className="text-gold" />
                                    <span>{car.power}</span>
                                </div>
                            )}
                            {car.fuelType && (
                                <div className="flex items-center gap-2 text-silver/60 text-sm col-span-2">
                                    <Gauge size={16} className="text-gold" />
                                    <span>{car.fuelType}</span>
                                </div>
                            )}
                        </div>

                        {/* Hover CTA */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-4">
                            <div className="w-full py-2 px-4 bg-gold/10 border border-gold/30 rounded-lg text-center text-gold font-medium text-sm hover:bg-gold hover:text-black transition-colors">
                                Ver Detalhes
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

/**
 * Skeleton loader for VehicleCard
 */
export function VehicleCardSkeleton() {
    return (
        <div className="bg-premium-carbon rounded-xl overflow-hidden border border-white/5 animate-pulse">
            {/* Image skeleton */}
            <div className="h-64 bg-white/5" />

            {/* Content skeleton */}
            <div className="p-6 space-y-4">
                <div className="space-y-2">
                    <div className="h-3 w-20 bg-white/5 rounded" />
                    <div className="h-6 w-3/4 bg-white/10 rounded" />
                </div>
                <div className="h-8 w-32 bg-white/10 rounded" />
                <div className="grid grid-cols-2 gap-3 pt-4">
                    <div className="h-4 bg-white/5 rounded" />
                    <div className="h-4 bg-white/5 rounded" />
                    <div className="h-4 bg-white/5 rounded col-span-2" />
                </div>
            </div>
        </div>
    );
}
