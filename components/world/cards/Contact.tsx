import { Fragment } from "react";
import { site, socials } from "@/lib/content";
import { ArrowRightIcon, socialIcons } from "@/components/icons";

export function Contact() {
  return (
    <>
      <p className="sheet__eyebrow">Parliamone</p>
      <h2 className="sheet__title" id="contatti-title">Lavoriamo insieme.</h2>
      <p>
        Hai un progetto con agenti AI, automazione o Bitcoin? Orchestro il team di agenti giusto per
        portarlo dal prompt al deploy.
      </p>
      <a href={`mailto:${site.email}`} className="cta__btn">
        Scrivimi una mail <ArrowRightIcon />
      </a>
      <p className="cta__links">
        {socials.map((s, i) => {
          const Icon = socialIcons[s.id];
          return (
            <Fragment key={s.id}>
              {i > 0 && <span className="cta__sep" aria-hidden="true">◆</span>}
              <a href={s.href} target="_blank" rel="noopener"><Icon /> {s.label}</a>
            </Fragment>
          );
        })}
      </p>
      <p className="colophon">
        edi.md — rete di agenti orchestrata da Edi, costruita da agenti AI. Inter · Roboto Mono ·
        carta #f7f7f4 su ink #12110d · © 2026.
      </p>
    </>
  );
}
