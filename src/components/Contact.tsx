"use client";
import { useRef, useState } from "react";
import { contactLinks } from "@/lib/config";
import { Arrow } from "./Icons";

type ContactDestination = keyof typeof contactLinks;

export function Contact() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [kind, setKind] = useState<ContactDestination>("contact");
  const open = (value: ContactDestination) => {
    setKind(value);
    dialog.current?.showModal();
  };
  const action = (type: ContactDestination, label: string) =>
    contactLinks[type] ? (
      <a
        className={`button ${type === "contact" ? "button-gold" : "button-outline"}`}
        href={contactLinks[type]!}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
        <Arrow />
      </a>
    ) : (
      <button
        className={`button ${type === "contact" ? "button-gold" : "button-outline"}`}
        onClick={() => open(type)}
      >
        {label}
        <Arrow />
      </button>
    );
  return (
    <>
      <div className="contact-actions">
        {action("catalog", "Conheça nossos imóveis")}
        {action("contact", "Entre em contato conosco")}
      </div>
      <dialog
        ref={dialog}
        className="contact-dialog"
        aria-labelledby="contact-dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="dialog-close"
          aria-label="Fechar"
          onClick={() => dialog.current?.close()}
        >
          ×
        </button>
        <p className="eyebrow">IMOBILIÁRIA LUXURY</p>
        <h2 id="contact-dialog-title">
          {kind === "catalog"
            ? "Catálogo de imóveis"
            : "Toda nova história começa com uma conversa."}
        </h2>
        <p>
          {kind === "catalog"
            ? "O catálogo da Imobiliária Luxury ainda não está disponível nesta página."
            : "O canal de atendimento da Imobiliária Luxury ainda não está vinculado a esta página."}
        </p>
        <p>Nenhuma informação pessoal é coletada nesta demonstração.</p>
        <button
          className="button button-gold"
          onClick={() => dialog.current?.close()}
        >
          Continuar explorando <Arrow />
        </button>
      </dialog>
    </>
  );
}
