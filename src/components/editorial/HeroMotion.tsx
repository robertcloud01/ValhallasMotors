"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function HeroMotion({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 901px) and (prefers-reduced-motion: no-preference)");
    if (!media.matches) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed || !frame.current || !image.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const motion = gsap.matchMedia();
      motion.add(media.media, () => {
        gsap.to(image.current, {
          yPercent: 7,
          ease: "none",
          scrollTrigger: { trigger: frame.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      cleanup = () => motion.revert();
    }).catch(() => {
      // The still image remains available if the optional animation chunk fails.
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <div className="vm-hero-art" ref={frame}><div className="vm-hero-picture" ref={image}>{children}</div></div>;
}
