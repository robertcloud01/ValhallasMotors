"use client";

import { CldImage } from 'next-cloudinary';
import { useState } from 'react';
import { buildCloudinaryUrl, extractPublicId, isCloudinaryUrl, type CloudinaryTransformOptions } from '@/lib/cloudinary';

interface CloudinaryImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    preset?: 'thumbnail' | 'card' | 'gallery' | 'hero' | 'detail';
    transformations?: CloudinaryTransformOptions;
    priority?: boolean;
    sizes?: string;
    onLoad?: () => void;
}

export function CloudinaryImage({
    src,
    alt,
    width,
    height,
    className = '',
    preset,
    transformations,
    priority = false,
    sizes,
    onLoad,
}: CloudinaryImageProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // If src is a full URL, extract the public ID; otherwise, treat it as a public ID
    let publicId = src;
    if (isCloudinaryUrl(src)) {
        publicId = extractPublicId(src);
    }

    // If it's not a Cloudinary URL and doesn't look like a public ID, use fallback
    const shouldUseFallback = src.startsWith('http') && !isCloudinaryUrl(src);

    if (shouldUseFallback) {
        // Fallback to regular img for non-Cloudinary URLs
        return (
            <div className={`relative overflow-hidden ${className}`}>
                <img
                    src={src}
                    alt={alt}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'
                        }`}
                    onLoad={() => {
                        setIsLoading(false);
                        onLoad?.();
                    }}
                    onError={() => setHasError(true)}
                />
                {isLoading && <ImagePlaceholder />}
                {hasError && <ImageError />}
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <CldImage
                src={publicId}
                alt={alt}
                width={width || 1600}
                height={height || 1000}
                crop={transformations?.crop || preset === 'detail' ? 'limit' : 'fill'}
                gravity={transformations?.gravity || 'auto'}
                format="auto"
                quality="auto"
                loading={priority ? 'eager' : 'lazy'}
                sizes={sizes || '100vw'}
                className={`w-full h-full object-cover transition-all duration-700 ${isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                    }`}
                onLoad={() => {
                    setIsLoading(false);
                    onLoad?.();
                }}
                onError={() => setHasError(true)}
            />

            {isLoading && <ImagePlaceholder />}
            {hasError && <ImageError />}
        </div>
    );
}

function ImagePlaceholder() {
    return (
        <div className="absolute inset-0 bg-gradient-to-br from-premium-carbon via-black to-premium-carbon animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>
    );
}

function ImageError() {
    return (
        <div className="absolute inset-0 bg-premium-carbon flex items-center justify-center">
            <div className="text-center">
                <div className="text-silver/40 text-sm">Imagem indisponível</div>
            </div>
        </div>
    );
}
