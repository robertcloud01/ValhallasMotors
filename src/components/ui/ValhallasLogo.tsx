"use client";

import { cn } from "@/lib/utils";

interface ValhallasLogoProps {
    className?: string;
    showText?: boolean;
    variant?: "light" | "dark";
}

export function ValhallasLogo({ className, showText = true, variant = "light" }: ValhallasLogoProps) {
    const textColor = variant === "light" ? "text-white" : "text-black";
    const fillColor = variant === "light" ? "fill-white" : "fill-black";

    return (
        <div className={cn("flex items-center gap-3", className)}>
            {/* Symbol - Stylized V with Wings/Blade motif */}
            <svg
                width="40"
                height="40"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={cn("w-10 h-10", fillColor)}
            >
                <path d="M50 85L15 25H30L50 65L70 25H85L50 85Z" fill="currentColor" />
                <path d="M50 15L60 35H40L50 15Z" fill="var(--color-premium-gold)" /> {/* Gold Accent */}
            </svg>

            {/* Text */}
            {showText && (
                <div className="flex flex-col">
                    <span className={cn("font-display font-bold text-xl tracking-[0.1em] leading-none uppercase", textColor)}>
                        Valhallas
                    </span>
                    <span className="text-[0.6rem] text-gold tracking-[0.4em] uppercase font-bold leading-none ml-0.5">
                        Motors
                    </span>
                </div>
            )}
        </div>
    );
}
