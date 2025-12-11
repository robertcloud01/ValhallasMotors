/**
 * Cloudinary utility functions for image and video transformations
 */

export interface CloudinaryTransformOptions {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'scale' | 'limit';
    gravity?: 'auto' | 'face' | 'center';
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'avif' | 'jpg';
}

/**
 * Get Cloudinary cloud name from environment
 */
export const getCloudName = (): string => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
        console.warn('⚠️ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME not configured');
        return 'demo';
    }
    return cloudName;
};

/**
 * Get upload preset from environment
 */
export const getUploadPreset = (): string => {
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!preset) {
        console.warn('⚠️ NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET not configured');
        return '';
    }
    return preset;
};

/**
 * Build Cloudinary URL with transformations
 */
export const buildCloudinaryUrl = (
    publicId: string,
    options: CloudinaryTransformOptions = {}
): string => {
    if (!publicId) return '';

    const {
        width,
        height,
        crop = 'fill',
        gravity = 'auto',
        quality = 'auto',
        format = 'auto',
    } = options;

    const cloudName = getCloudName();
    const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;

    const transformations: string[] = [];

    // Format and quality (always first for best optimization)
    transformations.push(`f_${format}`);
    transformations.push(`q_${quality}`);

    // Dimensions
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);

    // Crop and gravity
    if (width || height) {
        transformations.push(`c_${crop}`);
        transformations.push(`g_${gravity}`);
    }

    const transformString = transformations.join(',');
    return `${baseUrl}/${transformString}/${publicId}`;
};

/**
 * Build video URL with transformations
 */
export const buildVideoUrl = (
    publicId: string,
    options: { width?: number; quality?: 'auto' | number } = {}
): string => {
    if (!publicId) return '';

    const { width = 2000, quality = 'auto' } = options;
    const cloudName = getCloudName();
    const baseUrl = `https://res.cloudinary.com/${cloudName}/video/upload`;

    const transformations = [
        'f_auto',
        `q_${quality}`,
        'vc_auto', // video codec auto
        `w_${width}`,
    ].join(',');

    return `${baseUrl}/${transformations}/${publicId}`;
};

/**
 * Get video poster (thumbnail) URL
 */
export const getVideoPoster = (publicId: string): string => {
    if (!publicId) return '';

    const cloudName = getCloudName();
    return `https://res.cloudinary.com/${cloudName}/video/upload/f_jpg,q_auto,w_1600/${publicId}.jpg`;
};

/**
 * Preset transformations for different contexts
 */
export const cloudinaryPresets = {
    thumbnail: { width: 300, height: 200, crop: 'fill', gravity: 'auto' } as CloudinaryTransformOptions,
    card: { width: 600, height: 400, crop: 'fill', gravity: 'auto' } as CloudinaryTransformOptions,
    gallery: { width: 2000, height: 1400, crop: 'fill', gravity: 'auto' } as CloudinaryTransformOptions,
    hero: { width: 2400, height: 1400, crop: 'fill', gravity: 'auto' } as CloudinaryTransformOptions,
    detail: { width: 1600, crop: 'limit' } as CloudinaryTransformOptions,
};

/**
 * Generate alt text for SEO
 */
export const generateAltText = (brand: string, model: string, year?: number): string => {
    const yearText = year ? ` ${year}` : '';
    return `${brand} ${model}${yearText} — Concessionária Premium`;
};

/**
 * Extract public ID from Cloudinary URL
 */
export const extractPublicId = (url: string): string => {
    if (!url) return '';

    // Match pattern: .../upload/v123456/path/to/image.ext or .../upload/path/to/image.ext
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/);
    return match ? match[1] : url;
};

/**
 * Check if URL is a Cloudinary URL
 */
export const isCloudinaryUrl = (url: string): boolean => {
    return url.includes('cloudinary.com') || url.includes('res.cloudinary.com');
};
