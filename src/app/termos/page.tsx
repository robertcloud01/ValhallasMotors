import { EditorialShell } from "@/components/editorial/Shell";
import { PhotoCredit } from "@/components/editorial/EditorialImage";
import { edition, vehicleName } from "@/lib/editorial";
import { pageMetadata } from "@/lib/editorial-seo";

export const metadata = pageMetadata("Termos e créditos", "Veja os termos do conceito e os créditos das fotografias.", "/termos");

export default function TermsPage() {
  return <EditorialShell><section className="vm-light vm-content-section"><div className="vm-wrap vm-prose">
    <p className="vm-kicker">Informações do projeto</p><h1>Termos e créditos.</h1>
    <h2>Projeto autoral</h2><p>Valhallas Motors é um conceito de portfólio da Valhallas Studio. As marcas identificam os modelos retratados. A coleção demonstrativa tem finalidade editorial e não constitui oferta ou representação oficial dos fabricantes.</p>
    <h2>Fotografia</h2><p>A abertura usa uma imagem conceitual de um carro sem marca. As fotos dos modelos são de seus respectivos autores, sob as licenças indicadas.</p>
    <ul>{edition.map((car) => <li key={car.id}><strong>{vehicleName(car)}</strong>{car.photos.map((photo) => <PhotoCredit key={photo.src} photo={photo} />)}</li>)}</ul>
  </div></section></EditorialShell>;
}
