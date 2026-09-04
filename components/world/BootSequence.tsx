"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  "> edi.md --init",
  "world ···················· ok",
  "agents [5] ··············· online",
  "orchestrator ············· ready",
] as const;

const STEP = 240; // ms per riga
const HOLD = 360; // ms dopo l'ultima riga
const FADE = 380; // ms di dissolvenza

/**
 * Boot da terminale alla prima visita: le righe si "compilano" una a una,
 * poi lo schermo si dissolve sulla scena già in movimento (il volo camera e
 * l'ingresso dei nodi girano sotto). Salta al primo tocco/tasto. Mai con
 * prefers-reduced-motion (gestito da World). Durata totale < 2 s.
 */
export function BootSequence({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    const finish = () => {
      if (done.current) return;
      done.current = true;
      setLeaving(true);
      window.setTimeout(onDone, FADE);
    };

    const timers = LINES.map((_, i) => window.setTimeout(() => setShown(i + 1), 160 + i * STEP));
    timers.push(window.setTimeout(finish, 160 + LINES.length * STEP + HOLD));

    window.addEventListener("pointerdown", finish);
    window.addEventListener("keydown", finish);
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("pointerdown", finish);
      window.removeEventListener("keydown", finish);
    };
  }, [onDone]);

  return (
    <div className={leaving ? "boot is-leaving" : "boot"} aria-hidden="true">
      <pre className="boot__text">
        {LINES.slice(0, shown).map((l, i) => (
          <span key={i} className={i === 0 ? "boot__cmd" : undefined}>
            {l}
            {"\n"}
          </span>
        ))}
        <span className="boot__caret">▌</span>
      </pre>
    </div>
  );
}
