"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Play } from "@phosphor-icons/react";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }

        const tl = gsap.timeline();

        // Opening animation
        const titleLines = textRef.current?.querySelectorAll(".animate-title-line");
        const textElements = textRef.current?.querySelectorAll(".animate-text");

        if (titleLines && textElements) {
            tl.to(titleLines, {
                y: 0,
                duration: 1.5,
                stagger: 0.2,
                ease: "power4.out",
                delay: 0.2
            })
                .to(textElements, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out"
                }, "-=1.0");
        }

        // Parallax effect
        gsap.to(videoRef.current, {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-petrol">
            {/* Background Video Layer */}
            <div ref={videoRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                <div className="absolute inset-0 bg-black/50 z-10" />
                {/* Gradient Overlays for Cinematic Look */}
                <div className="absolute inset-0 bg-gradient-to-t from-petrol via-petrol/20 to-transparent z-10 opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-r from-petrol via-transparent to-transparent z-10 opacity-80" />

                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover grayscale-[30%] scale-105"
                >
                    <source src="/hero.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center items-start">
                <div ref={textRef} className="max-w-5xl">
                    <h2 className="flex items-center gap-4 text-gold uppercase tracking-[0.2em] mb-6 text-xs font-bold opacity-0 translate-y-4 animate-text">
                        <span className="w-8 h-[1px] bg-gold" />
                        Redefinindo o Extraordinário
                    </h2>

                    <h1 className="text-7xl md:text-9xl font-bold text-white mb-10 leading-[0.85] tracking-tighter font-display">
                        <div className="overflow-hidden">
                            <span className="block translate-y-full animate-title-line">A Arte da</span>
                        </div>
                        <div className="overflow-hidden">
                            <span className="block translate-y-full animate-title-line text-transparent bg-clip-text text-gradient-silver">
                                Velocidade
                            </span>
                        </div>
                        <div className="overflow-hidden">
                            <span className="block translate-y-full animate-title-line">
                                Pura.
                            </span>
                        </div>
                    </h1>

                    <p className="opacity-0 translate-y-4 animate-text text-silver/70 text-lg md:text-xl max-w-xl mb-12 font-light leading-relaxed border-l border-gold/30 pl-8">
                        Uma coleção curada das máquinas mais exclusivas do mundo.
                        Design futurista, performance inigualável e luxo absoluto.
                    </p>

                    <div className="flex flex-wrap gap-6 opacity-0 translate-y-4 animate-text items-center">
                        <Button href="/estoque" size="lg" rightIcon={<ArrowRight weight="bold" />}>
                            Explorar Estoque
                        </Button>

                        <Button href="/contato" variant="outline" size="lg">
                            Agendar Experience
                        </Button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 right-10 z-20 flex flex-col items-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '2s' }}>
                <span className="text-[10px] uppercase tracking-widest text-silver/50 -rotate-90 origin-bottom-right translate-x-3">Scroll to Discover</span>
                <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-gold to-transparent opacity-50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-slide-up" />
                </div>
            </div>
        </section>
    );
}
