import type { Metadata } from "next";

export function publicOrigin() {
  const configured = process.env.VALHALLAS_SITE_URL;
  if (!configured) return undefined;
  try {
    const url = new URL(configured);
    if (url.protocol === "https:") return new URL(url.origin);
  } catch {
    return undefined;
  }
}

export function pageMetadata(title: string, description: string, path?: string, image = "/editorial/forma-em-movimento.webp"): Metadata {
  const origin = publicOrigin();
  return {
    title,
    description,
    ...(origin && path ? { alternates: { canonical: path } } : {}),
    openGraph: {
      title: `${title} | Valhallas Motors`,
      description,
      ...(origin && path ? { url: path } : {}),
      ...(origin ? { images: [image] } : {}),
      type: "website",
      locale: "pt_BR",
      siteName: "Valhallas Motors",
    },
  };
}
