import { World } from "@/components/world/World";

export default function Home() {
  return (
    <main>
      {/* Senza JS il mondo non c'è: si mostrano tutte le sezioni in colonna. */}
      <noscript>
        <style>{`.world .panel{position:static;transform:none;height:auto;border:0;background:transparent}.world .panel__bar{display:none}.world .panel__section[hidden]{display:block!important}.world .panel__body{padding-inline:var(--hud-pad);display:grid;gap:var(--space-2xl);max-width:720px}.world .headline{position:static;padding:96px var(--hud-pad) 32px}.world .headline::before,.world .headline__hint{display:none}body{overflow:auto}`}</style>
      </noscript>
      <World />
    </main>
  );
}
