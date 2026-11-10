"use client";

import { Icon } from "@/components/editorial/Icon";
import { useRef, useState } from "react";
import type { Photograph } from "@/lib/editorial";
import { EditorialImage, PhotoCredit } from "./EditorialImage";

export function Gallery({ photos }: { photos: Photograph[] }) {
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const openButton = useRef<HTMLButtonElement>(null);
  const activePhoto = photos[active];
  const hasOptions = photos.length > 1;
  const change = (offset: number) => setActive((index) => (index + offset + photos.length) % photos.length);

  if (!activePhoto) return <div className="vm-gallery-frame"><EditorialImage sizes="100vw" /></div>;

  return (
    <section aria-label="Galeria do veículo" className="vm-gallery">
      <button ref={openButton} type="button" className="vm-gallery-frame" aria-label="Ampliar fotografia" onClick={() => dialog.current?.showModal()}>
        <EditorialImage photo={activePhoto} sizes="(max-width: 900px) 90vw, 65vw" priority />
        <span aria-hidden="true"><Icon /></span>
      </button>
      <div className="vm-gallery-caption">
        <PhotoCredit photo={activePhoto} />
        {hasOptions && <div className="vm-gallery-controls">
          <button type="button" aria-label="Foto anterior" onClick={() => change(-1)}><Icon name="left" /></button>
          <span aria-live="polite">{active + 1} / {photos.length}</span>
          <button type="button" aria-label="Próxima foto" onClick={() => change(1)}><Icon name="right" /></button>
        </div>}
      </div>
      <dialog ref={dialog} className="vm-dialog" aria-label="Fotografia ampliada" onClose={() => openButton.current?.focus()} onKeyDown={(event) => {
        if (!hasOptions) return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          change(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}>
        <div className="vm-dialog-inner">
          <div className="vm-dialog-top">
            {hasOptions && <div className="vm-gallery-controls">
              <button type="button" aria-label="Foto anterior ampliada" onClick={() => change(-1)}><Icon name="left" /></button>
              <span aria-live="polite">{active + 1} / {photos.length}</span>
              <button type="button" aria-label="Próxima foto ampliada" onClick={() => change(1)}><Icon name="right" /></button>
            </div>}
            <button type="button" className="vm-dialog-close" onClick={() => dialog.current?.close()}>Fechar <Icon name="close" /></button>
          </div>
          <div className="vm-dialog-image"><EditorialImage photo={activePhoto} sizes="90vw" /></div>
          <PhotoCredit photo={activePhoto} />
        </div>
      </dialog>
    </section>
  );
}
