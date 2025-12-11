/**
 * Filter utilities for catalog system
 */

import { Car } from '@/services/cars';

export interface CatalogFilters {
    search: string;
    vehicleType: string[];
    brands: string[];
    models: string[];
    yearRange: [number, number];
    priceRange: [number, number];
    mileageRange: [number, number];
    fuelTypes: string[];
    cylinderCapacity: string[];
    horsePowerRange: [number, number];
}

export type SortOption =
    | 'price-asc'
    | 'price-desc'
    | 'year-asc'
    | 'year-desc'
    | 'mileage-asc'
    | 'mileage-desc'
    | 'recent'
    | 'relevance';

/**
 * Convert price string to number for comparison
 */
export function priceToNumber(priceString: string): number {
    if (!priceString) return 0;

    // Handle "Sob Consulta" or similar
    if (priceString.toLowerCase().includes('consulta')) {
        return 999999999; // High value to sort at end
    }

    // Remove R$, dots, spaces and convert to number
    const cleaned = priceString
        .replace(/R\$/g, '')
        .replace(/\./g, '')
        .replace(/,/g, '.')
        .replace(/\s/g, '')
        .trim();

    return parseFloat(cleaned) || 0;
}

/**
 * Get unique brands from cars array
 */
export function getUniqueBrands(cars: Car[]): string[] {
    const brands = cars.map(car => car.brand).filter(Boolean);
    return Array.from(new Set(brands)).sort();
}

/**
 * Get models for a specific brand
 */
export function getModelsByBrand(cars: Car[], brand: string): string[] {
    const models = cars
        .filter(car => car.brand === brand)
        .map(car => car.model)
        .filter(Boolean);
    return Array.from(new Set(models)).sort();
}

/**
 * Get unique vehicle types
 */
export function getUniqueVehicleTypes(cars: Car[]): string[] {
    const types = cars
        .map(car => car.vehicleType)
        .filter(Boolean) as string[];
    return Array.from(new Set(types));
}

/**
 * Fuzzy search in car properties
 */
export function searchCars(cars: Car[], query: string): Car[] {
    if (!query || query.trim() === '') return cars;

    const searchTerm = query.toLowerCase().trim();

    return cars.filter(car => {
        const searchableText = [
            car.brand,
            car.model,
            car.category,
            car.vehicleType,
            car.year.toString(),
            car.description,
            car.power,
        ].filter(Boolean).join(' ').toLowerCase();

        return searchableText.includes(searchTerm);
    });
}

/**
 * Apply all filters to cars array
 */
export function applyFilters(cars: Car[], filters: CatalogFilters): Car[] {
    let filtered = [...cars];

    // Search term
    if (filters.search) {
        filtered = searchCars(filtered, filters.search);
    }

    // Vehicle type
    if (filters.vehicleType.length > 0) {
        filtered = filtered.filter(car =>
            car.vehicleType && filters.vehicleType.includes(car.vehicleType)
        );
    }

    // Brands
    if (filters.brands.length > 0) {
        filtered = filtered.filter(car =>
            filters.brands.includes(car.brand)
        );
    }

    // Models
    if (filters.models.length > 0) {
        filtered = filtered.filter(car =>
            filters.models.includes(car.model)
        );
    }

    // Year range
    const [minYear, maxYear] = filters.yearRange;
    if (minYear > 1900 || maxYear < 2100) {
        filtered = filtered.filter(car =>
            car.year >= minYear && car.year <= maxYear
        );
    }

    // Price range
    const [minPrice, maxPrice] = filters.priceRange;
    if (minPrice > 0 || maxPrice < 10000000) {
        filtered = filtered.filter(car => {
            const price = priceToNumber(car.price);
            return price >= minPrice && price <= maxPrice;
        });
    }

    // Mileage range
    const [minMileage, maxMileage] = filters.mileageRange;
    if (minMileage > 0 || maxMileage < 500000) {
        filtered = filtered.filter(car =>
            car.km >= minMileage && car.km <= maxMileage
        );
    }

    // Fuel types
    if (filters.fuelTypes.length > 0) {
        filtered = filtered.filter(car =>
            car.fuelType && filters.fuelTypes.includes(car.fuelType)
        );
    }

    // Cylinder capacity (for motos)
    if (filters.cylinderCapacity.length > 0) {
        filtered = filtered.filter(car =>
            car.cylinderCapacity && filters.cylinderCapacity.includes(car.cylinderCapacity)
        );
    }

    // Horse power range (for boats/jetski)
    const [minHP, maxHP] = filters.horsePowerRange;
    if (minHP > 0 || maxHP < 2000) {
        filtered = filtered.filter(car => {
            if (!car.horsePower) return true; // Don't filter if no HP
            return car.horsePower >= minHP && car.horsePower <= maxHP;
        });
    }

    return filtered;
}

/**
 * Apply sorting to cars array
 */
export function applySorting(cars: Car[], sortBy: SortOption): Car[] {
    const sorted = [...cars];

    switch (sortBy) {
        case 'price-asc':
            return sorted.sort((a, b) => priceToNumber(a.price) - priceToNumber(b.price));

        case 'price-desc':
            return sorted.sort((a, b) => priceToNumber(b.price) - priceToNumber(a.price));

        case 'year-asc':
            return sorted.sort((a, b) => a.year - b.year);

        case 'year-desc':
            return sorted.sort((a, b) => b.year - a.year);

        case 'mileage-asc':
            return sorted.sort((a, b) => a.km - b.km);

        case 'mileage-desc':
            return sorted.sort((a, b) => b.km - a.km);

        case 'recent':
            return sorted.sort((a, b) => {
                const aDate = a.createdAt?.toDate?.() || new Date(a.createdAt);
                const bDate = b.createdAt?.toDate?.() || new Date(b.createdAt);
                return bDate.getTime() - aDate.getTime();
            });

        case 'relevance':
        default:
            return sorted;
    }
}

/**
 * Get year range from cars
 */
export function getYearRange(cars: Car[]): [number, number] {
    if (cars.length === 0) return [2000, new Date().getFullYear()];

    const years = cars.map(car => car.year);
    return [Math.min(...years), Math.max(...years)];
}

/**
 * Get price range from cars
 */
export function getPriceRange(cars: Car[]): [number, number] {
    if (cars.length === 0) return [0, 10000000];

    const prices = cars.map(car => priceToNumber(car.price)).filter(p => p < 900000000);
    return [Math.min(...prices), Math.max(...prices)];
}

/**
 * Get mileage range from cars
 */
export function getMileageRange(cars: Car[]): [number, number] {
    if (cars.length === 0) return [0, 500000];

    const mileages = cars.map(car => car.km);
    return [Math.min(...mileages), Math.max(...mileages)];
}

/**
 * Format filter for display
 */
export function formatFilterLabel(key: string, value: any): string {
    switch (key) {
        case 'vehicleType':
            return `Tipo: ${value}`;
        case 'brands':
            return `Marca: ${value}`;
        case 'models':
            return `Modelo: ${value}`;
        case 'fuelTypes':
            return `Combustível: ${value}`;
        case 'cylinderCapacity':
            return `Cilindrada: ${value}`;
        default:
            return String(value);
    }
}
