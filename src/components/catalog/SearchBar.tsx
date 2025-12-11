"use client";

import { useState, useRef, useEffect } from 'react';
import { MagnifyingGlass, X } from '@phosphor-icons/react';
import { Car } from '@/services/cars';
import { searchCars } from '@/lib/filterUtils';
import Link from 'next/link';
import { CloudinaryImage } from '@/components/media/CloudinaryImage';

interface SearchBarProps {
    allCars: Car[];
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

export function SearchBar({ allCars, searchTerm, onSearchChange }: SearchBarProps) {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState<Car[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Debounced search
    useEffect(() => {
        if (searchTerm.length >= 2) {
            const results = searchCars(allCars, searchTerm).slice(0, 8);
            setSuggestions(results);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [searchTerm, allCars]);

    // Click outside to close
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !inputRef.current?.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-full max-w-2xl">
            {/* Search Input */}
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-silver/40">
                    <MagnifyingGlass size={20} />
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    placeholder="Buscar por marca, modelo, tipo..."
                    className="w-full h-14 pl-12 pr-12 rounded-xl bg-premium-carbon/70 backdrop-blur-xl border border-white/10 
                   text-white placeholder:text-silver/40 focus:outline-none focus:border-gold/50 transition-all"
                />
                {searchTerm && (
                    <button
                        onClick={() => {
                            onSearchChange('');
                            setShowSuggestions(false);
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-silver/40 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Autocomplete Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
                <div
                    ref={dropdownRef}
                    className="absolute top-full mt-2 w-full bg-premium-carbon/95 backdrop-blur-xl border border-white/10 
                   rounded-xl overflow-hidden shadow-2xl z-50 max-h-96 overflow-y-auto"
                >
                    {suggestions.map((car) => (
                        <Link
                            key={car.id}
                            href={`/estoque/${car.id}`}
                            onClick={() => setShowSuggestions(false)}
                            className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                        >
                            {/* Miniature */}
                            <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                                {car.images[0] && (
                                    <CloudinaryImage
                                        src={car.images[0]}
                                        alt={`${car.brand} ${car.model}`}
                                        width={80}
                                        height={56}
                                        preset="thumbnail"
                                    />
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold text-white truncate">
                                    {car.brand} {car.model}
                                </div>
                                <div className="text-xs text-silver/60">
                                    {car.year} • {car.price}
                                </div>
                            </div>

                            {/* Type badge */}
                            {car.vehicleType && (
                                <div className="text-[10px] uppercase font-bold text-gold px-2 py-1 bg-gold/10 rounded">
                                    {car.vehicleType}
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
