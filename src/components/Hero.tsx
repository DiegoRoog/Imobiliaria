"use client";
import { useEffect, useRef, useState } from "react";
import { Arrow, Sun, Moon } from "./Icons";
import { motionIsReduced } from "@/lib/motion";
import { assetUrl } from "@/lib/asset-url";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const day = useRef<HTMLImageElement>(null);
  const nightImage = useRef<HTMLImageElement>(null);
  const mode = useRef(false);
  const resetMask = useRef<() => void>(() => {});
  const [night, setNight] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = root.current!,
      photo = day.current!;
    let alive = true,
      raf = 0,
      visible = true,
      loaded = false;
    let x = 0,
      y = 0,
      tx = 0,
      ty = 0,
      radius = 0,
      targetRadius = 0;
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const paint = () => {
      raf = 0;
      const factor = motionIsReduced() ? 1 : 0.24;
      x += (tx - x) * factor;
      y += (ty - y) * factor;
      radius += (targetRadius - radius) * factor;
      if (radius < 0.4 && !targetRadius) radius = 0;
      photo.style.setProperty("--cursor-x", `${x}px`);
      photo.style.setProperty("--cursor-y", `${y}px`);
      photo.style.setProperty("--radius", `${radius}px`);
      photo.style.setProperty("--inner-radius", `${radius * 0.66}px`);
      if (
        Math.abs(x - tx) > 0.1 ||
        Math.abs(y - ty) > 0.1 ||
        Math.abs(radius - targetRadius) > 0.1
      )
        raf = requestAnimationFrame(paint);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const leave = () => {
      targetRadius = 0;
      schedule();
    };
    resetMask.current = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      targetRadius = 0;
      radius = 0;
      x = tx;
      y = ty;
      photo.style.setProperty("--radius", "0px");
      photo.style.setProperty("--inner-radius", "0px");
    };
    const move = (event: PointerEvent) => {
      if (
        !fine.matches ||
        event.pointerType === "touch" ||
        !visible ||
        !loaded ||
        mode.current
      )
        return;
      if ((event.target as HTMLElement).closest("a, button, header")) {
        leave();
        return;
      }
      const rect = element.getBoundingClientRect();
      tx = event.clientX - rect.left;
      ty = event.clientY - rect.top;
      if (!targetRadius) {
        x = tx;
        y = ty;
      }
      targetRadius = 170;
      schedule();
    };
    void nightImage
      .current!.decode()
      .then(() => {
        if (alive) {
          loaded = true;
          setReady(true);
        }
      })
      .catch(() => {});
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) leave();
    });
    observer.observe(element);
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerenter", move);
    element.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", leave, { passive: true });
    window.addEventListener("blur", leave);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerenter", move);
      element.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", leave);
      window.removeEventListener("blur", leave);
    };
  }, []);
  const select = (value: boolean) => {
    mode.current = value;
    resetMask.current();
    setNight(value);
  };

  return (
    <section
      ref={root}
      className={`hero ${night ? "is-night" : ""}`}
      id="inicio"
      aria-label="A residência de dia e de noite"
    >
      <div className="hero-photos" aria-hidden="true">
        <img
          ref={nightImage}
          className="hero-photo night-photo"
          src={assetUrl("/assets/noite.webp")}
          alt=""
          width="1672"
          height="941"
          fetchPriority="high"
        />
        <img
          ref={day}
          className="hero-photo day-photo"
          src={assetUrl("/assets/dia.webp")}
          alt=""
          width="1672"
          height="941"
          fetchPriority="high"
        />
      </div>
      <div className="hero-shade" />
      <header className="site-header">
        <a
          className="brand"
          href="#inicio"
          aria-label="Imobiliária Luxury — início"
        >
          <img
            src={assetUrl("/assets/logo.webp")}
            alt="Imobiliária Luxury"
            width="2508"
            height="627"
          />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#residencia">A residência</a>
          <a href="#essencia">Nossa essência</a>
          <a className="nav-contact" href="#contato">
            Vamos conversar <Arrow />
          </a>
        </nav>
      </header>
      <div className="hero-copy">
        <p className="eyebrow">
          <span /> ARQUITETURA. PRESENÇA. POSSIBILIDADES.
        </p>
        <h1>
          A exclusividade
          <br />
          não conhece <em>horários.</em>
        </h1>
        <p className="hero-description">
          Descubra uma arquitetura que encanta
          <br className="desktop-only" /> sob qualquer luz.
        </p>
        <a className="text-link hero-link" href="#residencia">
          Explore a residência <Arrow />
        </a>
      </div>
      <div className="hero-bottom">
        <a href="#residencia" className="scroll-link">
          <span className="scroll-line" />
          Role para descobrir <Arrow down />
        </a>
        <div className="light-controls">
          <p className="pointer-hint">Mova o cursor para revelar a noite.</p>
          <p className="touch-hint">Explore a mansão de dia e de noite.</p>
          <div
            className="light-switch"
            role="group"
            aria-label="Iluminação da residência"
          >
            <button onClick={() => select(false)} aria-pressed={!night}>
              <Sun /> Dia
            </button>
            <button
              onClick={() => select(true)}
              aria-pressed={night}
              disabled={!ready}
            >
              <Moon /> Noite
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
