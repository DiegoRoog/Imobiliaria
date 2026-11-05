"use client";
import { useRef, useState } from "react";
import { contactLinks } from "@/lib/config";
import { Arrow } from "./Icons";

export function Contact() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [kind, setKind] = useState<"social" | "contact">("contact");
  const open = (value: "social" | "contact") => {
    setKind(value);
    dialog.current?.showModal();
  };
  const action = (type: "social" | "contact", label: string) =>
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
        {action("social", "Conheça nossas redes sociais")}
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
          {kind === "social"
            ? "Inspiração para uma nova forma de viver."
            : "Toda nova história começa com uma conversa."}
        </h2>
        <p>
          Esta é uma experiência conceitual de portfólio.{" "}
          {kind === "social"
            ? "Os perfis sociais ainda não estão vinculados."
            : "Os canais de atendimento ainda não estão vinculados."}
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
