"use client";

import { CatalogFilters } from '@/lib/filterUtils';
import { Car } from '@/services/cars';
import { getUniqueBrands, getModelsByBrand, getUniqueVehicleTypes } from '@/lib/filterUtils';
import { useState } from 'react';
import { Car as CarIcon, Motorcycle, Boat, Lightning, CaretDown, CaretUp } from '@phosphor-icons/react';

interface FilterSidebarProps {
    filters: CatalogFilters;
    onFilterChange: <K extends keyof CatalogFilters>(key: K, value: CatalogFilters[K]) => void;
    allCars: Car[];
}

const VEHICLE_TYPE_ICONS: Record<string, React.ReactNode> = {
    car: <CarIcon size={16} />,
    moto: <Motorcycle size={16} />,
    boat: <Boat size={16} />,
    jetski: <Lightning size={16} />,
};

const FUEL_TYPES = ['Gasolina', 'Etanol', 'Flex', 'Diesel', 'Elétrico', 'Híbrido'];
const CYLINDER_OPTIONS = ['125cc', '250cc', '500cc', '600cc', '1000cc', '1200cc+'];

export function FilterSidebar({ filters, onFilterChange, allCars }: FilterSidebarProps) {
    const [expandedSections, setExpandedSections] = useState({
        type: true,
        brand: true,
        fuel: false,
        cylinder: false,
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const uniqueTypes = getUniqueVehicleTypes(allCars);
    const uniqueBrands = getUniqueBrands(allCars);
    const brandModels = filters.brands.length === 1
        ? getModelsByBrand(allCars, filters.brands[0])
        : [];

    const toggleArrayItem = <K extends keyof CatalogFilters>(
        key: K,
        value: string
    ) => {
        const current = filters[key] as string[];
        const updated = current.includes(value)
            ? current.filter(v => v !== value)
            : [...current, value];
        onFilterChange(key, updated as CatalogFilters[K]);
    };

    return (
        <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
            <div className="bg-premium-carbon/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-6 sticky top-24">
                <h3 className="text-gold font-bold uppercase tracking-widest text-xs">
                    Filtros
                </h3>

                {/* Vehicle Type */}
                {uniqueTypes.length > 0 && (
                    <div className="space-y-3">
                        <button
                            onClick={() => toggleSection('type')}
                            className="w-full flex items-center justify-between text-white font-medium text-sm"
                        >
                            <span>Tipo de Veículo</span>
                            {expandedSections.type ? <CaretUp size={16} /> : <CaretDown size={16} />}
                        </button>

                        {expandedSections.type && (
                            <div className="space-y-2">
                                {uniqueTypes.map((type) => (
                                    <label
                                        key={type}
                                        className="flex items-center gap-2 cursor-pointer group"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={filters.vehicleType.includes(type)}
                                            onChange={() => toggleArrayItem('vehicleType', type)}
                                            className="w-4 h-4 rounded border-white/20 bg-white/5 text-gold focus:ring-gold focus:ring-offset-0"
                                        />
                                        <span className="text-sm text-silver/80 group-hover:text-white transition-colors capitalize flex items-center gap-2">
                                            {VEHICLE_TYPE_ICONS[type]}
                                            {type}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Brands */}
                {uniqueBrands.length > 0 && (
                    <div className="space-y-3 border-t border-white/5 pt-6">
                        <button
                            onClick={() => toggleSection('brand')}
                            className="w-full flex items-center justify-between text-white font-medium text-sm"
                        >
                            <span>Marca</span>
                            {expandedSections.brand ? <CaretUp size={16} /> : <CaretDown size={16} />}
                        </button>

                        {expandedSections.brand && (
                            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {uniqueBrands.map((brand) => (
                                    <label
                                        key={brand}
                                        className="flex items-center gap-2 cursor-pointer group"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={filters.brands.includes(brand)}
                                            onChange={() => toggleArrayItem('brands', brand)}
                                            className="w-4 h-4 rounded border-white/20 bg-white/5 text-gold focus:ring-gold focus:ring-offset-0"
                                        />
                                        <span className="text-sm text-silver/80 group-hover:text-white transition-colors">
                                            {brand}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Models (only if 1 brand selected) */}
                {brandModels.length > 0 && (
                    <div className="space-y-3 border-t border-white/5 pt-6">
                        <div className="text-white font-medium text-sm">Modelo</div>
                        <div className="space-y-2">
                            {brandModels.map((model) => (
                                <label
                                    key={model}
                                    className="flex items-center gap-2 cursor-pointer group"
                                >
                                    <input
                                        type="checkbox"
                                        checked={filters.models.includes(model)}
                                        onChange={() => toggleArrayItem('models', model)}
                                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-gold focus:ring-gold focus:ring-offset-0"
                                    />
                                    <span className="text-sm text-silver/80 group-hover:text-white transition-colors">
                                        {model}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {/* Fuel Type */}
                <div className="space-y-3 border-t border-white/5 pt-6">
                    <button
                        onClick={() => toggleSection('fuel')}
                        className="w-full flex items-center justify-between text-white font-medium text-sm"
                    >
                        <span>Combustível</span>
                        {expandedSections.fuel ? <CaretUp size={16} /> : <CaretDown size={16} />}
                    </button>

                    {expandedSections.fuel && (
                        <div className="space-y-2">
                            {FUEL_TYPES.map((fuel) => (
                                <label
                                    key={fuel}
                                    className="flex items-center gap-2 cursor-pointer group"
                                >
                                    <input
                                        type="checkbox"
                                        checked={filters.fuelTypes.includes(fuel)}
                                        onChange={() => toggleArrayItem('fuelTypes', fuel)}
                                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-gold focus:ring-gold focus:ring-offset-0"
                                    />
                                    <span className="text-sm text-silver/80 group-hover:text-white transition-colors">
                                        {fuel}
                                    </span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Cylinder Capacity (for motos) */}
                <div className="space-y-3 border-t border-white/5 pt-6">
                    <button
                        onClick={() => toggleSection('cylinder')}
                        className="w-full flex items-center justify-between text-white font-medium text-sm"
                    >
                        <span>Cilindrada</span>
                        {expandedSections.cylinder ? <CaretUp size={16} /> : <CaretDown size={16} />}
                    </button>

                    {expandedSections.cylinder && (
                        <div className="space-y-2">
                            {CYLINDER_OPTIONS.map((cc) => (
                                <label
                                    key={cc}
                                    className="flex items-center gap-2 cursor-pointer group"
                                >
                                    <input
                                        type="checkbox"
                                        checked={filters.cylinderCapacity.includes(cc)}
                                        onChange={() => toggleArrayItem('cylinderCapacity', cc)}
                                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-gold focus:ring-gold focus:ring-offset-0"
                                    />
                                    <span className="text-sm text-silver/80 group-hover:text-white transition-colors">
                                        {cc}
                                    </span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
