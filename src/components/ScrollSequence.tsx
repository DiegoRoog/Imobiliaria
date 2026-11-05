"use client";
import { useEffect, useRef, type CSSProperties } from "react";
import { frameCache } from "@/lib/frame-cache";
import type { Sequence } from "@/lib/story";
import { Contact } from "./Contact";
import { useReducedMotion } from "@/lib/motion";

const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function ScrollSequence({ sequence }: { sequence: Sequence }) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const section = root.current!,
      viewport = stage.current!,
      surface = canvas.current!;
    const ctx = surface.getContext("2d", { alpha: false });
    if (!ctx) return;
    const captions = [
      ...viewport.querySelectorAll<HTMLElement>(".sequence-caption"),
    ];
    const finalCopy = viewport.querySelector<HTMLElement>(".final-copy");
    let alive = true,
      near = false,
      raf = 0,
      desired = -1,
      drawn = -1;
    let targetSrc = "",
      drawnSrc = "",
      progress = 0;
    frameCache.configure(matchMedia("(max-width: 700px)").matches);

    function draw(image: ImageBitmap, index: number) {
      if (!alive || !image.width || !ctx) return;
      const box = surface.getBoundingClientRect();
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      const width = Math.round(box.width * ratio),
        height = Math.round(box.height * ratio);
      if (surface.width !== width || surface.height !== height) {
        surface.width = width;
        surface.height = height;
      }
      // Cover fills the viewport without stretching; excess edges are cropped evenly.
      const scale = Math.max(width / image.width, height / image.height);
      const dw = image.width * scale,
        dh = image.height * scale;
      ctx.fillStyle = "#142721";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(image, (width - dw) / 2, (height - dh) / 2, dw, dh);
      if (drawnSrc && drawnSrc !== targetSrc) frameCache.unpin(drawnSrc);
      drawnSrc = sequence.frames[index];
      frameCache.pin(drawnSrc);
      drawn = index;
      surface.style.opacity = "1";
      section.dataset.frame = String(index + 1);
    }

    const seek = (index: number) => {
      if (index === desired) {
        const image = frameCache.get(sequence.frames[index]);
        if (image) draw(image, index);
        return;
      }
      const direction = index >= desired ? 1 : -1;
      if (targetSrc && targetSrc !== drawnSrc) frameCache.unpin(targetSrc);
      desired = index;
      targetSrc = sequence.frames[index];
      frameCache.pin(targetSrc);
      frameCache.prune();
      const image = frameCache.get(targetSrc);
      if (image) draw(image, index);
      else
        void frameCache.load(targetSrc, 100).then((loaded) => {
          if (alive && desired === index && loaded) draw(loaded, index);
        });
      // Load the nearest frames first, biased toward the user's scroll direction.
      for (let distance = 1; distance <= 4; distance++) {
        for (const sign of [direction, -direction]) {
          const next = index + distance * sign;
          if (next >= 0 && next < sequence.frames.length)
            void frameCache.load(sequence.frames[next], 10 - distance);
        }
      }
    };

    const update = () => {
      raf = 0;
      if (!near || !alive) return;
      const rect = section.getBoundingClientRect();
      progress = clamp(
        -rect.top / Math.max(1, rect.height - viewport.offsetHeight),
      );
      const frameProgress = sequence.final ? clamp(progress / 0.82) : progress;
      seek(Math.round(frameProgress * (sequence.frames.length - 1)));
      viewport.style.setProperty("--progress", String(frameProgress));
      viewport.style.setProperty(
        "--exit-fade",
        String(sequence.final ? 0 : clamp((progress - 0.975) / 0.025) * 0.82),
      );
      captions.forEach((caption, i) => {
        const cue = sequence.cues[i];
        const fadeIn =
          cue.start === 0 ? 1 : clamp((progress - cue.start) / 0.018);
        const fadeOut = cue.end === 1 ? 1 : clamp((cue.end - progress) / 0.018);
        const opacity =
          progress >= cue.start && progress <= cue.end
            ? Math.min(fadeIn, fadeOut)
            : 0;
        caption.style.opacity = String(opacity);
        caption.style.transform = `translateY(${(1 - opacity) * 12}px)`;
        caption.style.visibility = opacity > 0 ? "visible" : "hidden";
        caption.setAttribute("aria-hidden", String(opacity < 0.3));
      });
      if (finalCopy) {
        const opacity = clamp((progress - 0.57) / 0.13);
        finalCopy.style.opacity = String(opacity);
        finalCopy.style.transform = `translateY(${(1 - opacity) * 18}px)`;
        finalCopy.inert = opacity < 0.9;
        finalCopy.style.visibility = opacity > 0 ? "visible" : "hidden";
      }
    };
    const schedule = () => {
      if (!raf && near) raf = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting;
        if (near) schedule();
        else {
          if (targetSrc) frameCache.unpin(targetSrc);
          if (drawnSrc) frameCache.unpin(drawnSrc);
          targetSrc = "";
          drawnSrc = "";
          desired = -1;
        }
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(section);
    const resize = new ResizeObserver(() => {
      if (drawn >= 0) {
        const image = frameCache.get(sequence.frames[drawn]);
        if (image) draw(image, drawn);
      }
      schedule();
    });
    resize.observe(viewport);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (targetSrc) frameCache.unpin(targetSrc);
      if (drawnSrc) frameCache.unpin(drawnSrc);
    };
  }, [sequence, reduced]);

  return (
    <section
      ref={root}
      id={sequence.id}
      className={`sequence ${sequence.final ? "sequence-final" : ""} ${reduced ? "is-reduced" : ""}`}
      aria-label={sequence.label}
      style={
        {
          "--scroll-height": `${sequence.scrollVh}svh`,
          "--mobile-scroll-height": `${sequence.mobileVh}svh`,
        } as CSSProperties
      }
    >
      {sequence.final && (
        <span className="contact-anchor" id="contato" aria-hidden="true" />
      )}
      <div className="sequence-stage" ref={stage}>
        <img
          className="sequence-poster"
          src={sequence.frames[reduced ? sequence.poster : 0]}
          width={sequence.width}
          height={sequence.height}
          alt={
            sequence.final
              ? "Piscina iluminada cercada por galerias e jardins à noite"
              : sequence.chapter === "01"
                ? "Residência clássica entre jardins, com hall e sala de pé-direito duplo"
                : "Cozinha com madeira, pedra natural e iluminação acolhedora"
          }
          loading="lazy"
        />
        {!reduced && (
          <canvas ref={canvas} className="sequence-canvas" aria-hidden="true" />
        )}
        <div className="sequence-vignette" />
        <div className="chapter-label">
          <span>{sequence.chapter}</span>
          <span>{sequence.label}</span>
          <span className="chapter-line" />
        </div>
        {!reduced &&
          sequence.cues.map((cue, i) => (
            <div
              className="sequence-caption caption-center"
              key={cue.title}
              aria-hidden={i !== 0}
              style={{
                opacity: i === 0 ? 1 : 0,
                visibility: i === 0 ? "visible" : "hidden",
              }}
            >
              <p className="eyebrow">{cue.eyebrow || sequence.label}</p>
              <h2>{cue.title}</h2>
              <p className="caption-body">{cue.text}</p>
              {cue.detail && <p className="caption-detail">{cue.detail}</p>}
            </div>
          ))}
        {sequence.final && (
          <div
            className="final-copy"
            style={reduced ? undefined : { opacity: 0, visibility: "hidden" }}
            inert={!reduced}
          >
            <p className="eyebrow">O EXTRAORDINÁRIO ESPERA POR VOCÊ</p>
            <h2>
              Seu próximo capítulo <br /> começa <em>aqui.</em>
            </h2>
            <p>
              Um novo endereço. Novas histórias.
              <br />
              Uma experiência de viver que começa com a escolha certa.
            </p>
            <Contact />
          </div>
        )}
        {!reduced && (
          <>
            <div className="sequence-progress">
              <span />
            </div>
            <a
              className="skip-scene"
              href={
                sequence.final
                  ? "#rodape"
                  : sequence.chapter === "01"
                    ? "#essencia"
                    : "#pausa"
              }
            >
              Pular esta cena <span aria-hidden="true">↓</span>
            </a>
          </>
        )}
        <div className="sequence-exit" />
      </div>
      {reduced && !sequence.final && (
        <div className="reduced-story section-pad">
          {sequence.cues.map((cue) => (
            <div key={cue.title}>
              <h2>{cue.title}</h2>
              <p className="caption-body">{cue.text}</p>
              {cue.detail && <p className="caption-detail">{cue.detail}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
