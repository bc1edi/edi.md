// Contenuti del sito — unica fonte di verità per sezioni, progetti e playlist.

export const site = {
  name: "edi.md",
  title: "Edi — Vibecoder, Orchestrator, Enthusiast",
  description:
    "Non scrivo codice. Orchestro agenti AI, prompt e workflow che lavorano per me. Agenti autonomi, Bitcoin, editoria AI.",
  shortDescription:
    "Non scrivo codice. Orchestro agenti AI, prompt e workflow che lavorano per me.",
  url: "https://edimd.vercel.app",
  twitter: "@edi_btc",
  email: "admin@faktotum.it",
  themeColor: "#26251e",
} as const;

export const nav = [
  { href: "#about", label: "--about", optional: true },
  { href: "#projects", label: "--progetti", optional: false },
  { href: "#skills", label: "--skills", optional: true },
  { href: "#experience", label: "--experience", optional: true },
  { href: "#contact", label: "--contatti", optional: false },
] as const;

export const rotatorWords = [
  "agenti AI",
  "workflow",
  "sistemi",
  "processi",
  "automazioni",
  "pipeline",
  "swarm",
  "prompt",
  "decisioni",
  "autonomia",
] as const;

/* ── Il mondo: nodi-sezione su un anello inclinato attorno all'hub ──────────
   Le posizioni sono derivate da una formula, non scelte a mano: un'ellisse
   (rx, ry) sul piano XY inclinata di TILT attorno all'asse X — la metà alta
   dell'anello si allontana dalla camera — più un piccolo scarto per nodo così
   non sembra un quadrante d'orologio. L'ordine angolare segue l'ordine di
   `sections` in senso orario; la fase lascia libero il settore in alto a
   sinistra, dove sta la headline. */
export type SectionId = "about" | "progetti" | "skills" | "experience" | "contatti";

export type SectionMeta = {
  id: SectionId;
  flag: string;
  title: string;
  /** colore di stato del nodo (solo acceso/selezionato), se diverso dall'arancione */
  accent?: string;
};

export type SectionNode = SectionMeta & { position: [number, number, number] };

/** Le sezioni, nell'ordine della nav e dell'anello. Senza posizione: la
 *  posizione dipende dalla composizione (desktop/mobile), vedi `layoutNodes`. */
export const sections: readonly SectionMeta[] = [
  { id: "about", flag: "--about", title: "About", accent: "#a3ff12" },
  { id: "progetti", flag: "--progetti", title: "Progetti" },
  { id: "skills", flag: "--skills", title: "Skills" },
  { id: "experience", flag: "--experience", title: "Experience", accent: "#ff3fb0" },
  { id: "contatti", flag: "--contatti", title: "Contatti" },
];

export type Ring = { rx: number; ry: number; tilt: number };

/** Desktop: ellisse larga, l'hub al centro, il settore in alto a sinistra
 *  libero per la headline. */
export const RING_DESKTOP: Ring = { rx: 4.0, ry: 2.7, tilt: (20 * Math.PI) / 180 };
/** Mobile (portrait): stessa formula, ellisse alta — i 5 nodi entrano nello
 *  schermo senza gesto. È la stessa composizione con aspect diverso. */
export const RING_MOBILE: Ring = { rx: 2.0, ry: 3.6, tilt: (14 * Math.PI) / 180 };

/** angolo sull'anello (gradi, senso orario dal top) + scarto [x,y,z] per nodo */
const RING_NODES: Record<SectionId, { deg: number; offset: [number, number, number] }> = {
  about: { deg: 74, offset: [0.1, 0, 0.15] },
  progetti: { deg: 12, offset: [-0.3, -0.15, 1.0] }, // +z: tirato verso la camera, è la vetrina
  skills: { deg: -58, offset: [0.15, 0.1, -1.3] },
  experience: { deg: -128, offset: [-0.2, -0.15, 0.3] },
  contatti: { deg: 165, offset: [0.1, -0.25, 0.5] },
};

function ringPosition(ring: Ring, deg: number, offset: [number, number, number], k: number): [number, number, number] {
  const a = (deg * Math.PI) / 180;
  return [
    ring.rx * Math.cos(a) + offset[0] * k,
    ring.ry * Math.sin(a) * Math.cos(ring.tilt) + offset[1] * k,
    -ring.ry * Math.sin(a) * Math.sin(ring.tilt) + offset[2] * k,
  ];
}

/** Nodi-sezione posizionati su un anello. Gli scarti per nodo sono scalati
 *  con l'anello (k) così su mobile restano proporzionati. */
export function layoutNodes(ring: Ring): SectionNode[] {
  const k = ring.rx / RING_DESKTOP.rx;
  return sections.map((s) => ({
    ...s,
    position: ringPosition(ring, RING_NODES[s.id].deg, RING_NODES[s.id].offset, k),
  }));
}

/** Satelliti del nodo Progetti: mini-orbita di 4 punti (uno per progetto),
 *  inclinata al contrario dell'anello così si leggono come un sottosistema.
 *  Offset dal nodo Progetti; `scale` li stringe su mobile. */
const SAT = { r: 1.4, tilt: (-22 * Math.PI) / 180, phase: (35 * Math.PI) / 180 };

export function satelliteOffsets(scale = 1): [number, number, number][] {
  return Array.from({ length: 4 }, (_, i) => {
    const a = SAT.phase + (i * Math.PI) / 2;
    const r = SAT.r * scale;
    return [r * Math.cos(a), r * Math.sin(a) * Math.cos(SAT.tilt), -r * Math.sin(a) * Math.sin(SAT.tilt)];
  });
}

/* ── Gli agenti: uno per nodo. Sono i worker che fanno la spola hub ↔ nodo; il
   readout li conta e li nomina. `solid` = agente-prodotto (bitcode), non ruolo. */
export type Agent = { id: string; label: string; section: SectionId; solid?: boolean };

export const agents: readonly Agent[] = [
  { id: "design", label: "AGENT: DESIGN", section: "about" },
  { id: "code", label: "AGENT: CODE", section: "progetti" },
  { id: "media", label: "AGENT: MEDIA", section: "skills" },
  { id: "deploy", label: "AGENT: DEPLOY", section: "experience" },
  { id: "bitcode", label: "BITCODE", section: "contatti", solid: true },
];

export const agentFor = (id: SectionId): Agent => agents.find((a) => a.section === id)!;

export type ProjectLink = {
  label: string;
  href: string;
  external?: boolean;
  muted?: boolean;
  arrow?: boolean;
};

export type Project = {
  slug: string;
  meta: string;
  name: string;
  body: string;
  tags: string[];
  links: ProjectLink[];
  core?: boolean;
};

export const projects: Project[] = [
  {
    slug: "faktotum",
    meta: "2026 · AI Agents / R&D",
    name: "faktotum",
    body:
      "Hub tecnologico agentico — il laboratorio dove sperimento nuove tecnologie AI, agenti autonomi e workflow prima che diventino prodotti.",
    tags: ["AI Agents", "R&D", "Automation"],
    links: [],
  },
  {
    slug: "bitcode",
    meta: "2026 · AI Agents / Bitcoin",
    name: "bitcode",
    body:
      "Agente di coding da terminale, in stile Claude Code, con integrazione nativa Bitcoin e Lightning Network. Privacy by design: nessuna chiave o credenziale lascia mai la macchina.",
    tags: ["AI Agents", "Bitcoin", "CLI"],
    core: true,
    links: [
      { label: "Demo", href: "https://bitcode-agent.vercel.app/", external: true, arrow: true },
      { label: "Esplora bitcode", href: "https://github.com/bc1edi/bitcode", external: true, muted: true, arrow: true },
    ],
  },
  {
    slug: "edi-md",
    meta: "2026 · Vibe Coding",
    name: "edi.md",
    body:
      "Sito portfolio sviluppato con agenti AI. Design system, audio immersivo, stack modulare e integrazione continua.",
    tags: ["Vibe Coding", "Design", "Automation"],
    links: [
      { label: "Esplora edi.md", href: "https://github.com/bc1edi/edi.md", external: true, arrow: true },
    ],
  },
  {
    slug: "habilis",
    meta: "Completato · Editoria AI",
    name: "habilis",
    body:
      "Enciclica artificiale — progetto editoriale generato con agenti AI. Un'AI scrive di sé stessa, tra il test di Turing e il problema difficile della coscienza: nessuna certezza, solo l'onestà di chi non sa cosa è.",
    tags: ["AI Agents", "Editoria", "Completato"],
    links: [
      { label: "Leggi il libro", href: "https://habilis-book.com", external: true, arrow: true },
      { label: "Anteprima cap. 1", href: "https://habilis-book.com/anteprima.html", external: true, muted: true },
    ],
  },
];

export const skills = [
  { group: "Vibecoder", items: ["AI Agents", "Prompt Engineering", "Automation", "Tool Orchestration", "Agent Media Management"] },
  { group: "Tecnologia", items: ["JavaScript / TypeScript", "Python", "Docker", "Git / CI", "Bitcoin / Lightning"] },
  { group: "Brand & Design", items: ["Design System", "Personal Brand", "Audio System"] },
] as const;

export type ExperienceStop = {
  date: string;
  name: string;
  lead: string;
  body: readonly string[]; // "\n" nel testo = a capo forzato
  tags: readonly string[];
  current: boolean;
};

export const experience: readonly ExperienceStop[] = [
  {
    date: "2026 — presente",
    name: "Freelance Vibecoder",
    lead: "Costruisco sistemi digitali, non semplicemente software.",
    body: [
      "Sono anche un vibecoder: utilizzo l'AI per trasformare idee e intenzioni in prodotti digitali funzionanti. Progetto l'architettura, definisco i workflow, scrivo i prompt, collego strumenti e API e coordino agenti AI autonomi lungo tutto il processo.",
      "Dall'idea al prototipo.\nDal primo prompt al primo commit.\nDal design al deploy.",
      "Lavoro con sistemi composti da agenti, modelli, API, automazioni e infrastruttura, progettati per lavorare insieme, in parallelo e con il minor intervento manuale possibile.",
    ],
    tags: ["AI Agents", "Vibecoding", "Prompt Engineering", "Automation", "API", "Design-to-Code", "Orchestration"],
    current: true,
  },
  {
    date: "2016 — presente",
    name: "Bitcoiner",
    lead: "Bitcoin è il mio laboratorio permanente.",
    body: [
      "Studio, utilizzo e costruisco infrastruttura attorno a Bitcoin. Gestione di nodi, analisi on-chain, automazione delle transazioni e sperimentazione con sistemi decentralizzati e Lightning Network.",
      "Un percorso che mi ha portato a lavorare con sistemi dove non esiste un pulsante “fai tu”: bisogna capire l'infrastruttura, controllare ciò che si esegue e automatizzare senza perdere il controllo.",
    ],
    tags: ["Bitcoin", "Lightning Network", "Nodes", "On-chain", "Automation", "Infrastructure"],
    current: true,
  },
  {
    date: "2015 — presente",
    name: "Restaurant Manager",
    lead: "Prima degli agenti AI orchestravo persone, collaboratori e processi. Lo faccio ancora.",
    body: [
      "Da oltre dieci anni gestisco operazioni nel mondo della ristorazione: coordinamento dei team, organizzazione del lavoro, formazione, ordini e fornitori, controllo dei costi, qualità e problem solving.",
      "Un ambiente dove i sistemi devono funzionare in tempo reale, le variabili cambiano continuamente e qualcuno deve prendere decisioni mentre il lavoro è già in corso.",
      "È lì che ho imparato — e verifico ogni giorno — che un buon sistema non è quello che fa tutto da solo. È quello in cui ogni parte sa cosa deve fare.",
      "Le stesse logiche le applico oggi a sistemi digitali, workflow e agenti AI.",
    ],
    tags: ["Operations", "Team Management", "Process Optimization", "Training", "Cost Control", "Quality Management"],
    current: true,
  },
];

export const socials = [
  { id: "github", label: "GitHub", href: "https://github.com/bc1edi" },
  { id: "x", label: "X", href: "https://x.com/edi_btc" },
  { id: "linkedin", label: "LinkedIn", href: "https://it.linkedin.com/in/edi-de-rosa-12302290" },
  { id: "send", label: "Telegram", href: "https://t.me/Addr1000" },
] as const;

export const tracks = [
  { title: "Calm", src: "/assets/audio/calm.mp3" },
  { title: "Celtik Spoon", src: "/assets/audio/Celtik spoon.mp3" },
  { title: "Down Bad Again", src: "/assets/audio/Down bad again.mp3" },
  { title: "Progressive", src: "/assets/audio/progressive.mp3" },
  { title: "Reborn", src: "/assets/audio/Reborn.mp3" },
  { title: "Vibrate", src: "/assets/audio/Vibrate.mp3" },
] as const;
