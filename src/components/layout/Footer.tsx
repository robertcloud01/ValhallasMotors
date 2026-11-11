import Link from "next/link";
import GlareHover from "@/components/react-bits/GlareHover";

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-[#0b0c0e] px-6 pb-10 pt-24 text-[#f3f1ed] sm:px-10 lg:px-20 lg:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-[25%] -right-[18%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(201,177,138,.13)_0%,transparent_67%)]" />
      <div className="relative mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-8 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[.29em] text-[#c9b18a]">
              <span className="h-px w-9 bg-[#c9b18a]" />
              The next chapter
            </div>
            <h2 className="max-w-[1000px] font-display text-[clamp(3.5rem,8.4vw,9rem)] font-semibold uppercase leading-[.9] tracking-[-.075em]">
              O próximo <em className="font-light text-[#c9b18a]">capítulo</em> começa aqui.
            </h2>
          </div>
          <Link href="/contato" className="block w-fit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9b18a]">
            <GlareHover
              width="100%"
              height="auto"
              borderRadius="0"
              borderColor="rgba(201,177,138,.65)"
              background="transparent"
              glareColor="#c9b18a"
              glareOpacity={0.8}
              variant="sheen"
              className="!rounded-none !p-7"
            >
              <span className="flex min-w-52 items-center justify-between gap-8 text-xs font-semibold uppercase tracking-[.15em]">
                Fale com a gente <span className="text-xl" aria-hidden="true">↗</span>
              </span>
            </GlareHover>
          </Link>
        </div>

        <div className="mt-28 grid grid-cols-1 gap-10 border-t border-white/15 pt-10 sm:grid-cols-3">
          <div>
            <p className="text-[11px] uppercase tracking-[.2em] text-[#c9b18a]">Valhallas Motors</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">Uma coleção automotiva conceitual, com design digital pensado para transformar presença em experiência.</p>
          </div>
          <div className="flex flex-col gap-4 text-xs uppercase tracking-[.15em] sm:pl-10">
            <span className="mb-1 text-[#c9b18a]">Navegue</span>
            <Link href="/estoque" className="w-fit transition-colors hover:text-[#c9b18a]">Coleção ↗</Link>
            <Link href="/sobre" className="w-fit transition-colors hover:text-[#c9b18a]">Sobre ↗</Link>
            <Link href="/#dna" className="w-fit transition-colors hover:text-[#c9b18a]">Manifesto ↗</Link>
          </div>
          <div className="text-sm leading-relaxed text-white/50 sm:text-right">
            <p>Uma experiência concebida para explorar<br />o extraordinário.</p>
          </div>
        </div>

        <div aria-hidden="true" className="mt-16 select-none overflow-hidden border-b border-white/15 pb-3 font-display text-[clamp(3.8rem,15.1vw,15.5rem)] font-semibold uppercase leading-none tracking-[-.095em] text-[#ede7dc]">
          VALHALLAS
        </div>
        <div className="flex flex-col justify-between gap-4 pt-8 text-[10px] uppercase tracking-[.13em] text-white/45 sm:flex-row">
          <span>© {new Date().getFullYear()} Valhallas Motors</span>
          <span>Projeto conceitual · imagens e valores demonstrativos · não representa uma concessionária real</span>
        </div>
      </div>
    </footer>
  );
}
