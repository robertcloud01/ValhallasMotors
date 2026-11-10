import type { MetadataRoute } from "next";
import { publicOrigin } from "@/lib/editorial-seo";
import { inventory } from "@/services/editorial-inventory";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = publicOrigin();
  if (!origin) return [];
  const cars = await inventory();
  const paths = ["/", "/estoque", "/sobre", "/contato", "/privacidade", "/termos", ...cars.map((car) => `/estoque/${encodeURIComponent(car.id)}`)];
  return paths.map((path) => ({ url: new URL(path, origin).href }));
}
