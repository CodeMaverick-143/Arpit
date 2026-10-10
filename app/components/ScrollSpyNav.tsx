"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { scrollToTarget } from "./SmoothScroll";

interface Section {
  id: string;
  label: string;
}

interface ScrollSpyNavProps {
  sections: Section[];
  label?: string;
}

/** Table of contents that highlights the section currently in view. */
export default function ScrollSpyNav({
  sections,
  label = "Contents",
}: ScrollSpyNavProps) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the top-most intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <nav aria-label={label}>
      <span
        className="font-code text-[10px] uppercase tracking-[0.2em] block mb-4"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </span>
      <ul className="space-y-1 relative">
        {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id} className="relative">
              <a
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget(`#${section.id}`);
                  history.replaceState(null, "", `#${section.id}`);
                }}
                aria-current={isActive ? "location" : undefined}
                className="relative flex items-center gap-3 py-1.5 text-sm transition-colors hover:text-[var(--text-primary)]"
                style={{
                  color: isActive
                    ? "var(--text-primary)"
                    : "var(--text-tertiary)",
                }}
              >
                <span
                  className="relative w-4 h-px"
                  style={{ background: "var(--border)" }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="toc-active"
                      className="absolute inset-0"
                      style={{ background: "var(--brand)" }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </span>
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
