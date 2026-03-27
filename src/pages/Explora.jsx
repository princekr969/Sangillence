import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Navbar, Footer } from "../components";
import Animation from "../components/explora/Animation";

// ─── DESIGN TOKENS ──────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --navy:      #050A18;
    --ink:       #080E1E;
    --panel:     #0C1526;
    --card:      #0F1A30;
    --card-alt:  #111f38;
    --blue:      #3B82F6;
    --blue-deep: #1D4ED8;
    --teal:      #14B8A6;
    --amber:     #F59E0B;
    --ember:     #F97316;
    --green:     #22C55E;
    --purple:    #8B5CF6;
    --text:      #E2E8F0;
    --muted:     #64748B;
    --border:    rgba(255,255,255,0.06);
    --border-hi: rgba(59,130,246,0.25);
    --font-serif:  'Playfair Display', Georgia, serif;
    --font-body:   'Plus Jakarta Sans', sans-serif;
    --font-mono:   'JetBrains Mono', monospace;
    --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  }

  html { scroll-behavior: smooth; }

  .explora-page {
    background: var(--navy);
    color: var(--text);
    font-family: var(--font-body);
    overflow-x: hidden;
  }

  .explora-page *, .explora-page *::before, .explora-page *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--navy); }
  ::-webkit-scrollbar-thumb { background: var(--blue); border-radius: 2px; }

  ::selection { background: rgba(59,130,246,0.28); color: #fff; }

  /* ─── Video hero ─── */
  .video-hero {
    position: relative;
    height: 100svh;
    width: 100%;
    overflow: hidden;
    background: #000;
  }
  .video-hero video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .video-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.55); }
  .video-hero-content { position: relative; z-index: 10; height: 100%; display: flex; align-items: center; justify-content: center; }

  @keyframes logoExpand {
    0%   { opacity: 0; transform: scale(0.78); filter: blur(12px); }
    60%  { opacity: 1; filter: blur(0); }
    100% { opacity: 1; transform: scale(1); filter: blur(0); }
  }
  @keyframes logoGlow {
    0%, 100% { filter: drop-shadow(0 0 0px rgba(59,130,246,0)); }
    50%       { filter: drop-shadow(0 0 36px rgba(59,130,246,0.5)); }
  }
  .explora-logo-expand {
    animation: logoExpand 1.4s cubic-bezier(0.16, 1, 0.3, 1) both,
               logoGlow 3s ease-in-out 1.6s infinite;
  }

  @keyframes scrollBob {
    0%, 100% { transform: translateY(0); opacity: 0.6; }
    50%       { transform: translateY(7px); opacity: 1; }
  }
  .scroll-cue { animation: scrollBob 2.2s ease-in-out infinite; }

  /* Grain texture overlay */
  .noise::after {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: overlay;
    opacity: 0.35;
  }

  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
    will-change: transform;
  }

  /* Fine grid overlay */
  .grid-bg {
    background-image:
      linear-gradient(rgba(59,130,246,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59,130,246,0.035) 1px, transparent 1px);
    background-size: 72px 72px;
  }

  /* Tag / pill component */
  .tag {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 13px;
    border-radius: 100px;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-family: var(--font-body);
  }

  /* Form inputs */
  .form-input {
    width: 100%;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 13px 15px;
    color: #E2E8F0;
    font-family: var(--font-body);
    font-size: 0.88rem;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    outline: none;
  }
  .form-input:focus {
    border-color: rgba(59,130,246,0.55);
    box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
    background: rgba(59,130,246,0.03);
  }
  .form-input option { background: #111f38; }
  .form-input::placeholder { color: #334155; }

  /* Card hover lift */
  .lift {
    transition: transform 0.24s var(--ease-out), box-shadow 0.24s var(--ease-out);
    will-change: transform;
  }
  .lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(59,130,246,0.12);
  }

  /* Pulse dot */
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.45; transform: scale(1.5); }
  }
  .pulse-dot { animation: pulse 2.2s ease-in-out infinite; }

  /* Typewriter cursor */
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  .cursor {
    display: inline-block;
    width: 2px;
    height: 0.85em;
    background: var(--teal);
    margin-left: 3px;
    vertical-align: middle;
    border-radius: 2px;
    animation: blink 1.1s ease-in-out infinite;
  }

  /* Section headings */
  .section-title {
    font-family: var(--font-serif);
    font-weight: 800;
    color: #F1F5F9;
    letter-spacing: -0.01em;
    line-height: 1.2;
  }

  /* Serif italic accent */
  .serif-italic {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 700;
  }

  /* FAQ styles */
  .faq-item { border-bottom: 1px solid rgba(255,255,255,0.05); }
  .faq-trigger {
    width: 100%;
    background: none;
    border: none;
    text-align: left;
    padding: 22px 0;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 18px;
    color: #CBD5E1;
    font-size: 0.93rem;
    font-weight: 600;
    font-family: var(--font-body);
    line-height: 1.5;
    transition: color 0.2s;
  }
  .faq-trigger:hover { color: #fff; }
  .faq-chevron {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    color: #475569;
    transition: transform 0.28s var(--ease-out), color 0.2s;
  }
  .faq-chevron.open { transform: rotate(180deg); color: var(--teal); }
  .faq-body { overflow: hidden; }
  .faq-body-inner {
    padding: 0 0 22px 0;
    color: #475569;
    font-size: 0.86rem;
    line-height: 1.8;
    font-family: var(--font-body);
    font-weight: 400;
  }

  /* Avatar */
  .avatar-initials {
    width: 54px;
    height: 54px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 1rem;
    flex-shrink: 0;
    font-family: var(--font-serif);
  }

  /* Scroll progress bar */
  .scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--teal), var(--blue), var(--purple));
    z-index: 9998;
    transform-origin: left;
  }

  /* Hero highlight underline */
  .hero-highlight {
    position: relative;
    display: inline-block;
    color: var(--teal);
  }
  .hero-highlight::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--teal);
    opacity: 0.4;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.7s var(--ease-out);
  }
  .hero-highlight.reveal::after { transform: scaleX(1); }

  /* Domain pills float animations */
  @keyframes float1 { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-7px) rotate(1deg)} }
  @keyframes float2 { 0%,100%{transform:translateY(0) rotate(1deg)} 50%{transform:translateY(-5px) rotate(-1deg)} }
  @keyframes float3 { 0%,100%{transform:translateY(0) rotate(-0.5deg)} 50%{transform:translateY(-9px) rotate(0.5deg)} }

  /* Urgency ring */
  @keyframes urgencePulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.35); }
    50%      { box-shadow: 0 0 0 10px rgba(249,115,22,0); }
  }
  .urgency-pulse { animation: urgencePulse 2.2s ease-in-out infinite; }

  /* Step connector line */
  .step-connector {
    position: absolute;
    left: 21px;
    top: 22px;
    bottom: 42px;
    width: 2px;
    background: linear-gradient(to bottom, var(--teal) 0%, rgba(59,130,246,0.3) 60%, transparent 100%);
  }

  /* Divider */
  .section-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
    margin: 0 24px;
  }

  /* Domain icon badge */
  .domain-icon-badge {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  /* Testimonial card shimmer */
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  /* Mono label */
  .mono-label {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.05em;
    color: var(--muted);
  }

  /* Progress track */
  .progress-track {
    width: 100%;
    height: 3px;
    background: rgba(255,255,255,0.06);
    border-radius: 10px;
    overflow: hidden;
    position: relative;
  }
  .progress-fill {
    height: 100%;
    border-radius: 10px;
    background: linear-gradient(90deg, var(--teal), var(--blue));
    position: absolute;
    left: 0;
    top: 0;
    transition: width 1.4s var(--ease-out);
  }

  /* Domain session preview card hover */
  .session-card {
    transition: all 0.24s var(--ease-out);
    cursor: default;
  }
  .session-card:hover {
    transform: translateY(-3px) scale(1.01);
    border-color: rgba(59,130,246,0.22) !important;
    background: rgba(59,130,246,0.04) !important;
  }
  .session-card:hover .session-card-icon {
    transform: scale(1.1);
  }
  .session-card-icon { transition: transform 0.2s; }

  @media (max-width: 768px) {
    .responsive-grid-2 { grid-template-columns: 1fr !important; }
    .responsive-grid-3 { grid-template-columns: 1fr !important; }
    .hero-domain-pills { display: none !important; }
    .responsive-grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
  }
`;




// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] } }
};
const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45 } }
};
const stagger = (delay = 0.07) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: delay } }
});

// ─── IN-VIEW WRAPPER ─────────────────────────────────────────────────────────
function InView({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── SCROLL PROGRESS BAR ──────────────────────────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />;
}

// ─── TYPEWRITER HOOK ──────────────────────────────────────────────────────────
function useTypewriter(texts, speed = 58, pause = 1900) {
  const [display, setDisplay] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = texts[textIdx];
    let timeout;
    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => { setDisplay(current.slice(0, charIdx)); setCharIdx(i => i + 1); }, charIdx === current.length ? pause : speed);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => { setDisplay(current.slice(0, charIdx)); setCharIdx(i => i - 1); }, speed / 2);
    }
    if (!deleting && charIdx > current.length) setDeleting(true);
    if (deleting && charIdx < 0) { setDeleting(false); setCharIdx(0); setTextIdx(i => (i + 1) % texts.length); }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed, pause]);
  return display;
}

// ─── COUNT-UP ────────────────────────────────────────────────────────────────
function CountUp({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(target, 10);
    if (isNaN(num)) { setCount(target); return; }
    let start = 0;
    const step = Math.ceil(num / (1400 / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y    = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const rotatingTexts = [
    "Web Development",
    "Artificial Intelligence",
    "Cloud & DevOps",
    "Cybersecurity",
    "App Development",
    "Data Science",
  ];
  const typed = useTypewriter(rotatingTexts, 52, 2100);

  const pills = [
    { label: "AI/ML",    x: "7%",  top: "24%", anim: "float1 3.8s ease-in-out infinite" },
    { label: "Cloud",    x: "83%", top: "26%", anim: "float2 4.2s ease-in-out infinite 0.5s" },
    { label: "Web Dev",  x: "4%",  top: "63%", anim: "float3 3.5s ease-in-out infinite 1s" },
    { label: "DevOps",   x: "85%", top: "67%", anim: "float1 4.5s ease-in-out infinite 0.3s" },
    { label: "Security", x: "91%", top: "46%", anim: "float2 3.9s ease-in-out infinite 0.8s" },
    { label: "AppDev",   x: "2%",  top: "43%", anim: "float3 4.1s ease-in-out infinite 0.6s" },
  ];

  const [highlightReady, setHighlightReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHighlightReady(true), 1400); return () => clearTimeout(t); }, []);

  return (
    <section ref={ref} style={{ position: "relative", minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <Animation />

      {/* Floating pills */}
      <div className="hero-domain-pills" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5 }}>
        {pills.map((p, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.75, y: 10 }}
            animate={{ opacity: 0.85, scale: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute", left: p.x, top: p.top,
              padding: "6px 14px", borderRadius: 100,
              background: "rgba(15, 26, 48, 0.8)",
              border: "1px solid rgba(59,130,246,0.2)",
              backdropFilter: "blur(8px)",
              color: "#93C5FD", fontSize: "0.68rem", fontWeight: 700,
              fontFamily: "var(--font-body)", letterSpacing: "0.06em", textTransform: "uppercase",
              animation: p.anim, whiteSpace: "nowrap",
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)"
            }}>
            {p.label}
          </motion.div>
        ))}
      </div>

      {/* Atmospheric orbs */}
      <div className="orb" style={{ width: 700, height: 700, top: -200, left: "50%", transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 65%)" }} />
      <div className="orb" style={{ width: 400, height: 400, bottom: -60, left: "5%", background: "radial-gradient(circle, rgba(20,184,166,0.07) 0%, transparent 65%)" }} />
      <div className="orb" style={{ width: 280, height: 280, bottom: 80, right: "8%", background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 65%)" }} />
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 30%, var(--navy) 100%)" }} />

      <motion.div style={{ y, opacity: fade, position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px", maxWidth: 900, margin: "0 auto" }}>

        {/* Status badge */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 32, padding: "8px 16px 8px 10px", borderRadius: 100, background: "rgba(15,26,48,0.9)", border: "1px solid rgba(59,130,246,0.2)", backdropFilter: "blur(12px)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 100, background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22C55E", display: "inline-block" }} className="pulse-dot" />
            <span style={{ color: "#86EFAC", fontSize: "0.65rem", fontWeight: 700, fontFamily: "var(--font-body)", letterSpacing: "0.08em" }}>ENROLLING</span>
          </span>
          <span style={{ color: "#64748B", fontSize: "0.72rem", fontFamily: "var(--font-body)", fontWeight: 500 }}>May 2026 Pilot · Gwalior Region</span>
        </motion.div>

        {/* Domain typewriter */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          style={{ marginBottom: 20, minHeight: "1.8rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <span style={{ color: "#334155", fontSize: "0.72rem", fontFamily: "var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Explore →</span>
          <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)", color: "var(--teal)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{typed}</span>
          <span className="cursor" />
        </motion.div>

        {/* Main heading — Playfair Display serif for academic prestige */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 900,
            fontSize: "clamp(2.6rem, 6.2vw, 5rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "#56a1edff",
            marginBottom: 24,
          }}>
          Clarity
          <br />
          <span style={{ fontStyle: "italic", color: "var(--teal)" }}>to.</span>{" "}
          <span style={{ color: "#3B82F6" }}>Capability</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.28 }}
          style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "clamp(1rem, 1.8vw, 1.13rem)", color: "#94A3B8", maxWidth: 580, margin: "0 auto 12px", lineHeight: 1.85 }}>
          A structured journey to{" "}
          <span className={`hero-highlight ${highlightReady ? "reveal" : ""}`}>discover your path</span>,
          {" "}build real skills, and unlock your first opportunity in technology.
        </motion.p>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          style={{ color: "#FB923C", fontSize: "0.78rem", fontWeight: 600, marginBottom: 44, letterSpacing: "0.06em", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
          Not a course. Not a test. A system to figure out your future.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#register" style={{
            background: "linear-gradient(135deg, #2563EB, #1D4ED8)", color: "#fff", padding: "15px 34px", borderRadius: 10,
            fontWeight: 700, fontFamily: "var(--font-body)", fontSize: "0.92rem", textDecoration: "none",
            boxShadow: "0 4px 20px rgba(37,99,235,0.38), inset 0 1px 0 rgba(255,255,255,0.12)",
            transition: "all 0.22s var(--ease-out)", display: "inline-block", letterSpacing: "0.02em"
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(37,99,235,0.5), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,99,235,0.38), inset 0 1px 0 rgba(255,255,255,0.12)"; }}>
            Apply for May 2026 Cohort →
          </a>
          <a href="#how" style={{
            border: "1px solid rgba(255,255,255,0.12)", color: "#94A3B8",
            padding: "15px 28px", borderRadius: 10, fontWeight: 500, fontFamily: "var(--font-body)",
            fontSize: "0.92rem", textDecoration: "none", transition: "all 0.2s",
            background: "rgba(255,255,255,0.03)", backdropFilter: "blur(8px)"
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; e.currentTarget.style.color = "#E2E8F0"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#94A3B8"; }}>
            How It Works ↓
          </a>
        </motion.div>

        {/* Urgency badge */}
        <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.58, type: "spring" }}
          style={{ marginTop: 34, display: "inline-flex", alignItems: "center", gap: 10 }}>
          <div className="urgency-pulse" style={{ padding: "8px 18px", borderRadius: 100, background: "rgba(249,115,22,0.07)", border: "1px solid rgba(249,115,22,0.22)", display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#F97316", display: "inline-block" }} className="pulse-dot" />
            <span style={{ color: "#FB923C", fontSize: "0.72rem", fontWeight: 700, fontFamily: "var(--font-body)", letterSpacing: "0.04em" }}>
              Only 50 seats · Gwalior region only
            </span>
          </div>
        </motion.div>
      </motion.div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to bottom, transparent, var(--navy))" }} />
    </section>
  );
}

// ─── STATS BAR ────────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { n: "20",  suffix: "",  label: "Live Sessions",     icon: "🎬", color: "#3B82F6" },
    { n: "7",   suffix: "+", label: "IT Domains",        icon: "🗂️", color: "#14B8A6" },
    { n: "50",  suffix: "",  label: "Max Batch Size",    icon: "👥", color: "#8B5CF6" },
    { n: "100", suffix: "%", label: "Full refund if no internship",  icon: "🛡️", color: "#22C55E" },
  ];
  return (
    <InView>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0,
        background: "var(--card)", borderRadius: 14, overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.3)"
      }} className="responsive-grid-4">
        {stats.map((s, i) => (
          <div key={i} style={{
            padding: "28px 20px", textAlign: "center",
            borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
            position: "relative", overflow: "hidden"
          }}>
            <div style={{ fontSize: "1.4rem", marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontFamily: "var(--font-serif)", fontWeight: 900, fontSize: "2.2rem", lineHeight: 1, color: s.color, marginBottom: 5 }}>
              <CountUp target={s.n} suffix={s.suffix} />
            </div>
            <div style={{ color: "#475569", fontSize: "0.72rem", fontFamily: "var(--font-body)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </InView>
  );
}

// ─── DOMAIN SESSIONS PREVIEW ─────────────────────────────────────────────────
function DomainPreview() {
  const domains = [
    { icon: "🤖", name: "Artificial Intelligence", sub: "ML, Deep Learning, NLP", color: "#3B82F6", bg: "rgba(59,130,246,0.08)" },
    { icon: "🌐", name: "Web Development",         sub: "Frontend, Backend, Full-Stack", color: "#14B8A6", bg: "rgba(20,184,166,0.08)" },
    { icon: "☁️", name: "Cloud & DevOps",           sub: "AWS, Docker, CI/CD", color: "#8B5CF6", bg: "rgba(139,92,246,0.08)" },
    { icon: "🔐", name: "Cybersecurity",            sub: "Ethical Hacking, Network Sec", color: "#EF4444", bg: "rgba(239,68,68,0.07)" },
    { icon: "📱", name: "App Development",          sub: "Android, iOS, React Native", color: "#F59E0B", bg: "rgba(245,158,11,0.08)" },
    { icon: "📊", name: "Data Science",             sub: "Analytics, Visualization, SQL", color: "#22C55E", bg: "rgba(34,197,94,0.07)" },
    { icon: "🎮", name: "Game Development",         sub: "Unity, Unreal, Design Thinking", color: "#F97316", bg: "rgba(249,115,22,0.07)" },
  ];

  return (
    <section style={{ padding: "0 24px 88px", maxWidth: 1060, margin: "0 auto" }}>
      <InView>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div>
            <p className="mono-label" style={{ marginBottom: 5, color: "#FB923C", }}> 20 live sessions across</p>
            <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 800, fontSize: "1.3rem", color: "#E2E8F0" }}>
              7+ IT Domains You'll <span style={{ fontStyle: "italic", color: "var(--teal)" }}>Explore</span>
            </h3>
          </div>
          <span className="tag" style={{ background: "rgba(20,184,166,0.07)", border: "1px solid rgba(20,184,166,0.18)", color: "#5EEAD4", whiteSpace: "nowrap" }}>
            Live · Not Pre-recorded
          </span>
        </div>
      </InView>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.065)}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
        {domains.map((d, i) => (
          <motion.div key={i} variants={fadeUp} className="session-card"
            style={{ background: d.bg, border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: "18px 16px", display: "flex", alignItems: "center", gap: 13 }}>
            <span className="session-card-icon" style={{ fontSize: "1.5rem" }}>{d.icon}</span>
            <div>
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.84rem", color: d.color, marginBottom: 2, lineHeight: 1.3 }}>{d.name}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "#475569", lineHeight: 1.4 }}>{d.sub}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── PROBLEM SECTION ──────────────────────────────────────────────────────────
function Problem() {
  const problems = [
    { text: "Confused about whether to go into AI, Web Dev, App Dev, or something else entirely", icon: "🤔" },
    { text: "Watched hours of tutorials but still don't know where to actually start", icon: "📺" },
    { text: "Chose your branch due to peer pressure or college cutoff — not because you understood it", icon: "📉" },
    { text: "Learning something new every week but have nothing concrete to show for it", icon: "🔄" },
    { text: "Wondering if you're already behind everyone else", icon: "⏰" },
  ];

  return (
    <section style={{ padding: "96px 24px", maxWidth: 840, margin: "0 auto" }}>
      <InView>
        <span className="tag" style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.16)", color: "#FCA5A5", marginBottom: 16, display: "inline-flex" }}>
          The Problem
        </span>
        <h2 className="section-title" style={{ fontSize: "clamp(1.6rem, 3.6vw, 2.4rem)", marginBottom: 8 }}>
          Do any of these sound familiar?
        </h2>
        <p style={{ color: "#475569", fontSize: "0.88rem", marginBottom: 40, lineHeight: 1.7, fontFamily: "var(--font-body)", fontWeight: 400, maxWidth: 520 }}>
          These are the most common struggles we hear from students in Class 11, 12, and first-year college.
        </p>
      </InView>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.075)}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {problems.map((p, i) => (
          <motion.div key={i} variants={fadeUp}
            style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "16px 20px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.04)", background: "rgba(255,255,255,0.015)", cursor: "default" }}
            whileHover={{ background: "rgba(59,130,246,0.04)", borderColor: "rgba(59,130,246,0.15)", x: 4 }}>
            <span style={{ fontSize: "1.2rem", flexShrink: 0, marginTop: 1 }}>{p.icon}</span>
            <p style={{ color: "#94A3B8", fontSize: "0.92rem", lineHeight: 1.7, margin: 0, fontFamily: "var(--font-body)", fontWeight: 400 }}>{p.text}</p>
          </motion.div>
        ))}
      </motion.div>

      <InView delay={0.1}>
        <div style={{ marginTop: 36, padding: "22px 26px", borderLeft: "2px solid var(--teal)", background: "rgba(20,184,166,0.04)", borderRadius: "0 10px 10px 0", display: "flex", gap: 14, alignItems: "flex-start" }}>
          <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>💡</span>
          <p style={{ fontSize: "0.95rem", fontFamily: "var(--font-body)", fontWeight: 500, color: "#CBD5E1", lineHeight: 1.7, margin: 0 }}>
            The issue isn't your ability — it's the lack of a clear starting point.{" "}
            <span style={{ fontWeight: 400, color: "#475569" }}>Explora was designed to fix exactly that.</span>
          </p>
        </div>
      </InView>
    </section>
  );
}

// ─── WHAT IS EXPLORA ──────────────────────────────────────────────────────────
function WhatIs() {
  const pillars = [
    { icon: "🔍", title: "Explore",  desc: "Attend 20 live domain sessions across AI/ML, Web Dev, Cloud, Cybersecurity and more. Real exposure, not just overviews.", color: "#3B82F6", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.16)" },
    { icon: "📊", title: "Assess",   desc: "A short structured Psychomatrix assessment after each session maps your interests, thinking style, and strengths to build your profile.", color: "#14B8A6", bg: "rgba(20,184,166,0.07)", border: "rgba(20,184,166,0.16)" },
    { icon: "🛠️", title: "Build",    desc: "Receive a personalised roadmap, complete a solo project, collaborate on a group project, and qualify for an internship.", color: "#8B5CF6", bg: "rgba(139,92,246,0.07)", border: "rgba(139,92,246,0.16)" },
  ];

  return (
    <section style={{ padding: "88px 24px", background: "var(--ink)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64, marginBottom: 56, alignItems: "start" }} className="responsive-grid-2">
          <InView>
            <span className="tag" style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.18)", color: "#93C5FD", marginBottom: 18, display: "inline-flex" }}>
              What Is Explora
            </span>
            <h2 className="section-title" style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.3rem)", marginBottom: 16 }}>
              A structured self-exploration programme for IT students.
            </h2>
            <p className="mono-label">// Gwalior region · May 2026 cohort</p>
          </InView>
          <InView delay={0.1}>
            <p style={{ color: "#94A3B8", lineHeight: 1.9, fontSize: "0.95rem", marginBottom: 18, fontFamily: "var(--font-body)", fontWeight: 400 }}>
              Explora is a guided programme that combines live domain sessions, structured self-assessment, and personalised learning paths — so you don't waste months going in the wrong direction.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.8, fontSize: "0.86rem", fontFamily: "var(--font-body)", paddingLeft: 16, borderLeft: "2px solid rgba(255,255,255,0.07)" }}>
              Inspired by exploration-first learning models used at institutions like <strong style={{ color: "#64748B" }}>Stanford and Oxford</strong>, Explora doesn't just tell you what you might be good at. It gives you the structure to prove it.
            </p>
          </InView>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.1)}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="responsive-grid-3">
          {pillars.map((p, i) => (
            <motion.div key={i} variants={fadeUp} className="lift"
              style={{ background: p.bg, padding: "28px 24px", borderRadius: 14, border: `1px solid ${p.border}`, cursor: "default", position: "relative", overflow: "hidden" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", marginBottom: 16 }}>{p.icon}</div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 800, fontSize: "1.2rem", marginBottom: 10, color: p.color, fontStyle: "italic" }}>{p.title}</h3>
              <p style={{ color: "#64748B", lineHeight: 1.72, fontSize: "0.85rem", margin: 0, fontFamily: "var(--font-body)", fontWeight: 400 }}>{p.desc}</p>
              <div style={{ position: "absolute", bottom: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: `radial-gradient(circle, ${p.color}22, transparent 70%)`, pointerEvents: "none" }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { title: "Attend Domain Sessions",    desc: "20 live classes covering Web Dev, AI/ML, Cloud, Cybersecurity and more. Each session is a focused introduction to a real field.", output: "Exposure to 7+ IT domains", special: false, icon: "🎬" },
    { title: "Complete Assessments",      desc: "Answer a short structured questionnaire after each session about what interested you and what you'd want to build in that domain.", output: "Your personal exploration profile", special: false, icon: "📋" },
    { title: "Receive Your Domain Match", desc: "We analyse your responses and recommend the 1–2 domains that align best with your thinking style and interests.", output: "Personalised domain recommendation", special: false, icon: "🎯" },
    { title: "Follow Your Roadmap",       desc: "Get a structured learning path with clear milestones, curated resources, and progress checkpoints for your matched domain.", output: "Clear, timestamped learning plan", special: false, icon: "🗺️" },
    { title: "Complete a Solo Project",   desc: "Build a real project in your domain — refined from your own idea during assessment, now properly executed.", output: "Portfolio-ready solo project", special: false, icon: "🛠️" },
    { title: "Join a Group Project",      desc: "Collaborate in a multidisciplinary team, take a defined role, and work on a real problem together.", output: "Team collaboration experience", special: false, icon: "🤝" },
    { title: "Earn Your Internship",      desc: "Complete all milestones and we guarantee an internship pathway. If we cannot place you, you receive a full refund.", output: "Internship placement or full refund", special: true, icon: "🏆" },
  ];

  return (
    <section id="how" style={{ padding: "96px 24px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <InView>
          <div style={{ marginBottom: 56 }}>
            <span className="tag" style={{ background: "rgba(20,184,166,0.07)", border: "1px solid rgba(20,184,166,0.16)", color: "#5EEAD4", marginBottom: 14, display: "inline-flex" }}>
              The Process
            </span>
            <h2 className="section-title" style={{ fontSize: "clamp(1.6rem, 3.6vw, 2.4rem)" }}>
              How the Programme Works
            </h2>
          </div>
        </InView>

        <div style={{ position: "relative" }}>
          <div className="step-connector" />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.08)}
            style={{ display: "flex", flexDirection: "column" }}>
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} style={{ display: "flex", gap: 24, position: "relative", paddingBottom: 28 }}>
                <div style={{ flexShrink: 0, zIndex: 1 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: step.special ? "linear-gradient(135deg, #F97316, #EA580C)" : "var(--card)",
                    border: `2px solid ${step.special ? "#F97316" : "rgba(20,184,166,0.4)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.1rem",
                    boxShadow: step.special ? "0 4px 20px rgba(249,115,22,0.3)" : "none"
                  }}>
                    {step.icon}
                  </div>
                </div>
                <div style={{
                  flex: 1,
                  background: step.special ? "rgba(249,115,22,0.04)" : "var(--card)",
                  border: `1px solid ${step.special ? "rgba(249,115,22,0.2)" : "rgba(255,255,255,0.05)"}`,
                  borderRadius: 12, padding: "20px 24px", marginTop: 2
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                    <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.97rem", color: step.special ? "#FB923C" : "#E2E8F0", lineHeight: 1.3 }}>
                      {step.title}
                    </h3>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "#334155", letterSpacing: "0.05em", flexShrink: 0 }}>
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p style={{ color: "#475569", fontSize: "0.85rem", lineHeight: 1.72, marginBottom: 12, fontFamily: "var(--font-body)", fontWeight: 400 }}>{step.desc}</p>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    fontSize: "0.68rem", fontWeight: 700, padding: "4px 10px", borderRadius: 6,
                    background: step.special ? "rgba(249,115,22,0.09)" : "rgba(20,184,166,0.08)",
                    border: `1px solid ${step.special ? "rgba(249,115,22,0.2)" : "rgba(20,184,166,0.18)"}`,
                    color: step.special ? "#FB923C" : "#5EEAD4",
                    fontFamily: "var(--font-body)", letterSpacing: "0.03em"
                  }}>
                    <span>↳</span> {step.output}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── BENEFITS + GUARANTEE ─────────────────────────────────────────────────────
function BenefitsGuarantee() {
  const benefits = [
    { text: "Guaranteed internship pathway with refund fallback", icon: "🏆" },
    { text: "Domain clarity based on structured assessment data", icon: "🎯" },
    { text: "20 live sessions across 7+ IT domains — not pre-recorded", icon: "🎬" },
    { text: "Personalised learning roadmap with progress tracking", icon: "🗺️" },
    { text: "A real solo project built from your own idea", icon: "🛠️" },
    { text: "Multidisciplinary group project experience", icon: "🤝" },
    { text: "Timestamped milestone record of your full journey", icon: "📊" },
    { text: "Access to a curated network of educators and startups", icon: "🌐" },
  ];

  return (
    <section style={{ padding: "96px 24px", background: "var(--ink)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }} className="responsive-grid-2">
        <div>
          <InView>
            <span className="tag" style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.15)", color: "#86EFAC", marginBottom: 16, display: "inline-flex" }}>
              What You Get
            </span>
            <h2 className="section-title" style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", marginBottom: 32 }}>
              Everything included in one structured track.
            </h2>
          </InView>
          <motion.ul initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.055)}
            style={{ listStyle: "none" }}>
            {benefits.map((b, i) => (
              <motion.li key={i} variants={fadeUp} style={{
                display: "flex", gap: 14, alignItems: "flex-start",
                padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
                color: "#94A3B8", fontSize: "0.88rem", lineHeight: 1.55, fontFamily: "var(--font-body)"
              }}>
                <span style={{ fontSize: "1rem", flexShrink: 0, marginTop: 1 }}>{b.icon}</span>
                {b.text}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <InView delay={0.1}>
          <div style={{ background: "var(--card)", borderRadius: 14, padding: "34px 30px", border: "1px solid rgba(249,115,22,0.14)", position: "relative", overflow: "hidden" }}>
            {/* Glow */}
            <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, background: "radial-gradient(circle, rgba(249,115,22,0.12), transparent 70%)", pointerEvents: "none" }} />
            <span className="tag" style={{ background: "rgba(249,115,22,0.07)", border: "1px solid rgba(249,115,22,0.16)", color: "#FB923C", marginBottom: 20, display: "inline-flex" }}>
              Our Commitment
            </span>
            <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 900, fontSize: "1.4rem", color: "#FB923C", marginBottom: 10, lineHeight: 1.28, fontStyle: "italic" }}>
              Internship Guaranteed — or Full Refund.
            </h3>
            <p style={{ color: "#475569", fontSize: "0.83rem", marginBottom: 24, lineHeight: 1.7, fontFamily: "var(--font-body)" }}>
              Complete all programme requirements and we place you. If we can't, you get your money back.
            </p>
            <p style={{ color: "#64748B", fontSize: "0.72rem", fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: "var(--font-mono)" }}>
              // Requirements to qualify:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 26 }}>
              {[
                "Complete all 20 live sessions",
                "Submit all assessments after each session",
                "Follow your assigned roadmap for 6–12 months",
                "Submit and complete your solo project",
                "Actively participate in the group project",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "#64748B", fontSize: "0.83rem", lineHeight: 1.55, fontFamily: "var(--font-body)" }}>
                  <span style={{ color: "#F97316", fontWeight: 700, flexShrink: 0, fontFamily: "var(--font-mono)", fontSize: "0.75rem", marginTop: 2 }}>{String(i + 1).padStart(2, "0")}.</span>
                  {item}
                </div>
              ))}
            </div>
            <div style={{ padding: "16px 20px", borderRadius: 10, background: "rgba(249,115,22,0.05)", border: "1px solid rgba(249,115,22,0.14)" }}>
              <p style={{ color: "#CBD5E1", fontSize: "0.87rem", lineHeight: 1.65, margin: 0, fontFamily: "var(--font-body)" }}>
                Meet all of the above and we can't place you?{" "}
                <strong style={{ color: "#FB923C" }}>Full refund. No questions asked.</strong>
              </p>
            </div>
          </div>
        </InView>
      </div>
    </section>
  );
}

// ─── WHO IT'S FOR ─────────────────────────────────────────────────────────────
function WhoItsFor() {
  return (
    <section style={{ padding: "88px 24px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <InView>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h2 className="section-title" style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.1rem)", marginBottom: 8 }}>
              Is Explora the Right Fit?
            </h2>
            <p style={{ color: "#475569", fontSize: "0.86rem", fontFamily: "var(--font-body)" }}>Be honest with yourself.</p>
          </div>
        </InView>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="responsive-grid-2">
          <InView delay={0.05}>
            <div style={{ background: "rgba(34,197,94,0.03)", border: "1px solid rgba(34,197,94,0.09)", borderRadius: 14, padding: "26px 24px", height: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(34,197,94,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>✔</div>
                <h3 style={{ fontFamily: "var(--font-body)", color: "#22C55E", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.02em" }}>Explora is for you if:</h3>
              </div>
              {[
                "You're in Class 11, 12, or first-year B.Tech / BCA / BSc CS",
                "You're interested in tech but haven't chosen a track yet",
                "You can commit 6–12 months of consistent, focused effort",
                "You want real project experience, not just video lectures",
              ].map((t, i) => (
                <div key={i} style={{ color: "#94A3B8", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.03)", fontSize: "0.87rem", lineHeight: 1.6, fontFamily: "var(--font-body)", display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: "#22C55E", flexShrink: 0, marginTop: 2 }}>→</span>{t}
                </div>
              ))}
            </div>
          </InView>
          <InView delay={0.1}>
            <div style={{ background: "rgba(239,68,68,0.03)", border: "1px solid rgba(239,68,68,0.08)", borderRadius: 14, padding: "26px 24px", height: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(239,68,68,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>✖</div>
                <h3 style={{ fontFamily: "var(--font-body)", color: "#F87171", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.02em" }}>Explora is not for you if:</h3>
              </div>
              {[
                "You need a quick certificate or one-time workshop",
                "You prefer passive learning without building anything",
                "You're primarily focused on JEE / NEET preparation",
                "You already have a clear domain and internship in progress",
              ].map((t, i) => (
                <div key={i} style={{ color: "#64748B", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.03)", fontSize: "0.87rem", lineHeight: 1.6, fontFamily: "var(--font-body)", display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: "#EF4444", flexShrink: 0, marginTop: 2 }}>✕</span>{t}
                </div>
              ))}
            </div>
          </InView>
        </div>
      </div>
    </section>
  );
}

// ─── COHORT BANNER ────────────────────────────────────────────────────────────
function CohortBanner() {
  const items = [
    { label: "Cohort",        value: "May 2026 Pilot", icon: "📅" },
    { label: "Enrolment Fee", value: "Starting ₹1,000", icon: "💸" },
  ];
  return (
    <InView>
      <div style={{
        background: "linear-gradient(135deg, #1D4ED8 0%, #1e3a6e 60%, #0f1e42 100%)",
        borderRadius: 16, padding: "20px 30px",
        maxWidth: 700, marginLeft: "auto", marginRight: "auto",
        border: "1px solid rgba(59,130,246,0.3)",
        boxShadow: "0 24px 60px rgba(29,78,216,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: "radial-gradient(circle, rgba(255,255,255,0.07), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 20, position: "relative" }}>
          {items.map((item, i) => (
            <div key={i} style={{ borderRight: i < items.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none", paddingRight: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
                <span style={{ fontSize: "0.9rem" }}>{item.icon}</span>
                <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>{item.label}</p>
              </div>
              <p style={{ fontFamily: "var(--font-serif)", fontWeight: 800, fontSize: "1.15rem", color: "#fff" }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </InView>
  );
}

// ─── INSTRUCTORS ──────────────────────────────────────────────────────────────
function Instructors() {
  const instructors = [
    { name: "Instructor Name", domain: "AI/ML & Data Science",      bio: "3 years industry experience at [Company]. Currently building [relevant project] in the ML space.",                         initials: "IN", avatarBg: "linear-gradient(135deg, #1e3a5f, #2563EB)", linkedin: "#", github: null, color: "#3B82F6" },
    { name: "Instructor Name", domain: "Web Development & Frontend", bio: "Worked as a frontend engineer at [Startup]. Has shipped 5+ production projects in React and Next.js.",                  initials: "IN", avatarBg: "linear-gradient(135deg, #1a3a2e, #16a34a)", linkedin: "#", github: "#",  color: "#22C55E" },
    { name: "Instructor Name", domain: "Cloud & DevOps",             bio: "AWS-certified engineer with experience deploying infrastructure at scale. Currently working on [project].",             initials: "IN", avatarBg: "linear-gradient(135deg, #2d1a3e, #7c3aed)", linkedin: "#", github: null, color: "#8B5CF6" },
    { name: "Instructor Name", domain: "Cybersecurity",              bio: "Security analyst at [Organisation]. Holds [relevant certification] and mentors students in ethical hacking.",             initials: "IN", avatarBg: "linear-gradient(135deg, #3a1a1a, #dc2626)", linkedin: "#", github: "#",  color: "#EF4444" },
  ];

  return (
    <section id="instructors" style={{ padding: "96px 24px", background: "var(--ink)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>
        <InView>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 16, flexWrap: "wrap" }}>
            <div>
              <span className="tag" style={{ background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.18)", color: "#C4B5FD", marginBottom: 14, display: "inline-flex" }}>
                Your Instructors
              </span>
              <h2 className="section-title" style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.2rem)", marginBottom: 8 }}>
                Learn from people <span style={{ fontStyle: "italic" }}>in the field.</span>
              </h2>
              <p style={{ color: "#475569", fontSize: "0.86rem", maxWidth: 480, lineHeight: 1.72, fontFamily: "var(--font-body)" }}>
                Every Explora session is led by a practitioner — not a generic tutor. Real work, real decisions, real career paths.
              </p>
            </div>
          </div>
        </InView>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.09)}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
          {instructors.map((inst, i) => (
            <motion.div key={i} variants={fadeUp} className="lift"
              style={{ background: "var(--card)", borderRadius: 14, padding: "28px 24px", border: "1px solid rgba(255,255,255,0.05)", cursor: "default", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 100, height: 100, background: `radial-gradient(circle, ${inst.color}18, transparent 70%)`, pointerEvents: "none" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                <div className="avatar-initials" style={{ background: inst.avatarBg, color: "#fff", letterSpacing: "-0.02em" }}>
                  {inst.initials}
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.93rem", color: "#E2E8F0", marginBottom: 3 }}>{inst.name}</p>
                  <p style={{ fontSize: "0.7rem", color: inst.color, fontWeight: 700, letterSpacing: "0.03em", fontFamily: "var(--font-body)" }}>{inst.domain}</p>
                </div>
              </div>
              <p style={{ color: "#475569", fontSize: "0.82rem", lineHeight: 1.75, marginBottom: 20, fontFamily: "var(--font-body)", fontWeight: 400 }}>{inst.bio}</p>
              <div style={{ display: "flex", gap: 8 }}>
                {inst.linkedin && (
                  <a href={inst.linkedin} target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 11px", borderRadius: 7, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", color: "#94A3B8", fontSize: "0.72rem", fontWeight: 600, textDecoration: "none", transition: "all 0.18s", fontFamily: "var(--font-body)" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.35)"; e.currentTarget.style.color = "#93C5FD"; e.currentTarget.style.background = "rgba(59,130,246,0.07)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#94A3B8"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                )}
                {inst.github && (
                  <a href={inst.github} target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 11px", borderRadius: 7, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", color: "#94A3B8", fontSize: "0.72rem", fontWeight: 600, textDecoration: "none", transition: "all 0.18s", fontFamily: "var(--font-body)" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#E2E8F0"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#94A3B8"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                    GitHub
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-trigger" onClick={() => setOpen(o => !o)}>
        <span>{question}</span>
        <svg className={`faq-chevron ${open ? "open" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div className="faq-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <div className="faq-body-inner" dangerouslySetInnerHTML={{ __html: answer }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQ() {
  const faqs = [
    { question: "What exactly happens after I pay?", answer: "You'll receive a WhatsApp confirmation within 24 hours with your onboarding details, cohort schedule, and a welcome packet. Your first live session starts within the first week of the cohort launch date (May 2026)." },
    { question: "Is this online or in-person?", answer: "The 20 domain sessions are conducted <strong style='color:#5EEAD4'>online via a live video platform</strong> (Zoom or Google Meet — confirmed before cohort start). The group project collaboration is also online. If you're based in Gwalior, occasional in-person check-ins may be organised — but the full programme is accessible remotely." },
    { question: "What if my child misses a class?", answer: "Every live session is recorded. Recordings are available to enrolled students within 24 hours of each class. That said, <strong style='color:#5EEAD4'>attendance is tracked</strong> — completing all 20 sessions (live or recorded) is required to qualify for the internship guarantee." },
    { question: "How is this different from YouTube or Udemy?", answer: "YouTube and Udemy give you content. Explora gives you a <strong style='color:#5EEAD4'>system</strong>. The difference: live sessions with real practitioners, post-session assessments that build your personal profile, a personalised domain recommendation, a structured roadmap, real projects you actually build, and a guaranteed internship pathway." },
    { question: "My child is preparing for boards — can they still join?", answer: "We'll be honest: Class 12 students with heavy board prep schedules may find the time commitment difficult. <strong style='color:#5EEAD4'>Ideal timing is Class 11 or first-year college</strong>, when there's more room to focus." },
    { question: "What if my child doesn't complete the programme?", answer: "Incompletion voids the internship guarantee. For partial completion: <strong style='color:#5EEAD4'>if a student completes fewer than 10 sessions and withdraws within the first month, a 50% refund is issued.</strong> After that point, no refund is available." },
    { question: "Is the internship really guaranteed?", answer: "Yes — with conditions. The guarantee applies only to students who complete all 20 sessions, submit all assessments, follow their assigned roadmap for 6–12 months, complete their solo project, and actively participate in the group project. <strong style='color:#5EEAD4'>If you meet every condition and we still cannot place you, you receive a full refund.</strong>" },
  ];

  return (
    <section id="faq" style={{ padding: "96px 24px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <InView>
          <div style={{ marginBottom: 52 }}>
            <span className="tag" style={{ background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.15)", color: "#FCD34D", marginBottom: 14, display: "inline-flex" }}>
              FAQs
            </span>
            <h2 className="section-title" style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.2rem)", marginBottom: 8 }}>
              Questions parents & students ask us.
            </h2>
          </div>
        </InView>

        <InView delay={0.06}>
          <div style={{ background: "var(--card)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.05)", padding: "6px 30px 6px" }}>
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </InView>

        <InView delay={0.1}>
          <div style={{ marginTop: 24, textAlign: "center", padding: "20px 24px", borderRadius: 10, background: "rgba(20,184,166,0.04)", border: "1px solid rgba(20,184,166,0.1)" }}>
            <p style={{ color: "#475569", fontSize: "0.83rem", marginBottom: 5, fontFamily: "var(--font-body)" }}>Still have a question?</p>
            <p style={{ color: "#5EEAD4", fontSize: "0.87rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>
              Email us directly — we respond within a few hours. Number shared on registration.
            </p>
          </div>
        </InView>
      </div>
    </section>
  );
}

// ─── REGISTRATION FORM ────────────────────────────────────────────────────────
function Register() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <section id="register" style={{ padding: "96px 24px", background: "var(--ink)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <InView>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 className="section-title" style={{ fontSize: "clamp(1.7rem, 3.6vw, 2.4rem)", marginBottom: 10 }}>
              Don't choose your career
              <br /><span style={{ fontStyle: "italic", color: "var(--teal)" }}>path blindly.</span>
            </h2>
            <p style={{ color: "#475569", fontSize: "0.87rem", fontFamily: "var(--font-body)" }}>
              Explore the options. Identify your strengths. Build with a plan.
            </p>
          </div>
        </InView>

        <InView delay={0.08}>
          <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", padding: "40px 38px", boxShadow: "0 40px 80px rgba(0,0,0,0.35)", position: "relative", overflow: "hidden" }}>
            {/* Corner glow */}
            <div style={{ position: "absolute", top: -50, left: -50, width: 180, height: 180, background: "radial-gradient(circle, rgba(59,130,246,0.09), transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -50, right: -50, width: 180, height: 180, background: "radial-gradient(circle, rgba(20,184,166,0.07), transparent 70%)", pointerEvents: "none" }} />

            <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 800, fontSize: "1.15rem", textAlign: "center", marginBottom: 30, color: "#E2E8F0", position: "relative" }}>
              Register for the May 2026 Cohort
            </h3>

            <AnimatePresence>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: "center", padding: "36px 0", position: "relative" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", margin: "0 auto 18px" }}>✅</div>
                  <h4 style={{ fontFamily: "var(--font-serif)", fontWeight: 800, fontSize: "1.3rem", marginBottom: 10, color: "#22C55E" }}>Registration Received</h4>
                  <p style={{ color: "#475569", lineHeight: 1.75, fontSize: "0.87rem", fontFamily: "var(--font-body)", maxWidth: 340, margin: "0 auto" }}>
                    We'll reach out on WhatsApp within 24 hours to confirm your spot in the May 2026 cohort.
                  </p>
                </motion.div>
              ) : (
                <motion.form initial={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit}
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, position: "relative" }}>
                  {[
                    { label: "Full Name",        type: "text",  placeholder: "Your full name",       req: true },
                    { label: "WhatsApp Number",  type: "tel",   placeholder: "+91 XXXXX XXXXX",      req: true },
                    { label: "City",             type: "text",  placeholder: "Gwalior, Morena, etc.", req: true },
                    { label: "Email (Optional)", type: "email", placeholder: "email@example.com",    req: false },
                  ].map((f, i) => (
                    <div key={i}>
                      <label style={{ display: "block", color: "#475569", fontSize: "0.72rem", marginBottom: 7, fontWeight: 700, fontFamily: "var(--font-body)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        {f.label}
                      </label>
                      <input type={f.type} placeholder={f.placeholder} className="form-input" required={f.req} />
                    </div>
                  ))}

                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ display: "block", color: "#475569", fontSize: "0.72rem", marginBottom: 7, fontWeight: 700, fontFamily: "var(--font-body)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                      Current Class / Year
                    </label>
                    <select className="form-input">
                      <option>Class 11</option>
                      <option>Class 12</option>
                      <option>1st Year College (B.Tech / BCA / BSc CS)</option>
                    </select>
                  </div>

                  <button type="submit" style={{
                    gridColumn: "1 / -1",
                    background: "linear-gradient(135deg, #2563EB, #1D4ED8)", color: "#fff",
                    border: "none", borderRadius: 10, padding: "15px 0",
                    fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.96rem", cursor: "pointer",
                    transition: "all 0.22s", boxShadow: "0 6px 20px rgba(37,99,235,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                    letterSpacing: "0.02em", marginTop: 4
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(37,99,235,0.42)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 6px 20px rgba(37,99,235,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"; }}>
                    Submit Registration →
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </InView>
      </div>
    </section>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function Explora() {
  return (
    <>
      <style>{css}</style>
      <ScrollProgressBar />

      <div style={{ background: "#020B1A", marginBottom: "-20px" }}>
        <Navbar />
      </div>
      
      <div className="explora-page noise">
        <Hero />

        <div style={{ padding: "0 24px", maxWidth: 920, margin: "0 auto", transform: "translateY(-28px)" }}>
          <StatsBar />
        </div>

        <div className="section-divider" style={{ margin: "0 24px 56px" }} />

        <DomainPreview />

        <div className="section-divider" />

        <Problem />

        <div className="section-divider" />

        <WhatIs />

        <div className="section-divider" />

        <HowItWorks />

        <div className="section-divider" />

        <BenefitsGuarantee />

        <div className="section-divider" />

        <WhoItsFor />

        <div style={{ padding: "0 24px", marginBottom: 96 }}>
          <CohortBanner />
        </div>

        <div className="section-divider" />

        <Instructors />

        <div className="section-divider" />

        <FAQ />

        <div className="section-divider" />

        <Register />
      </div>

      <Footer />
    </>
  );
}