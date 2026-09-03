export function About() {
  return (
    <>
      <p className="sheet__eyebrow">Chi sono</p>
      <h2 className="sheet__title" id="about-title">About</h2>
      <p>
        <strong>Ciao, sono Edi.</strong> Sono un vibecoder: progetto sistemi, non singole righe di codice.
        Definisco l&apos;architettura, scrivo i prompt giusti, e lascio che gli agenti AI eseguano —
        dal primo commit al deploy in produzione.
      </p>
      <p>
        Non è delega, è direzione: il ragionamento strategico resta umano, l&apos;esecuzione è AI.
        Il risultato è uno stack fatto di agenti, API e automazione che si muove alla velocità
        del pensiero, non della tastiera.
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
