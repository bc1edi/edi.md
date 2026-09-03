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
  onSelect: () => void;
  onHover: (on: boolean) => void;
  reduced: boolean;
  delay: number;
};

/**
 * Nodo-sezione: un cubo di carta con una gabbia wireframe che ruota lenta.
 * Hover: la gabbia si accende. Selezione: il nucleo si scalda. Label mono a
 * billboard sotto, con la sintassi da shell (--about).
 */
export function SectionNode({ label, position, satellite, selected, hovered, onSelect, onHover, reduced, delay }: Props) {
  const group = useRef<Group>(null);
  const cage = useRef<Mesh>(null);
  const clock = useSceneClock();
  const size = satellite ? 0.2 : 0.4;
  const lit = hovered || selected;

  useFrame((_, dt) => {
    const t = clock.current;
    const p = easeOut((t - delay) / 0.9);
    if (group.current) {
      const target = p * (lit ? 1.1 : 1);
      group.current.scale.setScalar(group.current.scale.x + (target - group.current.scale.x) * Math.min(1, dt * 8));
      group.current.visible = p > 0;
    }
    if (cage.current && !reduced) {
      cage.current.rotation.y += dt * (lit ? 0.6 : 0.22);
      cage.current.rotation.x += dt * 0.09;
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
          emissive={P.accent}
          emissiveIntensity={selected ? 0.9 : hovered ? 0.35 : 0.06}
        />
      </mesh>
      <mesh ref={cage} scale={2}>
        <boxGeometry args={[size, size, size]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        <Edges color={lit ? P.accent : P.paperDim} threshold={15} transparent opacity={lit ? 1 : 0.32} />
      </mesh>
      <Billboard position={[0, -size - 0.3, 0]}>
        <Text
          font={MONO_FONT}
          fontSize={satellite ? 0.13 : 0.17}
          letterSpacing={0.12}
          color={lit ? P.accent : P.paper}
          fillOpacity={satellite && !lit ? 0.75 : 1}
          anchorX="center"
          anchorY="top"
        >
          {label}
        </Text>
      </Billboard>
    </group>
  );
}
