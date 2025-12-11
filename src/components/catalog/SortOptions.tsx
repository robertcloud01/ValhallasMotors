"use client";

import { SortOption } from '@/lib/filterUtils';
import { CaretDown } from '@phosphor-icons/react';
import { useState, useRef, useEffect } from 'react';

interface SortOptionsProps {
    sortBy: SortOption;
    onChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: 'relevance', label: 'Mais Relevante' },
    { value: 'recent', label: 'Mais Recente' },
    { value: 'price-asc', label: 'Menor Preço' },
    { value: 'price-desc', label: 'Maior Preço' },
    { value: 'year-desc', label: 'Ano Mais Novo' },
    { value: 'year-asc', label: 'Ano Mais Antigo' },
    { value: 'mileage-asc', label: 'Menor Quilometragem' },
    { value: 'mileage-desc', label: 'Maior Quilometragem' },
];

export function SortOptions({ sortBy, onChange }: SortOptionsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLabel = SORT_OPTIONS.find(opt => opt.value === sortBy)?.label || 'Ordenar';

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-premium-carbon border border-white/10 rounded-lg 
                 text-white hover:border-gold/30 transition-colors"
            >
                <span className="text-sm">Ordenar: {currentLabel}</span>
                <CaretDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 right-0 w-56 bg-premium-carbon/95 backdrop-blur-xl border border-white/10 
                      rounded-lg overflow-hidden shadow-2xl z-50">
                    {SORT_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm transition-colors border-b border-white/5 last:border-0
                ${sortBy === option.value
                                    ? 'bg-gold/10 text-gold font-medium'
                                    : 'text-white hover:bg-white/5'
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
