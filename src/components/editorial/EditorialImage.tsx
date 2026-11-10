import Image from "next/image";
import type { Photograph } from "@/lib/editorial";

export function EditorialImage({ photo, sizes, priority = false }: {
  photo?: Photograph;
  sizes: string;
  priority?: boolean;
}) {
  if (!photo) return <div className="vm-media-empty">Fotografia indisponível</div>;
  return <Image src={photo.src} alt={photo.alt} fill sizes={sizes} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} />;
}

export function PhotoCredit({ photo }: { photo?: Photograph }) {
  if (!photo?.credit) return null;
  const { author, source, license } = photo.credit;
  const licenseUrl = license === "BY-SA 4.0"
    ? "https://creativecommons.org/licenses/by-sa/4.0/"
    : "https://creativecommons.org/licenses/by/2.0/";
  return <span className="vm-credit">Foto de <a href={source}>{author}</a> · <a href={licenseUrl}>CC {license}</a> · redimensionada e recortada na apresentação</span>;
}
