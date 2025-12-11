"use client";

import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';
import { extractPublicId, isCloudinaryUrl, getVideoPoster } from '@/lib/cloudinary';

interface CloudinaryVideoProps {
    src: string;
    poster?: string;
    className?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
    width?: number | string;
    height?: number | string;
}

export function CloudinaryVideo({
    src,
    poster,
    className = '',
    autoPlay = true,
    loop = true,
    muted = true,
    controls = false,
    width = '100%',
    height = '100%',
}: CloudinaryVideoProps) {
    const isUrl = src.startsWith('http') || src.startsWith('/');
    const isCloudinary = isCloudinaryUrl(src);

    // Use HTML5 video ONLY if it's a URL (http/local) BUT NOT a Cloudinary URL
    // (If it is a Cloudinary URL, we want to use the player for optimization)
    if (isUrl && !isCloudinary) {
        // Fallback to regular HTML5 video
        return (
            <video
                src={src}
                poster={poster}
                autoPlay={autoPlay}
                loop={loop}
                muted={muted}
                controls={controls}
                playsInline
                className={`w-full h-full object-cover ${className}`}
            />
        );
    }

    const publicId = extractPublicId(src);
    const videoPoster = poster || getVideoPoster(publicId);

    return (
        <div className={`cloudinary-video-wrapper ${className}`}>
            <CldVideoPlayer
                src={publicId}
                width={typeof width === 'number' ? width : 1920}
                height={typeof height === 'number' ? height : 1080}
                autoPlay={autoPlay ? 'always' : 'never'}
                loop={loop}
                muted={muted}
                controls={controls}
                transformation={{
                    quality: 'auto',
                    format: 'auto',
                    videoCodec: 'auto',
                }}
                className="w-full h-full object-cover"
            />
        </div>
    );
}

/**
 * Hero Video Component with gradient overlay and parallax
 */
interface HeroVideoProps {
    src: string;
    children?: React.ReactNode;
}

export function HeroVideo({ src, children }: HeroVideoProps) {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full">
                <CloudinaryVideo
                    src={src}
                    autoPlay
                    loop
                    muted
                    controls={false}
                    className="scale-105"
                />
            </div>

            {/* Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center">
                {children}
            </div>
        </div>
    );
}
