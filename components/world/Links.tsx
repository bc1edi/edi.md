"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { Vector3, type Mesh } from "three";
import { GLOW, P } from "./palette";
import { useSceneClock } from "./useSceneClock";

const ORIGIN = new Vector3();

/** Un agente al lavoro: un punto di luce che fa la spola hub ↔ nodo. */
function Worker({ to, speed, offset, reduced }: { to: Vector3; speed: number; offset: number; reduced: boolean }) {
  const ref = useRef<Mesh>(null);
  const clock = useSceneClock();
  useFrame(() => {
    if (!ref.current) return;
    const t = reduced ? 0.5 : (Math.sin(clock.current * speed + offset) + 1) / 2;
    ref.current.position.lerpVectors(ORIGIN, to, t);
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.07, 0.07, 0.07]} />
      <meshBasicMaterial color={GLOW.worker} toneMapped={false} />
    </mesh>
  );
}

type Props = {
  /** coppie [da, a] */
  pairs: ReadonlyArray<readonly [Vector3, Vector3]>;
  /** destinazioni degli agenti (partono dall'hub) */
  workers: ReadonlyArray<{ to: Vector3; speed: number; offset: number }>;
  reduced: boolean;
};

/** Le connessioni della rete: linee di carta a bassa opacità, e gli agenti che le percorrono. */
export function Links({ pairs, workers, reduced }: Props) {
  const lines = useMemo(() => pairs.map(([a, b]) => [a.toArray(), b.toArray()] as [number[], number[]]), [pairs]);
  return (
    <group>
      {lines.map((pts, i) => (
        <Line key={i} points={pts as unknown as [number, number, number][]} color={P.paper} transparent opacity={0.16} lineWidth={1} />
      ))}
      {workers.map((w, i) => (
        <Worker key={i} to={w.to} speed={w.speed} offset={w.offset} reduced={reduced} />
      ))}
    </group>
  );
}
