"use client";

import Link from "next/link";
import { EditorialShell } from "@/components/editorial/Shell";

export default function StockError({ reset }: { reset: () => void }) {
  return <EditorialShell><section className="vm-page-intro vm-missing"><div className="vm-wrap">
    <p className="vm-kicker">Coleção / Indisponibilidade</p><h1>Uma pausa <em>na coleção.</em></h1>
    <p>Não foi possível consultar os veículos neste momento.</p>
    <button type="button" className="vm-button vm-button-ivory" onClick={reset}>Tentar novamente</button>
    <p><Link href="/" className="vm-text-link">Voltar ao início</Link></p>
  </div></section></EditorialShell>;
}
