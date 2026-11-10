import { Icon } from "@/components/editorial/Icon";
import Link from "next/link";
import { EditorialShell } from "@/components/editorial/Shell";
import { pageMetadata } from "@/lib/editorial-seo";

export const metadata = pageMetadata("O projeto", "Conheça o conceito autoral da Valhallas Studio para uma coleção automotiva editorial.", "/sobre");

const criteria = [
  ["01", "Proporção", "Como altura, entre-eixos e desenho da carroceria definem a presença de um carro."],
  ["02", "Engenharia", "Como motorização, aerodinâmica e escolhas de construção atendem à proposta do modelo."],
  ["03", "Propósito", "O contexto que explica cada máquina, do esportivo de resposta direta ao gran turismo de longa distância."],
];

export default function AboutPage() {
  return <EditorialShell>
    <section className="vm-page-intro"><div className="vm-wrap">
      <p className="vm-kicker">02 / O projeto</p><h1>O desenho revela <em>a intenção.</em></h1>
      <p>Valhallas Motors é um conceito automotivo autoral da Valhallas Studio.</p>
    </div></section>
    <section className="vm-light vm-content-section"><div className="vm-wrap">
      <div className="vm-section-heading"><div><p className="vm-kicker">Critérios de curadoria</p><h2>Um olhar <em>de perto.</em></h2></div>
        <p>A primeira edição reúne três formas de pensar performance. Cada modelo é apresentado com fotografia creditada, leitura editorial e dados técnicos de referência.</p>
      </div>
      <div className="vm-criteria">{criteria.map(([index, title, description]) => <article key={index}>
        <p className="vm-kicker">{index} /</p><h3>{title}</h3><p>{description}</p>
      </article>)}</div>
      <Link className="vm-button vm-button-dark" href="/estoque">Explorar a coleção <span aria-hidden="true"><Icon /></span></Link>
    </div></section>
  </EditorialShell>;
}
