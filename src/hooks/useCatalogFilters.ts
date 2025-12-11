"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Car } from '@/services/cars';
import {
    CatalogFilters,
    SortOption,
    applyFilters,
    applySorting,
    getYearRange,
    getPriceRange,
    getMileageRange
} from '@/lib/filterUtils';

const INITIAL_FILTERS: CatalogFilters = {
    search: '',
    vehicleType: [],
    brands: [],
    models: [],
    yearRange: [1900, 2100],
    priceRange: [0, 10000000],
    mileageRange: [0, 500000],
    fuelTypes: [],
    cylinderCapacity: [],
    horsePowerRange: [0, 2000],
};

interface UseCatalogFiltersReturn {
    // Filters
    filters: CatalogFilters;
    setFilter: <K extends keyof CatalogFilters>(key: K, value: CatalogFilters[K]) => void;
    clearFilters: () => void;
    clearFilter: (key: keyof CatalogFilters) => void;

    // Sorting
    sortBy: SortOption;
    setSortBy: (sort: SortOption) => void;

    // Results
    filteredCars: Car[];
    totalResults: number;

    // Active filters count
    activeFiltersCount: number;

    // Helpers
    hasActiveFilters: boolean;
}

export function useCatalogFilters(allCars: Car[]): UseCatalogFiltersReturn {
    const [filters, setFilters] = useState<CatalogFilters>(INITIAL_FILTERS);
    const [sortBy, setSortBy] = useState<SortOption>('recent');

    // Initialize dynamic ranges based on actual data
    useEffect(() => {
        if (allCars.length > 0) {
            const [minYear, maxYear] = getYearRange(allCars);
            const [minPrice, maxPrice] = getPriceRange(allCars);
            const [minMileage, maxMileage] = getMileageRange(allCars);

            setFilters(prev => ({
                ...prev,
                yearRange: [minYear, maxYear],
                priceRange: [minPrice, maxPrice],
                mileageRange: [minMileage, maxMileage],
            }));
        }
    }, [allCars]);

    // Set individual filter
    const setFilter = useCallback(<K extends keyof CatalogFilters>(
        key: K,
        value: CatalogFilters[K]
    ) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    }, []);

    // Clear all filters
    const clearFilters = useCallback(() => {
        const [minYear, maxYear] = getYearRange(allCars);
        const [minPrice, maxPrice] = getPriceRange(allCars);
        const [minMileage, maxMileage] = getMileageRange(allCars);

        setFilters({
            search: '',
            vehicleType: [],
            brands: [],
            models: [],
            yearRange: [minYear, maxYear],
            priceRange: [minPrice, maxPrice],
            mileageRange: [minMileage, maxMileage],
            fuelTypes: [],
            cylinderCapacity: [],
            horsePowerRange: [0, 2000],
        });
    }, [allCars]);

    // Clear specific filter
    const clearFilter = useCallback((key: keyof CatalogFilters) => {
        setFilters(prev => {
            const newFilters = { ...prev };

            if (Array.isArray(newFilters[key])) {
                (newFilters[key] as any[]) = [];
            } else if (key === 'search') {
                newFilters[key] = '';
            } else if (key.includes('Range')) {
                // Reset ranges to max
                if (key === 'yearRange') {
                    const [min, max] = getYearRange(allCars);
                    newFilters[key] = [min, max] as any;
                } else if (key === 'priceRange') {
                    const [min, max] = getPriceRange(allCars);
                    newFilters[key] = [min, max] as any;
                } else if (key === 'mileageRange') {
                    const [min, max] = getMileageRange(allCars);
                    newFilters[key] = [min, max] as any;
                } else if (key === 'horsePowerRange') {
                    newFilters[key] = [0, 2000] as any;
                }
            }

            return newFilters;
        });
    }, [allCars]);

    // Apply filters and sorting
    const filteredCars = useMemo(() => {
        let result = applyFilters(allCars, filters);
        result = applySorting(result, sortBy);
        return result;
    }, [allCars, filters, sortBy]);

    // Count active filters
    const activeFiltersCount = useMemo(() => {
        let count = 0;

        if (filters.search) count++;
        if (filters.vehicleType.length > 0) count += filters.vehicleType.length;
        if (filters.brands.length > 0) count += filters.brands.length;
        if (filters.models.length > 0) count += filters.models.length;
        if (filters.fuelTypes.length > 0) count += filters.fuelTypes.length;
        if (filters.cylinderCapacity.length > 0) count += filters.cylinderCapacity.length;

        // Check if ranges are modified
        const [minYear, maxYear] = getYearRange(allCars);
        if (filters.yearRange[0] !== minYear || filters.yearRange[1] !== maxYear) count++;

        const [minPrice, maxPrice] = getPriceRange(allCars);
        if (filters.priceRange[0] !== minPrice || filters.priceRange[1] !== maxPrice) count++;

        const [minMileage, maxMileage] = getMileageRange(allCars);
        if (filters.mileageRange[0] !== minMileage || filters.mileageRange[1] !== maxMileage) count++;

        if (filters.horsePowerRange[0] !== 0 || filters.horsePowerRange[1] !== 2000) count++;

        return count;
    }, [filters, allCars]);

    const hasActiveFilters = activeFiltersCount > 0;

    return {
        filters,
        setFilter,
        clearFilters,
        clearFilter,
        sortBy,
        setSortBy,
        filteredCars,
        totalResults: filteredCars.length,
        activeFiltersCount,
        hasActiveFilters,
    };
}
