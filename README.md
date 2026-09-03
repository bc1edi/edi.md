# edi.md

Portfolio di Edi — Vibecoder, Orchestrator, Enthusiast. Un mondo 3D esplorabile: la rete di agenti nello spazio, con le sezioni del sito come nodi. Costruito con agenti AI.

## Stack

- Next.js 16 (App Router) · TypeScript strict · Tailwind CSS v4 (token in `app/globals.css`)
- three + @react-three/fiber + drei + postprocessing — il mondo in `components/world/`, caricato lazy solo se c'è WebGL; senza WebGL (o senza JS) le sezioni si mostrano in colonna
- Contenuti e coordinate dei nodi in `lib/content.ts`, icone brand in `components/icons/`

## Come si usa il sito

Trascina per ruotare, scroll per avvicinare, clicca un nodo (o un flag nella riga di comando in alto) per aprire la sezione; `esc` chiude. Su touch: tocca. Con `prefers-reduced-motion` niente rotazione automatica né agenti in movimento.

## Comandi

```sh
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

## Brand

Carta `#f7f7f4` su ink `#12110d`, accento `#f54e00` come unica luce · Inter / Lato / Roboto Mono · geometria ortogonale, angoli vivi (cubi, gabbie, asterisco).
