"use client";

import Link from "next/link";
import Aurora from "@/components/react-bits/Aurora";
import ScrollFloat from "@/components/react-bits/ScrollFloat";
import GlareHover from "@/components/react-bits/GlareHover";
import AnimatedContent from "@/components/react-bits/AnimatedContent";

/**
 * Dedicated React Bits motion showcase within the editorial homepage.
 * Aurora is kept off the video hero so it does not obscure the vehicle.
 */
export function MotionExperience() {
  return (
    <section aria-labelledby="experience-title" className="relative isolate min-h-[790px] overflow-hidden border-y border-white/10 bg-[#090b0d] text-[#f2eee6]">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_78%,rgba(201,177,138,.12),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[75%] opacity-85 motion-reduce:hidden" aria-hidden="true">
        <Aurora
          colorStops={["#201c26", "#9b764e", "#293848", "#d7b88e"]}
          amplitude={1.2}
          speed={0.35}
          blend={0.62}
          glow={0.75}
          brightness={0.85}
          layers={2}
          opacity={0.92}
          height={0.50}
          mouseInteraction
          className="h-full w-full"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(9,11,13,.25)_0%,transparent_35%,rgba(9,11,13,.95)_100%)]" />
      <div className="relative z-10 mx-auto flex min-h-[790px] max-w-[1480px] flex-col justify-between px-6 py-24 sm:px-10 lg:px-20 lg:py-32">
        <div className="flex items-start justify-between gap-5 text-[10px] font-semibold uppercase tracking-[.26em] text-[#c9b18a]">
          <span>02 / Experience</span>
          <span className="hidden sm:block">Designed to move you</span>
        </div>
        <div className="my-20 max-w-[1250px]">
          <ScrollFloat
            effect="float"
            splitBy="words"
            distance={80}
            stagger={0.08}
            scrollStart="top bottom-=10%"
            scrollEnd="center center"
            containerClassName="!my-0 !overflow-visible text-left"
            textClassName="!text-left !text-[clamp(3.5rem,10.8vw,10rem)] !font-semibold !leading-[.89] !tracking-[-.075em] !uppercase"
          >
            Sinta o extraordinário.
          </ScrollFloat>
          <AnimatedContent distance={35} duration={0.95} className="mt-12 max-w-lg">
            <p className="border-l border-[#c9b18a] pl-6 text-base leading-relaxed text-white/75 md:text-xl">
              Não é apenas sobre chegar. É sobre tudo o que acontece antes de girar a chave.
            </p>
          </AnimatedContent>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-8 border-t border-white/20 pt-9">
          <div className="text-[10px] uppercase tracking-[.22em] text-white/60">
            <span className="block text-[#c9b18a]">VALHALLAS</span>
            <span className="mt-2 block">The art of automotive presence</span>
          </div>
          <Link href="/estoque" className="block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9b18a]">
            <GlareHover
              width="100%"
              height="auto"
              className="!min-h-16 !px-9 !py-5 !rounded-none"
              background="#d8c4a4"
              borderColor="rgba(255,255,255,.28)"
              borderRadius="0px"
              glareColor="#ffffff"
              glareOpacity={0.9}
              variant="streak"
              mode="hover"
              rimGlint
            >
              <span className="flex min-w-[210px] items-center justify-between gap-10 text-[11px] font-bold uppercase tracking-[.18em] text-[#111417]">
                Ver a coleção <span aria-hidden="true" className="text-xl">↗</span>
              </span>
            </GlareHover>
          </Link>
        </div>
      </div>
    </section>
  );
}
