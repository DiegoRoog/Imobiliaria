"use client";
import { toggleReaderMode, useReducedMotion } from "@/lib/motion";
export function MotionPreference() {
  const reduced = useReducedMotion();
  return (
    <button
      className="motion-preference"
      aria-pressed={reduced}
      onClick={toggleReaderMode}
    >
      {reduced ? "Modo de leitura ativo" : "Ler sem animações"}
    </button>
  );
}
