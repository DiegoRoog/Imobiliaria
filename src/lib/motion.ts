"use client";
import { useSyncExternalStore } from "react";

let readerMode = false;
const listeners = new Set<() => void>();
function subscribe(callback: () => void) {
  listeners.add(callback);
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => {
    listeners.delete(callback);
    media.removeEventListener("change", callback);
  };
}
export function motionIsReduced() {
  return readerMode || matchMedia("(prefers-reduced-motion: reduce)").matches;
}
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, motionIsReduced, () => false);
}
export function toggleReaderMode() {
  readerMode = !readerMode;
  document.documentElement.dataset.reducedMotion = String(readerMode);
  listeners.forEach((listener) => listener());
}
