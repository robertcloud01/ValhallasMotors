import Link from "next/link";
import { ValhallasLogo } from "@/components/ui/ValhallasLogo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#090b0d] px-6 pb-10 pt-20 text-[#f3f1ed] sm:px-10 lg:px-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col items-start justify-between gap-12 border-b border-white/15 pb-20 lg:flex-row">
          <div className="max-w-xl">
            <Link href="/" className="inline-block focus-visible:outline-2 focus-visible:outline-offset-4"><ValhallasLogo showText /></Link>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/55">Uma experiência automotiva conceitual criada para explorar design, movimento e presença digital.</p>
          </div>
          <div className="grid grid-cols-2 gap-12 text-xs uppercase tracking-[.17em] sm:gap-24">
            <div className="flex flex-col gap-5">
              <span className="text-[#c9b18a]">Explore</span>
              <Link className="hover:text-[#c9b18a]" href="/estoque">Coleção</Link>
              <Link className="hover:text-[#c9b18a]" href="/sobre">Sobre</Link>
              <Link className="hover:text-[#c9b18a]" href="/#dna">DNA</Link>
            </div>
            <div className="flex flex-col gap-5">
              <span className="text-[#c9b18a]">Contato</span>
              <Link className="hover:text-[#c9b18a]" href="/contato">Enviar mensagem ↗</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 pt-8 text-[10px] uppercase tracking-[.13em] text-white/45 sm:flex-row">
          <span>© {new Date().getFullYear()} Valhallas Motors</span>
          <span>Projeto de portfólio · veículos e valores demonstrativos · não representa uma concessionária real</span>
        </div>
      </div>
    </footer>
  );
}
