import { Icon } from "@/components/editorial/Icon";
import Link from "next/link";
import { EditorialShell } from "@/components/editorial/Shell";

export default function NotFound() {
  return <EditorialShell><section className="vm-page-intro vm-missing"><div className="vm-wrap">
    <p className="vm-kicker">404 / Fora da rota</p><h1>Página <em>indisponível.</em></h1>
    <p>Encontre os modelos desta edição na coleção.</p>
    <Link className="vm-button vm-button-ivory" href="/estoque">Voltar à coleção <span aria-hidden="true"><Icon /></span></Link>
  </div></section></EditorialShell>;
}
