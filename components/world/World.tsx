"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SectionId } from "@/lib/content";
import { useCapabilities } from "@/lib/useCapabilities";
import { Hud } from "./Hud";
import { Headline } from "./Headline";
import { NodeCard } from "./NodeCard";

// three + R3F + drei + postprocessing in un chunk separato, caricato solo se c'è WebGL.
const Scene = dynamic(() => import("./Scene").then((m) => m.Scene), { ssr: false, loading: () => null });

const VALID: readonly SectionId[] = ["about", "progetti", "skills", "experience", "contatti"];

type Nav = { selected: SectionId | null; focusProject: string | null };

/** hash dell'URL ⇄ stato di navigazione. #about · #progetti · #progetti/bitcode */
function parseHash(hash: string): Nav {
  const h = hash.replace(/^#/, "");
  if (!h) return { selected: null, focusProject: null };
  const [sec, proj] = h.split("/");
  if (!VALID.includes(sec as SectionId)) return { selected: null, focusProject: null };
  return {
    selected: sec as SectionId,
    focusProject: sec === "progetti" && proj ? decodeURIComponent(proj) : null,
  };
}

/**
 * Il mondo: canvas a schermo intero, HUD da shell sopra, card per la sezione
 * aperta. La navigazione passa dalla history del browser: ogni apertura è un
 * `pushState`, ogni "indietro" (X, esc, ‹, tasto Indietro) è `history.back()` —
 * così il tasto Indietro riporta sempre alla sezione precedente.
 * Senza WebGL diventa una pagina statica con tutte le sezioni.
 */
export function World() {
  const caps = useCapabilities();
  const [selected, setSelected] = useState<SectionId | null>(null);
  const [focusProject, setFocusProject] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const stateRef = useRef<Nav>({ selected, focusProject });
  stateRef.current = { selected, focusProject };

  const apply = useCallback((hash: string) => {
    const s = parseHash(hash);
    setSelected(s.selected);
    setFocusProject(s.focusProject);
  }, []);

  const navigate = useCallback(
    (hash: string) => {
      if (typeof window === "undefined") return;
      window.history.pushState(null, "", hash ? `#${hash}` : window.location.pathname + window.location.search);
      apply(hash ? `#${hash}` : "");
    },
    [apply],
  );

  const back = useCallback(() => window.history.back(), []);

  /** apertura/toggle di un nodo (o di un sotto-nodo progetto). null = indietro. */
  const select = useCallback(
    (id: SectionId | null, project?: string) => {
      const cur = stateRef.current;
      if (project !== undefined) {
        if (project === cur.focusProject) return back();
        return navigate(`progetti/${encodeURIComponent(project)}`);
      }
      if (id === null || (id === cur.selected && !cur.focusProject)) return back();
      return navigate(id);
    },
    [navigate, back],
  );

  useEffect(() => {
    const onPop = () => apply(window.location.hash);
    window.addEventListener("popstate", onPop);
    apply(window.location.hash); // deep-link all'avvio
    return () => window.removeEventListener("popstate", onPop);
  }, [apply]);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") back();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [back]);

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
      <NodeCard
        selected={selected}
        focusProject={focusProject}
        onClose={back}
        onBack={back}
        onSelectProject={(slug) => select("progetti", slug)}
        onHover={setHovered}
        isStatic={isStatic}
      />
    </div>
  );
}
