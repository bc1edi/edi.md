"use client";

import { useEffect, useRef } from "react";
import { sections, type SectionId } from "@/lib/content";
import { About } from "./panels/About";
import { Projects } from "./panels/Projects";
import { Skills } from "./panels/Skills";
import { Experience } from "./panels/Experience";
import { Contact } from "./panels/Contact";

type Props = { selected: SectionId | null; focusProject: string | null; onClose: () => void; isStatic: boolean };

/**
 * Il pannello della sezione aperta. Tutte le sezioni sono nel DOM (indicizzabili,
 * leggibili senza JS): solo quella selezionata è visibile.
 */
export function Panel({ selected, focusProject, onClose, isStatic }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const current = sections.find((s) => s.id === selected);

  useEffect(() => {
    if (selected && !isStatic) {
      closeRef.current?.focus({ preventScroll: true });
      bodyRef.current?.scrollTo({ top: 0 });
    }
  }, [selected, isStatic]);

  return (
    <aside id="panel" className={selected || isStatic ? "panel is-open" : "panel"} aria-label={current ? current.title : "Sezioni"} aria-hidden={!selected && !isStatic}>
      <div className="panel__bar">
        <p className="panel__cmd">
          <span aria-hidden="true">&gt; </span>
          <b>edi<span>.md</span></b> <em>{current?.flag}</em>
        </p>
        <button ref={closeRef} type="button" className="panel__close" onClick={onClose}>
          chiudi [esc]
        </button>
      </div>
      <div className="panel__body" ref={bodyRef}>
        <section className="panel__section sheet" hidden={!isStatic && selected !== "about"} aria-labelledby="about-title"><About /></section>
        <section className="panel__section sheet" hidden={!isStatic && selected !== "progetti"} aria-labelledby="progetti-title"><Projects focus={focusProject} /></section>
        <section className="panel__section sheet" hidden={!isStatic && selected !== "skills"} aria-labelledby="skills-title"><Skills /></section>
        <section className="panel__section sheet" hidden={!isStatic && selected !== "experience"} aria-labelledby="experience-title"><Experience /></section>
        <section className="panel__section sheet" hidden={!isStatic && selected !== "contatti"} aria-labelledby="contatti-title"><Contact /></section>
      </div>
    </aside>
  );
}
