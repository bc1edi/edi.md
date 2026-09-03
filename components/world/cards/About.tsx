export function About() {
  return (
    <>
      <p className="sheet__eyebrow">Chi sono</p>
      <h2 className="sheet__title" id="about-title">About</h2>
      <p>
        <strong>Ciao, sono Edi.</strong> Non passo la giornata a scrivere codice:{" "}
        <strong>decido cosa deve succedere.</strong> Progetto sistemi, disegno architetture, scrivo i
        prompt giusti e metto gli agenti AI nelle condizioni di fare il lavoro vero.
      </p>
      <p>
        Un agente pensa, un altro costruisce, un altro controlla. Io faccio in modo che lavorino
        insieme. <strong>Non è delega, è orchestrazione.</strong>
      </p>
      <p>
        La parte difficile resta umana: capire il problema, scegliere la direzione. L&apos;esecuzione
        si automatizza. Io non voglio essere il miglior dattilografo della stanza —{" "}
        <strong>voglio essere quello che sa dove mandare tutti.</strong>
      </p>
      <dl className="spec">
        <div className="spec__row"><dt>Location</dt><dd>IT</dd></div>
        <div className="spec__row"><dt>Focus</dt><dd>LOCAL AGENTS</dd></div>
        <div className="spec__row"><dt>Skill</dt><dd>DESIGN SYS<br />AUDIO SYS<br />SWARM SYS</dd></div>
        <div className="spec__row"><dt>Status</dt><dd className="spec__status">Online</dd></div>
      </dl>
    </>
  );
}
