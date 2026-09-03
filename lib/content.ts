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

export type SectionNode = {
  id: SectionId;
  flag: string;
  title: string;
  position: [number, number, number];
};

const RING = { rx: 4.0, ry: 2.7, tilt: (20 * Math.PI) / 180 };

/** angolo sull'anello (gradi, senso orario dal top) + scarto [x,y,z] per nodo */
const RING_NODES: Record<SectionId, { deg: number; offset: [number, number, number] }> = {
  about: { deg: 74, offset: [0.1, 0, 0.15] },
  progetti: { deg: 12, offset: [-0.3, -0.15, 1.0] }, // +z: tirato verso la camera, è la vetrina
  skills: { deg: -58, offset: [0.15, 0.1, -1.3] },
  experience: { deg: -128, offset: [-0.2, -0.15, 0.3] },
  contatti: { deg: 165, offset: [0.1, -0.25, 0.5] },
};

function ringPosition(deg: number, offset: [number, number, number]): [number, number, number] {
  const a = (deg * Math.PI) / 180;
  return [
    RING.rx * Math.cos(a) + offset[0],
    RING.ry * Math.sin(a) * Math.cos(RING.tilt) + offset[1],
    -RING.ry * Math.sin(a) * Math.sin(RING.tilt) + offset[2],
  ];
}

export const sections: readonly SectionNode[] = (
  [
    { id: "about", flag: "--about", title: "About" },
    { id: "progetti", flag: "--progetti", title: "Progetti" },
    { id: "skills", flag: "--skills", title: "Skills" },
    { id: "experience", flag: "--experience", title: "Experience" },
    { id: "contatti", flag: "--contatti", title: "Contatti" },
  ] as const
).map((s) => ({ ...s, position: ringPosition(RING_NODES[s.id].deg, RING_NODES[s.id].offset) }));

/** Satelliti del nodo Progetti: mini-orbita di 4 punti (uno per progetto),
 *  raggio SAT.r, inclinata al contrario dell'anello così si leggono come un
 *  sottosistema. Offset dal nodo Progetti. */
const SAT = { r: 1.4, tilt: (-22 * Math.PI) / 180, phase: (35 * Math.PI) / 180 };

export const projectOffsets: readonly [number, number, number][] = Array.from({ length: 4 }, (_, i) => {
  const a = SAT.phase + (i * Math.PI) / 2;
  return [
    SAT.r * Math.cos(a),
    SAT.r * Math.sin(a) * Math.cos(SAT.tilt),
    -SAT.r * Math.sin(a) * Math.sin(SAT.tilt),
  ] as [number, number, number];
});

export type Agent = { id: string; label: string; solid?: boolean };

export const agents: readonly Agent[] = [
  { id: "code", label: "AGENT: CODE" },
  { id: "design", label: "AGENT: DESIGN" },
  { id: "deploy", label: "AGENT: DEPLOY" },
  { id: "media", label: "AGENT: MEDIA" },
  { id: "bitcode", label: "BITCODE", solid: true },
];

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

export const experience = [
  {
    date: "2026 — presente",
    name: "Freelance Vibecoder",
    body: "Sviluppo di prodotti digitali con agenti AI autonomi. Automazione di workflow, integrazione API, design-to-code.",
    current: true,
  },
  {
    date: "2016 — presente",
    name: "Bitcoiner",
    body: "Gestione nodi, analisi on-chain, automazione transazioni, trading algoritmico e infrastruttura Bitcoin.",
    current: false,
  },
  {
    date: "2015 — 2026",
    name: "Restaurant Manager",
    body: "Gestione operativa, coordinamento team, ottimizzazione processi e controllo qualità nel settore della ristorazione.",
    current: false,
  },
] as const;

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
