import { Icon } from "@/components/editorial/Icon";
import Link from "next/link";
import { EditorialShell } from "@/components/editorial/Shell";
import { InquiryForm } from "@/components/editorial/InquiryForm";
import { firstValue, vehicleName, type SearchValues } from "@/lib/editorial";
import { pageMetadata } from "@/lib/editorial-seo";
import { vehicleById } from "@/services/editorial-inventory";

export const metadata = pageMetadata("Contato", "Veja como funciona uma consulta a partir da coleção Valhallas Motors.", "/contato");

export default async function ContactPage({ searchParams }: { searchParams: Promise<SearchValues> }) {
  const { veiculo } = await searchParams;
  const id = firstValue(veiculo);
  const car = id && id.length <= 160 && !id.includes("/") ? await vehicleById(id) : null;
  const model = car ? vehicleName(car) : undefined;
  const whatsapp = process.env.VALHALLAS_WHATSAPP?.trim();
  const email = process.env.VALHALLAS_CONTACT_EMAIL?.trim();
  const whatsappLink = whatsapp && /^\d{8,15}$/.test(whatsapp)
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(model ? `Olá, gostaria de saber mais sobre o ${model}.` : "Olá, gostaria de saber mais sobre a Valhallas Motors.")}`
    : undefined;
  const emailLink = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ? `mailto:${encodeURI(email)}?subject=${encodeURIComponent(model ? `Consulta sobre ${model}` : "Valhallas Motors")}`
    : undefined;

  return (
    <EditorialShell>
      <section className="vm-page-intro"><div className="vm-wrap">
        <p className="vm-kicker">03 / Contato</p><h1>O próximo <em>movimento.</em></h1>
        <p>Conheça o percurso de uma consulta a partir da coleção.</p>
      </div></section>
      <section className="vm-light vm-contact">
        <div className="vm-wrap vm-contact-grid">
          <div><p className="vm-kicker">Consulta demonstrativa</p><h2>Comece por um <em>modelo.</em></h2>
            <p>Use dados de exemplo. O formulário valida a consulta no navegador e não transmite a mensagem.</p>
            <Link href="/privacidade" className="vm-text-link">Como tratamos os dados <span aria-hidden="true"><Icon /></span></Link>
            {whatsappLink && <a className="vm-text-link" href={whatsappLink}>Abrir WhatsApp <span aria-hidden="true"><Icon /></span></a>}
            {emailLink && <a className="vm-text-link" href={emailLink}>Abrir aplicativo de e-mail <span aria-hidden="true"><Icon /></span></a>}
          </div>
          <InquiryForm key={id} model={model} />
        </div>
      </section>
    </EditorialShell>
  );
}
