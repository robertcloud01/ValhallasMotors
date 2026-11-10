import { buildCloudinaryUrl } from "@/lib/cloudinary";

export function resolveImage(src: string) {
  return src.startsWith("/") || src.startsWith("https://") ? src : buildCloudinaryUrl(src);
}
