"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferAttribute, BufferGeometry, Color, Vector3, type Mesh } from "three";
import type { Agent } from "@/lib/content";
import { GLOW, P } from "./palette";

const ORIGIN = new Vector3();
const PAPER = new Color(P.paper);

/** Onda triangolare 0→1→0: andata e ritorno lineari — da macchina, non da pendolo. */
const tri = (x: number) => 1 - Math.abs((((x % 2) + 2) % 2) - 1);

export type WorkerSpec = { to: Vector3; speed: number; offset: number; agent: Agent };

/**
 * Un agente al lavoro: un punto di luce che fa la spola hub ↔ nodo. Quando il
 * suo nodo è selezionato o in hover corre più veloce e più luminoso. La fase è
 * integrata, così il cambio di velocità non lo fa saltare.
 */
function Worker({ w, active, reduced }: { w: WorkerSpec; active: boolean; reduced: boolean }) {
  const ref = useRef<Mesh>(null);
  const phase = useRef(w.offset);
  const size = w.agent.solid ? 0.1 : 0.07;
  useFrame((_, dt) => {
    if (!ref.current) return;
    if (!reduced) phase.current += dt * w.speed * (active ? 2.6 : 1);
    const t = reduced ? 0.5 : tri(phase.current);
    ref.current.position.lerpVectors(ORIGIN, w.to, t);
  });
  const glow = (active ? GLOW.worker.map((c) => c * 1.5) : GLOW.worker) as [number, number, number];
  return (
    <mesh ref={ref}>
      <boxGeometry args={[size, size, size]} />
      <meshBasicMaterial color={glow} toneMapped={false} />
    </mesh>
  );
}

type Props = {
  /** coppie [da, a]: le prime 5 sono hub → nodo (indice = sezione), le altre progetti → satellite */
  pairs: ReadonlyArray<readonly [Vector3, Vector3]>;
  workers: ReadonlyArray<WorkerSpec>;
  reduced: boolean;
  /** indice della sezione selezionata, o -1 */
  activeIndex: number;
  /** indice della sezione in hover, o -1 */
  hoverIndex: number;
  /** il layer Progetti è aperto: mostra le linee progetti → satellite */
  satActive: boolean;
};

const SECTION_COUNT = 5;
/** indice, in `sections`, del nodo Progetti: i satelliti gli appartengono */
const PROGETTI = 1;

/**
 * Le connessioni della rete in una sola geometria (una draw call) con la
 * luminosità per linea legata allo stato: 0.16 a riposo, 0.5 la linea attiva,
 * 0.06 le altre quando c'è una selezione. Più gli agenti che le percorrono.
 */
export function Links({ pairs, workers, reduced, activeIndex, hoverIndex, satActive }: Props) {
  const geom = useMemo(() => {
    const pos = new Float32Array(pairs.length * 6);
    pairs.forEach(([a, b], i) => pos.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6));
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(pos, 3));
    g.setAttribute("color", new BufferAttribute(new Float32Array(pairs.length * 6), 3));
    return g;
  }, [pairs]);

  useEffect(() => {
    const col = geom.getAttribute("color") as BufferAttribute;
    for (let i = 0; i < pairs.length; i++) {
      const isSat = i >= SECTION_COUNT;
      const section = isSat ? PROGETTI : i;
      let k = 0.16;
      if (activeIndex >= 0) k = section === activeIndex ? 0.5 : 0.06;
      if (hoverIndex >= 0 && section === hoverIndex) k = Math.max(k, 0.32);
      if (isSat) k = satActive ? 0.34 : 0; // linee del layer progetti: solo quando è aperto
      col.setXYZ(i * 2, PAPER.r * k, PAPER.g * k, PAPER.b * k);
      col.setXYZ(i * 2 + 1, PAPER.r * k, PAPER.g * k, PAPER.b * k);
    }
    col.needsUpdate = true;
  }, [geom, pairs.length, activeIndex, hoverIndex, satActive]);

  return (
    <group>
      <lineSegments geometry={geom}>
        <lineBasicMaterial vertexColors transparent depthWrite={false} />
      </lineSegments>
      {workers.map((w, i) => (
        <Worker key={w.agent.id} w={w} active={i === activeIndex || i === hoverIndex} reduced={reduced} />
      ))}
    </group>
  );
}
