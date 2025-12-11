"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ValhallasLogo } from "./ValhallasLogo";

export function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => setIsComplete(true)
        });

        // Entrance
        tl.set(document.body, { overflow: "hidden" })
            .to(containerRef.current, { opacity: 1, duration: 0.1 })
            .fromTo(logoRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
            )
            // Progress Bar
            .to(progressRef.current, {
                scaleX: 1,
                duration: 1.5,
                ease: "expo.inOut"
            })
            // Exit sequence
            .to(logoRef.current, {
                y: -50,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in"
            }, "+=0.2")
            .to(containerRef.current, {
                yPercent: -100,
                duration: 1,
                ease: "power4.inOut"
            })
            .set(document.body, { overflow: "auto" });

    }, []);

    if (isComplete) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center opacity-0"
        >
            <div ref={logoRef} className="scale-150 transform">
                <ValhallasLogo />
            </div>

            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-white/10 overflow-hidden rounded-full">
                <div
                    ref={progressRef}
                    className="w-full h-full bg-gold origin-left scale-x-0"
                />
            </div>
        </div>
    );
}
