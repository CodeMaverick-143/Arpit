"use client";

import { useEffect, useRef, useState } from "react";
import { useIsTouch } from "@/hooks/useIsTouch";
import TechIcon from "./TechIcon";

interface SkillsCarouselProps {
  skills: string[];
}

export default function SkillsCarousel({ skills }: SkillsCarouselProps) {
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();

  // Pause the marquee when off-screen so it doesn't burn GPU time
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.1,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const midPoint = Math.ceil(skills.length / 2);
  const row1 = skills.slice(0, midPoint);
  const row2 = skills.slice(midPoint);

  // Touch: a native, swipeable snap row instead of an auto-marquee
  if (isTouch) {
    return (
      <div className="relative py-8">
        <div
          className="flex gap-3 overflow-x-auto snap-x px-6 pb-2"
          style={{ scrollbarWidth: "none" }}
          data-lenis-prevent
        >
          {skills.map((skill) => (
            <div key={skill} className="snap-start flex-shrink-0">
              <SkillItem skill={skill} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const isPaused = paused || !inView;

  return (
    <div
      ref={containerRef}
      className={`relative py-12 select-none overflow-hidden ${isPaused ? "marquee-paused" : ""}`}
      role="region"
      aria-label="Technology stack"
    >
      <div className="flex flex-col gap-6">
        <div className="relative">
          <div
            className="marquee-track flex gap-4 w-max px-4"
            style={{ animation: "scroll-infinite 36s linear infinite" }}
          >
            {[...row1, ...row1].map((skill, index) => (
              <SkillItem
                key={`${skill}-1-${index}`}
                skill={skill}
                ariaHidden={index >= row1.length}
              />
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            className="marquee-track flex gap-4 w-max px-4"
            style={{ animation: "scroll-infinite-reverse 42s linear infinite" }}
          >
            {[...row2, ...row2].map((skill, index) => (
              <SkillItem
                key={`${skill}-2-${index}`}
                skill={skill}
                ariaHidden={index >= row2.length}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Fading edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-20 pointer-events-none bg-gradient-to-r from-[var(--background)] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-20 pointer-events-none bg-gradient-to-l from-[var(--background)] to-transparent" />

      {/* Pause control (WCAG 2.2.2) */}
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Play carousel" : "Pause carousel"}
        className="absolute right-4 bottom-2 z-30 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:bg-[var(--surface-2)] transition-colors"
        style={{
          color: "var(--text-tertiary)",
          border: "1px solid var(--border)",
          background: "var(--surface-1)",
        }}
      >
        {paused ? (
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        ) : (
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
          </svg>
        )}
      </button>
    </div>
  );
}

function SkillItem({
  skill,
  ariaHidden = false,
}: {
  skill: string;
  ariaHidden?: boolean;
}) {
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className="group inline-flex items-center gap-3 px-6 py-2.5 rounded-xl transition-all duration-500 cursor-default relative overflow-hidden hover:scale-110 hover:-translate-y-1"
      style={{
        background: "var(--surface-1)",
        border: "1px solid var(--border)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[var(--brand-soft)] to-transparent" />
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow:
            "inset 0 0 15px var(--brand-soft), 0 0 25px var(--brand-soft)",
          border: "1px solid var(--brand-border)",
        }}
      />

      <TechIcon name={skill} size={20} className="relative z-10" />
      <span
        className="brand-mono text-[11px] uppercase font-bold tracking-[0.15em] transition-colors duration-500 group-hover:text-[var(--text-primary)] relative z-10"
        style={{ color: "var(--text-secondary)" }}
      >
        {skill}
      </span>

      {/* Scanning light */}
      <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer" />
    </div>
  );
}
