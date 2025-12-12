import { Car } from "@/services/cars";

export interface FilterState {
    query: string;
    vehicleType: string; // 'all' or 'car', 'moto' etc
    minPrice: string;
    maxPrice: string;
    year: string;
}

export const filterCars = (cars: Car[], filters: FilterState) => {
    return cars.filter(car => {
        // Text Search
        const searchTerms = filters.query.toLowerCase().split(" ");
        const carSearchString = `${car.brand} ${car.model} ${car.category} ${car.year}`.toLowerCase();
        const matchesSearch = searchTerms.every(term => carSearchString.includes(term));

        if (!matchesSearch) return false;

        // Type Filter
        if (filters.vehicleType && filters.vehicleType !== 'all') {
            if (car.vehicleType !== filters.vehicleType) return false;
        }

        // Price Filter
        if (filters.minPrice) {
            const price = parsePrice(car.price);
            if (price < Number(filters.minPrice)) return false;
        }
        if (filters.maxPrice) {
            const price = parsePrice(car.price);
            if (price > Number(filters.maxPrice)) return false;
        }

        // Year Filter
        if (filters.year) {
            if (car.year !== Number(filters.year)) return false;
        }

        return true;
    });
};

export const parsePrice = (priceStr: string) => {
    // R$ 1.500.000 -> 1500000
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(/[^0-9,]/g, '').replace(',', '.')) || 0;
};

export const sortCars = (cars: Car[], sortBy: string) => {
    // sortBy: 'date_desc', 'date_asc', 'price_desc', 'price_asc', 'year_desc', 'year_asc'
    const sorted = [...cars];

    sorted.sort((a, b) => {
        switch (sortBy) {
            case 'price_desc':
                return parsePrice(b.price) - parsePrice(a.price);
            case 'price_asc':
                return parsePrice(a.price) - parsePrice(b.price);
            case 'year_desc':
                return b.year - a.year;
            case 'year_asc':
                return a.year - b.year;
            case 'date_asc':
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            case 'date_desc':
            default:
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
    });

    return sorted;
};
