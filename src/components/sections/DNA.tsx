"use client";

import Link from "next/link";
import AnimatedContent from "@/components/react-bits/AnimatedContent";

export function DNASection() {
  return (
    <section id="dna" className="overflow-hidden border-t border-white/10 bg-[#090b0d] px-6 py-28 text-[#f3f1ed] sm:px-10 lg:px-20 lg:py-44">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <AnimatedContent distance={25} duration={0.9}>
            <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.27em] text-[#c9b18a]">
              <span className="h-px w-7 bg-[#c9b18a]" /> The Valhallas Perspective
            </div>
          </AnimatedContent>
          <div>
            <AnimatedContent distance={44} duration={1}>
              <h2 className="font-display text-[clamp(3.4rem,7vw,8.7rem)] font-semibold uppercase leading-[.89] tracking-[-.067em]">O que move <em className="font-light text-[#c9b18a]">a lenda.</em></h2>
            </AnimatedContent>
            <AnimatedContent distance={24} duration={0.9} delay={0.16}>
              <p className="mt-10 max-w-xl text-base leading-relaxed text-white/60 md:text-xl">Existem carros feitos para transportar. E existem máquinas que transformam o caminho em algo memorável. Este projeto explora a segunda categoria.</p>
            </AnimatedContent>
            <div className="mt-16 border-t border-white/20">
              {[
                ["01", "Design", "Proporção, luz e matéria."],
                ["02", "Engenharia", "A precisão por trás da emoção."],
                ["03", "Presença", "Uma assinatura impossível de ignorar."]
              ].map(([index, title, description]) => (
                <AnimatedContent key={index} distance={20} duration={0.7}>
                  <div className="group grid grid-cols-[45px_1fr] items-baseline gap-x-4 gap-y-2 border-b border-white/20 py-6 md:grid-cols-[70px_1fr_1fr]">
                    <span className="text-xs text-[#c9b18a]">{index}</span>
                    <h3 className="font-display text-2xl font-medium uppercase tracking-[-.04em] transition-transform group-hover:translate-x-2 sm:text-4xl">{title}</h3>
                    <p className="col-start-2 text-sm text-white/50 md:col-start-auto">{description}</p>
                  </div>
                </AnimatedContent>
              ))}
            </div>
            <Link href="/sobre" className="mt-12 inline-block border-b border-[#c9b18a] pb-4 text-xs font-semibold uppercase tracking-[.16em] transition-colors hover:text-[#c9b18a]">Sobre a Valhallas ↗</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
