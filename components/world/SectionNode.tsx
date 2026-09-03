"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Edges, Text } from "@react-three/drei";
import type { Group, Mesh } from "three";
import { MONO_FONT, P, easeOut } from "./palette";
import { useSceneClock } from "./useSceneClock";

type Props = {
  label: string;
  position: [number, number, number];
  satellite?: boolean;
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

/**
 * Nodo-sezione: un cubo di carta con una gabbia wireframe che ruota a scatti.
 * Hover: la gabbia si accende. Selezione: il nucleo si scalda. Con un'altra
 * selezione attiva il nodo arretra. Label mono a billboard sotto (--about).
 */
export function SectionNode({ label, position, satellite, selected, hovered, dimmed, onSelect, onHover, reduced, delay, accent }: Props) {
  const group = useRef<Group>(null);
  const cage = useRef<Mesh>(null);
  const clock = useSceneClock();
  const step = useRef({ t: 0, target: 0, angle: 0 });
  const size = satellite ? 0.2 : 0.4;
  const lit = hovered || selected;
  const glow = accent ?? P.accent;

  useFrame((_, dt) => {
    const t = clock.current;
    const p = easeOut((t - delay) / 0.9);
    if (group.current) {
      const target = p * (lit ? 1.1 : dimmed ? 0.85 : 1);
      group.current.scale.setScalar(group.current.scale.x + (target - group.current.scale.x) * Math.min(1, dt * 8));
      group.current.visible = p > 0;
    }
    if (cage.current && !reduced) {
      // a scatti: un passo di 15° ogni 0.8 s (0.35 s se acceso), raggiunto in ~120 ms
      const s = step.current;
      s.t += dt;
      const period = lit ? 0.35 : 0.8;
      if (s.t >= period) {
        s.t -= period;
        s.target += Math.PI / 12;
      }
      s.angle += (s.target - s.angle) * Math.min(1, dt * 22);
      cage.current.rotation.y = s.angle;
      cage.current.rotation.x = s.angle * 0.4;
    }
  });

  return (
    <group
      ref={group}
      position={position}
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
          emissiveIntensity={selected ? 0.9 : hovered ? 0.35 : 0.06}
        />
      </mesh>
      <mesh ref={cage} scale={2}>
        <boxGeometry args={[size, size, size]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        <Edges color={lit ? glow : P.paperDim} threshold={15} transparent opacity={lit ? 1 : dimmed ? 0.14 : 0.32} />
      </mesh>
      <Billboard position={[0, -size - 0.3, 0]}>
        <Text
          font={MONO_FONT}
          fontSize={satellite ? 0.13 : 0.17}
          letterSpacing={0.12}
          color={lit ? glow : P.paper}
          fillOpacity={lit ? 1 : dimmed ? 0.45 : satellite ? 0.75 : 1}
          anchorX="center"
          anchorY="top"
        >
          {label}
        </Text>
      </Billboard>
    </group>
  );
}
