"use client";
import { useState } from "react";

const values = [
  [
    "Exclusividade",
    "Uma seleção de espaços que fogem do comum. Arquitetura, atmosfera e personalidade reunidas para quem valoriza viver de maneira extraordinária.",
  ],
  [
    "Privacidade",
    "A verdadeira sofisticação também está na tranquilidade. Descubra o valor de encontrar um lugar que respeite seu tempo e seu espaço.",
  ],
  [
    "Confiança",
    "Grandes decisões merecem atenção aos detalhes. Clareza, cuidado e uma experiência de descoberta conduzida com elegância.",
  ],
  [
    "Experiência",
    "Não se trata apenas de conhecer ambientes, mas de imaginar os momentos que poderão acontecer dentro deles.",
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
            A experiência de viver
            <br />
            com <em>exclusividade.</em>
          </h2>
        </div>
        <p>
          Mais do que encontrar um imóvel,{" "}
          <br />{" "}
          descobrir o lugar certo para{" "}
          <br />{" "}
          sua próxima história.
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
        <span /> O verdadeiro luxo é encontrar o seu lugar.
      </p>
    </section>
  );
}
