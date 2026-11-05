"use client";
import { useState } from "react";

const values = [
  [
    "Atendimento personalizado",
    "Cada busca começa com uma história. Queremos entender suas prioridades para que a procura por um imóvel faça sentido para você.",
  ],
  [
    "Exclusividade",
    "Explore imóveis que combinam com diferentes estilos de vida. Uma boa escolha começa quando você conhece suas opções.",
  ],
  [
    "Confiança",
    "Decisões imobiliárias merecem atenção. Valorizamos uma comunicação clara, o respeito às suas dúvidas e a transparência.",
  ],
  [
    "Sua próxima conquista",
    "Encontre um lugar para seus próximos planos. Conheça nosso catálogo e comece sua busca.",
  ],
];
export function Values() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section
      className="values section-pad"
      id="essencia"
      aria-labelledby="values-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">A ESSÊNCIA LUXURY</p>
          <h2 id="values-title">
            Por que escolher a
            <br />{" "}
            <em>Imobiliária Luxury?</em>
          </h2>
        </div>
        <p>
          Uma experiência imobiliária
          <br />{" "}
          que valoriza suas necessidades
          <br />{" "}
          e a importância de cada decisão.
        </p>
      </div>
      <div className="value-cards" onMouseLeave={() => setActive(null)}>
        {values.map(([title, description], i) => (
          <article
            key={title}
            className={`value-card ${active === i ? "is-open" : ""}`}
            onMouseEnter={() => {
              if (matchMedia("(min-width: 701px) and (hover: hover)").matches)
                setActive(i);
            }}
          >
            <div className="card-frame" />
            <button
              className="card-trigger"
              aria-expanded={active === i}
              aria-controls={`value-${i}`}
              onClick={(event) =>
                setActive(
                  event.detail > 0 &&
                    matchMedia("(min-width: 701px) and (hover: hover)").matches
                    ? i
                    : active === i
                      ? null
                      : i,
                )
              }
            >
              <span className="card-number">0{i + 1}</span>
              <span className="card-title">{title}</span>
              <span className="card-plus" aria-hidden="true">
                {active === i ? "−" : "+"}
              </span>
            </button>
            <div
              id={`value-${i}`}
              className="card-description"
              inert={active !== i}
              aria-hidden={active !== i}
            >
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="values-footnote">
        <span /> Um bom atendimento começa com escuta.
      </p>
    </section>
  );
}
