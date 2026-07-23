import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  AudioLines,
  BellRing,
  Boxes,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Database,
  FileQuestion,
  Github,
  Layers3,
  ListChecks,
  LocateFixed,
  Mail,
  Menu,
  Move3d,
  Network,
  Radar,
  Route,
  ShieldAlert,
  Sparkles,
  TimerReset,
  Volume2,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = { label: string; href: string };

const navItems: NavItem[] = [
  { label: "Overview", href: "#overview" },
  { label: "Task", href: "#task" },
  { label: "Evaluation", href: "#evaluation" },
  { label: "Resources", href: "#resources" },
  { label: "Timeline", href: "#timeline" },
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
    short: "L1",
    description: "Measures correct semantic perception of the sound events present.",
  },
  {
    name: "Raw Layer 2 Accuracy",
    short: "L2",
    description: "Measures direct correctness on the six higher-level reasoning categories.",
  },
  {
    name: "Hierarchical Layer 2 Accuracy",
    short: "H-L2",
    description: "Evaluates Layer 2 performance under the benchmark’s hierarchical dependency.",
  },
  {
    name: "Joint Record Accuracy",
    short: "Joint",
    description: "Measures whether both layers are answered correctly for the same record.",
  },
  {
    name: "Category-wise Accuracy",
    short: "6×",
    description: "Reports performance separately across all six Layer 2 reasoning categories.",
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
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <div className="eyebrow"><span />{eyebrow}</div>
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
                <a className="button button--primary" href="#task">
                  Explore the task <ArrowDown size={17} />
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
            <div className="overview__top">
              <SectionHeading
                eyebrow="Challenge overview"
                title="From acoustic perception to situated intelligence."
              />
              <div className="overview__copy">
                <p>
                  Spatial audio understanding requires more than identifying the sounds in a
                  recording. An intelligent system must also determine when and where events
                  occur, understand how they relate, and decide how to respond.
                </p>
                <p>
                  EARS invites participants to build models that reason over 10-second
                  First-Order Ambisonics recordings through a unified two-layer question-answering
                  benchmark designed around complex smart-home environments.
                </p>
              </div>
            </div>

            <div className="statement-card">
              <div className="statement-card__icon"><Volume2 /></div>
              <p>
                The goal is not only to hear an acoustic scene, but to understand it—
                <strong> semantically, spatially, temporally, and operationally.</strong>
              </p>
              <div className="statement-card__signal" aria-hidden="true">
                {[16, 32, 22, 48, 38, 62, 28, 50, 20, 36, 16].map((height, index) => (
                  <span key={index} style={{ height }} />
                ))}
              </div>
            </div>

            <div className="principles-grid">
              <article>
                <div className="principle-number">01</div>
                <Radar />
                <h3>Spatial by design</h3>
                <p>FOA recordings preserve multichannel cues needed to reason about direction, distance, and motion.</p>
              </article>
              <article>
                <div className="principle-number">02</div>
                <Layers3 />
                <h3>Hierarchical by nature</h3>
                <p>Semantic perception becomes context for higher-level reasoning, exposing both capability and error propagation.</p>
              </article>
              <article>
                <div className="principle-number">03</div>
                <BellRing />
                <h3>Grounded in action</h3>
                <p>Smart-home scenarios connect audio understanding to monitoring, notification, and urgent response.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="task section section--raised" id="task">
          <div className="container">
            <SectionHeading
              eyebrow="Downstream task"
              title="One benchmark. Two connected layers."
              description="Every sample follows the same hierarchical generative multiple-choice question-answering structure."
            />

            <div className="pipeline" aria-label="EARS two-layer benchmark pipeline">
              <div className="pipeline__step pipeline__step--input">
                <div className="pipeline__icon"><AudioLines /></div>
                <span className="pipeline__label">Input</span>
                <h3>10-second FOA</h3>
                <p>A spatial acoustic scene captured in First-Order Ambisonics.</p>
              </div>
              <div className="pipeline__connector" aria-hidden="true"><span /><ArrowRight /></div>
              <div className="pipeline__step pipeline__step--layer-one">
                <div className="pipeline__tag">Layer 1</div>
                <div className="pipeline__icon"><Boxes /></div>
                <span className="pipeline__label">Perceive</span>
                <h3>What is happening?</h3>
                <p>Identify the sound events present and establish semantic scene context.</p>
              </div>
              <div className="pipeline__connector pipeline__connector--context" aria-hidden="true">
                <span /><small>generated context</small><ArrowRight />
              </div>
              <div className="pipeline__step pipeline__step--layer-two">
                <div className="pipeline__tag">Layer 2</div>
                <div className="pipeline__icon"><Network /></div>
                <span className="pipeline__label">Reason</span>
                <h3>When, where, and next?</h3>
                <p>Answer one of six spatial, temporal, or action-oriented questions.</p>
              </div>
            </div>

            <div className="task-note">
              <TimerReset size={18} />
              <p>
                During inference, the generated Layer 1 response is incorporated into the Layer 2
                conversation context, enabling evaluation of higher-level reasoning and upstream error propagation.
              </p>
            </div>

            <div className="categories-header">
              <div>
                <span className="mini-label">Layer 2 taxonomy</span>
                <h3>Six dimensions of embodied audio reasoning</h3>
              </div>
              <p>From quantities and coordinates to risk-aware decisions in the home.</p>
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

            <div className="action-panel">
              <div className="action-panel__content">
                <span className="mini-label mini-label--gold">Smart-home reasoning</span>
                <h3>Action Prediction closes the loop.</h3>
                <p>
                  Models must identify relevant events, assess risk and spatial context, and select
                  an appropriate response rather than treating action as a separate task.
                </p>
              </div>
              <div className="response-scale" aria-label="Action prediction response levels">
                <div className="response-scale__item response-scale__item--monitor">
                  <span>01</span><div><strong>Monitor</strong><small>Continue observing</small></div>
                </div>
                <div className="response-scale__line" />
                <div className="response-scale__item response-scale__item--notify">
                  <span>02</span><div><strong>Notify</strong><small>Non-emergency update</small></div>
                </div>
                <div className="response-scale__line" />
                <div className="response-scale__item response-scale__item--urgent">
                  <span>03</span><div><strong>Alert</strong><small>Urgent response</small></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="evaluation section" id="evaluation">
          <div className="container evaluation__layout">
            <div className="evaluation__intro">
              <SectionHeading
                eyebrow="Evaluation"
                title="Measure every step from hearing to reasoning."
                description="EARS reports perception, reasoning, hierarchical, and end-to-end performance rather than reducing capability to a single score."
              />
              <div className="evaluation-orbit" aria-hidden="true">
                <div className="evaluation-orbit__center">EARS</div>
                {metrics.map((metric, index) => (
                  <span key={metric.short} style={{ "--orbit-index": index } as React.CSSProperties}>{metric.short}</span>
                ))}
              </div>
            </div>
            <div className="metrics-list">
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
            <div className="resources__header">
              <SectionHeading
                eyebrow="Participant resources"
                title="Everything you need to take part."
                description="The challenge is being prepared. Official participation materials will be released here as they become available."
              />
              <div className="status-pill"><span /> Preparation in progress</div>
            </div>
            <div className="resources-grid">
              {resources.map(({ title, description, icon: Icon }) => (
                <article className="resource-card" key={title}>
                  <div className="resource-card__icon"><Icon /></div>
                  <div className="coming-soon"><CalendarClock size={14} /> Coming soon</div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>

            <div className="format-panel">
              <div>
                <span className="mini-label">Answer format</span>
                <h3>Generative multiple-choice QA</h3>
                <p>
                  During training, models generate both the answer option and its corresponding
                  textual content using a causal language-modeling objective.
                </p>
              </div>
              <div className="answer-window" aria-label="Illustrative answer format">
                <div className="answer-window__bar"><i /><i /><i /><span>sample response</span></div>
                <div className="answer-window__body">
                  <span className="answer-prompt">assistant</span>
                  <p><strong>Option C.</strong> The alarm is behind and to the left of the listener.</p>
                  <div className="answer-cursor" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="timeline section" id="timeline">
          <div className="container">
            <SectionHeading
              eyebrow="Challenge timeline"
              title="The EARS schedule is taking shape."
              description="Exact dates will be announced once the official challenge calendar is finalized."
            />
            <div className="timeline-track">
              {[
                ["01", "Registration opens", "TBA"],
                ["02", "Data & baseline release", "TBA"],
                ["03", "Evaluation & submission", "TBA"],
                ["04", "Results announced", "TBA"],
              ].map(([number, label, date], index) => (
                <div className="timeline-item" key={label}>
                  <div className="timeline-item__marker"><span>{number}</span></div>
                  {index < 3 && <div className="timeline-item__line" />}
                  <div className="timeline-item__content">
                    <span>{date}</span><h3>{label}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="organizer-card">
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
