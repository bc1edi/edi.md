"use client";

import { EffectComposer, Bloom } from "@react-three/postprocessing";

/** Post-processing solo desktop: il bloom è ciò che rende luce le luci. */
export function Effects() {
  return (
    <EffectComposer>
      <Bloom mipmapBlur luminanceThreshold={1} intensity={0.6} radius={0.5} />
    </EffectComposer>
  );
}
