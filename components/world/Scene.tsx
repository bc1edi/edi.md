"use client";

import { useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { Vector3 } from "three";
import {
  RING_DESKTOP,
  RING_MOBILE,
  agentFor,
  layoutNodes,
  projects,
  satelliteRing,
  type SectionId,
} from "@/lib/content";
import { P } from "./palette";
import { SceneClock } from "./useSceneClock";
import { Hub } from "./Hub";
import { SectionNode } from "./SectionNode";
import { Links } from "./Links";
import { FarNetwork } from "./FarNetwork";
import { CameraRig } from "./CameraRig";

export type SceneProps = {
  selected: SectionId | null;
  /** sotto-nodo progetto aperto nel layer Progetti */
  focusProject: string | null;
  hovered: string | null;
  onSelect: (id: SectionId | null, project?: string) => void;
  onHover: (id: string | null) => void;
  reduced: boolean;
  /** low: mobile/touch — niente bloom, meno polvere */
  quality: "high" | "low";
  panelSide: "right" | "bottom";
};

const Effects = dynamic(() => import("./Effects").then((m) => m.Effects), { ssr: false });

function Clock({ clock }: { clock: { current: number } }) {
  useFrame((_, dt) => {
    clock.current += Math.min(dt, 0.05);
  });
  return null;
}

/**
 * Il mondo: hub, nodi-sezione, satelliti-progetto, connessioni, agenti, rete
 * lontana. Un solo stato (selected/hovered) guida tutto: è un sistema, non
 * uno sfondo. Due composizioni: desktop (anello largo) e mobile (anello alto).
 */
export function Scene({ selected, focusProject, hovered, onSelect, onHover, reduced, quality, panelSide }: SceneProps) {
  const clock = useMemo(() => ({ current: 0 }), []);
  const narrow = panelSide === "bottom";
  const inProjects = selected === "progetti";

  const layout = useMemo(() => {
    const nodes = layoutNodes(narrow ? RING_MOBILE : RING_DESKTOP).map((s) => ({ ...s, v: new Vector3(...s.position) }));
    const progetti = nodes.find((n) => n.id === "progetti")!;
    // La costellazione dei progetti è spinta verso l'esterno rispetto all'hub,
    // così i sotto-nodi non finiscono sopra l'asterisco (specie su mobile).
    const outward = new Vector3(progetti.v.x, progetti.v.y, 0).normalize();
    const satCenter = progetti.v.clone().addScaledVector(outward, narrow ? 1.6 : 0.8);
    const offsets = satelliteRing(projects.length, narrow ? 0.92 : 1);
    const sats = projects.map((p, i) => ({ ...p, v: satCenter.clone().add(new Vector3(...offsets[i])) }));
    // Le prime 5 coppie sono hub → nodo (indice = indice sezione), le altre progetti → satellite.
    const pairs: [Vector3, Vector3][] = [
      ...nodes.map((n) => [new Vector3(), n.v] as [Vector3, Vector3]),
      ...sats.map((s) => [progetti.v, s.v] as [Vector3, Vector3]),
    ];
    const workers = nodes.map((n, i) => ({ to: n.v, speed: 0.28 + i * 0.07, offset: i * 1.7, agent: agentFor(n.id) }));
    return { nodes, progetti, satCenter, sats, pairs, workers };
  }, [narrow]);

  const activeIndex = selected ? layout.nodes.findIndex((n) => n.id === selected) : -1;
  const hoverIndex = hovered ? layout.nodes.findIndex((n) => n.id === hovered) : -1;

  const focus = useMemo(() => {
    if (!selected) return null;
    if (inProjects && focusProject) {
      return layout.sats.find((s) => s.slug === focusProject)?.v ?? layout.satCenter;
    }
    if (inProjects) return layout.satCenter; // vista larga: al centro della costellazione
    return layout.nodes.find((n) => n.id === selected)?.v ?? null;
  }, [selected, inProjects, focusProject, layout]);

  return (
    <Canvas
      dpr={quality === "high" ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 3, 22], fov: narrow ? 58 : 38, near: 0.1, far: 80 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onPointerMissed={(e) => {
        if (e.type === "click") onSelect(null);
      }}
    >
      <color attach="background" args={[P.void]} />
      <fog attach="fog" args={[P.void, 8, 34]} />
      <ambientLight intensity={0.35} color={P.paper} />
      <directionalLight position={[4, 8, 6]} intensity={0.9} color={P.paper} />

      <SceneClock.Provider value={clock}>
        <Clock clock={clock} />
        <CameraRig focus={focus} wide={inProjects && !focusProject} panelSide={panelSide} reduced={reduced} />

        <FarNetwork reduced={reduced} count={quality === "high" ? 90 : 50} dust={narrow ? 300 : quality === "high" ? 1400 : 500} lines={!narrow} />
        <Hub reduced={reduced} pulseKey={selected} haloScale={narrow ? 1.6 : 1} />
        <Links
          pairs={layout.pairs}
          workers={layout.workers}
          reduced={reduced}
          activeIndex={activeIndex}
          hoverIndex={hoverIndex}
          satActive={inProjects}
        />

        {layout.nodes.map((n, i) => {
          // nel layer progetti il nodo Progetti è il "genitore": arretra e
          // lascia la scena ai 4 sotto-nodi.
          const parentDim = n.id === "progetti" && inProjects;
          return (
          <SectionNode
            key={n.id}
            label={n.flag}
            position={n.position}
            accent={n.accent}
            selected={!parentDim && selected === n.id}
            hovered={hovered === n.id}
            dimmed={parentDim || (selected !== null && selected !== n.id)}
            onSelect={() => onSelect(n.id)}
            onHover={(on) => onHover(on ? n.id : null)}
            reduced={reduced}
            delay={1.0 + i * 0.12}
          />
          );
        })}
        {layout.sats.map((s) => (
          <SectionNode
            key={s.slug}
            satellite
            revealed={inProjects}
            label={s.name}
            position={s.v.toArray() as [number, number, number]}
            origin={layout.progetti.position}
            selected={focusProject === s.slug}
            hovered={hovered === s.slug}
            dimmed={focusProject !== null && focusProject !== s.slug}
            onSelect={() => onSelect("progetti", s.slug)}
            onHover={(on) => onHover(on ? s.slug : null)}
            reduced={reduced}
            delay={0}
          />
        ))}
      </SceneClock.Provider>

      {quality === "high" && <Effects />}
    </Canvas>
  );
}
