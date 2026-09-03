"use client";

import { useEffect, useRef } from "react";
import { sections, type SectionId } from "@/lib/content";
import { About } from "./cards/About";
import { Projects } from "./cards/Projects";
import { Skills } from "./cards/Skills";
import { Experience } from "./cards/Experience";
import { Contact } from "./cards/Contact";

type Props = {
  selected: SectionId | null;
  focusProject: string | null;
  onClose: () => void;
  onHover: (id: string | null) => void;
  isStatic: boolean;
};

const TITLE_ID: Record<SectionId, string> = {
  about: "about-title",
  progetti: "progetti-title",
  skills: "skills-title",
  experience: "experience-title",
  contatti: "contatti-title",
};

/**
 * La card della sezione aperta: ancorata al nodo (la camera lo parcheggia
 * sempre nello stesso punto, un trattino la collega), semi-trasparente, con la
 * scena che si oscura dietro. Sostituisce il vecchio pannello laterale.
 * Tutte le sezioni sono nel DOM; in `data-static` sono tutte in colonna.
 */
export function NodeCard({ selected, focusProject, onClose, onHover, isStatic }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const current = sections.find((s) => s.id === selected);
  const open = selected !== null || isStatic;

  useEffect(() => {
    if (selected && !isStatic) {
      closeRef.current?.focus({ preventScroll: true });
      bodyRef.current?.scrollTo({ top: 0 });
    }
  }, [selected, focusProject, isStatic]);

  return (
    <>
      {open && !isStatic && <div className="world__scrim" aria-hidden="true" onClick={onClose} />}
      <aside
        id="panel"
        className={open ? "node-card is-open" : "node-card"}
        role="dialog"
        aria-modal="false"
        aria-labelledby={selected ? TITLE_ID[selected] : undefined}
        aria-hidden={!open}
      >
        <span className="node-card__tether" aria-hidden="true" />
        <div
          className="node-card__bar"
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
          <p className="node-card__cmd">
            <span aria-hidden="true">&gt; </span>
            <b>edi<span>.md</span></b> <em>{current?.flag}</em>
          </p>
          <button ref={closeRef} type="button" className="node-card__close" onClick={onClose} aria-label="Chiudi">
            <span aria-hidden="true">✕</span>
          </button>
        </div>
        <div className="node-card__body" ref={bodyRef}>
          <section className="node-card__section sheet" hidden={!isStatic && selected !== "about"} aria-labelledby="about-title"><About /></section>
          <section className="node-card__section sheet" hidden={!isStatic && selected !== "progetti"} aria-labelledby="progetti-title"><Projects focus={focusProject} isStatic={isStatic} onHover={onHover} /></section>
          <section className="node-card__section sheet" hidden={!isStatic && selected !== "skills"} aria-labelledby="skills-title"><Skills /></section>
          <section className="node-card__section sheet" hidden={!isStatic && selected !== "experience"} aria-labelledby="experience-title"><Experience /></section>
          <section className="node-card__section sheet" hidden={!isStatic && selected !== "contatti"} aria-labelledby="contatti-title"><Contact /></section>
        </div>
      </aside>
    </>
  );
}
