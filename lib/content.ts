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
 *  posizione dipende dalla composizione (desktop/mobile), vedi `layoutNodes`.
 *  Ogni nodo ha un suo colore di stato fluo, distinti sulla ruota dei toni;
 *  l'arancione del brand resta all'hub. */
export const sections: readonly SectionMeta[] = [
  { id: "about", flag: "--about", title: "About", accent: "#a3ff12" }, // lime
  { id: "progetti", flag: "--progetti", title: "Progetti", accent: "#12e3ff" }, // ciano
  { id: "skills", flag: "--skills", title: "Skills", accent: "#a860ff" }, // viola
  { id: "experience", flag: "--experience", title: "Experience", accent: "#ff3fb0" }, // magenta
  { id: "contatti", flag: "--contatti", title: "Contatti", accent: "#ffe000" }, // giallo
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

/** Costellazione dei progetti: offset dal centro `satCenter` (vedi Scene).
 *  Con 4 progetti usa una disposizione esplicita a quadrilatero sbilanciato —
 *  nessuna coppia condivide x o y, quindi niente nodi impilati. Con un numero
 *  diverso ripiega su un'ellisse ruotata. `scale` la stringe su mobile. */
const SAT_QUAD: readonly [number, number][] = [
  [1.7, 1.4], // faktotum
  [-1.7, 1.6], // bitcode
  [-1.9, -1.3], // edi.md
  [1.5, -1.7], // habilis
];
const SAT_TILT = (-6 * Math.PI) / 180;

export function satelliteRing(count: number, scale = 1): [number, number, number][] {
  return Array.from({ length: count }, (_, i) => {
    let x: number, y: number;
    if (count === SAT_QUAD.length) {
      [x, y] = SAT_QUAD[i];
    } else {
      const a = (24 * Math.PI) / 180 + (i * 2 * Math.PI) / count;
      x = 1.9 * Math.cos(a);
      y = 1.8 * Math.sin(a);
    }
    x *= scale;
    y *= scale;
    return [x, y * Math.cos(SAT_TILT), -y * Math.sin(SAT_TILT)];
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
  /** tre righe per la card: cos'è / come funziona / a cosa serve */
  card: { what: string; how: string; why: string };
  tags: string[];
  links: ProjectLink[];
  core?: boolean;
};

export const projects: Project[] = [
  {
    slug: "faktotum",
    meta: "2026 · Laboratorio",
    name: "faktotum",
    card: {
      what: "Il laboratorio: l'hub da cui nascono gli altri progetti.",
      how: "R&D su agenti autonomi, tecnologie AI e workflow, prima che diventino prodotti.",
      why: "Testare in privato quello che poi diventa bitcode, habilis, edi.md.",
    },
    tags: ["AI Agents", "R&D", "Automation"],
    links: [],
  },
  {
    slug: "bitcode",
    meta: "2026 · AI Agent · Bitcoin",
    name: "bitcode",
    card: {
      what: "Agente di coding da terminale in stile Claude Code — Node puro, zero dipendenze.",
      how: "Multi-provider LLM con wallet Bitcoin (BIP84), Lightning e broadcast on-chain sotto approvazione.",
      why: "Scrivere codice e operare su Bitcoin dallo stesso terminale, senza che una chiave lasci la macchina.",
    },
    tags: ["AI Agents", "Bitcoin", "Lightning", "CLI"],
    core: true,
    links: [
      { label: "Demo", href: "https://bitcode-agent.vercel.app/", external: true, arrow: true },
      { label: "GitHub", href: "https://github.com/bc1edi/bitcode", external: true, muted: true, arrow: true },
    ],
  },
  {
    slug: "edi-md",
    meta: "2026 · Vibe Coding",
    name: "edi.md",
    card: {
      what: "Questo sito: un mondo 3D dove le sezioni sono nodi di una rete di agenti.",
      how: "Next.js + React Three Fiber, design system e audio, costruito con agenti AI.",
      why: "Essere la dimostrazione, non il racconto — lo stesso sistema, al lavoro.",
    },
    tags: ["Vibe Coding", "R3F", "Design System"],
    links: [
      { label: "GitHub", href: "https://github.com/bc1edi/edi.md", external: true, arrow: true },
    ],
  },
  {
    slug: "habilis",
    meta: "2025 · Editoria AI",
    name: "habilis",
    card: {
      what: "«Enciclica Artificiale»: un saggio in 12 capitoli sull'AI, scritto da un'AI.",
      how: "Cinque agenti — architetto, ricercatore, scrittore, revisore, produttore — e un orchestratore umano che approva ogni capitolo.",
      why: "Mostrare cosa vuol dire orchestrare invece di generare, con un capitolo finale umano e non firmato.",
    },
    tags: ["AI Agents", "Editoria", "Orchestration"],
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
  /** una riga-guida per la card */
  line: string;
  tags: readonly string[];
  current: boolean;
};

export const experience: readonly ExperienceStop[] = [
  {
    date: "2026 — presente",
    name: "Freelance Vibecoder",
    line: "Costruisco sistemi digitali, non software: progetto architetture, workflow e prompt, e coordino agenti AI autonomi dall'idea al deploy.",
    tags: ["AI Agents", "Vibecoding", "Prompt Engineering", "Orchestration"],
    current: true,
  },
  {
    date: "2016 — presente",
    name: "Bitcoiner",
    line: "Nodi, analisi on-chain, automazione delle transazioni, Lightning. Sistemi dove o capisci l'infrastruttura o non vai da nessuna parte.",
    tags: ["Bitcoin", "Lightning", "Nodes", "On-chain"],
    current: true,
  },
  {
    date: "2015 — presente",
    name: "Restaurant Manager",
    line: "Oltre dieci anni a orchestrare team, turni, fornitori e costi in tempo reale. Prima degli agenti orchestravo persone — le stesse logiche, oggi, sui sistemi.",
    tags: ["Operations", "Team Management", "Process Optimization"],
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
