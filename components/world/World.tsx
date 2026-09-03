"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import type { SectionId } from "@/lib/content";
import { useCapabilities } from "@/lib/useCapabilities";
import { Hud } from "./Hud";
import { Headline } from "./Headline";
import { NodeCard } from "./NodeCard";

// three + R3F + drei + postprocessing in un chunk separato, caricato solo se c'è WebGL.
const Scene = dynamic(() => import("./Scene").then((m) => m.Scene), { ssr: false, loading: () => null });

/**
 * Il mondo: canvas a schermo intero, HUD da shell sopra, pannello per la
 * sezione aperta. Senza WebGL diventa una pagina statica con tutte le sezioni.
 */
export function World() {
  const caps = useCapabilities();
  const [selected, setSelected] = useState<SectionId | null>(null);
  const [focusProject, setFocusProject] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // tap su un nodo: toggle. Tap sul sotto-nodo progetto: toggle del progetto.
  const select = useCallback((id: SectionId | null, project?: string) => {
    if (project !== undefined) {
      setSelected("progetti");
      setFocusProject((prev) => (prev === project ? null : project));
      return;
    }
    setSelected((prev) => (prev === id ? null : id));
    setFocusProject(null);
  }, []);

  // un passo indietro: da progetto → layer progetti; da sezione → punto iniziale
  const stepBack = useCallback(() => {
    setFocusProject((fp) => {
      if (fp) return null;
      setSelected(null);
      return null;
    });
  }, []);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") stepBack();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stepBack]);

  const isStatic = caps.ready && !caps.webgl;
  const quality = caps.coarsePointer || caps.narrow ? "low" : "high";
  const panelSide = caps.narrow ? "bottom" : "right";

  return (
    <div className="world" data-static={isStatic ? "" : undefined}>
      {caps.ready && caps.webgl && (
        <div className="world__canvas" aria-hidden="true">
          <Scene
            selected={selected}
            focusProject={focusProject}
            hovered={hovered}
            onSelect={select}
            onHover={setHovered}
            reduced={caps.reducedMotion}
            quality={quality}
            panelSide={panelSide}
          />
        </div>
      )}
      {!isStatic && <div className="world__vignette" aria-hidden="true" />}

      <Hud selected={selected} hovered={hovered} onSelect={select} onHover={setHovered} reduced={caps.reducedMotion} />
      <Headline onContact={() => select("contatti")} />
      <NodeCard selected={selected} focusProject={focusProject} onClose={() => select(null)} onHover={setHovered} isStatic={isStatic} />
    </div>
  );
}
