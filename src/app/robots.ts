import type { MetadataRoute } from "next";
import { publicOrigin } from "@/lib/editorial-seo";

export default function robots(): MetadataRoute.Robots {
  const origin = publicOrigin();
  return origin
    ? { rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] }, sitemap: new URL("/sitemap.xml", origin).href }
    : { rules: { userAgent: "*", disallow: "/" } };
}
