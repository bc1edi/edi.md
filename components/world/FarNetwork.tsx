"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { P, rng } from "./palette";

/**
 * La rete lontana: altri sistemi di agenti, a distanza — punti su un guscio
 * sferico collegati ai due vicini più prossimi. Ruota impercettibilmente.
 * Più la polvere: dà scala allo spazio e profondità al parallasse.
 */
type Props = { reduced: boolean; count?: number; dust?: number; /** su mobile le linee lontane si spengono */ lines?: boolean };

export function FarNetwork({ reduced, count = 90, dust = 1400, lines = true }: Props) {
  const group = useRef<Group>(null);

  const { nodes, segments, dustPts } = useMemo(() => {
    const r = rng(7);
    const pts: number[][] = [];
    for (let i = 0; i < count; i++) {
      // punto casuale su guscio r ∈ [9, 20]
      const u = r() * 2 - 1;
      const th = r() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      const rad = 13 + r() * 11;
      pts.push([s * Math.cos(th) * rad, u * rad * 0.7, s * Math.sin(th) * rad]);
    }
    const seg: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      const d = pts.map((q, j) => [j, Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1], q[2] - pts[i][2])] as const)
        .filter(([j]) => j !== i)
        .sort((a, b) => a[1] - b[1])
        .slice(0, 2);
      for (const [j] of d) if (j > i) seg.push(...pts[i], ...pts[j]);
    }
    const dustArr: number[] = [];
    for (let i = 0; i < dust; i++) {
      const u = r() * 2 - 1;
      const th = r() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      const rad = 4 + Math.pow(r(), 0.6) * 18;
      dustArr.push(s * Math.cos(th) * rad, u * rad, s * Math.sin(th) * rad);
    }
    return { nodes: new Float32Array(pts.flat()), segments: new Float32Array(seg), dustPts: new Float32Array(dustArr) };
  }, [count, dust]);

  useFrame((_, dt) => {
    if (group.current && !reduced) group.current.rotation.y += dt * 0.012;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodes, 3]} />
        </bufferGeometry>
        <pointsMaterial color={P.paper} size={0.09} sizeAttenuation transparent opacity={0.55} depthWrite={false} />
      </points>
      {lines && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[segments, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={P.paper} transparent opacity={0.07} depthWrite={false} />
        </lineSegments>
      )}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPts, 3]} />
        </bufferGeometry>
        <pointsMaterial color={P.paperDim} size={0.03} sizeAttenuation transparent opacity={0.4} depthWrite={false} />
      </points>
    </group>
  );
}
