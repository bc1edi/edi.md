"use client";

import { useEffect, useRef } from "react";
import { projects, type ProjectLink } from "@/lib/content";
import { ArrowRightIcon } from "@/components/icons";

function Anchor({ link }: { link: ProjectLink }) {
  return (
    <a href={link.href} className={link.muted ? "link link--muted" : "link"} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener" : undefined}>
      {link.label}
      {link.arrow && <ArrowRightIcon />}
    </a>
  );
}

type Props = { focus: string | null; /** hover su una scheda accende il suo satellite nella mappa */ onHover: (slug: string | null) => void };

export function Projects({ focus, onHover }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!focus || !ref.current) return;
    ref.current.querySelector<HTMLElement>(`[data-slug="${focus}"]`)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [focus]);

  return (
    <>
      <p className="sheet__eyebrow">Cosa costruisco</p>
      <h2 className="sheet__title" id="progetti-title">Progetti</h2>
      <div className="cards" ref={ref}>
        {projects.map((p) => (
          <article
            className={"card" + (p.core ? " is-core" : "") + (focus === p.slug ? " is-focus" : "")}
            key={p.slug}
            data-slug={p.slug}
            onMouseEnter={() => onHover(p.slug)}
            onMouseLeave={() => onHover(null)}
          >
            <p className="card__meta">{p.meta}</p>
            <div className="card__body">
              <h3 className="card__name">{p.name}</h3>
              <p>{p.body}</p>
            </div>
            <div className="card__footer">
              <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
              {p.links.length > 0 && <div className="card__links">{p.links.map((l) => <Anchor link={l} key={l.href} />)}</div>}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
