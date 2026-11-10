"use client";

import { Icon } from "@/components/editorial/Icon";
import { useRef, useState, type FormEvent } from "react";

export function InquiryForm({ model }: { model?: string }) {
  const [review, setReview] = useState(false);
  const confirmation = useRef<HTMLParagraphElement>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    for (const key of ["vm-inquiry-name", "vm-inquiry-message"]) {
      const field = event.currentTarget.elements.namedItem(key);
      if ((field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) && !field.value.trim()) {
        field.setCustomValidity("Preencha este campo com texto.");
        field.reportValidity();
        return;
      }
    }
    setReview(true);
    requestAnimationFrame(() => confirmation.current?.focus());
  }

  return (
    <form className="vm-inquiry" onSubmit={submit} onInput={(event) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) event.target.setCustomValidity("");
      if (review) setReview(false);
    }}>
      {model && <p className="vm-inquiry-model"><span className="vm-kicker">Modelo selecionado</span><strong>{model}</strong></p>}
      <div className="vm-form-pair">
        <label>Nome <input id="vm-inquiry-name" autoComplete="off" required maxLength={100} placeholder="Nome de exemplo" /></label>
        <label>E-mail <input id="vm-inquiry-email" autoComplete="off" type="email" required maxLength={254} placeholder="nome@example.com" /></label>
      </div>
      <label>Mensagem <textarea id="vm-inquiry-message" required maxLength={1200} rows={5} placeholder="O que você gostaria de saber sobre o modelo?" /></label>
      <button type="submit" className="vm-button vm-button-dark">Validar consulta de teste <span aria-hidden="true"><Icon /></span></button>
      <p ref={confirmation} className="vm-form-status" role="status" tabIndex={-1}>
        {review && "Consulta de teste validada. Os dados ficaram nesta página e nenhuma mensagem foi enviada."}
      </p>
    </form>
  );
}
