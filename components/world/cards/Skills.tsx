import { Fragment } from "react";
import { skills } from "@/lib/content";

export function Skills() {
  return (
    <>
      <p className="sheet__eyebrow">Cosa so fare</p>
      <h2 className="sheet__title" id="skills-title">Skills</h2>
      {skills.map((s) => (
        <Fragment key={s.group}>
          <h3 className="group">{s.group}</h3>
          <ul className="tags">{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
        </Fragment>
      ))}
    </>
  );
}
