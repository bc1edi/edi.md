"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, CanvasTexture, type Group, type Sprite, type SpriteMaterial } from "three";
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

type Props = {
  reduced: boolean;
  /** cambia a ogni selezione: l'hub risponde con un impulso */
  pulseKey: string | null;
  /** su mobile (niente bloom) l'alone fa da bloom-lite */
  haloScale?: number;
};

const HALO = 2.8;

/**
 * L'hub: l'asterisco del brand come fonte di luce del mondo — tre parallelepipedi
 * incrociati, emissivi oltre 1.0 (bloom), con un alone additivo e una point light
 * arancione. Ruota a scatti, come uno strumento; a ogni selezione dà un impulso.
 */
export function Hub({ reduced, pulseKey, haloScale = 1 }: Props) {
  const spin = useRef<Group>(null);
  const root = useRef<Group>(null);
  const halo = useRef<Sprite>(null);
  const tex = useHaloTexture();
  const clock = useSceneClock();
  const step = useRef({ t: 0, target: 0, angle: 0 });
  const pulse = useRef(0);

  useEffect(() => {
    if (pulseKey) pulse.current = 1;
  }, [pulseKey]);

  useFrame((_, dt) => {
    const intro = easeOut(clock.current / 1.2);
    // impulso: scatta a 1 e decade in ~0.5 s
    pulse.current = Math.max(0, pulse.current - dt * 2.2);
    const p = reduced ? 0 : pulse.current;
    if (root.current) root.current.scale.setScalar(intro * (1 + 0.22 * p));
    if (halo.current) {
      halo.current.scale.setScalar(HALO * haloScale * (1 + 0.35 * p));
      (halo.current.material as SpriteMaterial).opacity = 0.32 + 0.3 * p;
    }
    if (spin.current && !reduced) {
      // rotazione a scatti: ogni 1.2 s un passo di 10°, raggiunto in ~120 ms
      const s = step.current;
      s.t += dt;
      if (s.t >= 1.2) {
        s.t -= 1.2;
        s.target += Math.PI / 18;
      }
      s.angle += (s.target - s.angle) * Math.min(1, dt * 22);
      spin.current.rotation.z = s.angle;
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
      <sprite ref={halo} scale={[HALO * haloScale, HALO * haloScale, 1]}>
        <spriteMaterial map={tex} transparent opacity={0.32} depthWrite={false} blending={AdditiveBlending} />
      </sprite>
    </group>
  );
}
