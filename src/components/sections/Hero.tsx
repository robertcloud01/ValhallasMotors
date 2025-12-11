"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

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
                delay: 0.5 // Wait for preloader slightly
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
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
            {/* Background Video Layer */}
            <div ref={videoRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10" />

                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover grayscale-[20%] scale-105"
                >
                    <source src="/hero.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center items-start">
                <div ref={textRef} className="max-w-4xl">
                    <h2 className="text-gold uppercase tracking-[0.2em] mb-4 text-sm font-bold opacity-0 translate-y-4 animate-text">
                        Redefinindo o Extraordinário
                    </h2>

                    <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-[0.9] tracking-tighter mix-blend-difference font-display overflow-hidden">
                        <div className="overflow-hidden">
                            <span className="block translate-y-full animate-title-line">A Arte da</span>
                        </div>
                        <div className="overflow-hidden">
                            <span className="block translate-y-full animate-title-line text-transparent bg-clip-text bg-gradient-to-r from-white via-silver to-white/50">
                                Velocidade Pura
                            </span>
                        </div>
                    </h1>

                    <p className="opacity-0 translate-y-4 animate-text text-silver/80 text-lg md:text-xl max-w-xl mb-10 font-light leading-relaxed border-l-2 border-gold pl-6">
                        Uma coleção curada das máquinas mais exclusivas do mundo.
                        Onde performance encontra o luxo absoluto.
                    </p>

                    <div className="flex flex-wrap gap-4 opacity-0 translate-y-4 animate-text">
                        <Link href="/estoque">
                            <Button size="lg" rightIcon={<ArrowRight weight="bold" />}>
                                Explorar Estoque
                            </Button>
                        </Link>
                        <Link href="/contato">
                            <Button variant="outline" size="lg">
                                Agendar Visita
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
                <span className="text-[10px] uppercase tracking-widest text-white/50">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent" />
            </div>
        </section>
    );
}
