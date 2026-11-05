import { Hero } from "@/components/Hero";
import { Values } from "@/components/Values";
import { ScrollSequence } from "@/components/ScrollSequence";
import { arrival, kitchen, pool } from "@/lib/story";
import { MotionPreference } from "@/components/MotionPreference";
import { assetUrl } from "@/lib/asset-url";

export default function Home() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <main id="conteudo">
        <Hero />
        <ScrollSequence sequence={arrival} />
        <Values />
        <ScrollSequence sequence={kitchen} />
        <section className="quiet-section" id="pausa">
          <h2>
            A sua mudança de vida
            <br />{" "}
            está em um <em>pequeno passo.</em>
          </h2>
        </section>
        <ScrollSequence sequence={pool} />
      </main>
      <footer id="rodape">
        <a href="#inicio" aria-label="Voltar ao início">
          <img
            src={assetUrl("/assets/logo.webp")}
            width="2508"
            height="627"
            alt="Imobiliária Luxury"
            loading="lazy"
          />
        </a>
        <p>© {new Date().getFullYear()} Imobiliária Luxury</p>
        <p>
          Projeto conceitual de portfólio.
          <br />
          Imagens e ambientes demonstrativos.
        </p>
        <div className="footer-access">
          <MotionPreference />
          <a className="back-top" href="#inicio">
            Voltar ao início ↑
          </a>
        </div>
      </footer>
    </>
  );
}
