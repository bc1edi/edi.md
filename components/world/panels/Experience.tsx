import { experience } from "@/lib/content";

export function Experience() {
  return (
    <>
      <p className="sheet__eyebrow">Il percorso</p>
      <h2 className="sheet__title" id="experience-title">Experience</h2>
      <ol className="timeline">
        {experience.map((stop) => (
          <li className={stop.current ? "stop stop--current" : "stop"} key={stop.name}>
            <p className="stop__date">{stop.date}</p>
            <h3 className="stop__name">{stop.name}</h3>
            <p className="stop__lead">{stop.lead}</p>
            <div className="stop__body">
              {stop.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <ul className="tags stop__tags">
              {stop.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </>
  );
}
