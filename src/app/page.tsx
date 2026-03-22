"use client";

import { useRef, useState, useCallback, useEffect, memo, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Scene3DLoader from "@/components/myUI/Scene3DLoader";
import { useScrollProgress } from "@/hooks/useScrollProgress";

/* ───── Fade-in section wrapper ───── */
function Section({
  id,
  children,
  className = "",
  ariaLabel,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });

  return (
    <section
      id={id}
      ref={ref}
      aria-label={ariaLabel}
      className={`relative flex min-h-screen items-center px-5 sm:px-8 md:px-20 lg:px-32 ${className}`}
    >
      {/* Background contrast overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,10,8,0.6)_0%,transparent_70%)]" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full"
      >
        {children}
      </motion.div>
    </section>
  );
}

/* ───── Small reusable label with decorative line ───── */
const SectionLabel = memo(function SectionLabel({ text, index }: { text: string; index?: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      {index && (
        <span className="text-[10px] font-light text-[#4fc3f7]/30">{index}</span>
      )}
      <div className="h-px w-8 bg-[#4fc3f7]/30" />
      <p className="text-[10px] font-medium tracking-[0.4em] text-[#4fc3f7]/80 uppercase">
        {text}
      </p>
    </div>
  );
});

/* ───── Section divider ───── */
const SectionDivider = memo(function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="h-px w-16 bg-linear-to-r from-transparent via-[#7c4dff]/10 to-[#4fc3f7]/20" />
      <div className="mx-3 h-1 w-1 rounded-full bg-linear-to-br from-[#4fc3f7]/30 to-[#7c4dff]/20" />
      <div className="h-px w-16 bg-linear-to-l from-transparent via-[#7c4dff]/10 to-[#4fc3f7]/20" />
    </div>
  );
});

/* ───── Rotating text effect ───── */
const ROLE_TEXTS = ["FRONTEND ENGINEER", "REACT SPECIALIST", "UI/UX DEVELOPER", "THREE.JS ENTHUSIAST"];

function RotatingText({ delay = 0 }: { delay?: number }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"wait" | "typing" | "hold" | "erasing">("wait");

  useEffect(() => {
    const t = setTimeout(() => setPhase("typing"), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    const text = ROLE_TEXTS[index];
    if (phase === "typing") {
      if (displayed.length < text.length) {
        const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), 70);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("hold"), 2500);
      return () => clearTimeout(t);
    }
    if (phase === "hold") {
      setPhase("erasing");
    }
    if (phase === "erasing") {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
        return () => clearTimeout(t);
      }
      setIndex((i) => (i + 1) % ROLE_TEXTS.length);
      setPhase("typing");
    }
  }, [phase, displayed, index]);

  return (
    <span>
      {displayed}
      <span className={`text-[#4fc3f7] ${phase === "hold" ? "animate-pulse" : ""}`}>|</span>
    </span>
  );
}

/* ───── Mouse parallax hook ───── */
function useMouseParallax(strength: number = 1) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = ((e.clientX / window.innerWidth) - 0.5) * strength;
      const y = ((e.clientY / window.innerHeight) - 0.5) * strength;
      setOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [strength]);

  return offset;
}

/* ───── Navigation ───── */
const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "Expertise", href: "#expertise" },
  { label: "Career", href: "#career" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navigation = memo(function Navigation({ activeSection, scrollProgress }: { activeSection: string; scrollProgress: number }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navBg = scrollProgress > 0.05 ? "bg-[#050a08]/80 backdrop-blur-lg" : "bg-transparent";

  return (
    <>
      <nav role="navigation" aria-label="Main navigation" className={`pointer-events-auto fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5 md:px-16 transition-all duration-500 ${navBg}`}>
        <div className="flex items-center gap-3">
          <a href="#hero" aria-label="Go to top" className="text-lg font-light tracking-[0.3em] text-white/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4fc3f7] rounded">
            TAEHO<span className="text-[#4fc3f7]">.</span>WORLD
          </a>
          <AnimatePresence mode="wait">
            {activeSection !== "hero" && (
              <motion.span
                key={activeSection}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.25 }}
                className="hidden text-[9px] tracking-[0.15em] text-white/25 uppercase sm:inline-block"
              >
                / {SECTION_LABELS[activeSection]}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        {/* Desktop nav */}
        <div className="hidden gap-8 md:flex">
          {NAV_ITEMS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              aria-current={activeSection === href.slice(1) ? "page" : undefined}
              className={`relative text-[11px] tracking-widest uppercase transition-colors duration-300 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4fc3f7] ${
                activeSection === href.slice(1)
                  ? "text-[#4fc3f7]"
                  : "text-white/35 hover:text-white/70"
              }`}
            >
              {label}
              {activeSection === href.slice(1) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1.5 left-0 right-0 h-px bg-[#4fc3f7]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>
        {/* Mobile hamburger */}
        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="flex flex-col gap-1.5 md:hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4fc3f7] rounded p-2 -mr-1 touch-manipulation"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <motion.span animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block h-px w-6 bg-white/70" />
          <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="block h-px w-6 bg-white/70" />
          <motion.span animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="block h-px w-6 bg-white/70" />
        </button>
      </nav>
      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-auto fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#050a08]/95 backdrop-blur-xl md:hidden"
          >
            {NAV_ITEMS.map(({ label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setMobileOpen(false)}
                className={`text-xl tracking-[0.2em] uppercase transition-colors ${
                  activeSection === href.slice(1) ? "text-[#4fc3f7]" : "text-white/50"
                }`}
              >
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

/* ───── Scroll indicator dots with labels ───── */
const SECTION_LABELS: Record<string, string> = {
  hero: "Home",
  expertise: "Expertise",
  career: "Career",
  projects: "Projects",
  contact: "Contact",
};

const ScrollDots = memo(function ScrollDots({ activeSection }: { activeSection: string }) {
  const sections = ["hero", "expertise", "career", "projects", "contact"];
  return (
    <div className="pointer-events-auto fixed right-8 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-4 md:flex">
      {sections.map((s) => (
        <a key={s} href={`#${s}`} aria-label={`Go to ${SECTION_LABELS[s]}`} className="group flex items-center justify-end gap-3 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4fc3f7]">
          {/* Label on hover */}
          <span className="text-[9px] tracking-[0.15em] text-white/0 uppercase transition-all duration-300 group-hover:text-white/50">
            {SECTION_LABELS[s]}
          </span>
          <span
            className={`block rounded-full transition-all duration-300 ${
              activeSection === s
                ? "h-2.5 w-2.5 bg-[#4fc3f7] shadow-[0_0_8px_#4fc3f7]"
                : "h-1.5 w-1.5 bg-white/20 group-hover:bg-white/50"
            }`}
          />
        </a>
      ))}
    </div>
  );
});

/* ───── Scroll progress bar ───── */
const ScrollProgressBar = memo(function ScrollProgressBar({ progress }: { progress: number }) {
  return (
    <div className="pointer-events-none fixed top-0 left-0 z-[60] h-[2px] w-full">
      <motion.div
        className="h-full bg-linear-to-r from-[#4fc3f7] via-[#6c8cff] to-[#7c4dff] shadow-[0_0_8px_#4fc3f7]"
        style={{ width: `${progress * 100}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
});

/* ───── Back to top button ───── */
const BackToTop = memo(function BackToTop({ scrollRef, visible }: { scrollRef: React.RefObject<HTMLDivElement | null>; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="pointer-events-auto fixed bottom-8 right-8 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0a1015]/80 text-white/50 backdrop-blur-md transition-all hover:border-[#4fc3f7]/40 hover:text-[#4fc3f7] hover:shadow-[0_0_16px_-4px_#4fc3f7]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 12V2M2 6l5-4 5 4" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
});

/* ───── Cursor glow effect ───── */
function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-[5] hidden h-[400px] w-[400px] rounded-full opacity-30 mix-blend-screen md:block"
      style={{
        background: "radial-gradient(circle, rgba(79,195,247,0.08) 0%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}

/* ───── Toast notification ───── */
const Toast = memo(function Toast({ message, show }: { message: string; show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-[#4fc3f7]/30 bg-[#0a1015]/90 px-6 py-2.5 backdrop-blur-xl"
        >
          <p className="text-xs tracking-wider text-[#4fc3f7]">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

/* ───── Hero content with parallax ───── */
function HeroContent() {
  const mouse = useMouseParallax(20);
  return (
    <div className="flex flex-col items-center text-center">
      {/* Decorative rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 2, ease: "easeOut" }}
          style={{ transform: `translate(${mouse.x * 0.3}px, ${mouse.y * 0.3}px)` }}
          className="absolute h-[300px] w-[300px] rounded-full border border-[#4fc3f7]/[0.04] md:h-[500px] md:w-[500px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 2.5, ease: "easeOut" }}
          style={{ transform: `translate(${mouse.x * 0.15}px, ${mouse.y * 0.15}px)` }}
          className="absolute h-[450px] w-[450px] rounded-full border border-[#4fc3f7]/[0.025] md:h-[700px] md:w-[700px]"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-8 h-12 w-px origin-top bg-linear-to-b from-[#4fc3f7]/50 to-transparent"
      />
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.8em" }}
        animate={{ opacity: 1, letterSpacing: "0.4em" }}
        transition={{ delay: 0.3, duration: 1.2 }}
        className="mb-3 text-[10px] font-medium tracking-[0.4em] text-[#4fc3f7]/70 uppercase"
      >
        Portfolio &mdash; 2025
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
        style={{ transform: `translate(${mouse.x}px, ${mouse.y}px)` }}
        className="text-5xl font-extralight tracking-[0.15em] text-white/90 md:text-7xl lg:text-8xl"
      >
        TAEHO
      </motion.h1>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="my-5 h-px w-32 bg-linear-to-r from-transparent via-[#4fc3f7]/50 to-[#7c4dff]/30"
      />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="text-sm font-light tracking-[0.3em] text-white/60"
        style={{ transform: `translate(${mouse.x * 0.5}px, ${mouse.y * 0.5}px)` }}
      >
        <RotatingText delay={1.8} />
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="mt-3 max-w-sm text-xs font-light leading-relaxed text-white/30"
      >
        React &middot; TypeScript &middot; Three.js
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="mt-16 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="h-8 w-px bg-linear-to-b from-[#4fc3f7]/40 to-transparent"
        />
        <p className="text-[9px] tracking-[0.3em] text-white/20">SCROLL</p>
      </motion.div>
    </div>
  );
}

/* ───── Expertise grid with expandable cards ───── */
function ExpertiseGrid() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
      {EXPERTISE.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          whileHover={expanded !== item.title ? { y: -3, transition: { duration: 0.2 } } : undefined}
          onClick={() => setExpanded(expanded === item.title ? null : item.title)}
          className={`group relative cursor-pointer overflow-hidden rounded-xl border bg-[#0a1015]/70 p-5 backdrop-blur-lg transition-all duration-300 ${
            expanded === item.title ? "border-[#4fc3f7]/40 shadow-[0_0_24px_-6px_rgba(79,195,247,0.2)]" : "border-white/[0.08] hover:border-[#4fc3f7]/30"
          }`}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#4fc3f7]/0 to-transparent transition-all duration-500 group-hover:via-[#4fc3f7]/40" />
          <div className="flex items-start gap-3">
            <motion.span
              whileHover={{ rotate: 12, scale: 1.15 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#4fc3f7]/15 bg-[#4fc3f7]/[0.07] font-mono text-[10px] font-medium text-[#4fc3f7]/70 transition-colors group-hover:border-[#4fc3f7]/40 group-hover:bg-[#4fc3f7]/15"
            >
              {item.icon}
            </motion.span>
            <div>
              <h3 className="text-base font-light text-white/85 transition-colors group-hover:text-[#4fc3f7]">
                {item.title}
              </h3>
              <p className="mt-0.5 text-[11px] tracking-wider text-[#4fc3f7]/50">
                {item.subtitle}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-white/45">{item.desc}</p>
          <AnimatePresence>
            {expanded === item.title && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="mt-3 border-t border-white/[0.06] pt-3 text-[11px] leading-relaxed text-white/35">
                  {item.detail}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mt-4 flex items-center gap-2">
            <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${item.level}%` }}
                viewport={{ once: false }}
                transition={{ delay: 0.3 + i * 0.1, duration: 1, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-[#4fc3f7]/60 via-[#6c8cff]/40 to-[#7c4dff]/30"
              />
            </div>
            <span className="text-[9px] tabular-nums text-[#4fc3f7]/50">{item.level}%</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ───── Projects with company filter ───── */
const COMPANIES = ["All", "S2W", "Innodep", "Tmax AI", "Deepixel"] as const;

function ProjectsSection() {
  const [filter, setFilter] = useState<string>("All");
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const filtered = useMemo(() => {
    let result = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.company === filter);
    if (tagFilter) result = result.filter((p) => p.tags.includes(tagFilter));
    return result;
  }, [filter, tagFilter]);

  return (
    <div className="w-full">
      <div className="text-center">
        <SectionLabel text="Projects" index="03" />
        <h2 className="text-3xl font-extralight leading-tight tracking-wide text-white/90 md:text-4xl">
          선택된 <span className="text-[#4fc3f7]">작업물</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-white/30">
          보안, AI, 스마트시티, AR 등 다양한 도메인에서의 프로젝트 경험
        </p>
      </div>
      {/* Filter tabs */}
      <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-2">
        {COMPANIES.map((c) => {
          const count = c === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.company === c).length;
          return (
            <button
              key={c}
              onClick={() => { setFilter(c); setTagFilter(null); }}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[10px] tracking-wider transition-all duration-300 ${
                filter === c && !tagFilter
                  ? "border-[#4fc3f7]/50 bg-[#4fc3f7]/15 text-[#4fc3f7]"
                  : "border-white/10 bg-transparent text-white/40 hover:border-white/20 hover:text-white/60"
              }`}
            >
              {c}
              <span className={`flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[8px] font-medium tabular-nums ${
                filter === c && !tagFilter
                  ? "bg-[#4fc3f7]/25 text-[#4fc3f7]"
                  : "bg-white/[0.06] text-white/30"
              }`}>{count}</span>
            </button>
          );
        })}
      </div>
      {/* Filtered result count */}
      <div className="mx-auto mt-3 text-center">
        <span className="text-[10px] tabular-nums text-white/25">{filtered.length}개 프로젝트</span>
      </div>
      {tagFilter && (
        <div className="mx-auto mt-3 flex items-center justify-center gap-2">
          <span className="text-[10px] text-white/30">Tag:</span>
          <span className="rounded-full border border-[#4fc3f7]/40 bg-[#4fc3f7]/10 px-3 py-0.5 text-[10px] text-[#4fc3f7]">{tagFilter}</span>
          <button onClick={() => setTagFilter(null)} className="text-[10px] text-white/30 hover:text-white/60">&times; clear</button>
        </div>
      )}
      <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a1015]/60 p-5 backdrop-blur-lg transition-all duration-300 hover:border-[#4fc3f7]/25 hover:shadow-[0_0_20px_-5px_rgba(79,195,247,0.15)]"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#4fc3f7]/0 to-transparent transition-all duration-500 group-hover:via-[#4fc3f7]/30" />
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-medium text-[#4fc3f7]/40">
                    {String(PROJECTS.indexOf(project) + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] tracking-wider text-[#4fc3f7]/60">
                    {project.company}
                  </span>
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.05] text-[10px] text-white/30 transition-all hover:bg-[#4fc3f7]/20 hover:text-[#4fc3f7]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    ↗
                  </a>
                )}
              </div>
              <h3 className="text-sm font-light text-white/90 transition-colors group-hover:text-[#4fc3f7]">
                {project.title}
              </h3>
              <p className="mt-1.5 text-[11px] leading-relaxed text-white/40">{project.desc}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={(e) => { e.stopPropagation(); setTagFilter(tag); }}
                    className={`rounded-full border px-2 py-0.5 text-[9px] tracking-wider transition-colors ${
                      tagFilter === tag
                        ? "border-[#4fc3f7]/40 bg-[#4fc3f7]/15 text-[#4fc3f7]"
                        : "border-white/[0.05] bg-white/[0.04] text-white/40 hover:border-[#4fc3f7]/25 hover:text-white/60"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ───── Data ───── */
const EXPERTISE = [
  {
    title: "프론트엔드",
    subtitle: "React, React Native",
    desc: "직관적이고 성능 좋은 사용자 인터페이스 구축. SPA, SSR, 하이브리드 앱 개발.",
    detail: "React, Next.js, Vue, Angular 등 모던 프레임워크를 활용한 SPA/SSR 개발. React Native를 이용한 크로스플랫폼 모바일 앱 개발 경험.",
    icon: "</>",
    level: 95,
  },
  {
    title: "소프트웨어",
    subtitle: "설계 & 개발",
    desc: "확장 가능하고 유지보수하기 쉬운 소프트웨어 아키텍처 설계 및 개발.",
    detail: "컴포넌트 기반 아키텍처, 상태관리 패턴, CI/CD 파이프라인 구축. 코드 리뷰 문화와 테스트 자동화 경험.",
    icon: "{ }",
    level: 85,
  },
  {
    title: "비즈니스",
    subtitle: "도메인 적응력",
    desc: "패션, 이커머스, 교육, AI, 물리 보안 등 다양한 산업 도메인 경험.",
    detail: "AR 가상 피팅, AI 챗봇, 스마트시티 관제, 사이버 보안 인텔리전스 등 다양한 도메인에서의 빠른 적응력.",
    icon: "///",
    level: 80,
  },
  {
    title: "사용자 경험",
    subtitle: "사람 중심 디자인",
    desc: "사용자에게 진정한 가치를 전달하는 경험 설계와 인터페이스 최적화.",
    detail: "사용자 리서치 기반 UX 개선, 접근성(a11y) 준수, 인터랙티브 프로토타이핑, WebGL/Canvas 시각화.",
    icon: "UX",
    level: 75,
  },
];

const CAREER = [
  {
    period: "2025.08 —",
    company: "S2W",
    role: "Frontend Engineer",
    url: "https://s2w.inc/",
    desc: "엔터프라이즈 보안 인텔리전스 플랫폼(SAIP) 프론트엔드 개발. 위협 탐지 및 사이버 보안 분석 대시보드 구축.",
    tags: ["React", "TypeScript", "Styled-Components"],
    current: true,
  },
  {
    period: "2023.04 — 2024.11",
    company: "Innodep Inc.",
    role: "Frontend Engineer",
    url: "https://innodep.co.kr/",
    desc: "스마트시티 통합관제시스템, AI 카메라, VUNex AI/MLOps 등 다수 프로젝트의 프론트엔드 설계 및 개발.",
    tags: ["React", "Angular", "Zustand", "WebRTC"],
  },
  {
    period: "2021.07 — 2022.12",
    company: "Tmax AI",
    role: "Frontend Engineer",
    url: "https://www.tmax.co.kr/tmaxai",
    desc: "HyperChatbot 및 학술연구정보서비스(RISS) 프론트엔드 개발. AI 기반 대화형 인터페이스 구축.",
    tags: ["React", "Recoil", "Redux"],
  },
  {
    period: "2020.02 — 2021.06",
    company: "Deepixel",
    role: "Frontend Engineer",
    url: "https://www.deepixel.xyz/",
    desc: "AR 가상 피팅 솔루션(StyleAR) 프론트엔드 개발. WebGL 기반 실시간 렌더링 및 이커머스 플랫폼 연동.",
    tags: ["Vue2", "WebGL", "Node.js"],
  },
];

const PROJECTS = [
  {
    title: "VUNex AI",
    desc: "중소기업을 위한 AI 기반 영상 보안 솔루션",
    tags: ["React", "Zustand", "tanstack Query", "WebRTC", "Canvas"],
    company: "Innodep",
  },
  {
    title: "VUNex MLOps",
    desc: "AI 모델 학습을 위한 영상 어노테이션 플랫폼",
    tags: ["React", "Zustand", "tanstack Query", "tailwindcss", "Canvas"],
    company: "Innodep",
    url: "https://mlops.vunex-cloud.com/",
  },
  {
    title: "스마트시티 통합관제",
    desc: "AI 영상 분석 기반 도시 재난 안전 관리 플랫폼",
    tags: ["Angular", "SCSS", "OpenLayers", "React", "Recoil"],
    company: "Innodep",
  },
  {
    title: "AI Camera",
    desc: "분산형 엣지 기반 다중 카메라 영상 처리 솔루션",
    tags: ["React", "Recoil", "Styled-Components"],
    company: "Innodep",
  },
  {
    title: "RISS",
    desc: "전국 대학 연구 논문 공개 접근 AI 기반 학술 플랫폼",
    tags: ["React", "Recoil", "Styled-Components"],
    company: "Tmax AI",
    url: "https://www.riss.kr/",
  },
  {
    title: "HyperChatbot",
    desc: "AI와 규칙 기반 접근법을 결합한 지능형 대화형 챗봇",
    tags: ["React", "Redux", "Styled-Components"],
    company: "Tmax AI",
  },
  {
    title: "StyleAR",
    desc: "이커머스를 위한 AR 가상 피팅 솔루션",
    tags: ["Vue2", "Vuex", "WebGL", "Canvas", "Node.js", "MySQL"],
    company: "Deepixel",
    url: "https://www.stylear.ai/",
  },
  {
    title: "SAIP",
    desc: "고도화된 위협 탐지를 위한 보안 분석 및 인텔리전스 플랫폼",
    tags: ["React", "TypeScript", "Styled-Components"],
    company: "S2W",
    url: "https://s2w.inc/",
  },
];

const TECH_STACK = [
  "React",
  "TypeScript",
  "Next.js",
  "Angular",
  "Vue",
  "React Native",
  "Three.js",
  "Node.js",
  "Zustand",
  "Recoil",
  "Redux",
  "tailwindcss",
  "WebGL",
  "WebRTC",
];

const CONTACTS = [
  { label: "GitHub", abbr: "GH", href: "https://github.com" },
  { label: "LinkedIn", abbr: "LI", href: "https://linkedin.com" },
  { label: "Instagram", abbr: "IG", href: "https://instagram.com" },
  { label: "Email", abbr: "EM", href: "mailto:hello@taeho.world" },
];

/* ───── Main Page ───── */
export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText("hello@taeho.world").then(() => {
      setToastMsg("이메일이 클립보드에 복사되었습니다!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    });
  }, []);

  const handleScroll = useCallback((progress: number) => {
    setScrollProgress(progress);
    if (progress < 0.15) setActiveSection("hero");
    else if (progress < 0.35) setActiveSection("expertise");
    else if (progress < 0.55) setActiveSection("career");
    else if (progress < 0.8) setActiveSection("projects");
    else setActiveSection("contact");
  }, []);

  useScrollProgress(scrollRef, handleScroll);

  // Keyboard navigation
  const activeSectionRef = useRef(activeSection);
  activeSectionRef.current = activeSection;

  useEffect(() => {
    const sections = ["hero", "expertise", "career", "projects", "contact"];
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const idx = sections.indexOf(activeSectionRef.current);
      if (e.key === "j" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = sections[Math.min(idx + 1, sections.length - 1)];
        scrollRef.current?.querySelector(`#${next}`)?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "k" || e.key === "ArrowUp") {
        e.preventDefault();
        const prev = sections[Math.max(idx - 1, 0)];
        scrollRef.current?.querySelector(`#${prev}`)?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key >= "1" && e.key <= "5") {
        const target = sections[parseInt(e.key) - 1];
        if (target) scrollRef.current?.querySelector(`#${target}`)?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="relative bg-[#050a08]">
      {/* Fixed 3D background */}
      <Scene3DLoader scrollProgress={scrollProgress} />

      {/* Fixed UI overlay */}
      <ScrollProgressBar progress={scrollProgress} />
      <Navigation activeSection={activeSection} scrollProgress={scrollProgress} />
      <ScrollDots activeSection={activeSection} />
      <Toast message={toastMsg} show={showToast} />
      <CursorGlow />
      <BackToTop scrollRef={scrollRef} visible={scrollProgress > 0.15} />

      {/* SEO/GEO: Visually hidden structured summary for crawlers & AI engines */}
      <div className="sr-only" aria-hidden="false">
        <h1>Taeho — 프론트엔드 엔지니어 포트폴리오</h1>
        <p>
          5년 이상 경력의 프론트엔드 엔지니어 태호입니다. React, TypeScript, Next.js, Three.js를 전문으로 하며,
          보안 인텔리전스(S2W), 스마트시티 관제(Innodep), AI 챗봇(Tmax AI), AR 가상 피팅(Deepixel) 등
          다양한 도메인에서 8개 이상의 프로젝트를 수행했습니다.
        </p>
        <h2>핵심 기술</h2>
        <ul>
          <li>React, React Native — SPA/SSR, 크로스플랫폼 모바일 앱</li>
          <li>TypeScript, Next.js — 타입 안전, 서버사이드 렌더링</li>
          <li>Three.js, WebGL — 3D 시각화, 실시간 렌더링</li>
          <li>Angular, Vue — 멀티 프레임워크 경험</li>
          <li>Zustand, Recoil, Redux — 상태 관리</li>
          <li>WebRTC, Canvas — 실시간 영상, 그래픽 처리</li>
        </ul>
        <h2>경력</h2>
        <ul>
          <li>S2W (2025.08~현재) — 보안 인텔리전스 플랫폼 SAIP 프론트엔드 개발</li>
          <li>Innodep Inc. (2023.04~2024.11) — 스마트시티 통합관제, VUNex AI/MLOps</li>
          <li>Tmax AI (2021.07~2022.12) — HyperChatbot, RISS 학술 플랫폼</li>
          <li>Deepixel (2020.02~2021.06) — StyleAR AR 가상 피팅 솔루션</li>
        </ul>
        <h2>주요 프로젝트</h2>
        <ul>
          <li>SAIP — 고도화된 위협 탐지를 위한 보안 분석 및 인텔리전스 플랫폼</li>
          <li>VUNex AI — 중소기업을 위한 AI 기반 영상 보안 솔루션</li>
          <li>VUNex MLOps — AI 모델 학습을 위한 영상 어노테이션 플랫폼</li>
          <li>스마트시티 통합관제 — AI 영상 분석 기반 도시 재난 안전 관리 플랫폼</li>
          <li>RISS — 전국 대학 연구 논문 공개 접근 AI 기반 학술 플랫폼</li>
          <li>HyperChatbot — AI와 규칙 기반 접근법을 결합한 지능형 챗봇</li>
          <li>StyleAR — 이커머스를 위한 AR 가상 피팅 솔루션</li>
        </ul>
      </div>

      {/* Scrollable content */}
      <main
        ref={scrollRef}
        role="main"
        className="relative z-10 h-screen overflow-y-auto scroll-smooth overscroll-contain"
        style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
      >
        {/* ── Hero ── */}
        <Section id="hero" ariaLabel="소개">
          <HeroContent />
        </Section>

        <SectionDivider />

        {/* ── Expertise ── */}
        <Section id="expertise" className="justify-end" ariaLabel="전문 분야">
          <div className="relative max-w-xl ml-auto">
            <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-[#050a08]/40 backdrop-blur-[2px]" />
            <div className="relative">
              <SectionLabel text="Expertise" index="01" />
              <h2 className="text-3xl font-extralight leading-tight tracking-wide text-white/90 md:text-4xl">
                <span className="text-[#4fc3f7]">전문</span> 분야
              </h2>
              <ExpertiseGrid />
              <div className="mt-8 flex flex-wrap gap-2">
                {TECH_STACK.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: i * 0.03 }}
                    className="rounded-full border border-white/10 bg-[#0a1015]/50 px-3 py-1 text-[10px] tracking-wider text-white/50 transition-all hover:border-[#4fc3f7]/40 hover:text-[#4fc3f7]/80 hover:shadow-[0_0_12px_-3px_#4fc3f7]"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <SectionDivider />

        {/* ── Career ── */}
        <Section id="career" ariaLabel="경력 사항">
          <div className="relative max-w-lg">
            <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-[#050a08]/40 backdrop-blur-[2px]" />
            <div className="relative">
              <SectionLabel text="Career" index="02" />
              <h2 className="text-3xl font-extralight leading-tight tracking-wide text-white/90 md:text-4xl">
                경험의 <span className="text-[#4fc3f7]">여정</span>
              </h2>
              <p className="mt-3 text-xs text-white/30">
                5년+ 프론트엔드 개발 경력 &middot; 4개 기업 &middot; 8+ 프로젝트
              </p>
            </div>
            <div className="relative mt-10">
              {/* Vertical timeline line with gradient */}
              <div className="absolute left-[7px] top-0 bottom-0 w-px bg-linear-to-b from-[#4fc3f7]/40 via-[#7c4dff]/15 to-transparent" />
              <div className="space-y-6">
                {CAREER.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-10%" }}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                    className="group relative pl-8"
                  >
                    {/* Timeline dot with pulse */}
                    <div className="absolute left-0 top-5 flex items-center justify-center">
                      {"current" in item && item.current && (
                        <motion.div
                          animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                          className="absolute h-[15px] w-[15px] rounded-full bg-[#4fc3f7]"
                        />
                      )}
                      <div className={`h-[15px] w-[15px] rounded-full border bg-[#050a08] transition-all duration-300 group-hover:border-[#4fc3f7] group-hover:bg-[#4fc3f7]/20 group-hover:shadow-[0_0_10px_#4fc3f7/30] ${
                        "current" in item && item.current ? "border-[#4fc3f7]/60" : "border-white/20"
                      }`} />
                      <div className={`absolute h-[7px] w-[7px] rounded-full transition-colors group-hover:bg-[#4fc3f7]/60 ${
                        "current" in item && item.current ? "bg-[#4fc3f7]/50" : "bg-white/15"
                      }`} />
                    </div>
                    <div className={`rounded-xl border bg-[#0a1015]/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-[#4fc3f7]/20 hover:bg-[#0a1015]/80 hover:shadow-[0_0_20px_-6px_rgba(79,195,247,0.12)] ${
                      "current" in item && item.current ? "border-[#4fc3f7]/15" : "border-white/[0.06]"
                    }`}>
                      <div className="flex items-center gap-2">
                        <p className="rounded-full bg-[#4fc3f7]/10 px-2.5 py-0.5 text-[10px] tracking-[0.15em] text-[#4fc3f7]/80">{item.period}</p>
                        {"current" in item && item.current && (
                          <span className="rounded-full bg-[#4fc3f7]/20 px-2 py-0.5 text-[9px] font-medium tracking-wider text-[#4fc3f7]">
                            현재
                          </span>
                        )}
                      </div>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-lg font-light text-white/90 transition-colors hover:text-[#4fc3f7]"
                      >
                        {item.company}
                        <span className="ml-1.5 text-xs text-white/30 transition-colors group-hover:text-[#4fc3f7]/50">↗</span>
                      </a>
                      <p className="text-xs tracking-wide text-white/50">
                        {item.role}
                        {" · "}
                        <span className="text-[#4fc3f7]/40">
                          {(() => {
                            const parts = item.period.split(/\s*—\s*/);
                            const startStr = parts[0]?.trim();
                            const endStr = parts[1]?.trim();
                            const [sy, sm] = startStr.split(".").map(Number);
                            const start = new Date(sy, sm - 1);
                            const end = endStr ? (() => { const [ey, em] = endStr.split(".").map(Number); return new Date(ey, em - 1); })() : new Date();
                            const months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
                            const y = Math.floor(months / 12);
                            const m = months % 12;
                            return y > 0 ? `${y}년 ${m}개월` : `${m}개월`;
                          })()}
                        </span>
                      </p>
                      <p className="mt-2.5 text-xs leading-relaxed text-white/35">{item.desc}</p>
                      {"tags" in item && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {item.tags.map((tag) => (
                            <span key={tag} className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[8px] tracking-wider text-white/30">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <SectionDivider />

        {/* ── Projects ── */}
        <Section id="projects" ariaLabel="프로젝트">
          <ProjectsSection />
        </Section>

        <SectionDivider />

        {/* ── Contact ── */}
        <Section id="contact" ariaLabel="연락처">
          <div className="flex w-full flex-col items-center text-center">
            <SectionLabel text="Contact" index="04" />
            <h2 className="text-3xl font-extralight leading-tight tracking-wide text-white/90 md:text-5xl">
              함께 만들어 갈<br />
              <span className="text-[#4fc3f7]">다음 프로젝트</span>
            </h2>
            <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-white/45">
              새로운 기회와 협업에 열려있습니다.
              <br />아래 채널을 통해 편하게 연락주세요.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {CONTACTS.map(({ label, abbr, href }, i) => {
                const isEmail = href.startsWith("mailto");
                const Wrapper = isEmail ? "button" : "a";
                return (
                  <motion.div
                    key={abbr}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -2, transition: { duration: 0.15 } }}
                  >
                    <Wrapper
                      {...(isEmail
                        ? { onClick: copyEmail, type: "button" as const }
                        : { href, target: "_blank", rel: "noopener noreferrer" })}
                      className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0a1015]/50 px-5 py-3 sm:py-2.5 backdrop-blur-md transition-all duration-300 hover:border-[#4fc3f7]/30 hover:bg-[#4fc3f7]/10 hover:shadow-[0_0_16px_-4px_#4fc3f7] touch-manipulation"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4fc3f7]/15 text-[9px] font-semibold text-[#4fc3f7]/90">
                        {abbr}
                      </span>
                      <span className="text-xs tracking-wider text-white/55 transition-colors group-hover:text-white/90">
                        {isEmail ? "Copy Email" : label}
                      </span>
                    </Wrapper>
                  </motion.div>
                );
              })}
            </div>
            <footer className="mt-20 flex flex-col items-center gap-6">
              <div className="h-10 w-px bg-linear-to-b from-[#4fc3f7]/20 to-transparent" />
              {/* Stats row */}
              <div className="flex gap-8">
                {[
                  { value: "5+", label: "Years" },
                  { value: "8+", label: "Projects" },
                  { value: "4", label: "Companies" },
                ].map(({ value, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <span className="bg-linear-to-r from-[#4fc3f7]/80 to-[#7c4dff]/60 bg-clip-text text-lg font-extralight text-transparent">{value}</span>
                    <span className="text-[9px] tracking-[0.2em] text-white/25 uppercase">{label}</span>
                  </motion.div>
                ))}
              </div>
              <div className="h-px w-20 bg-linear-to-r from-transparent via-[#4fc3f7]/15 to-[#7c4dff]/10" />
              <p className="text-[9px] tracking-wider text-white/20">
                Built with <span className="text-white/30">Next.js</span> &middot; <span className="text-white/30">Three.js</span> &middot; <span className="text-white/30">Framer Motion</span>
              </p>
              <p className="text-[10px] tracking-[0.3em] text-white/15">
                &copy; {new Date().getFullYear()} TAEHO.WORLD
              </p>
            </footer>
          </div>
        </Section>
      </main>
    </div>
  );
}
