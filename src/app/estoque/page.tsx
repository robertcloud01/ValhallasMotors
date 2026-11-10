import { Icon } from "@/components/editorial/Icon";
import Link from "next/link";
import { EditorialShell } from "@/components/editorial/Shell";
import { VehicleCard } from "@/components/editorial/VehicleCard";
import { selectVehicles, stockFilters, stockQuery, type SearchValues } from "@/lib/editorial";
import { pageMetadata } from "@/lib/editorial-seo";
import { inventory, liveInventory } from "@/services/editorial-inventory";

export const metadata = pageMetadata("Coleção", "Explore a coleção editorial de automóveis da Valhallas Motors.", "/estoque");

export default async function CollectionPage({ searchParams }: { searchParams: Promise<SearchValues> }) {
  const [cars, params] = await Promise.all([inventory(), searchParams]);
  const filters = stockFilters(params);
  const query = stockQuery(filters);
  const selected = selectVehicles(cars, filters);
  const brands = [...new Set(cars.map((car) => car.brand))].sort();
  const categories = [...new Set(cars.map((car) => car.category))].sort();

  return (
    <EditorialShell>
      <section className="vm-page-intro">
        <div className="vm-wrap">
          <p className="vm-kicker">01 / Acervo editorial</p>
          <h1>A <em>coleção.</em></h1>
          <p>{liveInventory ? "Explore os automóveis da coleção e abra a ficha de cada modelo." : "Três leituras de performance. A seleção faz parte de uma demonstração de portfólio."}</p>
        </div>
      </section>
      <section className="vm-light vm-stock">
        <div className="vm-wrap">
          <form className="vm-stock-form" method="get" action="/estoque">
            <label>Buscar modelo <input type="search" name="q" defaultValue={filters.q} maxLength={100} placeholder="Ex. Porsche 911" /></label>
            <label>Marca <select name="marca" defaultValue={filters.marca}><option value="">Todas</option>{brands.map((brand) => <option key={brand}>{brand}</option>)}</select></label>
            <label>Categoria <select name="categoria" defaultValue={filters.categoria}><option value="">Todas</option>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
            <label>Ordenar por <select name="ordem" defaultValue={filters.ordem}><option value="">Curadoria</option><option value="ano">Ano mais recente</option><option value="nome">Marca e modelo</option></select></label>
            <button type="submit" className="vm-button vm-button-dark">Aplicar <span aria-hidden="true"><Icon /></span></button>
          </form>
          <div className="vm-stock-summary">
            <h2 className="vm-kicker">{selected.length} {selected.length === 1 ? "modelo" : "modelos"}</h2>
            {query && <Link className="vm-text-link" href="/estoque">Limpar filtros</Link>}
          </div>
          {selected.length > 0 ? (
            <div className="vm-stock-grid">{selected.map((car) => <VehicleCard car={car} key={car.id} returnQuery={query} />)}</div>
          ) : (
            <div className="vm-empty"><h3>Nenhum modelo encontrado.</h3><p>Experimente outro termo ou remova um dos filtros.</p><Link className="vm-text-link" href="/estoque">Ver todos os modelos</Link></div>
          )}
        </div>
      </section>
    </EditorialShell>
  );
}
