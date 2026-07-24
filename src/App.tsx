import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  AudioLines,
  CalendarClock,
  CheckCircle2,
  Database,
  FileCheck2,
  FileQuestion,
  Github,
  Mail,
  Menu,
  Network,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BlockMath } from "react-katex";

type NavItem = { label: string; href: string };

const navItems: NavItem[] = [
  { label: "Overview", href: "#overview" },
  { label: "Dataset", href: "#dataset" },
  { label: "Evaluation", href: "#evaluation" },
  { label: "Resources", href: "#resources" },
  { label: "Timeline", href: "#timeline" },
  { label: "License", href: "#license" },
  { label: "Organizers", href: "#organizers" },
];

type TaskVisual = "counting" | "detection" | "temporal" | "location" | "spatial" | "action";

const categories: Array<{
  title: string;
  description: string;
  question: string;
  answer: string;
  visual: TaskVisual;
  group: "temporal" | "spatial";
  index: string;
}> = [
  {
    title: "Sound Counting",
    description: "Count sound events, distinct sound types, repeated occurrences, or the maximum number of sounds active at the same time.",
    question: "From the audio alone, what is the maximum number of overlapping sounds?",
    answer: "The maximum overlap is 3 simultaneous sounds, with air conditioner, television, and toy train active from 2.0 s to 3.0 s.",
    visual: "counting",
    group: "temporal",
    index: "01",
  },
  {
    title: "Temporal Detection",
    description: "Detect when a sound starts, when it ends, and how long it remains active within the 10-second clip.",
    question: "From what you hear, what time span does the object impact cover?",
    answer: "The active interval for the object impact runs from 4.3 s to 4.8 s.",
    visual: "detection",
    group: "temporal",
    index: "02",
  },
  {
    title: "Temporal Relation",
    description: "Determine whether two sounds occur before, after, during, or overlapping with one another.",
    question: "Is the entire object impact contained within the duration of the toy train?",
    answer: "From the interval boundaries, the toy train time span fully contains the full duration of the object impact.",
    visual: "temporal",
    group: "temporal",
    index: "03",
  },
  {
    title: "Spatial Location",
    description: "Assign one sound source to one of eight discrete directions relative to the robot.",
    question: "Where is the television relative to the robot?",
    answer: "Spatially, the television is positioned toward the rear-left of the robot.",
    visual: "location",
    group: "spatial",
    index: "04",
  },
  {
    title: "Spatial Relation",
    description: "Compare the relative position of one sound source with another sound source.",
    question: "Where is the air conditioner relative to the television?",
    answer: "The relative position places the air conditioner to the right of and behind the television.",
    visual: "spatial",
    group: "spatial",
    index: "05",
  },
  {
    title: "Action Prediction",
    description: "Predict the robot's safest next action after detecting and locating a sound event.",
    question: "After detecting the object impact, what should the embodied home assistant do next?",
    answer: "For this clip, the embodied assistant should safely observe the front area, notify the homeowner, and record the scene after detecting the object impact.",
    visual: "action",
    group: "spatial",
    index: "06",
  },
];

const scoreFormula = String.raw`\boldsymbol{\mathrm{Score}=0.25A_{\mathrm{L1}}+0.25A_{\mathrm{L2}}+0.50A_{\mathrm{CL2}}}`;

const resources: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Registration",
    description: "Team eligibility and registration instructions will be published here.",
    icon: CheckCircle2,
  },
  {
    title: "Dataset & Baseline",
    description: "Training data, development resources, and baseline code are in preparation.",
    icon: Database,
  },
  {
    title: "Submission",
    description: "Submission format, evaluation server, and participation rules are forthcoming.",
    icon: FileQuestion,
  },
  {
    title: "Participation Guidelines",
    description: "Official participation rules and reporting requirements will be published here.",
    icon: ShieldCheck,
  },
];

function RmsauMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span className="brand-ring brand-ring--outer" />
      <span className="brand-ring brand-ring--inner" />
      <span className="brand-core" />
    </span>
  );
}

function TaskDiagram({ kind, title }: { kind: TaskVisual; title: string }) {
  const commonProps = {
    className: "task-diagram",
    viewBox: "0 0 320 122",
    role: "img" as const,
    "aria-label": `${title} example diagram`,
  };

  if (kind === "counting") {
    return (
      <svg {...commonProps}>
        <title>Three overlapping sounds on a ten-second timeline</title>
        <text className="diagram-label" x="8" y="25">Air conditioner</text>
        <text className="diagram-label" x="8" y="58">Television</text>
        <text className="diagram-label" x="8" y="91">Toy train</text>
        <rect className="diagram-bar" x="122" y="14" width="78" height="12" rx="6" />
        <rect className="diagram-bar" x="232" y="14" width="72" height="12" rx="6" />
        <rect className="diagram-bar" x="96" y="47" width="208" height="12" rx="6" />
        <rect className="diagram-bar" x="152" y="80" width="112" height="12" rx="6" />
        <line className="diagram-highlight diagram-dash" x1="176" y1="7" x2="176" y2="101" />
        <text className="diagram-accent-label" x="176" y="116" textAnchor="middle">3 simultaneous</text>
      </svg>
    );
  }

  if (kind === "detection") {
    return (
      <svg {...commonProps}>
        <title>Object impact onset, offset, and duration</title>
        <text className="diagram-label" x="8" y="53">Object impact</text>
        <line className="diagram-axis" x1="104" y1="60" x2="306" y2="60" />
        {[104, 144, 184, 224, 264, 306].map((x, index) => (
          <g key={x}>
            <line className="diagram-tick" x1={x} y1="55" x2={x} y2="66" />
            <text className="diagram-tick-label" x={x - 5} y="82">{index * 2}</text>
          </g>
        ))}
        <rect className="diagram-highlight" x="191" y="49" width="10" height="22" rx="5" />
        <line className="diagram-highlight diagram-dash" x1="191" y1="29" x2="191" y2="73" />
        <line className="diagram-highlight diagram-dash" x1="201" y1="29" x2="201" y2="73" />
        <text className="diagram-strong-label" x="187" y="24" textAnchor="end">onset 4.3 s</text>
        <text className="diagram-strong-label" x="205" y="24" textAnchor="start">offset 4.8 s</text>
        <text className="diagram-accent-label" x="196" y="108" textAnchor="middle">duration 0.5 s</text>
      </svg>
    );
  }

  if (kind === "temporal") {
    return (
      <svg {...commonProps}>
        <title>Object impact contained within the toy train duration</title>
        <text className="diagram-label" x="8" y="38">Toy train</text>
        <text className="diagram-label" x="8" y="83">Object impact</text>
        <line className="diagram-axis" x1="105" y1="99" x2="306" y2="99" />
        <rect className="diagram-bar" x="130" y="25" width="138" height="14" rx="7" />
        <rect className="diagram-highlight" x="191" y="70" width="18" height="18" rx="5" />
        <line className="diagram-dash diagram-highlight" x1="191" y1="48" x2="191" y2="70" />
        <line className="diagram-dash diagram-highlight" x1="209" y1="48" x2="209" y2="70" />
        <text className="diagram-accent-label" x="218" y="84">contained within</text>
        <text className="diagram-tick-label" x="102" y="116">0 s</text>
        <text className="diagram-tick-label" x="292" y="116">10 s</text>
      </svg>
    );
  }

  if (kind === "location") {
    return (
      <svg {...commonProps}>
        <title>Television located to the rear-left of the robot</title>
        <circle className="diagram-orbit" cx="160" cy="61" r="43" />
        <line className="diagram-axis" x1="160" y1="13" x2="160" y2="109" />
        <line className="diagram-axis" x1="112" y1="61" x2="208" y2="61" />
        <path className="diagram-sector" d="M160 61 L116 61 A43 43 0 0 0 129 92 Z" />
        <circle className="diagram-highlight" cx="134" cy="86" r="6" />
        <circle className="diagram-robot" cx="160" cy="61" r="19" />
        <text className="diagram-robot-label" x="160" y="65" textAnchor="middle">Robot</text>
        <path className="diagram-facing" d="M160 14 L156 21 H164 Z" />
        <text className="diagram-accent-label" x="94" y="104">rear-left · TV</text>
        <text className="diagram-tick-label" x="149" y="10">front</text>
        <text className="diagram-tick-label" x="149" y="120">rear</text>
        <text className="diagram-tick-label" x="87" y="65">left</text>
        <text className="diagram-tick-label" x="216" y="65">right</text>
      </svg>
    );
  }

  if (kind === "spatial") {
    return (
      <svg {...commonProps}>
        <title>Air conditioner positioned right of and behind the television</title>
        <circle className="diagram-orbit" cx="160" cy="55" r="33" />
        <line className="diagram-axis" x1="160" y1="14" x2="160" y2="105" />
        <line className="diagram-axis" x1="112" y1="55" x2="208" y2="55" />
        <path className="diagram-facing" d="M160 13 L156 20 H164 Z" />
        <circle className="diagram-robot" cx="160" cy="55" r="19" />
        <text className="diagram-robot-label" x="160" y="59" textAnchor="middle">Robot</text>
        <rect className="diagram-source" x="90" y="78" width="30" height="18" rx="4" />
        <rect className="diagram-highlight" x="226" y="88" width="34" height="18" rx="4" />
        <path className="diagram-relation-arrow" d="M123 87 C155 72 200 76 226 97" />
        <text className="diagram-label" x="80" y="114">Television</text>
        <text className="diagram-accent-label" x="212" y="118">Air conditioner</text>
        <text className="diagram-tick-label" x="194" y="75">right + behind</text>
        <text className="diagram-axis-label" x="148" y="10">Front</text>
        <text className="diagram-axis-label" x="148" y="120">Rear</text>
        <text className="diagram-axis-label" x="82" y="59">Left</text>
        <text className="diagram-axis-label" x="218" y="59">Right</text>
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <title>Three-stage safe action sequence</title>
      <circle className="diagram-action-node" cx="55" cy="51" r="24" />
      <circle className="diagram-action-node" cx="160" cy="51" r="24" />
      <circle className="diagram-action-node" cx="265" cy="51" r="24" />
      <path className="diagram-relation-arrow" d="M82 51 H128" />
      <path className="diagram-relation-arrow" d="M187 51 H233" />
      <path className="diagram-icon" d="M45 51 C49 43 61 43 65 51 C61 59 49 59 45 51 Z M55 47 A4 4 0 1 0 55 55 A4 4 0 1 0 55 47" />
      <path className="diagram-icon" d="M151 58 V45 L160 38 L169 45 V58 M155 58 V50 H165 V58" />
      <path className="diagram-icon" d="M257 59 H273 M260 59 V48 A5 5 0 0 1 270 48 V59 M258 45 C261 38 269 35 275 39" />
      <text className="diagram-action-label" x="31" y="93">Localize</text>
      <text className="diagram-action-label" x="136" y="93">Observe</text>
      <text className="diagram-action-label diagram-action-label--accent" x="239" y="93">Notify</text>
      <text className="diagram-action-caption" x="86" y="117">safe, context-aware response</text>
    </svg>
  );
}

function AudioField() {
  return (
    <div className="audio-field" aria-hidden="true">
      <svg className="audio-field__svg" viewBox="70 70 480 480" fill="none">
        <defs>
          <radialGradient id="sphereFill" cx="0" cy="0" r="1" gradientTransform="translate(310 310) rotate(90) scale(235)">
            <stop offset="0" stopColor="#58E3C3" stopOpacity=".15" />
            <stop offset=".6" stopColor="#4D87FF" stopOpacity=".08" />
            <stop offset="1" stopColor="#081321" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ringStroke" x1="95" y1="102" x2="535" y2="529">
            <stop stopColor="#58E3C3" stopOpacity=".85" />
            <stop offset=".55" stopColor="#7CA8FF" stopOpacity=".28" />
            <stop offset="1" stopColor="#F0C96A" stopOpacity=".65" />
          </linearGradient>
          <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="310" cy="310" r="240" fill="url(#sphereFill)" />
        <circle cx="310" cy="310" r="229" stroke="url(#ringStroke)" strokeWidth="1.4" />
        <ellipse cx="310" cy="310" rx="229" ry="92" stroke="#8FB7FF" strokeOpacity=".32" />
        <ellipse cx="310" cy="310" rx="229" ry="154" stroke="#8FB7FF" strokeOpacity=".18" />
        <ellipse cx="310" cy="310" rx="92" ry="229" stroke="#58E3C3" strokeOpacity=".32" />
        <ellipse cx="310" cy="310" rx="154" ry="229" stroke="#58E3C3" strokeOpacity=".18" />
        <path d="M81 310H539M310 81V539" stroke="#F8FAFC" strokeOpacity=".12" />
        <path d="M128 445C189 365 239 414 310 310C375 214 431 261 500 176" stroke="url(#ringStroke)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M136 200C204 250 227 190 310 310C372 399 430 363 492 420" stroke="#7CA8FF" strokeOpacity=".55" strokeWidth="1.5" strokeDasharray="5 10" />
        <g filter="url(#softGlow)">
          <circle cx="128" cy="445" r="7" fill="#58E3C3" />
          <circle cx="310" cy="310" r="9" fill="#F8FAFC" />
          <circle cx="500" cy="176" r="7" fill="#F0C96A" />
        </g>
        <g className="audio-field__pulse">
          <circle cx="310" cy="310" r="31" stroke="#F8FAFC" strokeOpacity=".45" />
          <circle cx="310" cy="310" r="53" stroke="#58E3C3" strokeOpacity=".2" />
        </g>
      </svg>
      <div className="audio-field__label audio-field__label--foa">
        <AudioLines size={15} /> FOA soundfield
      </div>
      <div className="audio-field__label audio-field__label--reasoning">
        <Network size={15} /> Spatial reasoning
      </div>
      <div className="audio-field__axis audio-field__axis--x">X</div>
      <div className="audio-field__axis audio-field__axis--y">Y</div>
      <div className="audio-field__axis audio-field__axis--z">Z</div>
    </div>
  );
}

function SectionHeading({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <div className="eyebrow"><span />{index}</div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroVisualRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const title = heroTitleRef.current;
    const content = heroContentRef.current;
    const audioField = heroVisualRef.current?.querySelector<HTMLElement>(".audio-field");
    const titleText = title?.querySelector<HTMLElement>(".hero__title-text");

    if (!title || !content || !audioField || !titleText) return;

    const desktopLayout = window.matchMedia("(min-width: 901px)");
    let animationFrame = 0;
    let active = true;

    const fitTitle = () => {
      if (!active) return;

      if (!desktopLayout.matches) {
        document.documentElement.style.removeProperty("--display-title-size");
        return;
      }

      const contentLeft = content.getBoundingClientRect().left;
      const imageRight = audioField.getBoundingClientRect().right;
      const currentTextWidth = titleText.getBoundingClientRect().width;
      const currentFontSize = Number.parseFloat(window.getComputedStyle(title).fontSize);
      const targetWidth = imageRight - contentLeft;

      if (currentTextWidth <= 0 || currentFontSize <= 0 || targetWidth <= 0) return;

      const fittedSize = currentFontSize * (targetWidth / currentTextWidth);
      const safeSize = Math.min(54, Math.max(32, fittedSize));
      document.documentElement.style.setProperty("--display-title-size", `${safeSize.toFixed(3)}px`);
    };

    const scheduleTitleFit = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(fitTitle);
    };

    fitTitle();
    window.addEventListener("resize", scheduleTitleFit);
    document.fonts?.ready.then(scheduleTitleFit);

    return () => {
      active = false;
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", scheduleTitleFit);
      document.documentElement.style.removeProperty("--display-title-size");
    };
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    let animationFrame = 0;

    const updateActiveSection = () => {
      const readingLine = window.scrollY + Math.min(window.innerHeight * 0.35, 260);
      let current = sectionIds[0];

      sections.forEach((section) => {
        if (section.offsetTop <= readingLine) current = section.id;
      });

      const atPageEnd =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      if (atPageEnd) current = sectionIds[sectionIds.length - 1];

      setActiveSection((previous) => (previous === current ? previous : current));
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="RMSAU home" onClick={() => setMenuOpen(false)}>
          <RmsauMark />
          <span className="brand-copy">
            <strong>RMSAU</strong>
            <span>ICASSP 2027 Grand Challenge</span>
          </span>
        </a>

        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          {navItems.map((item) => {
            const section = item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={activeSection === section ? "is-active" : ""}
                aria-current={activeSection === section ? "location" : undefined}
                onClick={() => {
                  setActiveSection(section);
                  setMenuOpen(false);
                }}
              >
                {item.label}
              </a>
            );
          })}
          <a
            className="nav-cta"
            href="#resources"
            onClick={() => {
              setActiveSection("resources");
              setMenuOpen(false);
            }}
          >
            Updates soon <ArrowRight size={15} />
          </a>
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-grid" />
          <div className="hero-glow hero-glow--left" />
          <div className="hero-glow hero-glow--right" />
          <div className="container hero__inner">
            <div className="hero__title-block">
              <div className="conference-pill"><Sparkles size={15} /> ICASSP 2027 Grand Challenge</div>
              <h1 ref={heroTitleRef}>
                <span className="hero__title-text">
                  <span className="hero__title-primary">Real-world Multi‑channel</span>{" "}
                  <span className="hero__title-accent">Spatial Audio Understanding</span>
                </span>
              </h1>
            </div>
            <div className="hero__content" ref={heroContentRef}>
              <p className="hero__lead">
                A unified benchmark for understanding <em>what happened</em>, <em>when</em> and
                <em> where</em> it occurred, how events relate, and <em>what to do next</em> in
                real-world smart-home soundscapes.
              </p>
              <div className="hero__actions">
                <a className="button button--primary" href="#dataset">
                  Explore the dataset <ArrowDown size={17} />
                </a>
                <a className="button button--ghost" href="#overview">
                  Challenge overview
                </a>
              </div>
              <div className="hero__meta" aria-label="Challenge highlights">
                <div><strong>10 sec</strong><span>FOA recordings</span></div>
                <div><strong>2 layers</strong><span>Unified reasoning</span></div>
                <div><strong>6 categories</strong><span>Understanding tasks</span></div>
              </div>
            </div>
            <div className="hero__visual" ref={heroVisualRef}>
              <AudioField />
            </div>
          </div>
          <a className="scroll-cue" href="#participation" aria-label="Scroll to call for participation">
            <span>Discover RMSAU</span><ArrowDown size={16} />
          </a>
        </section>

        <section className="participation section section--raised" id="participation" aria-labelledby="participation-title">
          <div className="container">
            <h2 id="participation-title">Call for Participation</h2>
            <div className="participation__copy">
              <p>
                Despite rapid progress in audio understanding, most systems still focus on
                isolated recognition tasks that identify what sounds are present but provide
                limited insight into when and where events occur, how they interact, or what
                action should follow. This limitation is especially significant in smart homes,
                where acoustic scenes are dynamic, spatially distributed, and sometimes
                safety-critical. Embodied intelligence therefore requires a unified understanding
                of sound, space, time, and context.
              </p>
              <p>
                RMSAU addresses this gap through a unified challenge for real-world multichannel
                spatial audio understanding. By connecting semantic perception with temporal and
                spatial reasoning and context-aware action, the challenge provides common ground
                for measuring progress toward reliable and responsible smart-home agents. We
                invite you to participate, share new ideas, and help advance intelligent systems
                that can listen, reason, and act in the physical world.
              </p>
            </div>
          </div>
        </section>

        <section className="overview section" id="overview">
          <div className="container">
            <SectionHeading index="01 / Overview" title="Challenge Overview" />
            <div className="overview-narrative">
              <p>
                RMSAU is a unified two‑layer challenge for real‑world multi‑channel spatial audio
                understanding, built around 10‑second First‑Order Ambisonics recordings from
                smart‑home environments. In Layer 1, models identify the sound events present in
                a scene. The generated semantic response then becomes part of the Layer 2 context,
                where models reason about quantities, timing, spatial location, temporal and
                spatial relations, and appropriate actions.
              </p>
              <p>
                The challenge asks systems to move beyond acoustic event recognition toward
                situated intelligence: understanding what is happening in a home, when and where
                it occurs, how events relate to one another, and what the situation requires next.
                Its goal is to advance models that combine reliable semantic perception with
                multichannel spatial and temporal reasoning under one consistent benchmark.
              </p>
              <p>
                By connecting perception, reasoning, and risk‑aware decision making, RMSAU provides
                a shared testbed for research at the intersection of spatial audio, embodied AI,
                and intelligent environments. The benchmark is designed to expose both higher‑level
                reasoning capability and the propagation of errors across its two connected layers,
                supporting progress toward safer and more context‑aware smart‑home systems.
              </p>
            </div>
          </div>
        </section>

        <section className="dataset section section--raised" id="dataset">
          <div className="container">
            <SectionHeading
              index="02 / Dataset"
              title="Dataset"
              description="A large-scale combination of simulated and real-source FOA recordings, paired with hierarchical questions that connect scene perception to embodied reasoning."
            />

            <div className="dataset-stats" aria-label="Dataset statistics">
              <article>
                <span>600 h</span>
                <h3>Simulated audio</h3>
                <p>Generated smart-home acoustic scenes sampled at 16 kHz.</p>
              </article>
              <article>
                <span>14 h</span>
                <h3>Real-source audio</h3>
                <p>Captured with a Zoom H3‑VR from real sound sources and provided at 16 kHz.</p>
              </article>
              <article>
                <span>166K</span>
                <h3>Training QAs</h3>
                <p>Hierarchical question-answer pairs covering both benchmark layers.</p>
              </article>
              <article>
                <span>23K</span>
                <h3>Test QAs</h3>
                <p>18K test QAs plus 5K QAs from the real-data evaluation set.</p>
              </article>
            </div>

            <div className="dataset-description">
              <p>
                Each record contains a 10-second FOA soundfield that preserves the multichannel
                cues required to reason about direction, distance, motion, and relationships among
                sources. The combination of extensive simulation and real-source material supports
                both controlled coverage and evaluation under more realistic acoustic conditions.
                The real-source recordings were captured with a Zoom H3‑VR and are provided at
                16 kHz.
              </p>
              <p>
                Each record follows the same hierarchical question-answering structure. At
                inference time, the model produces a free-text Layer 1 response, which is then
                incorporated into the Layer 2 conversation context. This makes semantic
                understanding an explicit prerequisite for the reasoning that follows.
              </p>
            </div>

            <div className="dataset-specs">
              <div><AudioLines /><span>Audio format</span><strong>10-second First-Order Ambisonics</strong></div>
              <div><Database /><span>Sampling rate</span><strong>16 kHz for simulated and real-source audio</strong></div>
              <div><Network /><span>QA structure</span><strong>Layer 1 perception → Layer 2 reasoning</strong></div>
            </div>

            <div className="taxonomy-block">
              <div className="categories-header categories-header--stacked">
                <span className="mini-label">Layer 2 taxonomy</span>
                <h3>Six dimensions of embodied audio reasoning</h3>
                <p>Six question types connect temporal and spatial understanding with safe, context-aware action in smart homes.</p>
              </div>
              <div className="categories-grid">
                {categories.map(({ title, description, question, answer, visual, group, index }) => (
                  <article className={`task-card task-card--${group}`} key={title}>
                    <div className="task-card__header">
                      <span className="task-card__index">{index}</span>
                      <h3>{title}</h3>
                    </div>
                    <p className="task-card__description">{description}</p>
                    <div className="task-card__visual">
                      <TaskDiagram kind={visual} title={title} />
                    </div>
                    <div className="task-card__example">
                      <p><strong>Q</strong><span>{question}</span></p>
                      <p><strong>A</strong><span>{answer}</span></p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="evaluation section" id="evaluation">
          <div className="container">
            <SectionHeading
              index="03 / Evaluation"
              title="Evaluation"
              description="Free-text outputs are normalized and mapped to reference labels through deterministic rule-based post-processing before the official score is calculated."
            />
            <article className="metric metric--score">
              <div className="metric__content">
                <div className="metric__title"><h3>Overall Score</h3><span>Official metric</span></div>
                <p>The final ranking score combines semantic perception and higher-level reasoning, with conditional Layer-2 accuracy receiving half of the total weight.</p>
              </div>
              <div className="metric__formula" aria-label="Overall score formula">
                <BlockMath math={scoreFormula} />
              </div>
              <div className="score-components" aria-label="Score component definitions">
                <div><strong>A<sub>L1</sub></strong><span>Layer-1 accuracy</span></div>
                <div><strong>A<sub>L2</sub></strong><span>Layer-2 accuracy</span></div>
                <div><strong>A<sub>CL2</sub></strong><span>Conditional Layer-2 accuracy</span></div>
              </div>
            </article>
          </div>
        </section>

        <section className="resources section section--raised" id="resources">
          <div className="container">
            <SectionHeading
              index="04 / Resources"
              title="Participant Resources"
              description="Official participation materials will be released here as the challenge preparation progresses."
            />
            <div className="status-pill"><span /> Preparation in progress</div>
            <div className="resources-list">
              {resources.map(({ title, description, icon: Icon }, index) => (
                <article className="resource-row" key={title}>
                  <div className="resource-row__index">{String(index + 1).padStart(2, "0")}</div>
                  <div className="resource-row__icon"><Icon /></div>
                  <div className="resource-row__content">
                    <h3 className={title === "Participation Guidelines" ? "resource-row__title--nowrap" : undefined}>{title}</h3>
                    <p>{description}</p>
                  </div>
                  <div className="coming-soon coming-soon--static"><CalendarClock size={14} /> Coming soon</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="timeline section" id="timeline">
          <div className="container">
            <SectionHeading
              index="05 / Timeline"
              title="Challenge Timeline"
              description="Exact dates will be announced once the official challenge calendar is finalized."
            />
            <div className="timeline-list">
              {[
                ["01", "Registration Opens and Release of the Training Dataset", "TBA"],
                ["02", "Release of the Testing Dataset", "TBA"],
                ["03", "Submission Deadline", "TBA"],
                ["04", "Results Announcement", "TBA"],
                ["05", "2-page Papers Due (by invitation only)", "January 07, 2027"],
                ["06", "2-page Paper Acceptance Notification", "January 21, 2027"],
                ["07", "Camera-ready 2-page Papers Due", "January 28, 2027"],
              ].map(([number, label, date]) => (
                <article className="timeline-row" key={label}>
                  <span className="timeline-row__index">{number}</span>
                  <h3>{label}</h3>
                  <strong className={`timeline-date ${date === "TBA" ? "is-tba" : "is-confirmed"}`}>{date}</strong>
                </article>
              ))}
            </div>

          </div>
        </section>

        <section className="license section section--raised" id="license">
          <div className="container">
            <SectionHeading
              index="06 / License"
              title="License"
              description="The benchmark is being prepared for challenge participation and responsible academic use."
            />
            <div className="license-card">
              <FileCheck2 />
              <p>
                The RMSAU dataset and associated materials are intended exclusively for
                participation in the ICASSP 2027 RMSAU Challenge and for non-commercial academic
                research. Redistribution, sublicensing, and commercial use are not permitted
                without prior written permission from the organizers.
              </p>
              <p>
                Users must acknowledge the RMSAU benchmark and cite the official dataset or
                challenge paper in resulting publications. The complete license agreement and
                required citation will accompany the official data release and will supersede
                this preliminary summary.
              </p>
            </div>
          </div>
        </section>

        <section className="organizers section" id="organizers">
          <div className="container">
            <SectionHeading
              index="07 / Organizers"
              title="Organizing Committee"
              description="Committee membership, affiliations, and official contact channels will be published as challenge preparations progress."
            />
            <div className="organizer-card organizer-card--stacked">
              <div className="organizer-card__mark"><RmsauMark /></div>
              <div>
                <span className="mini-label">Details forthcoming</span>
                <h3>Organizer and contact details will be announced.</h3>
                <p>Confirmed committee members and affiliations will appear here.</p>
              </div>
              <div className="organizer-card__links" aria-label="Upcoming organizer links">
                <span><Mail size={16} /> Contact coming soon</span>
                <span><Github size={16} /> Repository coming soon</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <div className="footer-brand">
            <RmsauMark />
            <div><strong>RMSAU</strong><span>Real-world Multi-channel Spatial Audio Understanding</span></div>
          </div>
          <p>ICASSP 2027 Grand Challenge · Preliminary website · Details subject to update</p>
          <a href="#top">Back to top <ArrowDown className="back-top-arrow" size={15} /></a>
        </div>
      </footer>
    </div>
  );
}
