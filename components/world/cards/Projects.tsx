"use client";

import { projects, type Project, type ProjectLink } from "@/lib/content";
import { ArrowRightIcon } from "@/components/icons";

function Anchor({ link }: { link: ProjectLink }) {
  return (
    <a
      href={link.href}
      className={link.muted ? "link link--muted" : "link"}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener" : undefined}
    >
      {link.label}
      {link.arrow && <ArrowRightIcon />}
    </a>
  );
}

function ProjectBody({ p }: { p: Project }) {
  return (
    <>
      <p className="proj__meta">{p.meta}</p>
      <dl className="proj__lines">
        <div><dt>Cos&apos;è</dt><dd>{p.card.what}</dd></div>
        <div><dt>Come funziona</dt><dd>{p.card.how}</dd></div>
        <div><dt>A cosa serve</dt><dd>{p.card.why}</dd></div>
      </dl>
      <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
      {p.links.length > 0 && (
        <div className="proj__links">{p.links.map((l) => <Anchor link={l} key={l.href} />)}</div>
      )}
    </>
  );
}

type Props = {
  /** slug del progetto aperto, o null per l'indice del layer */
  focus: string | null;
  /** fallback statico: mostra tutti i progetti in colonna */
  isStatic?: boolean;
  onHover: (slug: string | null) => void;
  onSelect: (slug: string) => void;
  onBack: () => void;
};

export function Projects({ focus, isStatic, onHover, onSelect, onBack }: Props) {
  if (isStatic) {
    return (
      <>
        <p className="sheet__eyebrow">Cosa costruisco</p>
        <h2 className="sheet__title" id="progetti-title">Progetti</h2>
        <div className="proj__stack">
          {projects.map((p) => (
            <article className="proj" key={p.slug}>
              <h3 className="proj__name">{p.name}</h3>
              <ProjectBody p={p} />
            </article>
          ))}
        </div>
      </>
    );
  }

  const current = focus ? projects.find((p) => p.slug === focus) : null;

  // --progetti da solo non apre la card (i sotto-nodi 3D sono la scelta);
  // questo ramo serve solo come rete di sicurezza / lista di ripiego.
  if (!current) {
    return (
      <>
        <p className="sheet__eyebrow">Cosa costruisco</p>
        <h2 className="sheet__title" id="progetti-title">Progetti</h2>
        <ul className="proj__index">
          {projects.map((p) => (
            <li key={p.slug}>
              <button
                type="button"
                className="proj__index-item"
                onClick={() => onSelect(p.slug)}
                onMouseEnter={() => onHover(p.slug)}
                onMouseLeave={() => onHover(null)}
                onFocus={() => onHover(p.slug)}
                onBlur={() => onHover(null)}
              >
                {p.name} <span aria-hidden="true">→</span>
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <button type="button" className="proj__back" onClick={onBack}>
        <span aria-hidden="true">‹</span> Progetti
      </button>
      <h2 className="sheet__title" id="progetti-title">{current.name}</h2>
      <article className="proj proj--solo">
        <ProjectBody p={current} />
      </article>
    </>
  );
}
