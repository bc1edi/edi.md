"use client";

import { useEffect, useRef } from "react";
import { agentFor, sections, type SectionId } from "@/lib/content";
import { About } from "./panels/About";
import { Projects } from "./panels/Projects";
import { Skills } from "./panels/Skills";
import { Experience } from "./panels/Experience";
import { Contact } from "./panels/Contact";

type Props = {
  selected: SectionId | null;
  focusProject: string | null;
  onClose: () => void;
  onHover: (id: string | null) => void;
  isStatic: boolean;
};

/**
 * Il pannello della sezione aperta. Tutte le sezioni sono nel DOM (indicizzabili,
 * leggibili senza JS): solo quella selezionata è visibile. La barra riporta lo
 * stato dell'agente del nodo, così su mobile — dove copre la mappa — il
 * contesto non si perde. Su touch, swipe verso il basso sulla barra chiude.
 */
export function Panel({ selected, focusProject, onClose, onHover, isStatic }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const current = sections.find((s) => s.id === selected);

  useEffect(() => {
    if (selected && !isStatic) {
      closeRef.current?.focus({ preventScroll: true });
      bodyRef.current?.scrollTo({ top: 0 });
    }
  }, [selected, isStatic]);

  return (
    <aside id="panel" className={selected || isStatic ? "panel is-open" : "panel"} aria-label={current ? current.title : "Sezioni"} aria-hidden={!selected && !isStatic}>
      <div
        className="panel__bar"
        onTouchStart={(e) => {
          touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }}
        onTouchEnd={(e) => {
          const s = touch.current;
          touch.current = null;
          if (!s) return;
          const dx = e.changedTouches[0].clientX - s.x;
          const dy = e.changedTouches[0].clientY - s.y;
          if (dy > 70 && Math.abs(dx) < 50) onClose();
        }}
      >
        <p className="panel__cmd">
          <span aria-hidden="true">&gt; </span>
          <b>edi<span>.md</span></b> <em>{current?.flag}</em>
          {current && (
            <span className="panel__agent">
              <span className="readout__dot" aria-hidden="true" />
              {agentFor(current.id).label} · active
            </span>
          )}
        </p>
        <button ref={closeRef} type="button" className="panel__close" onClick={onClose}>
          chiudi<span className="panel__close-key"> [esc]</span>
        </button>
      </div>
      <div className="panel__body" ref={bodyRef}>
        <section className="panel__section sheet" hidden={!isStatic && selected !== "about"} aria-labelledby="about-title"><About /></section>
        <section className="panel__section sheet" hidden={!isStatic && selected !== "progetti"} aria-labelledby="progetti-title"><Projects focus={focusProject} onHover={onHover} /></section>
        <section className="panel__section sheet" hidden={!isStatic && selected !== "skills"} aria-labelledby="skills-title"><Skills /></section>
        <section className="panel__section sheet" hidden={!isStatic && selected !== "experience"} aria-labelledby="experience-title"><Experience /></section>
        <section className="panel__section sheet" hidden={!isStatic && selected !== "contatti"} aria-labelledby="contatti-title"><Contact /></section>
      </div>
    </aside>
  );
}
