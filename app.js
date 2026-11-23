(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const I18N = {
    en: {
      metaTitle: "edi.md — Vibecoder, Orchestrator, Enthusiast",
      metaDesc: "I build digital products with code, AI agents, and human direction. Explore Edi's projects across vibecoding, automation, and Bitcoin.",
      skipLink: "Skip to content",
      brandAria: "edi.md, back to top",
      nav: {
        who: "about",
        projects: "projects",
        skills: "skills",
        process: "workflow",
        team: "crew",
        contacts: "contact",
      },
      cta: {
        talk: "let's talk!",
        closeMenu: "close ×",
        openMenuAria: "Open menu",
        closeMenuAria: "Close menu",
        langGroupAria: "Language",
      },
      hero: {
        srTitle: "Vibe first, code follows",
        sub: "human direction, autonomous execution",
        explore: "explore projects",
        desc: "Digital products built with code, AI agents, and human direction — between the faktotum lab, AI publishing, and Bitcoin infrastructure.",
        scroll: "scroll",
        mascotAria: "Tap BITCODE",
        ediAria: "Tap Edi",
        bubbleInitial: "dropping in! · tap me",
        ediBubbleInitial: "vibe coding...",
        ediBubbleApproach: "almost shipped...",
        bitcodeBubbleApproach: "INCOMING BLOCK!",
        ediBubbleDizzy: "git merge conflict...",
        bitcodeBubbleDizzy: "hard fork...",
        ediReplies: ["shipping to localhost!", "no cloud needed", "prompts > boilerplate", "compiling espresso..."],
        dizzyReplies: ["ctrl+z! ctrl+z!", "need a rollback...", "seeing pixel stars!"],
        ediLivePrefix: "Edi:",
      },
      about: {
        srTitle: "About edi.md",
        copy: "I don't spend my day typing code line by line: I decide what needs to happen. I design systems, shape architectures, write the right prompts, and set AI agents up to build real products. It's not delegation, it's orchestration: understanding the problem stays human, turning it into reality becomes a team effort between human and machines.",
        highlights: ["orchestration", "agents", "reality"],
        stat1: "mandatory cloud — everything can run locally",
        stat2: "years on Bitcoin (since 2016)",
        stat3: "open systems shipped across AI & Bitcoin",
      },
      marqueeTop: ["AI agents", "vibecoding", "local LLM", "CLI", "bitcoin", "lightning", "local hardware setup", "self-hosted"],
      marqueeBottom: ["human direction", "zero cloud", "prompt to deploy", "autonomous systems", "web MVP", "open source"],
      who: {
        title: "WHO AM I?",
        p1: "<strong>Hi, I'm Edi.</strong> Before AI agents existed, I spent over ten years leading real-world operations teams — and since 2016 I've been building and running Bitcoin infrastructure hands-on.",
        p2: "Today I run the <strong>faktotum</strong> personal lab: local CPU/GPU rigs, self-hosted LLMs, custom CLIs, and Lightning/RGB tools shipped in the open. No agency layers, no endless slide decks — straight from real constraints to running code.",
        p3: "When you work with me, you get a working product fast and keep full ownership of everything: <strong>clean repo, local-first stack, zero mandatory cloud lock-in.</strong>",
        pillar1Title: "idea to live MVP",
        pillar1Text: "From brief to a working prototype, CLI, or web app in days — tested in the real world, not stuck in slides.",
        pillar2Title: "you own your stack",
        pillar2Text: "Local-first, self-hosted, and open systems: your code, models, and keys stay yours with zero cloud lock-in.",
        pillar3Title: "metal to agents",
        pillar3Text: "End-to-end execution: from local hardware setup and on-device LLMs to autonomous agents and Bitcoin/Lightning rails.",
      },
      projects: {
        title: "projects",
        lead: "Eight systems ordered from newest to oldest across local AI wallets, autonomous Bitcoin agents, publishing, CLIs, and R&D. Open any card to see how it works.",
        detailWhatHow: "What it is & How it works",
        detailWhy: "Why it exists",
        privateTag: "Private R&D · faktotum lab",
        items: {
          metevo: {
            meta: "Oct 2026 · Hackathon BLOX Turin · Local AI & Bitcoin",
            summary: "Voice-native, screen-free self-custodial USDm wallet on Bitcoin L2 (RGB + Lightning), powered by 100% on-device QVAC AI.",
            whatHow: "Built at the «Agentic Dollars on Bitcoin – Powered by Local AI» hackathon (Oct 17–18, 2026 at BLOX Turin, organized by RGB Protocol Association & BitPolito, sponsored by Tether WDK/QVAC & Utexo). React Native/Expo app + Go LSP fork + Docker RGB-Lightning stack running Whisper STT, Qwen intent parsing, and TTS 100% on-device, with biometric confirmation and phone-to-phone invoice relay.",
            why: "Financial inclusion for visually impaired and low-literacy users: sovereign digital dollars over Bitcoin without screens, custodians, or cloud AI. Role in Team METEVO: marketability, frontend implementation, and protocol.",
          },
          "addr-onlysats": {
            meta: "Sep 2026 · Autonomous Bitcoin Agents",
            summary: "Two complementary Bitcoin editorial & analysis agents: local Ollama news digests (addr1) and autonomous 1w/1M technical + on-chain reports (addr2).",
            whatHow: "addr1 runs 100% locally on a CPU-only mini-PC with Ollama (deterministic filters, one LLM call per digest to Telegram). addr2-analyst automates weekly (1w) and monthly (1M) closed-candle BTC technical & on-chain analysis into a static Italian blog with Beginner/Pro views, charts, store-of-value metrics grounded strictly in report numbers, GitHub Actions scheduling, and Telegram alerts.",
            why: "Not your AI, not your intelligence — deterministic, zero-hallucination Bitcoin publishing under full human and local control.",
          },
          habilis: {
            meta: "Jul 2026 · Orchestrated AI Book",
            summary: "«Habilis — Enciclica Artificiale» (definitive edition Jul 2026): 12 AI chapters + handwritten human Ch. 13 + 64 verified claims.",
            whatHow: "Intro plus 12 AI-authored chapters (~51,500 words) orchestrated across architect, researcher, writer, reviewer, and producer roles — closed by Chapter 13 («La penna»), handwritten outside any AI model by an anonymous human reader. Ships in A5 PDF & ePub with 5 appendices, 64 tracked claims in claims.md, and the full public orchestration audit trail.",
            why: "Prove the difference between blind AI generation and verifiable human orchestration — down to every source, voice rule, and human signature.",
            link1: "Read the book",
            link2: "Ch. 1 preview",
          },
          bitcode: {
            meta: "Jul 2026 · CLI Coding Agent · Bitcoin",
            summary: "«Not your code, not your Sats.» Terminal coding agent & Linux desktop workspace for Bitcoin, Lightning, RGB, Cashu & QVAC local AI.",
            whatHow: "Node.js 22+ terminal coding agent and Linux desktop workspace supporting Bitcoin, Lightning, RGB assets, plus optional Cashu (cdk-cli) and Wavelength wallet binaries. Runs cloud providers (Anthropic, OpenAI, OpenRouter, Groq, Kimi) or 100% locally via Ollama, LM Studio, and QVAC local inference. Testnet by default, explicit approval per payment, code-enforced spending caps, keys kept in ~/.bitcode.",
            why: "Write code and transact on Bitcoin from the same sovereign terminal, without trusting prompts for spending limits or leaking a single key.",
          },
          "edi-md": {
            meta: "Jun 2026 · Vibe Coding · Lab",
            summary: "My personal portfolio & design playground — built end-to-end with AI agent orchestration.",
            whatHow: "Static, zero-dependency portfolio built with custom 16-bit pixel sprites, scroll-driven animation, bilingual EN/IT switching, custom design tokens, and automated Playwright visual verification — zero cloud backend required.",
            why: "Be the working proof, not the pitch — the exact same orchestration workflow on display.",
          },
          faktotum: {
            meta: "2026 · Private R&D Lab",
            summary: "The incubator behind bitcode, habilis, and addr2 — private R&D on autonomous agents, local hardware, and workflows.",
            whatHow: "Internal R&D lab where multi-agent pipelines, local LLM benchmarks, hardware setups, and Bitcoin tooling are prototyped and stress-tested before becoming public open-source releases.",
            why: "Break things fast on local metal so every public release ships battle-tested.",
          },
          promptos: {
            meta: "Apr 2026 · Open-Source Web App",
            summary: "Single-file offline Prompt Engineering Hub aggregating 58 techniques from the 2024 Prompt Report.",
            whatHow: "Zero-dependency single HTML file packing 58 research-backed prompting techniques (Schulhoff et al., 2024): searchable Library, interactive Builder, LLM Advisor, Output Comparison, Prompt Analyzer, Academy, and localStorage Favorites — works completely offline in Demo Mode without any API key.",
            why: "Turn academic prompt research into a fast, portable workbench anyone can open locally in one click.",
          },
          "zero-to-bitcoin": {
            meta: "Mar 2026 · Open Course · 20 Lessons",
            summary: "20-lesson structured Bitcoin course in Markdown, built for self-study and AI-assisted learning.",
            whatHow: "Modular 20-lesson open curriculum (lezione-01.md through lezione-20.md) formatted cleanly as an AI Agent Course in plain Markdown so humans and local models alike can study, query, and remix every concept.",
            why: "Make solid Bitcoin fundamentals accessible, versioned, and machine-readable without paywalls.",
          },
        },
      },
      skills: {
        eyebrow: "what I build",
        title: "what I<br>ship for you",
        lead: "Four concrete areas where I take you from raw idea to running software — cloud-optional, hardware-aware, and built to last.",
        c1Title: "AI Agents & Workflows",
        c1Desc: "Multi-agent pipelines, custom CLIs, and deterministic automations orchestrated around your real workflow.",
        c2Title: "Web App & MVP",
        c2Desc: "Clickable prototypes, web apps, and bespoke design systems shipped in days with full code ownership.",
        c3Title: "Local AI & Hardware Setup",
        c3Desc: "Local LLM rigs with Ollama or QVAC, self-hosted services, and private stacks with zero mandatory cloud.",
        c4Title: "Bitcoin / Lightning Tools",
        c4Desc: "Lightning, RGB, Cashu, and on-chain tooling wired into agents with explicit approval and code-enforced limits.",
      },
      process: {
        eyebrow: "how a project ships",
        title: "from idea to <span>deploy</span>",
        lead: "Four clear levels to turn a raw brief into working software — fast feedback loops, zero bureaucracy, full ownership.",
        lv1: "level 01",
        lv2: "level 02",
        lv3: "level 03",
        lv4: "level 04",
        locked: "locked",
        cleared: "cleared",
        s1Date: "step 01 · brief",
        s1Title: "Idea & Constraints",
        s1Text: "We lock down the real problem, security/privacy constraints, and system architecture before a single line of code is written.",
        s2Date: "step 02 · prototype",
        s2Title: "Vibe & Prototype",
        s2Text: "Interactive interface or CLI spike built fast so you can click, test, and steer the product while it takes shape.",
        s3Date: "step 03 · build",
        s3Title: "Agents & Code",
        s3Text: "Multi-agent orchestration handles code, local LLM/Bitcoin integrations, and automated checks under human review.",
        s4Date: "step 04 · ship",
        s4Title: "Deploy & Ownership",
        s4Text: "Clean handover to your server, local hardware, or production host — full repo, docs, and zero vendor lock-in.",
        ctaPending: "start at level 01",
        ctaDone: "system ready! start a collaboration",
      },
      team: {
        eyebrow: "choose your agent",
        title: "crew",
        lead: "One human orchestrator and his network of agents. Each player levels up the project in a different way.",
        p1Bar: "player 1",
        p2Bar: "player 2",
        p3Bar: "player 3",
        p4Bar: "player 4",
        ready: "ready",
        p1Role: "human orchestrator",
        p1Stat1: "vision",
        p1Stat2: "direction",
        p1Move: "turns a 2am napkin sketch into a working repo before the espresso cools",
        p2Role: "architecture & engineering",
        p2Stat1: "code",
        p2Stat2: "speed",
        p2Move: "spawns 5 subagents, nukes boilerplate, and gets green tests on the first clean diff",
        p3Role: "visual systems & UI",
        p3Stat1: "craft",
        p3Stat2: "coherence",
        p3Move: "terminates generic purple SaaS gradients on sight and locks contrast to WCAG AA+",
        p4Role: "cli agent · bitcoin & rgb",
        p4Stat1: "sovereignty",
        p4Stat2: "security",
        p4Move: "signs Lightning & RGB txs with code-enforced sat caps — 0 private keys ever leave localhost",
        moveLabel: "special move:",
      },
      contacts: {
        eyebrow: "ready to build?",
        title: "let's talk!",
        lead: "Founder, startup, Bitcoin project, company, or creator? Whether you need AI agents, a fast MVP, local LLM hardware, or Lightning tooling — tell me what you're building.",
        step1: "direct reply within 24h",
        step2: "30-min technical call to align on scope & constraints",
        step3: "clear plan with architecture, prototype & timeline",
        bubbleInitial: "Psst! fill the form",
        mascotAria: "Tap AGENT: CODE",
        honeypotLabel: "Leave this field empty",
        nameLabel: "your name",
        namePlaceholder: "Alex Rivera",
        emailLabel: "email",
        emailPlaceholder: "alex@company.com",
        companyLabel: 'project or company <span class="field-optional">(optional)</span>',
        companyPlaceholder: "Product or team name",
        scopesLabel: 'areas of work <span class="field-optional">(optional)</span>',
        msgLabel: "message",
        msgPlaceholder: "Tell me what you want to build, your constraints, and where agents can help...",
        submit: "send it!",
        successTitle: "brief ready!",
        successText: "Your brief is validated and ready to send. Open your pre-filled email client or draft another message.",
        mailtoBtn: "open in email",
        resetBtn: "write another",
        errName: "Please enter your name (at least 2 characters).",
        errEmail: "Please enter a valid email address.",
        errMsg: "Tell me a bit more, at least 10 characters.",
        mailSubjectPrefix: "New project from",
        mailFieldName: "Name",
        mailFieldEmail: "Email",
        mailFieldCompany: "Project / Company",
        mailFieldScopes: "Areas",
      },
      footer: {
        bio: "Vibecoder, orchestrator, enthusiast. Digital products built with code, AI agents, and human direction.",
        explore: "explore",
        projects: "projects",
        sayHi: "say hi",
        top: "back to top ↑",
        copy: "© 2026 edi.md — personal lab orchestrated with AI agents",
        tech: "Pixelify Sans · Montserrat · edi.md palette (#f7f7f4 / #26251e / #f54e00)",
      },
      mascotReplies: [
        "0-conf landing!",
        "stay humble, stack sats",
        "zero cloud, pure local",
        "no private keys harmed",
        "block confirmed!",
      ],
      mascotLivePrefix: "BITCODE:",
    },
    it: {
      metaTitle: "edi.md — Vibecoder, Orchestrator, Enthusiast",
      metaDesc: "Creo prodotti digitali con codice, agenti AI e una direzione umana. Esplora i progetti di Edi tra vibecoding, automazione e Bitcoin.",
      skipLink: "Salta al contenuto",
      brandAria: "edi.md, torna all'inizio",
      nav: {
        who: "chi sono",
        projects: "progetti",
        skills: "competenze",
        process: "metodo",
        team: "squadra",
        contacts: "contatti",
      },
      cta: {
        talk: "parliamone!",
        closeMenu: "chiudi ×",
        openMenuAria: "Apri il menu",
        closeMenuAria: "Chiudi il menu",
        langGroupAria: "Lingua",
      },
      hero: {
        srTitle: "Vibe first, code follows",
        sub: "direzione umana, esecuzione autonoma",
        explore: "esplora i progetti",
        desc: "Prodotti digitali con codice, agenti AI e una direzione umana — tra laboratorio faktotum, editoria AI e infrastruttura Bitcoin.",
        scroll: "scorri",
        mascotAria: "Tocca BITCODE",
        ediAria: "Tocca Edi",
        bubbleInitial: "in discesa! · toccami",
        ediBubbleInitial: "vibe coding...",
        ediBubbleApproach: "quasi online...",
        bitcodeBubbleApproach: "BLOCCO IN ARRIVO!",
        ediBubbleDizzy: "conflitto di merge...",
        bitcodeBubbleDizzy: "hard fork...",
        ediReplies: ["deploy su localhost!", "zero cloud!", "prompt > boilerplate", "compilo un caffè..."],
        dizzyReplies: ["ctrl+z! ctrl+z!", "serve un rollback...", "vedo le stelline pixel!"],
        ediLivePrefix: "Edi:",
      },
      about: {
        srTitle: "A proposito di edi.md",
        copy: "Non passo la giornata a scrivere codice riga per riga: decido cosa deve succedere. Progetto sistemi, disegno architetture, scrivo i prompt giusti e metto gli agenti AI nelle condizioni di costruire prodotti concreti. Non è delega, è orchestrazione: capire il problema resta umano, trasformarlo in realtà diventa un lavoro di squadra tra uomo e macchine.",
        highlights: ["orchestrazione", "agenti", "realtà"],
        stat1: "cloud obbligatorio — tutto può girare in locale",
        stat2: "anni su Bitcoin (dal 2016)",
        stat3: "sistemi open rilasciati tra AI e Bitcoin",
      },
      marqueeTop: ["agenti AI", "vibecoding", "local LLM", "CLI", "bitcoin", "lightning", "local hardware setup", "self-hosted"],
      marqueeBottom: ["direzione umana", "zero cloud", "dal prompt al deploy", "sistemi autonomi", "web MVP", "open source"],
      who: {
        title: "CHI SONO?",
        p1: "<strong>Ciao, sono Edi.</strong> Prima ancora degli agenti AI, ho guidato per oltre dieci anni team operativi sul campo — e dal 2016 lavoro e costruisco in prima persona su infrastruttura Bitcoin.",
        p2: "Oggi porto avanti il laboratorio personale <strong>faktotum</strong>: macchine locali CPU/GPU, LLM self-hosted, CLI su misura e strumenti Lightning/RGB rilasciati in open source. Niente filtri d'agenzia né slide infinite: si parte dai vincoli reali dritti al codice funzionante.",
        p3: "Lavorare con me significa arrivare in fretta a un prodotto vero restando padrone di tutto: <strong>repo pulito, stack local-first e zero lock-in cloud obbligatorio.</strong>",
        pillar1Title: "dall'idea all'MVP live",
        pillar1Text: "Dal brief a un prototipo funzionante, una CLI o una web app in giorni — testato sul campo, non fermo sulle slide.",
        pillar2Title: "lo stack resta tuo",
        pillar2Text: "Sistemi local-first, self-hosted e open: codice, modelli e chiavi restano sotto il tuo controllo, zero lock-in cloud.",
        pillar3Title: "dall'hardware agli agenti",
        pillar3Text: "Esecuzione end-to-end: dal setup hardware locale e LLM on-device fino ad agenti autonomi e pagamenti Bitcoin/Lightning.",
      },
      projects: {
        title: "i progetti",
        lead: "Otto sistemi ordinati dal più recente tra wallet AI locali, agenti Bitcoin autonomi, editoria, CLI e R&D. Apri ogni scheda per vedere cosa fa e come funziona.",
        detailWhatHow: "Cos'è & Come funziona",
        detailWhy: "Perché esiste",
        privateTag: "R&D privato · laboratorio faktotum",
        items: {
          metevo: {
            meta: "Ott 2026 · Hackathon BLOX Torino · Local AI & Bitcoin",
            summary: "Wallet vocale self-custodial per USDm su Bitcoin L2 (RGB + Lightning), senza schermo e con AI 100% on-device via QVAC.",
            whatHow: "Nato all'hackathon ufficiale «Agentic Dollars on Bitcoin – Powered by Local AI» (17–18 ott 2026 da BLOX Torino, organizzato da RGB Protocol Association e BitPolito, sponsor Tether WDK/QVAC e Utexo). App React Native/Expo + fork Go di utexo-lsp + stack Docker RGB-Lightning con pipeline QVAC 100% on-device (Whisper STT, Qwen, TTS), conferma biometrica e relay invoice phone-to-phone.",
            why: "Inclusione finanziaria per utenti ipovedenti o a bassa alfabetizzazione: dollari digitali sovrani su Bitcoin senza schermi, custodi né AI in cloud. Ruolo nel team METEVO: marketability, implementazione frontend e protocollo.",
          },
          "addr-onlysats": {
            meta: "Set 2026 · Agenti Bitcoin Autonomi",
            summary: "Due agenti Bitcoin complementari: rassegna locale su Ollama (addr1) e analisi autonoma 1w/1M tecnica e on-chain su blog statico (addr2).",
            whatHow: "addr1 gira 100% in locale su mini-PC CPU-only con Ollama (filtri deterministici, una chiamata LLM per digest su Telegram). addr2-analyst automatizza analisi BTC su candele chiuse 1w e 1M (tecnica + on-chain) generando un blog statico con doppia lettura Principiante/Pro, grafici, sezione riserva di valore ancorata ai soli numeri del report, GitHub Actions e notifiche Telegram.",
            why: "Not your AI, not your intelligence — editoria e analisi Bitcoin deterministiche, senza allucinazioni e sotto pieno controllo locale.",
          },
          habilis: {
            meta: "Lug 2026 · Libro Orchestrato AI",
            summary: "«Habilis — Enciclica Artificiale» (edizione definitiva lug 2026): 12 capitoli AI + Cap. 13 umano scritto a mano + 64 claim verificati.",
            whatHow: "Introduzione più 12 capitoli AI (~51.500 parole) orchestrati tra architetto, ricercatore, scrittore, revisore e produttore — chiusi dal Capitolo 13 («La penna»), scritto a mano fuori da ogni modello da un lettore umano anonimo. Edizione PDF A5 ed ePub con 5 appendici, 64 claim tracciati in claims.md e intero audit trail pubblico.",
            why: "Dimostrare la differenza tra generazione cieca e orchestrazione umana verificabile — fino a ogni fonte, regola di voce e firma umana.",
            link1: "Leggi il libro",
            link2: "Anteprima cap. 1",
          },
          bitcode: {
            meta: "Lug 2026 · CLI Coding Agent · Bitcoin",
            summary: "«Not your code, not your Sats.» Coding agent da terminale + app desktop Linux per Bitcoin, Lightning, RGB, Cashu e AI locale QVAC.",
            whatHow: "Coding agent da terminale (Node.js 22+) e app desktop Linux per Bitcoin, Lightning, asset RGB e binari opzionali Cashu (cdk-cli) e Wavelength. Gira con provider cloud (Anthropic, OpenAI, OpenRouter, Groq, Kimi) oppure 100% in locale con Ollama, LM Studio e QVAC. Testnet di default, approvazione esplicita per ogni pagamento, limiti di spesa imposti da codice e chiavi locali in ~/.bitcode.",
            why: "Scrivere codice e operare su Bitcoin dallo stesso terminale sovrano, con limiti di spesa imposti dal codice (non dal prompt) e zero chiavi in cloud.",
          },
          "edi-md": {
            meta: "Giu 2026 · Vibe Coding · Lab",
            summary: "Il mio portfolio e laboratorio visivo — progettato e costruito end-to-end orchestrando agenti AI.",
            whatHow: "Portfolio statico senza dipendenze costruito con sprite pixel-art 16-bit su misura, animazioni legate allo scroll, bilinguismo EN/IT, design token proprietari e verifica visiva Playwright — zero backend cloud obbligatorio.",
            why: "Essere la prova funzionante, non lo slogan — lo stesso metodo di orchestrazione mostrato dal vivo.",
          },
          faktotum: {
            meta: "2026 · Laboratorio R&D Privato",
            summary: "L'incubatore dietro bitcode, habilis e addr2 — R&D privato su agenti autonomi, hardware locale e workflow.",
            whatHow: "Laboratorio interno dove pipeline multi-agente, benchmark su LLM locali, setup hardware e strumenti Bitcoin vengono prototipati e stress-testati prima di diventare rilasci open-source.",
            why: "Rompere e testare tutto sul proprio hardware locale prima che ogni progetto diventi pubblico.",
          },
          promptos: {
            meta: "Apr 2026 · Web App Open-Source",
            summary: "Prompt Engineering Hub open-source in singolo file offline con 58 tecniche dal Prompt Report 2024.",
            whatHow: "Singolo file HTML senza dipendenze che raccoglie 58 tecniche di prompt engineering validate (Schulhoff et al., 2024): Libreria, Builder, LLM Advisor, Output Comparison, Prompt Analyzer, Academy e Preferiti locali — funziona anche offline in Demo Mode senza API key.",
            why: "Trasformare la ricerca sul prompt engineering in uno strumento portatile e immediato, apribile offline con un clic.",
          },
          "zero-to-bitcoin": {
            meta: "Mar 2026 · Corso Open · 20 Lezioni",
            summary: "Corso Bitcoin strutturato in 20 lezioni in Markdown, progettato per studio autonomo e apprendimento assistito da agenti AI.",
            whatHow: "Percorso aperto e modulare di 20 lezioni (lezione-01.md → lezione-20.md) formattato come AI Agent Course in Markdown puro, leggibile sia da umani sia da modelli locali per studiare e interrogare ogni concetto.",
            why: "Rendere i fondamentali di Bitcoin accessibili, versionati e leggibili anche dagli agenti AI, senza paywall.",
          },
        },
      },
      skills: {
        eyebrow: "cosa costruisco",
        title: "cosa costruisco<br>per te",
        lead: "Quattro aree concrete in cui ti porto dall'idea al sistema funzionante — senza cloud obbligatorio, vicino all'hardware e pronto a durare.",
        c1Title: "AI Agents & Workflows",
        c1Desc: "Pipeline multi-agente, CLI su misura e automazioni deterministiche orchestrate attorno al tuo workflow reale.",
        c2Title: "Web App & MVP",
        c2Desc: "Prototipi cliccabili, web app e design system su misura rilasciati in giorni, con piena proprietà del codice.",
        c3Title: "Local AI & Hardware Setup",
        c3Desc: "Macchine per LLM locali con Ollama o QVAC, servizi self-hosted e stack privati con zero cloud obbligatorio.",
        c4Title: "Bitcoin / Lightning Tools",
        c4Desc: "Strumenti Lightning, RGB, Cashu e on-chain collegati agli agenti con approvazione esplicita e limiti da codice.",
      },
      process: {
        eyebrow: "metodo di lavoro",
        title: "dall'idea al <span>deploy</span>",
        lead: "Quattro livelli chiari per trasformare un brief in software vero — iterazioni rapide, zero burocrazia, piena proprietà.",
        lv1: "livello 01",
        lv2: "livello 02",
        lv3: "livello 03",
        lv4: "livello 04",
        locked: "bloccato",
        cleared: "sbloccato",
        s1Date: "step 01 · brief",
        s1Title: "Idea & Vincoli",
        s1Text: "Blocchiamo il problema reale, i vincoli di sicurezza o privacy e l'architettura del sistema prima di scrivere una riga di codice.",
        s2Date: "step 02 · prototipo",
        s2Title: "Vibe & Prototipo",
        s2Text: "Interfaccia interattiva o spike CLI costruiti in fretta per cliccare, testare e correggere la rotta mentre il prodotto prende forma.",
        s3Date: "step 03 · sviluppo",
        s3Title: "Agenti & Codice",
        s3Text: "L'orchestrazione multi-agente gestisce codice, integrazioni LLM locali o Bitcoin e verifiche automatiche sotto controllo umano.",
        s4Date: "step 04 · rilascio",
        s4Title: "Deploy & Consegna",
        s4Text: "Rilascio pulito sul tuo server, hardware locale o host di produzione — repo completo, documentazione e zero lock-in.",
        ctaPending: "inizia dal livello 01",
        ctaDone: "sistema pronto! avvia una collaborazione",
      },
      team: {
        eyebrow: "scegli il tuo agente",
        title: "squadra",
        lead: "Un orchestratore umano e la sua rete di agenti. Ogni giocatore fa salire di livello il progetto in un modo diverso.",
        p1Bar: "giocatore 1",
        p2Bar: "giocatore 2",
        p3Bar: "giocatore 3",
        p4Bar: "giocatore 4",
        ready: "pronto",
        p1Role: "orchestratore umano",
        p1Stat1: "visione",
        p1Stat2: "direzione",
        p1Move: "trasforma uno schizzo delle 2 di notte in un repo funzionante prima che il caffè si freddi",
        p2Role: "architettura e sviluppo",
        p2Stat1: "codice",
        p2Stat2: "velocità",
        p2Move: "lancia 5 subagenti, rade al suolo il boilerplate e manda i test in verde al primo diff pulito",
        p3Role: "sistemi visivi e UI",
        p3Stat1: "estetica",
        p3Stat2: "coerenza",
        p3Move: "termina a vista i gradienti viola da SaaS generico e inchioda il contrasto a WCAG AA+",
        p4Role: "cli agent · bitcoin & rgb",
        p4Stat1: "sovranità",
        p4Stat2: "sicurezza",
        p4Move: "firma tx Lightning e RGB con limiti in sats imposti da codice — 0 chiavi private fuori da localhost",
        moveLabel: "mossa speciale:",
      },
      contacts: {
        eyebrow: "pronto a costruire?",
        title: "parliamone!",
        lead: "Founder, startup, progetto Bitcoin, azienda o creator? Che ti servano agenti AI, un MVP veloce, hardware per LLM locali o tool Lightning — raccontami cosa vuoi costruire.",
        step1: "risposta diretta entro 24 ore",
        step2: "call tecnica di 30 min per allineare scope e vincoli",
        step3: "piano chiaro con architettura, prototipo e tempi",
        bubbleInitial: "Psst! compila il modulo",
        mascotAria: "Tocca AGENT: CODE",
        honeypotLabel: "Lascia questo campo vuoto",
        nameLabel: "il tuo nome",
        namePlaceholder: "Marco Rossi",
        emailLabel: "email",
        emailPlaceholder: "marco@azienda.it",
        companyLabel: 'progetto o azienda <span class="field-optional">(facoltativo)</span>',
        companyPlaceholder: "Nome del prodotto o del team",
        scopesLabel: 'ambiti di lavoro <span class="field-optional">(facoltativo)</span>',
        msgLabel: "messaggio",
        msgPlaceholder: "Raccontami cosa vuoi costruire, quali vincoli hai e dove possono aiutare gli agenti...",
        submit: "invialo!",
        successTitle: "brief pronto!",
        successText: "Il tuo brief è pronto per l'invio. Apri il tuo client email già precompilato oppure scrivi un altro messaggio.",
        mailtoBtn: "apri in email",
        resetBtn: "scrivi un altro",
        errName: "Inserisci il tuo nome (almeno 2 caratteri).",
        errEmail: "Inserisci un indirizzo email valido.",
        errMsg: "Raccontami qualcosa in più, almeno 10 caratteri.",
        mailSubjectPrefix: "Nuovo progetto da",
        mailFieldName: "Nome",
        mailFieldEmail: "Email",
        mailFieldCompany: "Progetto / Azienda",
        mailFieldScopes: "Ambiti",
      },
      footer: {
        bio: "Vibecoder, orchestrator, enthusiast. Prodotti digitali costruiti con codice, agenti AI e direzione umana.",
        explore: "esplorare",
        projects: "progetti",
        sayHi: "saluta",
        top: "torna su ↑",
        copy: "© 2026 edi.md — laboratorio personale orchestrato con agenti AI",
        tech: "Pixelify Sans · Montserrat · palette edi.md (#f7f7f4 / #26251e / #f54e00)",
      },
      mascotReplies: [
        "atterraggio 0-conf!",
        "chiavi private al sicuro!",
        "zero cloud, solo locale",
        "blocco confermato!",
        "orchestrazione attiva!",
      ],
      mascotLivePrefix: "BITCODE:",
    },
  };

  let currentLang = "en";
  let unlockedLevels = 0;
  let totalLevels = 4;
  let twTimer = 0;
  let twHasStarted = false;
  let updateCollisionBubbles = null;
  const wordLitEl = document.querySelector("[data-word-lit]");

  const getPath = (obj, path) => path.split(".").reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), obj);

  const renderWordLit = (lang) => {
    if (!wordLitEl) return;
    const dict = I18N[lang].about;
    const hiSet = new Set(dict.highlights.map((s) => s.toLowerCase()));
    const words = dict.copy.split(" ");
    wordLitEl.style.setProperty("--count", String(words.length));
    wordLitEl.innerHTML = words
      .map((word, idx) => {
        const clean = word.toLowerCase().replace(/[^a-zàèéìòù]/g, "");
        const cls = hiSet.has(clean) ? "word-lit__word word-lit__word--hi" : "word-lit__word";
        return `<span class="${cls}" style="--i:${idx}">${word.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</span>`;
      })
      .join(" ");
  };

  const renderMarquee = (lang) => {
    const dict = I18N[lang];
    const renderRibbon = (ribbonSel, items) => {
      const lists = document.querySelectorAll(`${ribbonSel} .marquee-list`);
      lists.forEach((ul) => {
        const spans = ul.querySelectorAll(".marquee-word");
        spans.forEach((sp, i) => {
          if (items[i] !== undefined) sp.textContent = items[i];
        });
      });
    };
    renderRibbon(".ribbon--accent", dict.marqueeTop);
    renderRibbon(".ribbon--ink", dict.marqueeBottom);
  };

  const updateTypewriterLang = (lang) => {
    const twEl = document.querySelector("[data-typewriter]");
    if (!twEl) return;
    const text = I18N[lang].who.title;
    twEl.dataset.typewriter = text;
    const sr = twEl.querySelector(".sr-only");
    const typed = twEl.querySelector("[data-tw-typed]");
    const rest = twEl.querySelector("[data-tw-rest]");
    if (sr) sr.textContent = text;
    if (twHasStarted) {
      if (twTimer) window.clearInterval(twTimer);
      if (typed) typed.textContent = text;
      if (rest) rest.textContent = "";
    } else {
      if (typed) typed.textContent = "";
      if (rest) rest.textContent = text;
    }
  };

  const updateProcessLabels = (lang) => {
    const dict = I18N[lang].process;
    const cards = document.querySelectorAll("#process-grid .level-card");
    cards.forEach((card, i) => {
      const badge = card.querySelector("[data-level-state]");
      if (badge) badge.textContent = i < unlockedLevels ? dict.cleared : dict.locked;
    });
    const xpCtaText = document.getElementById("xp-cta-text");
    if (xpCtaText) {
      xpCtaText.textContent = unlockedLevels >= totalLevels ? dict.ctaDone : dict.ctaPending;
    }
  };

  const langButtons = document.querySelectorAll("[data-set-lang]");
  const langPopup = document.getElementById("lang-popup");

  const applyLanguage = (lang, persist = true) => {
    const next = lang === "it" ? "it" : "en";
    currentLang = next;
    const dict = I18N[next];

    document.documentElement.lang = next;
    document.title = dict.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", dict.metaDesc);

    langButtons.forEach((btn) => {
      btn.setAttribute("aria-pressed", btn.dataset.setLang === next ? "true" : "false");
    });

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const val = getPath(dict, el.dataset.i18n);
      if (typeof val === "string") el.textContent = val;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const val = getPath(dict, el.dataset.i18nHtml);
      if (typeof val === "string") el.innerHTML = val;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const val = getPath(dict, el.dataset.i18nPlaceholder);
      if (typeof val === "string") el.setAttribute("placeholder", val);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const val = getPath(dict, el.dataset.i18nAria);
      if (typeof val === "string") el.setAttribute("aria-label", val);
    });

    renderWordLit(next);
    renderMarquee(next);
    updateTypewriterLang(next);
    updateProcessLabels(next);

    if (typeof updateCollisionBubbles === "function") updateCollisionBubbles(true);

    document.querySelectorAll("[data-mascot-stage]").forEach((stage) => {
      if (stage.dataset.clicked === "true") return;
      if (stage.closest("[data-collision-stage]") && stage.closest("[data-collision-stage]").dataset.phase && stage.closest("[data-collision-stage]").dataset.phase !== "idle") return;
      const bubble = stage.querySelector("[data-mascot-bubble]");
      if (bubble) {
        bubble.textContent = stage.classList.contains("mascot-stage--hero")
          ? dict.hero.bubbleInitial
          : dict.contacts.bubbleInitial;
      }
    });

    if (persist) {
      try {
        window.localStorage.setItem("edimd-lang", next);
      } catch {}
      if (langPopup) langPopup.hidden = true;
    }
  };

  /* ── 0. Initial language + offline Italy suggestion popup ────────────── */
  const urlParams = new URLSearchParams(window.location.search);
  const queryLang = urlParams.get("lang");
  const previewItPopup = urlParams.get("preview-it-popup") === "1";
  let savedLang = null;
  let promptDismissed = false;
  try {
    savedLang = window.localStorage.getItem("edimd-lang");
    promptDismissed = window.localStorage.getItem("edimd-lang-prompt") === "dismissed";
  } catch {}

  const initialLang = queryLang === "it" || queryLang === "en"
    ? queryLang
    : savedLang === "it" || savedLang === "en"
      ? savedLang
      : "en";

  applyLanguage(initialLang, false);

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.setLang, true));
  });

  const isLikelyInItaly = () => {
    if (previewItPopup) return true;
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz === "Europe/Rome") return true;
    } catch {}
    const langs = Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages
      : [navigator.language || ""];
    return langs.some((l) => String(l).toLowerCase().startsWith("it"));
  };

  const dismissPopup = () => {
    if (!langPopup) return;
    langPopup.hidden = true;
    try {
      window.localStorage.setItem("edimd-lang-prompt", "dismissed");
    } catch {}
  };

  if (langPopup) {
    const acceptBtn = document.getElementById("lang-popup-accept");
    const dismissBtn = document.getElementById("lang-popup-dismiss");
    const closeBtn = document.getElementById("lang-popup-close");

    if (acceptBtn) acceptBtn.addEventListener("click", () => applyLanguage("it", true));
    if (dismissBtn) dismissBtn.addEventListener("click", dismissPopup);
    if (closeBtn) closeBtn.addEventListener("click", dismissPopup);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !langPopup.hidden) dismissPopup();
    });

    const shouldShowPopup =
      initialLang === "en" &&
      (previewItPopup || (!savedLang && !promptDismissed && !queryLang && isLikelyInItaly()));

    if (shouldShowPopup) {
      window.setTimeout(() => {
        if (currentLang === "en") langPopup.hidden = false;
      }, 900);
    }
  }

  /* ── 1. Header scroll state, 48-step progress & active nav ───────────── */
  const header = document.getElementById("site-header");
  const progressBar = document.getElementById("scroll-progress");
  const navLinks = Array.from(document.querySelectorAll(".desktop-nav .nav-link"));
  const sectionIds = ["hero", "about", "who-we-are", "projects", "skills", "process", "team", "contacts"];

  let rafScroll = 0;
  const updateHeaderScroll = () => {
    rafScroll = 0;
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollMax > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollMax)) : 0;
    const stepped = Math.round(48 * ratio) / 48;
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 16);
    if (progressBar) progressBar.style.transform = `scaleX(${stepped})`;
  };

  const onScroll = () => {
    if (!rafScroll) rafScroll = window.requestAnimationFrame(updateHeaderScroll);
  };

  updateHeaderScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  if ("IntersectionObserver" in window) {
    const observed = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${id}`) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    observed.forEach((el) => spy.observe(el));
  }

  /* ── 2. Mobile Menu Drawer ───────────────────────────────────────────── */
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuClose = document.getElementById("menu-close");

  const closeMobileMenu = (restoreFocus = false) => {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (restoreFocus) menuToggle.focus({ preventScroll: true });
  };

  const openMobileMenu = () => {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.hidden = false;
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    if (menuClose) menuClose.focus({ preventScroll: true });
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", openMobileMenu);
    if (menuClose) menuClose.addEventListener("click", () => closeMobileMenu(true));
    mobileMenu.querySelectorAll("a[href^='#']").forEach((a) => {
      a.addEventListener("click", () => closeMobileMenu(false));
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !mobileMenu.hidden) {
        closeMobileMenu(true);
      }
    });
  }

  /* ── 3. Interactive Mascots & Scroll-Driven Hero Collision ───────────── */
  document.querySelectorAll("[data-mascot-stage]").forEach((stage) => {
    const btn = stage.querySelector("[data-mascot-kickflip]");
    const flip = stage.querySelector(".mascot-flip");
    const bubbleText = stage.querySelector("[data-mascot-bubble]");
    const live = stage.querySelector("[data-mascot-live]");
    const collisionStage = stage.closest("[data-collision-stage]");
    let idx = 0;

    if (!btn || !flip) return;
    btn.addEventListener("click", () => {
      stage.dataset.clicked = "true";
      const isDizzy = collisionStage && collisionStage.classList.contains("is-dizzy");
      if (!prefersReducedMotion && !isDizzy) {
        flip.classList.remove("is-ollie");
        void flip.offsetWidth;
        flip.classList.add("is-ollie");
      }
      const replies = isDizzy ? I18N[currentLang].hero.dizzyReplies : I18N[currentLang].mascotReplies;
      const nextMsg = replies[idx % replies.length];
      idx += 1;
      if (bubbleText) bubbleText.textContent = nextMsg;
      if (live) live.textContent = `${I18N[currentLang].mascotLivePrefix} ${nextMsg}`;
    });
  });

  const collisionRunway = document.querySelector("[data-collision-runway]");
  const collisionStage = document.querySelector("[data-collision-stage]");
  if (collisionRunway && collisionStage) {
    const heroEl = collisionRunway.querySelector(".hero");
    const heroCenterEl = heroEl ? heroEl.querySelector(".hero-center") : null;
    const ediActor = collisionStage.querySelector('[data-actor="edi"]');
    const bitcodeActor = collisionStage.querySelector('[data-actor="bitcode"]');
    const ediBtn = collisionStage.querySelector("[data-edi-tap]");
    const ediBubble = collisionStage.querySelector("[data-edi-bubble]");
    const ediLive = collisionStage.querySelector("[data-edi-live]");
    const bitcodeBubble = collisionStage.querySelector("[data-mascot-bubble]");
    let ediIdx = 0;
    let lastPhase = "idle";
    collisionStage.dataset.phase = "idle";

    updateCollisionBubbles = (force = false) => {
      const phase = collisionStage.dataset.phase || "idle";
      if (!force && phase === lastPhase) return;
      lastPhase = phase;
      const dict = I18N[currentLang];
      if (ediBubble && (phase !== "idle" || ediActor?.dataset.clicked !== "true")) {
        ediBubble.textContent =
          phase === "dizzy"
            ? dict.hero.ediBubbleDizzy
            : phase === "approach"
              ? dict.hero.ediBubbleApproach
              : dict.hero.ediBubbleInitial;
      }
      if (bitcodeBubble && (phase !== "idle" || bitcodeActor?.dataset.clicked !== "true")) {
        bitcodeBubble.textContent =
          phase === "dizzy"
            ? dict.hero.bitcodeBubbleDizzy
            : phase === "approach"
              ? dict.hero.bitcodeBubbleApproach
              : dict.hero.bubbleInitial;
      }
    };

    if (ediBtn && ediActor) {
      ediBtn.addEventListener("click", () => {
        ediActor.dataset.clicked = "true";
        const isDizzy = collisionStage.classList.contains("is-dizzy");
        if (!prefersReducedMotion && !isDizzy) {
          ediBtn.classList.remove("is-edi-hop");
          void ediBtn.offsetWidth;
          ediBtn.classList.add("is-edi-hop");
        }
        const hDict = I18N[currentLang].hero;
        const replies = isDizzy ? hDict.dizzyReplies : hDict.ediReplies;
        const msg = replies[ediIdx % replies.length];
        ediIdx += 1;
        if (ediBubble) ediBubble.textContent = msg;
        if (ediLive) ediLive.textContent = `${hDict.ediLivePrefix} ${msg}`;
      });
    }

    if (!prefersReducedMotion && ediActor && bitcodeActor) {
      let colRaf = 0;
      const updateCollision = () => {
        colRaf = 0;
        const runwayRect = collisionRunway.getBoundingClientRect();
        const maxScroll = Math.max(1, runwayRect.height - window.innerHeight);
        const p = Math.min(1, Math.max(0, -runwayRect.top / maxScroll));

        const stageW = collisionStage.clientWidth || 360;
        const heroH = heroEl ? heroEl.clientHeight : window.innerHeight || 800;
        const wasDizzy = collisionStage.classList.contains("is-dizzy");
        const isImpact = p >= 0.50 && p < 0.72;
        const isDizzy = p >= 0.62;

        if (wasDizzy !== isDizzy) {
          collisionStage.classList.toggle("is-dizzy", isDizzy);
        }
        collisionStage.classList.toggle("is-impact", isImpact);

        const ediW = ediActor.offsetWidth || 112;
        const bitW = bitcodeActor.offsetWidth || 180;
        const ediLeft = ediActor.offsetLeft;
        const bitLeft = bitcodeActor.offsetLeft;

        const targetEdiX = isDizzy
          ? stageW * 0.5 - ediW * 0.88 - ediLeft
          : stageW * 0.5 - ediW * 0.70 - ediLeft;
        const targetBitX = isDizzy
          ? stageW * 0.5 - bitW * 0.12 - bitLeft
          : stageW * 0.5 - bitW * 0.46 - bitLeft;

        const t = Math.min(1, p / 0.58);
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const recoil = isDizzy ? Math.min(24, stageW * 0.04) : 0;

        // Vertical starting height in the upper-right sky (clear of hero title & mobile CTAs)
        let startY;
        if (stageW >= 960) {
          startY = -Math.min(Math.round(heroH * 0.23), 215);
        } else if (stageW >= 640) {
          startY = -Math.min(Math.round(heroH * 0.19), 160);
        } else {
          const stageRect = collisionStage.getBoundingClientRect();
          const centerBottom = heroCenterEl ? heroCenterEl.getBoundingClientRect().bottom : stageRect.top;
          const bitH = bitcodeActor.offsetHeight || 151;
          const bubblePad = 42;
          const freeHeadroom = Math.max(0, Math.floor(stageRect.bottom - centerBottom - bitH - bubblePad));
          startY = -Math.min(34, freeHeadroom);
        }

        const ampX = stageW >= 640 ? Math.min(stageW * 0.085, 68) : Math.min(stageW * 0.06, 20);
        const zigX = isDizzy ? 0 : Math.sin(t * Math.PI * 3) * ampX * (1 - t * 0.5);
        const baseBitX = Math.min(0, targetBitX) * t;
        const curBitX = isDizzy
          ? Math.min(0, targetBitX) + recoil
          : Math.min(8, baseBitX + zigX);

        const drop = 1 - Math.pow(1 - t, 1.35);
        const curBitY = isDizzy ? 0 : startY * (1 - drop);
        const rotDeg = isDizzy || p < 0.015 ? 0 : -Math.cos(t * Math.PI * 3) * 11 * (1 - t * 0.45);

        ediActor.style.setProperty("--actor-x", `${(Math.max(0, targetEdiX) * ease - recoil).toFixed(1)}px`);
        bitcodeActor.style.setProperty("--actor-x", `${curBitX.toFixed(1)}px`);
        bitcodeActor.style.setProperty("--actor-y", `${curBitY.toFixed(1)}px`);
        bitcodeActor.style.setProperty("--actor-rot", `${rotDeg.toFixed(2)}deg`);

        const nextPhase = isDizzy ? "dizzy" : p >= 0.06 ? "approach" : "idle";
        if (collisionStage.dataset.phase !== nextPhase) {
          collisionStage.dataset.phase = nextPhase;
          updateCollisionBubbles(false);
        }
      };

      const onCollisionScroll = () => {
        if (!colRaf) colRaf = window.requestAnimationFrame(updateCollision);
      };

      updateCollision();
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => updateCollision());
      }
      window.addEventListener("scroll", onCollisionScroll, { passive: true });
      window.addEventListener("resize", onCollisionScroll, { passive: true });
    }
  }

  /* ── 4. Word-lit Scroll Paragraph (#about) ───────────────────────────── */
  if (wordLitEl) {
    if (prefersReducedMotion) {
      wordLitEl.style.setProperty("--lit", "1");
    } else {
      let litRaf = 0;
      const updateLit = () => {
        litRaf = 0;
        const rect = wordLitEl.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        const start = vh * 0.88;
        const end = vh * 0.25;
        const raw = (start - rect.top) / (start - end + rect.height * 0.55);
        const clamped = Math.min(1, Math.max(0, raw));
        wordLitEl.style.setProperty("--lit", clamped.toFixed(3));
      };
      const onLitScroll = () => {
        if (!litRaf) litRaf = window.requestAnimationFrame(updateLit);
      };
      updateLit();
      window.addEventListener("scroll", onLitScroll, { passive: true });
      window.addEventListener("resize", onLitScroll, { passive: true });
    }
  }

  /* ── 5. Count-up Stats (#about) ──────────────────────────────────────── */
  const statCounters = document.querySelectorAll("[data-count-to]");
  if (statCounters.length) {
    const runCounter = (el) => {
      const target = Number(el.dataset.countTo || 0);
      if (prefersReducedMotion || target <= 0) {
        el.textContent = String(target);
        return;
      }
      const duration = 1200;
      const startTime = performance.now();
      const step = (now) => {
        const progress = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = String(Math.round(target * eased));
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    };

    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            runCounter(entry.target);
            obs.unobserve(entry.target);
          });
        },
        { threshold: 0.5 }
      );
      statCounters.forEach((el) => obs.observe(el));
    } else {
      statCounters.forEach(runCounter);
    }
  }

  /* ── 6. Typewriter Heading (#who-we-are) ─────────────────────────────── */
  const twEl = document.querySelector("[data-typewriter]");
  if (twEl) {
    const typedSpan = twEl.querySelector("[data-tw-typed]");
    const restSpan = twEl.querySelector("[data-tw-rest]");

    const revealFull = () => {
      twHasStarted = true;
      const fullText = twEl.dataset.typewriter || "";
      if (typedSpan) typedSpan.textContent = fullText;
      if (restSpan) restSpan.textContent = "";
    };

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealFull();
    } else {
      const twObs = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          twObs.disconnect();
          twHasStarted = true;
          const chars = Array.from(twEl.dataset.typewriter || "");
          let i = 0;
          twTimer = window.setInterval(() => {
            i += 1;
            if (typedSpan) typedSpan.textContent = chars.slice(0, i).join("");
            if (restSpan) restSpan.textContent = chars.slice(i).join("");
            if (i >= chars.length) window.clearInterval(twTimer);
          }, 95);
        },
        { threshold: 0.4 }
      );
      twObs.observe(twEl);
    }
  }

  /* ── 7. Projects Accordion (#projects) ───────────────────────────────── */
  const accordionButtons = Array.from(document.querySelectorAll("[data-accordion-trigger]"));
  accordionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      const targetId = btn.getAttribute("aria-controls");

      accordionButtons.forEach((other) => {
        other.setAttribute("aria-expanded", "false");
        const pId = other.getAttribute("aria-controls");
        const panel = pId ? document.getElementById(pId) : null;
        if (panel) panel.classList.remove("is-open");
      });

      if (!isOpen) {
        btn.setAttribute("aria-expanded", "true");
        const panel = targetId ? document.getElementById(targetId) : null;
        if (panel) panel.classList.add("is-open");
      }
    });
  });

  /* ── 8. Process Level-Up Unlock (#process) ───────────────────────────── */
  const processGrid = document.getElementById("process-grid");
  if (processGrid) {
    const cards = Array.from(processGrid.querySelectorAll(".level-card"));
    totalLevels = cards.length;
    const xpBlocks = Array.from(document.querySelectorAll("#xp-blocks .xp-block"));
    const xpCounter = document.getElementById("xp-counter");
    const xpCta = document.getElementById("xp-cta");

    const setUnlockedCount = (count) => {
      unlockedLevels = count;
      cards.forEach((card, i) => {
        card.classList.toggle("is-unlocked", i < count);
      });
      const filled = Math.round((count / cards.length) * xpBlocks.length);
      xpBlocks.forEach((b, i) => b.classList.toggle("is-filled", i < filled));
      if (xpCounter) xpCounter.textContent = `${count}/${cards.length}`;
      if (xpCta) xpCta.classList.toggle("is-complete", count >= cards.length);
      updateProcessLabels(currentLang);
    };

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setUnlockedCount(cards.length);
    } else {
      const procObs = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          procObs.disconnect();
          let n = 0;
          const timer = window.setInterval(() => {
            n += 1;
            setUnlockedCount(n);
            if (n >= cards.length) window.clearInterval(timer);
          }, 550);
        },
        { threshold: 0.25 }
      );
      procObs.observe(processGrid);
    }
  }

  /* ── 9. Scroll Reveal ([data-reveal]) ────────────────────────────────── */
  const reveals = Array.from(document.querySelectorAll("[data-reveal]"));
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.setAttribute("data-shown", "true"));
  } else {
    const revObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-shown", "true");
          revObs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => revObs.observe(el));
  }

  /* ── 10. Local Mock Contact Form (nuovo_progetto.exe) ────────────────── */
  const form = document.getElementById("project-form");
  const successBox = document.getElementById("form-success");
  const mailtoBtn = document.getElementById("form-mailto-link");
  const resetBtn = document.getElementById("form-reset-btn");

  if (form && successBox) {
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const setError = (fieldName, msg) => {
      const input = form.querySelector(`[name="${fieldName}"]`);
      const errEl = document.getElementById(`error-${fieldName}`);
      if (input) {
        input.classList.toggle("is-invalid", Boolean(msg));
        if (msg) input.setAttribute("aria-invalid", "true");
        else input.removeAttribute("aria-invalid");
      }
      if (errEl) {
        errEl.textContent = msg || "";
        errEl.hidden = !msg;
      }
    };

    ["name", "email", "message"].forEach((name) => {
      const input = form.querySelector(`[name="${name}"]`);
      if (input) {
        input.addEventListener("input", () => setError(name, ""));
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const honeypot = (form.querySelector('[name="website"]')?.value || "").trim();
      if (honeypot) return;

      const nameVal = (form.querySelector('[name="name"]')?.value || "").trim();
      const emailVal = (form.querySelector('[name="email"]')?.value || "").trim();
      const companyVal = (form.querySelector('[name="company"]')?.value || "").trim();
      const msgVal = (form.querySelector('[name="message"]')?.value || "").trim();
      const selectedScopes = Array.from(form.querySelectorAll('input[name="scopes"]:checked')).map((el) => el.value);

      const dict = I18N[currentLang].contacts;
      const errors = {};
      if (nameVal.length < 2) errors.name = dict.errName;
      if (!emailRx.test(emailVal)) errors.email = dict.errEmail;
      if (msgVal.length < 10) errors.message = dict.errMsg;

      setError("name", errors.name || "");
      setError("email", errors.email || "");
      setError("message", errors.message || "");

      const firstInvalid = ["name", "email", "message"].find((k) => errors[k]);
      if (firstInvalid) {
        if (!prefersReducedMotion && form.animate) {
          form.animate(
            [
              { transform: "translateX(0)" },
              { transform: "translateX(-8px)" },
              { transform: "translateX(8px)" },
              { transform: "translateX(-4px)" },
              { transform: "translateX(0)" },
            ],
            { duration: 360, easing: "steps(4, end)" }
          );
        }
        form.querySelector(`[name="${firstInvalid}"]`)?.focus();
        return;
      }

      const subject = encodeURIComponent(`${dict.mailSubjectPrefix} ${nameVal}${companyVal ? ` (${companyVal})` : ""}`);
      const bodyLines = [
        `${dict.mailFieldName}: ${nameVal}`,
        `${dict.mailFieldEmail}: ${emailVal}`,
        companyVal ? `${dict.mailFieldCompany}: ${companyVal}` : null,
        selectedScopes.length ? `${dict.mailFieldScopes}: ${selectedScopes.join(", ")}` : null,
        "",
        msgVal,
      ]
        .filter(Boolean)
        .join("\n");

      if (mailtoBtn) {
        mailtoBtn.setAttribute("href", `mailto:admin@faktotum.it?subject=${subject}&body=${encodeURIComponent(bodyLines)}`);
      }

      form.hidden = true;
      successBox.hidden = false;
      successBox.focus();
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        form.reset();
        ["name", "email", "message"].forEach((k) => setError(k, ""));
        successBox.hidden = true;
        form.hidden = false;
        form.querySelector('[name="name"]')?.focus();
      });
    }
  }
})();
