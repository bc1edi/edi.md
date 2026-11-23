# edi.md

Portfolio e laboratorio digitale di **Edi** — *Vibecoder, Orchestrator, Enthusiast*.

Edizione statica zero-dipendenze in HTML, CSS e JavaScript puro:
- Palette e tipografia proprietarie (`#f7f7f4` / `#26251e` / `#f54e00` · `Pixelify Sans` & `Montserrat` self-hosted).
- Sprite vettoriali pixel-art 16-bit (`assets/sprites/`), animazione Hero legata allo scroll e bilinguismo EN/IT.
- Zero runtime cloud obbligatorio: nessun bundler, nessuna chiamata esterna.

## Struttura

- `index.html`: documento principale e markup semantico bilingue.
- `styles.css`: stili, layout responsive e keyframe pixel/scroll.
- `app.js`: i18n EN/IT, fisica della collisione in Hero, accordion progetti e validazione modulo.
- `assets/`: sprite SVG della crew (`Edi`, `CODE`, `DESIGN`, `BITCODE`), loghi progetti, icone e immagini OpenGraph.
- `fonts/`: font locali (`Pixelify Sans`, `Montserrat`).
- `vercel.json`: configurazione deploy statico su Vercel (`https://edimd.vercel.app/`).

## Anteprima locale

```sh
python3 -m http.server 8080
```

Apri `http://localhost:8080`.
