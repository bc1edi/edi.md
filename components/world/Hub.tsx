"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, CanvasTexture, type Group } from "three";
import { GLOW, P, easeOut } from "./palette";
import { useSceneClock } from "./useSceneClock";

/** Alone radiale generato al volo: l'unica texture della scena. */
function useHaloTexture() {
  return useMemo(() => {
    const size = 256;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(245,78,0,0.9)");
    g.addColorStop(0.25, "rgba(245,78,0,0.35)");
    g.addColorStop(1, "rgba(245,78,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new CanvasTexture(c);
  }, []);
}

/**
 * L'hub: l'asterisco del brand come fonte di luce del mondo — tre parallelepipedi
 * incrociati, emissivi oltre 1.0 (bloom), con un alone additivo e una point light
 * arancione che scalda i nodi vicini.
 */
export function Hub({ reduced }: { reduced: boolean }) {
  const spin = useRef<Group>(null);
  const root = useRef<Group>(null);
  const halo = useHaloTexture();
  const clock = useSceneClock();

  useFrame((_, dt) => {
    const t = clock.current;
    if (root.current) root.current.scale.setScalar(easeOut(t / 1.2));
    if (spin.current && !reduced) {
      spin.current.rotation.z += dt * 0.2;
      spin.current.rotation.y = Math.sin(t * 0.45) * 0.55;
    }
  });

  return (
    <group ref={root}>
      <pointLight color={P.accent} intensity={12} distance={16} decay={2} />
      <group ref={spin}>
        {[0, Math.PI / 3, -Math.PI / 3].map((rz) => (
          <mesh key={rz} rotation={[0, 0, rz]}>
            <boxGeometry args={[0.17, 1.15, 0.17]} />
            <meshBasicMaterial color={GLOW.accent} toneMapped={false} />
          </mesh>
        ))}
      </group>
      <sprite scale={[2.8, 2.8, 1]}>
        <spriteMaterial map={halo} transparent opacity={0.32} depthWrite={false} blending={AdditiveBlending} />
      </sprite>
    </group>
  );
}
