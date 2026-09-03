import { World } from "@/components/world/World";

export default function Home() {
  return (
    <main>
      {/* Senza JS il mondo non c'è: si mostrano tutte le sezioni in colonna. */}
      <noscript>
        <style>{`.world .node-card{position:static;transform:none;height:auto;max-height:none;border:0;border-radius:0;background:transparent;backdrop-filter:none;overflow:visible}.world .node-card__bar,.world .node-card__tether{display:none}.world .node-card__section[hidden]{display:block!important}.world .node-card__body{padding-inline:var(--hud-pad);display:grid;gap:var(--space-2xl);max-width:720px;background:transparent}.world .headline{position:static;padding:96px var(--hud-pad) 32px}.world .headline::before,.world .headline__hint{display:none}body{overflow:auto}`}</style>
      </noscript>
      <World />
    </main>
  );
}
