import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  AudioLines,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Database,
  FileCheck2,
  FileQuestion,
  Github,
  ListChecks,
  LocateFixed,
  Mail,
  Menu,
  Move3d,
  Network,
  Route,
  ShieldAlert,
  Sparkles,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = { label: string; href: string };

const navItems: NavItem[] = [
  { label: "Overview", href: "#overview" },
  { label: "Dataset", href: "#dataset" },
  { label: "Evaluation", href: "#evaluation" },
  { label: "Resources", href: "#resources" },
  { label: "Timeline", href: "#timeline" },
  { label: "License", href: "#license" },
];

const categories: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
  index: string;
}> = [
  {
    title: "Sound Counting",
    description: "Reason about how many events or sources occur in an acoustic scene.",
    icon: ListChecks,
    index: "01",
  },
  {
    title: "Source Localization",
    description: "Determine the direction and spatial position of active sound sources.",
    icon: LocateFixed,
    index: "02",
  },
  {
    title: "Temporal Detection",
    description: "Identify event timing, duration, onset, offset, and overlap.",
    icon: Clock3,
    index: "03",
  },
  {
    title: "Spatial Relations",
    description: "Understand distances, relative positions, and movement in space.",
    icon: Move3d,
    index: "04",
  },
  {
    title: "Temporal Relations",
    description: "Reason about event order, concurrency, and temporal dependencies.",
    icon: Route,
    index: "05",
  },
  {
    title: "Action Prediction",
    description: "Select a context-aware response to events in a smart-home scenario.",
    icon: ShieldAlert,
    index: "06",
  },
];

const metrics = [
  {
    name: "Layer 1 Accuracy",
    short: "L1 ACC",
    description: "Measures correct semantic perception of the sound events present.",
  },
  {
    name: "Layer 2 Accuracy",
    short: "L2 ACC",
    description: "Measures direct correctness on the six higher-level reasoning categories.",
  },
  {
    name: "Hierarchical Layer 2 Accuracy",
    short: "HIER ACC",
    description: "Evaluates reasoning performance under the benchmark’s Layer 1-to-Layer 2 dependency.",
  },
];

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
];

function EarsMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span className="brand-ring brand-ring--outer" />
      <span className="brand-ring brand-ring--inner" />
      <span className="brand-core" />
    </span>
  );
}

function AudioField() {
  return (
    <div className="audio-field" aria-hidden="true">
      <div className="audio-field__halo audio-field__halo--one" />
      <div className="audio-field__halo audio-field__halo--two" />
      <svg className="audio-field__svg" viewBox="0 0 620 620" fill="none">
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

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -58%", threshold: [0.05, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="EARS home" onClick={() => setMenuOpen(false)}>
          <EarsMark />
          <span className="brand-copy">
            <strong>EARS</strong>
            <span>ICASSP 2027 Challenge</span>
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
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            );
          })}
          <a className="nav-cta" href="#resources" onClick={() => setMenuOpen(false)}>
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
            <div className="hero__content">
              <div className="conference-pill"><Sparkles size={15} /> ICASSP 2027 Challenge</div>
              <h1>
                Embodied Audio
                <span>Reasoning in Smart Homes</span>
              </h1>
              <p className="hero__lead">
                A unified benchmark that moves spatial audio intelligence from recognizing
                <em> what happened</em> to understanding <em>when</em>, <em>where</em>, and
                <em> what to do next</em>.
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
                <div><strong>6 categories</strong><span>Reasoning dimensions</span></div>
              </div>
            </div>
            <div className="hero__visual">
              <AudioField />
            </div>
          </div>
          <a className="scroll-cue" href="#overview" aria-label="Scroll to challenge overview">
            <span>Discover EARS</span><ArrowDown size={16} />
          </a>
        </section>

        <section className="overview section" id="overview">
          <div className="container">
            <SectionHeading index="01 / Overview" title="Challenge Overview" />
            <div className="overview-narrative">
              <p>
                EARS is a unified two-layer spatial audio reasoning challenge built around
                10-second First-Order Ambisonics recordings from smart-home environments. In
                Layer 1, models identify the sound events present in a scene. The generated
                semantic response then becomes part of the Layer 2 context, where models reason
                about quantities, locations, timing, spatial and temporal relations, and
                appropriate actions.
              </p>
              <p>
                The challenge asks systems to move beyond acoustic event recognition toward
                situated intelligence: understanding what is happening in a home, when and where
                it occurs, how events relate to one another, and what the situation requires next.
                Its goal is to advance models that combine reliable semantic perception with
                multichannel spatial and temporal reasoning under one consistent benchmark.
              </p>
              <p>
                By connecting perception, reasoning, and risk-aware decision making, EARS provides
                a shared testbed for research at the intersection of spatial audio, embodied AI,
                and intelligent environments. The benchmark is designed to expose both higher-level
                reasoning capability and the propagation of errors across its two connected layers,
                supporting progress toward safer and more context-aware smart-home systems.
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
                <p>Generated smart-home acoustic scenes sampled at 24 kHz.</p>
              </article>
              <article>
                <span>14 h</span>
                <h3>Real-source audio</h3>
                <p>Recordings built from real sound sources and sampled at 48 kHz.</p>
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
              </p>
              <p>
                All records use a generative multiple-choice question-answering format. During
                training, a model generates both the selected option and its textual content. At
                inference time, the Layer 1 response is incorporated into the Layer 2 conversation
                context, making semantic understanding an explicit part of downstream reasoning.
              </p>
            </div>

            <div className="dataset-specs">
              <div><AudioLines /><span>Audio format</span><strong>10-second First-Order Ambisonics</strong></div>
              <div><Database /><span>Sampling rates</span><strong>24 kHz simulated · 48 kHz real</strong></div>
              <div><Network /><span>QA structure</span><strong>Layer 1 perception → Layer 2 reasoning</strong></div>
            </div>

            <div className="dataset-qa">
              <span className="mini-label">Answer format</span>
              <h3>Generative multiple-choice QA</h3>
              <p>
                Models return an answer option together with its natural-language content, enabling
                consistent evaluation while preserving an open-ended generative interface.
              </p>
              <div className="answer-window" aria-label="Illustrative answer format">
                <div className="answer-window__bar"><i /><i /><i /><span>sample response</span></div>
                <div className="answer-window__body">
                  <span className="answer-prompt">assistant</span>
                  <p><strong>Option C.</strong> The alarm is behind and to the left of the listener.</p>
                  <div className="answer-cursor" />
                </div>
              </div>
            </div>

            <div className="taxonomy-block">
              <div className="categories-header categories-header--stacked">
                <span className="mini-label">Layer 2 taxonomy</span>
                <h3>Six dimensions of embodied audio reasoning</h3>
                <p>From event quantities and coordinates to temporal understanding and context-aware action.</p>
              </div>
              <div className="categories-grid">
                {categories.map(({ title, description, icon: Icon, index }) => (
                  <article className="category-card" key={title}>
                    <div className="category-card__top">
                      <div className="category-card__icon"><Icon /></div>
                      <span>{index}</span>
                    </div>
                    <h3>{title}</h3>
                    <p>{description}</p>
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
              description="Performance is reported at the perception, reasoning, and hierarchical levels so that participants can distinguish direct accuracy from end-to-end dependency."
            />
            <div className="metrics-list metrics-list--stacked">
              {metrics.map((metric, index) => (
                <article className="metric" key={metric.name}>
                  <div className="metric__index">{String(index + 1).padStart(2, "0")}</div>
                  <div>
                    <div className="metric__title"><h3>{metric.name}</h3><span>{metric.short}</span></div>
                    <p>{metric.description}</p>
                  </div>
                </article>
              ))}
            </div>
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
                    <h3>{title}</h3>
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
                ["01", "Registration opens", "TBA"],
                ["02", "Data & baseline release", "TBA"],
                ["03", "Evaluation & submission", "TBA"],
                ["04", "Results announced", "TBA"],
              ].map(([number, label, date]) => (
                <article className="timeline-row" key={label}>
                  <span className="timeline-row__index">{number}</span>
                  <h3>{label}</h3>
                  <strong>{date}</strong>
                </article>
              ))}
            </div>

            <div className="organizer-card organizer-card--stacked">
              <div className="organizer-card__mark"><EarsMark /></div>
              <div>
                <span className="mini-label">Organizing committee</span>
                <h3>Organizer and contact details will be announced.</h3>
                <p>Committee members, affiliations, and the official challenge email will appear here.</p>
              </div>
              <div className="organizer-card__links" aria-label="Upcoming organizer links">
                <span><Mail size={16} /> Contact coming soon</span>
                <span><Github size={16} /> Repository coming soon</span>
              </div>
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
                The EARS dataset and associated materials are intended exclusively for
                participation in the ICASSP 2027 EARS Challenge and for non-commercial academic
                research. Redistribution, sublicensing, and commercial use are not permitted
                without prior written permission from the organizers.
              </p>
              <p>
                Users must acknowledge the EARS benchmark and cite the official dataset or
                challenge paper in resulting publications. The complete license agreement and
                required citation will accompany the official data release and will supersede
                this preliminary summary.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <div className="footer-brand">
            <EarsMark />
            <div><strong>EARS</strong><span>Embodied Audio Reasoning in Smart Homes</span></div>
          </div>
          <p>ICASSP 2027 Challenge · Preliminary website · Details subject to update</p>
          <a href="#top">Back to top <ArrowDown className="back-top-arrow" size={15} /></a>
        </div>
      </footer>
    </div>
  );
}
