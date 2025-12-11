"use client";

import { X } from '@phosphor-icons/react';
import { CatalogFilters, formatFilterLabel } from '@/lib/filterUtils';

interface FilterTagsProps {
    filters: CatalogFilters;
    onClearFilter: (key: keyof CatalogFilters) => void;
    onClearAll: () => void;
    activeCount: number;
}

export function FilterTags({ filters, onClearFilter, onClearAll, activeCount }: FilterTagsProps) {
    if (activeCount === 0) return null;

    const tags: { key: keyof CatalogFilters; label: string }[] = [];

    // Search
    if (filters.search) {
        tags.push({ key: 'search', label: `"${filters.search}"` });
    }

    // Vehicle types
    filters.vehicleType.forEach((type) => {
        tags.push({ key: 'vehicleType', label: formatFilterLabel('vehicleType', type) });
    });

    // Brands
    filters.brands.forEach((brand) => {
        tags.push({ key: 'brands', label: formatFilterLabel('brands', brand) });
    });

    // Models
    filters.models.forEach((model) => {
        tags.push({ key: 'models', label: formatFilterLabel('models', model) });
    });

    // Fuel types
    filters.fuelTypes.forEach((fuel) => {
        tags.push({ key: 'fuelTypes', label: formatFilterLabel('fuelTypes', fuel) });
    });

    // Cylinder capacity
    filters.cylinderCapacity.forEach((cc) => {
        tags.push({ key: 'cylinderCapacity', label: formatFilterLabel('cylinderCapacity', cc) });
    });

    return (
        <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-silver/60">Filtros ativos:</span>

            {tags.map((tag, index) => (
                <button
                    key={`${tag.key}-${index}`}
                    onClick={() => onClearFilter(tag.key)}
                    className="group flex items-center gap-2 px-3 py-1.5 bg-gold/10 hover:bg-gold/20 border border-gold/30 
                   rounded-full text-sm text-gold transition-all hover:scale-105"
                >
                    <span>{tag.label}</span>
                    <X size={14} className="group-hover:rotate-90 transition-transform" />
                </button>
            ))}

            {activeCount > 1 && (
                <button
                    onClick={onClearAll}
                    className="px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full 
                   text-sm text-white transition-all"
                >
                    Limpar Tudo
                </button>
            )}
        </div>
    );
}
