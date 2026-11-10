import { Icon } from "@/components/editorial/Icon";
import Link from "next/link";
import { EditorialShell } from "@/components/editorial/Shell";
import { pageMetadata } from "@/lib/editorial-seo";

export const metadata = pageMetadata("Privacidade", "Entenda o funcionamento dos dados na demonstração Valhallas Motors.", "/privacidade");

export default function PrivacyPage() {
  return <EditorialShell><section className="vm-light vm-content-section"><div className="vm-wrap vm-prose">
    <p className="vm-kicker">Informações do projeto</p><h1>Privacidade.</h1>
    <h2>Consulta de teste</h2><p>O formulário da demonstração valida os campos no navegador. Use dados de exemplo. Os campos não são enviados ao servidor nem armazenados pela aplicação.</p>
    <h2>Links externos</h2><p>Créditos de imagem e fontes levam a páginas de terceiros. Se canais externos forem configurados, os respectivos links abrem o aplicativo escolhido e seguem as regras do provedor.</p>
    <h2>Painel administrativo</h2><p>Em ambientes configurados, o painel usa Firebase para autenticação e dados de inventário. Esta página descreve o percurso público da demonstração.</p>
    <Link className="vm-text-link" href="/contato">Voltar ao contato <span aria-hidden="true"><Icon /></span></Link>
  </div></section></EditorialShell>;
}
