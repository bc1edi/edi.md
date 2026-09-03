"use client";

import { useEffect, useState } from "react";
import { rotatorWords } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/useCapabilities";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

function Rotator() {
  const reduced = usePrefersReducedMotion();
  const [text, setText] = useState<string>(rotatorWords[0]);
  useEffect(() => {
    if (reduced) return;
    let index = 0;
    let scramble = 0;
    const scrambleTo = (word: string) => {
      let frame = 0;
      const total = Math.max(14, word.length * 3);
      window.clearInterval(scramble);
      scramble = window.setInterval(() => {
        let out = "";
        for (let i = 0; i < word.length; i++) {
          out += i < (frame / total) * word.length * 1.4 ? word[i] : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setText(out);
        if (++frame > total) {
          window.clearInterval(scramble);
          setText(word);
        }
      }, 34);
    };
    const loop = window.setInterval(() => {
      index = (index + 1) % rotatorWords.length;
      scrambleTo(rotatorWords[index]);
    }, 3200);
    return () => {
      window.clearInterval(loop);
      window.clearInterval(scramble);
    };
  }, [reduced]);
  return <em aria-live="polite">{text}</em>;
}

/** L'output della shell: la tesi del sito, ancorata sotto il prompt. Resta
 *  sempre visibile — è chrome della shell, come il prompt stesso. In coda, il
 *  comando successivo: il contatto, sempre a un tocco. */
export function Headline({ onContact }: { onContact: () => void }) {
  return (
    <>
      <section className="headline" aria-labelledby="headline-title">
        <h1 className="headline__title" id="headline-title">
          <span>Non scrivo codice.</span>
          <span>Orchestro <Rotator />.</span>
        </h1>
        <p className="headline__sub">
          Orchestro agenti autonomi che scrivono codice, pubblicano libri e costruiscono brand — da bitcode a habilis al
          design system di questo sito. Descrivi il risultato, gli agenti fanno il resto. Quello che vedi qui è lo stesso
          sistema, al lavoro.
        </p>
        <a
          href="#panel"
          className="headline__cta"
          onClick={(e) => {
            e.preventDefault();
            onContact();
          }}
        >
          <span className="prompt__mark" aria-hidden="true">&gt;</span> contatti <em>--mail</em>
        </a>
      </section>
      <p className="headline__hint">
        <span>Trascina per ruotare</span>
        <span>Clicca un nodo</span>
        <span>Scroll per avvicinare</span>
      </p>
    </>
  );
}
