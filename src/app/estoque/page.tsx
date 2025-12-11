"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getCars, Car } from "@/services/cars";
import { useCatalogFilters } from "@/hooks/useCatalogFilters";
import { SearchBar } from "@/components/catalog/SearchBar";
import { FilterSidebar } from "@/components/catalog/FilterSidebar";
import { FilterTags } from "@/components/catalog/FilterTags";
import { SortOptions } from "@/components/catalog/SortOptions";
import { VehicleCard, VehicleCardSkeleton } from "@/components/catalog/VehicleCard";

export const dynamic = "force-dynamic";

export default function CatalogPage() {
    const [allCars, setAllCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch all cars
    useEffect(() => {
        async function fetchCars() {
            const data = await getCars();
            setAllCars(data);
            setLoading(false);
        }
        fetchCars();
    }, []);

    // Use catalog filters hook
    const {
        filters,
        setFilter,
        clearFilter,
        clearFilters,
        sortBy,
        setSortBy,
        filteredCars,
        totalResults,
        activeFiltersCount,
    } = useCatalogFilters(allCars);

    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            {/* Header with Search */}
            <div className="pt-32 pb-8 bg-premium-carbon border-b border-white/5">
                <div className="container mx-auto px-6 space-y-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
                            Nosso Catálogo
                        </h1>
                        <p className="text-silver/60">
                            Explore a coleção mais exclusiva do país
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="flex justify-center md:justify-start">
                        <SearchBar
                            allCars={allCars}
                            searchTerm={filters.search}
                            onSearchChange={(term) => setFilter('search', term)}
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <FilterSidebar
                        filters={filters}
                        onFilterChange={setFilter}
                        allCars={allCars}
                    />

                    {/* Results */}
                    <div className="flex-1 space-y-6">
                        {/* Filter Tags + Sort */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <FilterTags
                                filters={filters}
                                onClearFilter={clearFilter}
                                onClearAll={clearFilters}
                                activeCount={activeFiltersCount}
                            />

                            <div className="flex items-center gap-4 ml-auto">
                                <div className="text-sm text-silver/60">
                                    {totalResults} {totalResults === 1 ? 'veículo' : 'veículos'}
                                </div>
                                <SortOptions sortBy={sortBy} onChange={setSortBy} />
                            </div>
                        </div>

                        {/* Grid */}
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <VehicleCardSkeleton key={i} />
                                ))}
                            </div>
                        ) : filteredCars.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredCars.map((car, index) => (
                                    <VehicleCard key={car.id} car={car} index={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    Nenhum veículo encontrado
                                </h3>
                                <p className="text-silver/60 mb-6">
                                    Tente ajustar os filtros ou fazer uma nova busca
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-3 bg-gold hover:bg-gold/80 text-black font-bold rounded-lg transition-colors"
                                >
                                    Limpar Filtros
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
