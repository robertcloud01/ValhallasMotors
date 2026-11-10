import { Icon } from "@/components/editorial/Icon";
import Image from "next/image";
import Link from "next/link";
import { EditorialShell } from "@/components/editorial/Shell";
import { HeroMotion } from "@/components/editorial/HeroMotion";
import { VehicleCard } from "@/components/editorial/VehicleCard";
import { publicOrigin } from "@/lib/editorial-seo";
import { inventory, liveInventory } from "@/services/editorial-inventory";

export default async function Home() {
  const [lead, ...supporting] = (await inventory()).slice(0, 3);
  const origin = publicOrigin();
  const structured = origin ? {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Valhallas Motors",
    url: origin.href,
    inLanguage: "pt-BR",
    description: "Conceito automotivo autoral da Valhallas Studio.",
  } : null;
  return (
    <EditorialShell>
      {structured && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />}
      <section className="vm-hero" aria-labelledby="vm-title">
        <HeroMotion>
          <Image src="/editorial/forma-em-movimento.webp" alt="" fill sizes="100vw" loading="eager" fetchPriority="high" />
        </HeroMotion>
        <div className="vm-wrap vm-hero-inner">
          <div className="vm-hero-copy">
            <p className="vm-kicker"><span aria-hidden="true" /> Edição 01 / Forma em movimento</p>
            <h1 id="vm-title">Máquinas<br />de <em>caráter.</em></h1>
            <p className="vm-hero-deck">Uma coleção editorial sobre a forma, a engenharia e o propósito de cada carro.</p>
            <Link href="/estoque" className="vm-button vm-button-ivory">Explorar coleção <span aria-hidden="true"><Icon /></span></Link>
          </div>
          <div className="vm-hero-note"><span>01 — 03</span><span>Imagem conceitual</span></div>
        </div>
      </section>

      <section className="vm-light vm-feature">
        <div className="vm-wrap">
          <div className="vm-section-heading">
            <div>
              <p className="vm-kicker">01 / A coleção</p>
              <h2>Forma em <em>movimento.</em></h2>
            </div>
            <p>{liveInventory ? "Conheça a forma, a engenharia e a proposta dos modelos em destaque." : "Três maneiras de pensar um automóvel. Precisão no 911, potência no Revuelto e a vocação de estrada do Continental GT."}</p>
          </div>
          {lead && <div className="vm-feature-grid">
            <VehicleCard car={lead} />
            <div className="vm-feature-side">{supporting.map((car) => <VehicleCard key={car.id} car={car} compact />)}</div>
          </div>}
          <div className="vm-feature-end">
            <span className="vm-kicker">{liveInventory ? "Curadoria automotiva" : "Seleção demonstrativa"}</span>
            <Link className="vm-text-link" href="/estoque">Ver a coleção completa <span aria-hidden="true"><Icon /></span></Link>
          </div>
        </div>
      </section>

      <section className="vm-manifesto">
        <div className="vm-wrap vm-manifesto-grid">
          <p className="vm-kicker">02 / O olhar Valhallas</p>
          <div><h2>O desenho revela<br />a <em>intenção.</em></h2>
          <p>Uma asa redesenha a silhueta. Um motor muda o equilíbrio do carro. A curadoria começa nas decisões de engenharia que explicam por que cada máquina tem sua própria forma.</p>
          <Link className="vm-text-link" href="/sobre">Conhecer o projeto <span aria-hidden="true"><Icon /></span></Link></div>
        </div>
      </section>

      <section className="vm-light vm-invitation">
        <div className="vm-wrap vm-section-heading">
          <div><p className="vm-kicker">03 / Consulta</p><h2>O próximo <em>movimento.</em></h2></div>
          <Link className="vm-button vm-button-dark" href="/contato">Abrir consulta <span aria-hidden="true"><Icon /></span></Link>
        </div>
      </section>
    </EditorialShell>
  );
}
