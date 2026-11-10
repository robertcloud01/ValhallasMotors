import { Icon } from "@/components/editorial/Icon";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { EditorialShell } from "@/components/editorial/Shell";
import { Gallery } from "@/components/editorial/Gallery";
import { VehicleCard } from "@/components/editorial/VehicleCard";
import { firstValue, stockFilters, stockQuery, vehicleName, type SearchValues } from "@/lib/editorial";
import { pageMetadata } from "@/lib/editorial-seo";
import { inventory, liveInventory, vehicleById } from "@/services/editorial-inventory";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<SearchValues> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const car = await vehicleById(id);
  if (!car) return pageMetadata("Modelo indisponível", "O modelo procurado não faz parte desta coleção.");
  return pageMetadata(vehicleName(car), car.description, `/estoque/${encodeURIComponent(car.id)}`, car.photos[0]?.src);
}

export default async function VehiclePage({ params, searchParams }: Props) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const car = await vehicleById(id);
  if (!car) notFound();
  if (id !== car.id) permanentRedirect(`/estoque/${encodeURIComponent(car.id)}`);

  const incoming = new URLSearchParams(firstValue(query.voltar).slice(0, 600));
  const returnQuery = stockQuery(stockFilters(Object.fromEntries(incoming)));
  const collectionLink = returnQuery ? `/estoque?${returnQuery}` : "/estoque";
  const related = (await inventory()).filter((item) => item.id !== car.id).slice(0, 2);
  const specs = [["Ano", car.year], ["Categoria", car.category], ["Motorização", car.engine], ["Potência", car.power]];

  return (
    <EditorialShell>
      <section className="vm-page-intro vm-detail-intro">
        <div className="vm-wrap">
          <Link className="vm-text-link" href={collectionLink}><Icon name="left" /> Voltar à coleção</Link>
          <p className="vm-kicker">{car.chapter} · {car.brand}</p>
          <h1>{car.model}</h1>
          <p>{liveInventory ? car.category : "Modelo apresentado na coleção demonstrativa."}</p>
        </div>
      </section>
      <section className="vm-light vm-detail">
        <div className="vm-wrap vm-detail-grid">
          <Gallery photos={car.photos} />
          <div className="vm-detail-copy">
            <p className="vm-kicker">Ficha do modelo</p>
            <h2>{car.brand} <em>{car.model}</em></h2>
            <p>{car.description}</p>
            <dl className="vm-specs">{specs.filter(([, value]) => Boolean(value)).map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}</dl>
            {car.source && <a className="vm-text-link vm-source" href={car.source}>Referência do fabricante <span aria-hidden="true"><Icon /></span></a>}
            <Link className="vm-button vm-button-dark" href={`/contato?${new URLSearchParams({ veiculo: car.id })}`}>Consultar este modelo <span aria-hidden="true"><Icon /></span></Link>
          </div>
        </div>
      </section>
      {related.length > 0 && <section className="vm-light vm-related">
        <div className="vm-wrap">
          <div className="vm-section-heading"><div><p className="vm-kicker">Outras leituras</p><h2>Na <em>coleção.</em></h2></div></div>
          <div className="vm-stock-grid">{related.map((item) => <VehicleCard key={item.id} car={item} />)}</div>
        </div>
      </section>}
    </EditorialShell>
  );
}
