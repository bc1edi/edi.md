"use client";

import { useEffect, useState } from "react";
import { sections, type SectionId } from "@/lib/content";

type Props = {
  selected: SectionId | null;
  hovered: string | null;
  onSelect: (id: SectionId | null) => void;
  onHover: (id: string | null) => void;
  reduced: boolean;
};

const pad = (n: number) => String(n).padStart(4, "0");

/**
 * HUD: la riga di comando in alto è la navigazione — ogni flag è un nodo del
 * mondo. A destra, la strumentazione: orologio, coordinate, agenti online.
 */
export function Hud({ selected, hovered, onSelect, onHover, reduced }: Props) {
  const [time, setTime] = useState("--:--");
  const [pos, setPos] = useState("0000 X 0000 Y");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const offset = -now.getTimezoneOffset() / 60;
      setTime(`GMT${offset >= 0 ? "+" : ""}${offset} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`);
    };
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => setPos(`${pad(Math.round(e.clientX))} X ${pad(Math.round(e.clientY))} Y`);
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, [reduced]);

  return (
    <div className="hud">
      <header className="hud__top">
        <nav aria-label="Navigazione principale">
          <p className="prompt">
            <span className="prompt__mark" aria-hidden="true">&gt;</span>
            <a href="/" className="prompt__brand" onClick={(e) => { e.preventDefault(); onSelect(null); }}>
              edi<span>.md</span>
            </a>
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                className={
                  "prompt__flag" + (selected === s.id ? " is-active" : "") + (hovered === s.id ? " is-hover" : "")
                }
                aria-pressed={selected === s.id}
                onClick={() => onSelect(selected === s.id ? null : s.id)}
                onMouseEnter={() => onHover(s.id)}
                onMouseLeave={() => onHover(null)}
                onFocus={() => onHover(s.id)}
                onBlur={() => onHover(null)}
              >
                {s.flag}
              </button>
            ))}
            {!selected && <span className="prompt__caret" aria-hidden="true">▌</span>}
          </p>
        </nav>
        <p className="readout" aria-hidden="true">
          <span>{time}</span>
          <span>{pos}</span>
          <span><span className="readout__dot" />Agents [5] online</span>
        </p>
      </header>
    </div>
  );
}
