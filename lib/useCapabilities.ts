"use client";

import { useEffect, useState } from "react";

/**
 * Capacità del dispositivo, decise una volta sola lato client.
 * Prima dell'hydration tutto è `false` e `ready` è `false`: il server e il
 * primo render client mostrano sempre il poster SVG, così nessuna scelta
 * dipendente dal browser finisce nell'HTML iniziale.
 */
export type Capabilities = {
  ready: boolean;
  reducedMotion: boolean;
  coarsePointer: boolean;
  narrow: boolean;
  webgl: boolean;
};

const initial: Capabilities = {
  ready: false,
  reducedMotion: false,
  coarsePointer: false,
  narrow: false,
  webgl: false,
};

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function useCapabilities(): Capabilities {
  const [caps, setCaps] = useState<Capabilities>(initial);

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerMq = window.matchMedia("(pointer: coarse)");
    const widthMq = window.matchMedia("(min-width: 60rem)");

    const compute = () => {
      const reducedMotion = motionMq.matches;
      const coarsePointer = pointerMq.matches;
      const narrow = !widthMq.matches;
      const webgl = detectWebGL();
      setCaps({ ready: true, reducedMotion, coarsePointer, narrow, webgl });
    };

    compute();
    motionMq.addEventListener("change", compute);
    pointerMq.addEventListener("change", compute);
    widthMq.addEventListener("change", compute);
    return () => {
      motionMq.removeEventListener("change", compute);
      pointerMq.removeEventListener("change", compute);
      widthMq.removeEventListener("change", compute);
    };
  }, []);

  return caps;
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}
