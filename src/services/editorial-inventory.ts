import "server-only";

import { cache } from "react";
import { connection } from "next/server";
import { edition, type EditorialVehicle } from "@/lib/editorial";
import { getCarById, getCars, type Car } from "@/services/cars";
import { resolveImage } from "@/lib/editorial-media";

export const liveInventory = process.env.VALHALLAS_INVENTORY_MODE === "live";

function presentCar(car: Car): EditorialVehicle {
  const name = `${car.brand} ${car.model}`;
  const images = Array.from(new Set([car.thumbnail, ...(car.images ?? [])].filter((src): src is string => Boolean(src))));
  return {
    id: car.id,
    brand: car.brand,
    model: car.model,
    year: car.year,
    category: car.category,
    engine: car.fuelType ?? "",
    power: car.power,
    chapter: "Coleção",
    description: car.description,
    photos: images.map((src, index) => ({ src: resolveImage(src), alt: `${name}, fotografia ${index + 1}` })),
  };
}

export const inventory = cache(async () => {
  if (!liveInventory) return edition;
  await connection();
  return (await getCars({ requireLive: true })).filter((car) => car.status !== "inactive" && car.status !== "sold").map(presentCar);
});

export const vehicleById = cache(async (id: string) => {
  if (!liveInventory) {
    const legacyIds: Record<string, string> = { "2": "lamborghini-revuelto" };
    return edition.find((car) => car.id === (legacyIds[id] ?? id)) ?? null;
  }

  await connection();
  const car = await getCarById(id, { requireLive: true });
  return car && car.status !== "inactive" && car.status !== "sold" ? presentCar(car) : null;
});
