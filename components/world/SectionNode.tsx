"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Edges, Text } from "@react-three/drei";
import { Vector3, type Group, type Mesh } from "three";
import { MONO_FONT, P, easeOut, rng } from "./palette";
import { useSceneClock } from "./useSceneClock";

type Props = {
  label: string;
  position: [number, number, number];
  /** da dove il nodo entra / dove rientra (satelliti: il nodo Progetti). Default: position */
  origin?: [number, number, number];
  satellite?: boolean;
  /** satelliti: visibili solo quando il layer Progetti è aperto */
  revealed?: boolean;
  /** nascondi del tutto (il nodo Progetti mentre sei nel suo layer) */
  hidden?: boolean;
  selected: boolean;
  hovered: boolean;
  /** c'è una selezione e non è questo nodo: arretra */
  dimmed: boolean;
  onSelect: () => void;
  onHover: (on: boolean) => void;
  reduced: boolean;
  delay: number;
  /** colore di stato del nodo, default: arancione del brand */
  accent?: string;
};

const seedOf = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

/**
 * Nodo-sezione: un cubo di carta con una gabbia wireframe che ruota a scatti.
 * Entra in scena da una direzione propria (asimmetrico, non uno stagger
 * uniforme) e poi mantiene una micro-deriva posizionale continua e sfasata —
 * viva ma quasi impercettibile. Hover: la gabbia si accende. Selezione: il
 * nucleo si scalda. Con un'altra selezione attiva il nodo arretra.
 */
export function SectionNode({
  label,
  position,
  origin,
  satellite,
  revealed = true,
  hidden = false,
  selected,
  hovered,
  dimmed,
  onSelect,
  onHover,
  reduced,
  delay,
  accent,
}: Props) {
  const group = useRef<Group>(null);
  const cage = useRef<Mesh>(null);
  const clock = useSceneClock();
  const step = useRef({ t: 0, target: 0, angle: 0 });
  const reveal = useRef(satellite ? 0 : 1);
  const size = satellite ? 0.2 : 0.4;
  const lit = hovered || selected;
  const glow = accent ?? P.accent;

  const { base, from, motion } = useMemo(() => {
    const r = rng(seedOf(label));
    // direzione d'ingresso ~casuale su una sfera
    const th = r() * Math.PI * 2;
    const ph = Math.acos(r() * 2 - 1);
    const dir = new Vector3(Math.sin(ph) * Math.cos(th), Math.cos(ph), Math.sin(ph) * Math.sin(th));
    return {
      base: new Vector3(...position),
      from: new Vector3(...(origin ?? position)),
      motion: {
        dir,
        // i satelliti sgusciano fuori dal nodo Progetti: nessuno scarto extra
        dist: satellite ? 0 : 1.2 + r() * 1.3,
        delayJitter: (r() - 0.5) * 0.5,
        dur: 0.7 + r() * 0.4,
        // velocità di rivelazione dei satelliti: sfasata per nodo
        revealSpeed: 3.5 + r() * 4,
        // deriva: 3 sinusoidi lente e sfasate
        f: [0.05 + r() * 0.07, 0.05 + r() * 0.07, 0.05 + r() * 0.07],
        p: [r() * 6.28, r() * 6.28, r() * 6.28],
        a: [0.03 + r() * 0.025, 0.03 + r() * 0.025, 0.03 + r() * 0.025],
      },
    };
  }, [label, position, origin, satellite]);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const t = clock.current;

    // progressione di rivelazione (satelliti: 0→1 con revealed; sezioni: sempre 1)
    const rTarget = satellite ? (revealed ? 1 : 0) : 1;
    reveal.current += (rTarget - reveal.current) * Math.min(1, dt * motion.revealSpeed);
    const rv = reveal.current;

    // progressione d'ingresso temporale
    const p = easeOut((t - delay - motion.delayJitter) / motion.dur);
    const appear = satellite ? rv : p;

    g.visible = !hidden && appear > 0.01;

    // posizione: origine → base, con lo scarto d'ingresso che si riassorbe,
    // più la deriva permanente (piena solo a nodo assestato)
    const pos = g.position;
    const ex = motion.dir.x * motion.dist * (1 - (satellite ? rv : p));
    const ey = motion.dir.y * motion.dist * (1 - (satellite ? rv : p));
    const ez = motion.dir.z * motion.dist * (1 - (satellite ? rv : p));
    let dx = 0, dy = 0, dz = 0;
    if (!reduced && appear > 0.6) {
      const s = (appear - 0.6) / 0.4;
      dx = Math.sin(t * motion.f[0] * 6.28 + motion.p[0]) * motion.a[0] * s;
      dy = Math.sin(t * motion.f[1] * 6.28 + motion.p[1]) * motion.a[1] * s;
      dz = Math.sin(t * motion.f[2] * 6.28 + motion.p[2]) * motion.a[2] * s;
    }
    pos.set(
      from.x + (base.x - from.x) * rv + (reduced ? 0 : ex) + dx,
      from.y + (base.y - from.y) * rv + (reduced ? 0 : ey) + dy,
      from.z + (base.z - from.z) * rv + (reduced ? 0 : ez) + dz,
    );

    // scala
    const targetScale = hidden ? 0 : appear * (lit ? 1.1 : dimmed ? 0.78 : 1);
    g.scale.setScalar(g.scale.x + (targetScale - g.scale.x) * Math.min(1, dt * 8));

    // gabbia: rotazione a scatti (P0.3)
    if (cage.current && !reduced) {
      const st = step.current;
      st.t += dt;
      const period = lit ? 0.35 : 0.8;
      if (st.t >= period) {
        st.t -= period;
        st.target += Math.PI / 12;
      }
      st.angle += (st.target - st.angle) * Math.min(1, dt * 22);
      cage.current.rotation.y = st.angle;
      cage.current.rotation.x = st.angle * 0.4;
    }
  });

  return (
    <group
      ref={group}
      scale={0}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(true);
      }}
      onPointerOut={() => onHover(false)}
    >
      <mesh>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial
          color={P.paper}
          roughness={0.6}
          metalness={0}
          emissive={glow}
          emissiveIntensity={selected ? 1 : hovered ? 0.5 : satellite ? 0.12 : 0.22}
        />
      </mesh>
      <mesh ref={cage} scale={2}>
        <boxGeometry args={[size, size, size]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        <Edges color={glow} threshold={15} transparent opacity={lit ? 1 : dimmed ? 0.14 : 0.5} />
      </mesh>
      <Billboard position={[0, -size - 0.3, 0]}>
        <Text
          font={MONO_FONT}
          fontSize={satellite ? 0.13 : 0.17}
          letterSpacing={0.12}
          color={lit ? glow : P.paper}
          fillOpacity={lit ? 1 : dimmed ? 0.4 : satellite ? 0.75 : 1}
          anchorX="center"
          anchorY="top"
        >
          {label}
        </Text>
      </Billboard>
    </group>
  );
}
