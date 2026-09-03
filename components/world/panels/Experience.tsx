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
            <p className="stop__body">{stop.body}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
