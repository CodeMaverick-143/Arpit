"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/data/projects";
import { useIsTouch } from "@/hooks/useIsTouch";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import ProjectCard from "./ProjectCard";

interface HorizontalProjectsProps {
  projects: Project[];
}

const CARD_W = 420;

/**
 * Pinned horizontal-scroll showcase: the section sticks while vertical
 * scroll is mapped to horizontal travel across the cards. On touch and
 * reduced-motion it degrades to a native snap-scrolling row.
 */
export default function HorizontalProjects({
  projects,
}: HorizontalProjectsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const reduce = useReducedMotion();

  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // How far the track must travel so the last card ends 48px from the right
  // edge. Measured in px (framer can't interpolate px → calc()), kept in a
  // MotionValue so resizes never re-render.
  const maxShift = useMotionValue(0);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      maxShift.set(Math.max(0, track.scrollWidth + 48 - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [maxShift]);

  const x = useTransform(() => -scrollYProgress.get() * maxShift.get());
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (isTouch || reduce) {
    return (
      <div
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 pb-6 -mx-6 scrollbar-none"
        style={{ scrollbarWidth: "none" }}
        data-lenis-prevent
      >
        {projects.map((p, i) => (
          <div
            key={p.slug}
            className="snap-center flex-shrink-0 w-[85vw] sm:w-[420px]"
          >
            <ProjectCard project={p} index={i} compact />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      style={{ height: `${projects.length * 50 + 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* w-full: auto margins inside a flex column would otherwise shrink-wrap this */}
        <div className="container-wide w-full mb-14 flex items-end justify-between gap-8">
          <div>
            <span
              className="brand-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] block mb-3"
              style={{ color: "var(--text-tertiary)" }}
            >
              Selected Work
            </span>
            <h2
              className="heading-section text-h2"
              style={{ color: "var(--text-primary)" }}
            >
              Featured Projects
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span
              className="brand-mono text-[10px] uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              Scroll
            </span>
            <div
              className="w-32 h-px rounded-full overflow-hidden"
              style={{ background: "var(--border)" }}
            >
              <motion.div
                className="h-full origin-left"
                style={{ scaleX: progressScale, background: "var(--brand)" }}
              />
            </div>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          className="flex gap-6 w-max pl-[max(24px,calc((100vw-1200px)/2+24px))]"
          style={{ x, willChange: "transform" }}
        >
          {projects.map((p, i) => (
            <div
              key={p.slug}
              className="flex-shrink-0"
              style={{ width: CARD_W }}
            >
              <ProjectCard project={p} index={i} compact />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
