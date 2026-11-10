import { Icon } from "@/components/editorial/Icon";
import Link from "next/link";
import type { ReactNode } from "react";
import { BrandMark, Header } from "./Header";

export function EditorialShell({ children }: { children: ReactNode }) {
  return (
    <div className="vm">
      <a className="vm-skip" href="#conteudo">Ir para o conteúdo</a>
      <Header />
      <main id="conteudo" tabIndex={-1}>{children}</main>
      <footer className="vm-footer">
        <div className="vm-wrap">
          <div className="vm-footer-main">
            <Link href="/" aria-label="Valhallas Motors, início"><BrandMark /></Link>
            <p>Um estudo automotivo da <strong>Valhallas Studio</strong>.</p>
            <Link className="vm-text-link" href="/contato">Contato <span aria-hidden="true"><Icon /></span></Link>
          </div>
          <div className="vm-footer-bottom">
            <span>Valhallas Motors · Conceito autoral</span>
            <div><Link href="/privacidade">Privacidade</Link><Link href="/termos">Termos e créditos</Link></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
