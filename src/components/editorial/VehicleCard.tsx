import { Icon } from "@/components/editorial/Icon";
import Link from "next/link";
import type { EditorialVehicle } from "@/lib/editorial";
import { EditorialImage, PhotoCredit } from "./EditorialImage";

export function VehicleCard({ car, returnQuery, compact = false }: {
  car: EditorialVehicle;
  returnQuery?: string;
  compact?: boolean;
}) {
  const path = `/estoque/${encodeURIComponent(car.id)}`;
  const href = returnQuery ? `${path}?${new URLSearchParams({ voltar: returnQuery })}` : path;
  const photo = car.photos[0];

  return (
    <article className={compact ? "vm-card vm-card-compact" : "vm-card"}>
      <Link className="vm-card-link" href={href}>
        <div className="vm-card-image">
          <EditorialImage photo={photo} sizes={compact ? "(max-width: 640px) 90vw, (max-width: 900px) 42vw, 22vw" : "(max-width: 640px) 90vw, (max-width: 900px) 46vw, 55vw"} />
        </div>
        <div className="vm-card-body">
          <div>
            <p className="vm-kicker">{car.brand} · {car.year}</p>
            <h3>{car.model}</h3>
            <p className="vm-card-spec">{car.category}{car.power && ` · ${car.power}`}</p>
          </div>
          <span className="vm-card-arrow" aria-hidden="true"><Icon /></span>
        </div>
      </Link>
      <PhotoCredit photo={photo} />
    </article>
  );
}
