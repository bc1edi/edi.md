/* Palette del mondo: gli stessi hex dei token CSS (three non legge le custom property). */
export const P = {
  void: "#12110d",
  ink: "#26251e",
  paper: "#f7f7f4",
  paperDim: "#b8b5aa",
  mute: "#8a877a",
  accent: "#f54e00",
} as const;

/** Colori oltre 1.0 (con toneMapped=false) per il bloom: le uniche luci del mondo. */
export const GLOW = {
  accent: [1.7, 0.4, 0.02] as [number, number, number],
  worker: [2.0, 0.7, 0.2] as [number, number, number],
};

export const MONO_FONT = "/fonts/RobotoMono-500.woff";

export const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);

/** PRNG deterministico (mulberry32): stesse stelle a ogni render. */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
