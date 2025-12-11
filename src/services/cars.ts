import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, doc, getDoc } from "firebase/firestore";

export interface Car {
    id: string;
    model: string;
    brand: string;
    price: string;
    year: number;
    km: number;
    power: string;
    description: string;
    images: string[];  // Cloudinary public IDs or full URLs
    thumbnail?: string; // Main image
    video?: string;    // Cloudinary public ID for video (optional)
    category: string;
    vehicleType?: 'car' | 'moto' | 'truck' | 'boat' | 'jetski' | 'utv' | 'suv' | 'pickup' | 'supercar';
    createdAt: any;

    // Optional fields for advanced filtering
    fuelType?: 'Gasolina' | 'Etanol' | 'Flex' | 'Diesel' | 'Elétrico' | 'Híbrido';
    cylinderCapacity?: string; // "125cc", "600cc", "1000cc", etc
    horsePower?: number; // For boats/jetski
    engineType?: string; // For boats
    transmissionType?: 'Manual' | 'Automática' | 'CVT';
}

export const getCars = async (): Promise<Car[]> => {
    // Return mock data if Firebase not configured
    if (!db) {
        console.warn('⚠️ Firebase não configurado, usando dados mock');
        return MOCK_CARS;
    }

    try {
        const carsRef = collection(db, "cars");
        const q = query(carsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Car[];
    } catch (error) {
        console.error("Error fetching cars:", error);
        // Return mock data if firebase fails (e.g. no keys)
        return MOCK_CARS;
    }
};

export const getCarById = async (id: string): Promise<Car | null> => {
    // Return mock data if Firebase not configured
    if (!db) {
        console.warn('⚠️ Firebase não configurado, usando dados mock');
        return MOCK_CARS.find(c => c.id === id) || null;
    }

    try {
        const docRef = doc(db, "cars", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Car;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching car:", error);
        return MOCK_CARS.find(c => c.id === id) || null;
    }
};

const MOCK_CARS: Car[] = [
    // SUPERCARROS
    { id: "1", brand: "Ferrari", model: "SF90 Stradale", price: "R$ 6.500.000", year: 2024, km: 1500, power: "1000 cv", description: "Híbrido V8 plug-in, primeiro supercarro híbrido da Ferrari", images: ["https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2070"], category: "Supercar", vehicleType: "supercar", fuelType: "Híbrido", createdAt: new Date("2024-12-01") },
    { id: "2", brand: "Lamborghini", model: "Revuelto", price: "R$ 8.900.000", year: 2025, km: 500, power: "1015 cv", description: "Primeiro V12 híbrido da Lamborghini", images: ["https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2070"], category: "Supercar", vehicleType: "supercar", fuelType: "Híbrido", createdAt: new Date("2024-12-05") },
    { id: "3", brand: "Porsche", model: "911 GT3 RS", price: "R$ 2.900.000", year: 2024, km: 3200, power: "525 cv", description: "Motor 4.0 boxer de 6 cilindros aspirado", images: ["https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070"], category: "Supercar", vehicleType: "supercar", fuelType: "Gasolina", createdAt: new Date("2024-11-28") },
    { id: "4", brand: "McLaren", model: "750S", price: "R$ 5.200.000", year: 2024, km: 800, power: "750 cv", description: "V8 biturbo 4.0, 0-100 km/h em 2.8s", images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070"], category: "Supercar", vehicleType: "supercar", fuelType: "Gasolina", createdAt: new Date("2024-12-02") },
    { id: "5", brand: "Aston Martin", model: "DBS 770 Ultimate", price: "R$ 4.800.000", year: 2023, km: 5400, power: "770 cv", description: "V12 biturbo 5.2, exclusividade britânica", images: ["https://images.unsplash.com/photo-1610768764270-790fbec18178?q=80&w=2070"], category: "Supercar", vehicleType: "supercar", fuelType: "Gasolina", createdAt: new Date("2024-11-25") },
    { id: "6", brand: "Bugatti", model: "Chiron Super Sport", price: "Sob Consulta", year: 2024, km: 200, power: "1600 cv", description: "W16 quad-turbo 8.0, velocidade máxima 440 km/h", images: ["https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2070"], category: "Supercar", vehicleType: "supercar", fuelType: "Gasolina", createdAt: new Date("2024-12-08") },

    // SUVS DE LUXO
    { id: "7", brand: "Rolls-Royce", model: "Cullinan", price: "R$ 5.400.000", year: 2024, km: 2100, power: "571 cv", description: "O SUV mais luxuoso do mundo, V12 biturbo", images: ["https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=2070"], category: "SUV", vehicleType: "suv", fuelType: "Gasolina", createdAt: new Date("2024-12-03") },
    { id: "8", brand: "Bentley", model: "Bentayga Speed", price: "R$ 3.900.000", year: 2024, km: 1800, power: "635 cv", description: "W12 6.0 biturbo, o SUV mais rápido do mundo", images: ["https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2070"], category: "SUV", vehicleType: "suv", fuelType: "Gasolina", createdAt: new Date("2024-11-30") },
    { id: "9", brand: "Lamborghini", model: "Urus Performante", price: "R$ 3.500.000", year: 2024, km: 4200, power: "666 cv", description: "V8 biturbo 4.0, 0-100 km/h em 3.3s", images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2070"], category: "SUV", vehicleType: "suv", fuelType: "Gasolina", createdAt: new Date("2024-11-27") },
    { id: "10", brand: "Range Rover", model: "Sport SVR", price: "R$ 1.650.000", year: 2024, km: 7800, power: "575 cv", description: "V8 supercharged 5.0, luxo off-road", images: ["https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2070"], category: "SUV", vehicleType: "suv", fuelType: "Gasolina", createdAt: new Date("2024-11-23") },

    // SEDANS EXECUTIVOS
    { id: "11", brand: "Mercedes-Benz", model: "S 63 AMG", price: "R$ 2.200.000", year: 2024, km: 6800, power: "612 cv", description: "V8 biturbo 4.0, luxo e performance", images: ["https://images.unsplash.com/photo-1618843479619-f3d9d906821b?q=80&w=2070"], category: "Sedan", vehicleType: "car", fuelType: "Gasolina", transmissionType: "Automática", createdAt: new Date("2024-11-22") },
    { id: "12", brand: "BMW", model: "M760Li xDrive", price: "R$ 1.900.000", year: 2023, km: 12400, power: "585 cv", description: "V12 biturbo 6.6, requinte absoluto", images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070"], category: "Sedan", vehicleType: "car", fuelType: "Gasolina", transmissionType: "Automática", createdAt: new Date("2024-11-20") },
    { id: "13", brand: "Audi", model: "RS7 Sportback", price: "R$ 1.450.000", year: 2024, km: 8200, power: "600 cv", description: "V8 biturbo 4.0, design alemão", images: ["https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=2070"], category: "Sedan", vehicleType: "car", fuelType: "Gasolina", transmissionType: "Automática", createdAt: new Date("2024-11-18") },
    { id: "14", brand: "Maserati", model: "Quattroporte Trofeo", price: "R$ 1.280.000", year: 2023, km: 15600, power: "580 cv", description: "V8 biturbo 3.8, esportividade italiana", images: ["https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=2070"], category: "Sedan", vehicleType: "car", fuelType: "Gasolina", transmissionType: "Automática", createdAt: new Date("2024-11-15") },

    // MOTOS PREMIUM
    { id: "15", brand: "Ducati", model: "Panigale V4 R", price: "R$ 280.000", year: 2024, km: 850, power: "234 cv", description: "998cc V4, DNA de MotoGP", images: ["https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070"], category: "Esportiva", vehicleType: "moto", fuelType: "Gasolina", cylinderCapacity: "1000cc", createdAt: new Date("2024-12-04") },
    { id: "16", brand: "BMW", model: "S 1000 RR", price: "R$ 145.000", year: 2024, km: 1200, power: "210 cv", description: "999cc inline-4, tecnologia alemã", images: ["https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=2070"], category: "Esportiva", vehicleType: "moto", fuelType: "Gasolina", cylinderCapacity: "1000cc", createdAt: new Date("2024-11-29") },
    { id: "17", brand: "Harley-Davidson", model: "CVO Road Glide", price: "R$ 210.000", year: 2024, km: 3400, power: "125 cv", description: "117ci Milwaukee-Eight, custom de fábrica", images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070"], category: "Touring", vehicleType: "moto", fuelType: "Gasolina", cylinderCapacity: "1200cc+", createdAt: new Date("2024-11-26") },
    { id: "18", brand: "Kawasaki", model: "Ninja H2R", price: "R$ 320.000", year: 2024, km: 400, power: "310 cv", description: "998cc supercharged, exclusivo para pista", images: ["https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070"], category: "Esportiva", vehicleType: "moto", fuelType: "Gasolina", cylinderCapacity: "1000cc", createdAt: new Date("2024-12-06") },
    { id: "19", brand: "Yamaha", model: "YZF-R1M", price: "R$ 135.000", year: 2024, km: 2100, power: "200 cv", description: "998cc inline-4, edição limitada", images: ["https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=2070"], category: "Esportiva", vehicleType: "moto", fuelType: "Gasolina", cylinderCapacity: "1000cc", createdAt: new Date("2024-11-24") },
    { id: "20", brand: "Aprilia", model: "RSV4 Factory", price: "R$ 165.000", year: 2024, km: 1650, power: "217 cv", description: "1099cc V4, tecnologia de corrida", images: ["https://images.unsplash.com/photo-1558979158-65a1eaa08691?q=80&w=2070"], category: "Esportiva", vehicleType: "moto", fuelType: "Gasolina", cylinderCapacity: "1000cc", createdAt: new Date("2024-11-21") },
    { id: "21", brand: "MV Agusta", model: "F4 RR", price: "R$ 295.000", year: 2024, km: 580, power: "212 cv", description: "998cc inline-4, arte italiana", images: ["https://images.unsplash.com/photo-1558518736-4e6fad4ddf23?q=80&w=2070"], category: "Esportiva", vehicleType: "moto", fuelType: "Gasolina", cylinderCapacity: "1000cc", createdAt: new Date("2024-11-19") },
    { id: "22", brand: "Triumph", model: "Rocket 3 R", price: "R$ 118.000", year: 2024, km: 4200, power: "167 cv", description: "2500cc inline-3, maior motor produzido", images: ["https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?q=80&w=2070"], category: "Cruiser", vehicleType: "moto", fuelType: "Gasolina", cylinderCapacity: "1200cc+", createdAt: new Date("2024-11-17") },

    // LANCHAS DE LUXO
    { id: "23", brand: "Azimut", model: "Grande 35 Metri", price: "R$ 45.000.000", year: 2024, km: 120, power: "4000 cv", description: "35 metros de puro luxo italiano, 4 suítes", images: ["https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2070"], category: "Iate", vehicleType: "boat", horsePower: 4000, engineType: "MAN V12", createdAt: new Date("2024-12-07") },
    { id: "24", brand: "Ferretti", model: "1000", price: "R$ 95.000.000", year: 2024, km: 85, power: "8000 cv", description: "Superyacht de 30 metros, heliponto", images: ["https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=2070"], category: "Iate", vehicleType: "boat", horsePower: 8000, engineType: "MTU 16V", createdAt: new Date("2024-12-08") },
    { id: "25", brand: "Sunseeker", model: "Predator 65", price: "R$ 18.500.000", year: 2023, km: 450, power: "2600 cv", description: "20 metros, design britânico, 3 cabines", images: ["https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=2070"], category: "Lancha", vehicleType: "boat", horsePower: 2600, engineType: "MAN V12", createdAt: new Date("2024-11-24") },
    { id: "26", brand: "Princess", model: "Y85", price: "R$ 28.000.000", year: 2024, km: 180, power: "3600 cv", description: "25 metros, flybridge de luxo", images: ["https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=2070"], category: "Iate", vehicleType: "boat", horsePower: 3600, engineType: "MAN V12", createdAt: new Date("2024-11-22") },
    { id: "27", brand: "Riva", model: "88 Florida", price: "R$ 32.000.000", year: 2024, km: 95, power: "4200 cv", description: "27 metros, tradição italiana desde 1842", images: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070"], category: "Iate", vehicleType: "boat", horsePower: 4200, engineType: "MTU 16V", createdAt: new Date("2024-11-20") },

    // JET SKIS PREMIUM
    { id: "28", brand: "Sea-Doo", model: "RXP-X 325", price: "R$ 135.000", year: 2024, km: 45, power: "325 cv", description: "Supercharged 1630cc, o jet ski mais rápido", images: ["https://images.unsplash.com/photo-1624724531037-6b4115b98681?q=80&w=2070"], category: "Jet Ski", vehicleType: "jetski", horsePower: 325, createdAt: new Date("2024-12-09") },
    { id: "29", brand: "Yamaha", model: "GP1800R SVHO", price: "R$ 98.000", year: 2024, km: 28, power: "250 cv", description: "1812cc supercharged, tecnologia japonesa", images: ["https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070"], category: "Jet Ski", vehicleType: "jetski", horsePower: 250, createdAt: new Date("2024-12-10") },
    { id: "30", brand: "Kawasaki", model: "Ultra 310LX", price: "R$ 112.000", year: 2024, km: 62, power: "310 cv", description: "1498cc supercharged, luxo e potência", images: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070"], category: "Jet Ski", vehicleType: "jetski", horsePower: 310, createdAt: new Date("2024-11-18") },

    // CAMINHÕES PREMIUM
    { id: "31", brand: "Scania", model: "R 730 V8", price: "R$ 1.200.000", year: 2024, km: 45000, power: "730 cv", description: "V8 16.4 litros, o caminhão mais potente", images: ["https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070"], category: "Cavalo Mecânico", vehicleType: "truck", fuelType: "Diesel", transmissionType: "Automática", createdAt: new Date("2024-11-15") },
    { id: "32", brand: "Volvo", model: "FH16 750", price: "R$ 1.450.000", year: 2024, km: 28000, power: "750 cv", description: "D16 16.1 litros, conforto sueco", images: ["https://images.unsplash.com/photo-1586024679734-1348e1a8b6bf?q=80&w=2070"], category: "Cavalo Mecânico", vehicleType: "truck", fuelType: "Diesel", transmissionType: "Automática", createdAt: new Date("2024-11-12") },
    { id: "33", brand: "Mercedes-Benz", model: "Actros 2646", price: "R$ 980.000", year: 2024, km: 52000, power: "460 cv", description: "Motor OM 473 12.8 litros, tecnologia alemã", images: ["https://images.unsplash.com/photo-1622137999655-70c7989b2e01?q=80&w=2070"], category: "Cavalo Mecânico", vehicleType: "truck", fuelType: "Diesel", transmissionType: "Automática", createdAt: new Date("2024-11-10") },

    // PICAPES DE LUXO
    { id: "34", brand: "Ford", model: "F-150 Raptor R", price: "R$ 650.000", year: 2024, km: 8500, power: "720 cv", description: "V8 supercharged 5.2, off-road extremo", images: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070"], category: "Picape", vehicleType: "pickup", fuelType: "Gasolina", transmissionType: "Automática", createdAt: new Date("2024-11-10") },
    { id: "35", brand: "Ram", model: "TRX", price: "R$ 780.000", year: 2024, km: 6200, power: "710 cv", description: "V8 supercharged 6.2 Hellcat, monster truck", images: ["https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=2070"], category: "Picape", vehicleType: "pickup", fuelType: "Gasolina", transmissionType: "Automática", createdAt: new Date("2024-11-08") },
    { id: "36", brand: "Chevrolet", model: "Silverado ZR2", price: "R$ 420.000", year: 2024, km: 11200, power: "420 cv", description: "V8 6.2, suspensão Multimatic", images: ["https://images.unsplash.com/photo-1627454820516-cfa1d66c2bec?q=80&w=2070"], category: "Picape", vehicleType: "pickup", fuelType: "Gasolina", transmissionType: "Automática", createdAt: new Date("2024-11-06") },

    // ELÉTRICOS DE LUXO
    { id: "37", brand: "Tesla", model: "Model S Plaid", price: "R$ 1.200.000", year: 2024, km: 15000, power: "1020 cv", description: "Tri-motor elétrico, 0-100 km/h em 2.1s", images: ["https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070"], category: "Sedan", vehicleType: "car", fuelType: "Elétrico", transmissionType: "Automática", createdAt: new Date("2024-11-05") },
    { id: "38", brand: "Porsche", model: "Taycan Turbo S", price: "R$ 1.450.000", year: 2024, km: 8900, power: "761 cv", description: "Elétrico de performance, tecnologia alemã", images: ["https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=2070"], category: "Sedan", vehicleType: "car", fuelType: "Elétrico", transmissionType: "Automática", createdAt: new Date("2024-11-02") },
    { id: "39", brand: "Lucid", model: "Air Sapphire", price: "R$ 1.650.000", year: 2024, km: 5200, power: "1234 cv", description: "Tri-motor elétrico, luxo californiano", images: ["https://images.unsplash.com/photo-1625231334168-35067f8853ed?q=80&w=2070"], category: "Sedan", vehicleType: "car", fuelType: "Elétrico", transmissionType: "Automática", createdAt: new Date("2024-10-30") },
    { id: "40", brand: "Audi", model: "e-tron GT RS", price: "R$ 1.180.000", year: 2024, km: 7400, power: "646 cv", description: "Elétrico esportivo, design alemão", images: ["https://images.unsplash.com/photo-1606220588917-b96cf73fffe9?q=80&w=2070"], category: "Sedan", vehicleType: "car", fuelType: "Elétrico", transmissionType: "Automática", createdAt: new Date("2024-10-28") },
];
