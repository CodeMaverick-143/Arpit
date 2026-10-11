"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Terminal = dynamic(() => import("./Terminal"), {
  loading: () => <TerminalSkeleton />,
});

interface TerminalLine {
  type: "prompt" | "command" | "output" | "empty";
  text: string;
  delay?: number;
}

interface HeroTerminalProps {
  lines: TerminalLine[];
  title?: string;
}

/**
 * Terminal as a 3D window: starts slightly tilted in perspective and
 * straightens as the user scrolls. The terminal itself is lazy-loaded.
 */
export default function HeroTerminal({ lines, title }: HeroTerminalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotateY = useTransform(scrollYProgress, [0, 0.5], [-14, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [6, 0]);
  const y = useTransform(scrollYProgress, [0.5, 1], [0, -60]);

  return (
    <div
      ref={ref}
      className="perspective-1500 hero-reveal"
      style={{ "--d": "400ms" } as React.CSSProperties}
    >
      <motion.div
        className="preserve-3d"
        style={reduce ? undefined : { rotateY, rotateX, y }}
      >
        <Terminal lines={lines} title={title} />
      </motion.div>
    </div>
  );
}

export function TerminalSkeleton() {
  return (
    <div className="terminal" aria-hidden>
      <div className="terminal-header">
        <div className="flex gap-1.5 px-1">
          <span className="terminal-dot red" />
          <span className="terminal-dot yellow" />
          <span className="terminal-dot green" />
        </div>
        <span className="flex-1" />
        <div className="w-12" />
      </div>
      <div className="terminal-body space-y-3">
        <div className="skeleton h-3 w-2/5" style={{ background: "#1a1a1a" }} />
        <div className="skeleton h-3 w-4/5" style={{ background: "#1a1a1a" }} />
        <div className="skeleton h-3 w-1/2" style={{ background: "#1a1a1a" }} />
        <div className="skeleton h-3 w-3/5" style={{ background: "#1a1a1a" }} />
      </div>
    </div>
  );
}
