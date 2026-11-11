"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedContent from "@/components/react-bits/AnimatedContent";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !sectionRef.current || !mediaRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(mediaRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-label="Valhallas Motors" className="relative isolate flex min-h-[790px] h-[100svh] flex-col overflow-hidden bg-[#090b0d] text-[#f3f1ed]">
      <div ref={mediaRef} className="absolute inset-0 -top-[8%] h-[116%] w-full">
        <video aria-hidden="true" autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,6,8,.88)_0%,rgba(4,6,8,.42)_48%,rgba(4,6,8,.09)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#090b0d_0%,transparent_32%,transparent_70%,rgba(4,6,8,.28)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-6 pb-24 pt-40 sm:px-10 lg:px-20">
        <AnimatedContent trigger="mount" distance={28} duration={0.85} delay={0.15}>
          <div className="mb-7 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[.34em] text-[#c9b18a]">
            <span className="h-px w-8 bg-[#c9b18a]" />
            Valhallas / Automotive Collection
          </div>
        </AnimatedContent>

        <h1 className="max-w-[1050px] font-display text-[clamp(4.3rem,10.5vw,11.5rem)] font-semibold uppercase leading-[.78] tracking-[-.075em]">
          <AnimatedContent trigger="mount" distance={65} duration={1.05} delay={0.3}>
            <span className="block">Beyond</span>
          </AnimatedContent>
          <AnimatedContent trigger="mount" distance={65} duration={1.05} delay={0.47}>
            <span className="block italic font-light text-[#d6c1a1]">Ordinary.</span>
          </AnimatedContent>
        </h1>

        <div className="mt-10 flex max-w-3xl flex-col items-start justify-between gap-8 md:mt-14 md:flex-row md:items-end">
          <AnimatedContent trigger="mount" distance={22} duration={0.9} delay={0.7} className="max-w-sm">
            <p className="text-sm leading-relaxed text-white/65 sm:text-base">Uma visão editorial do extraordinário. Design, engenharia e presença em uma coleção automotiva conceitual.</p>
          </AnimatedContent>
          <AnimatedContent trigger="mount" distance={22} duration={0.9} delay={0.82}>
            <Link href="/estoque" className="group inline-flex min-h-14 items-center gap-12 border-b border-[#c9b18a] py-3 text-xs font-semibold uppercase tracking-[.2em] transition-colors hover:text-[#c9b18a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9b18a]">
              Explorar coleção <span aria-hidden="true" className="text-xl transition-transform group-hover:translate-x-2">↗</span>
            </Link>
          </AnimatedContent>
        </div>
      </div>

      <div className="absolute bottom-9 left-6 right-6 z-10 flex items-end justify-between border-t border-white/20 pt-5 text-[10px] uppercase tracking-[.22em] text-white/60 sm:left-10 sm:right-10 lg:left-20 lg:right-20">
        <span>Independent automotive concept / 2026</span>
        <span className="hidden sm:block">Scroll to explore ↓</span>
        <span>01 / 04</span>
      </div>
    </section>
  );
}
