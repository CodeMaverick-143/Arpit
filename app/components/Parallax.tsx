"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ParallaxProps {
  children: React.ReactNode;
  /** How far (px) the layer moves over one viewport of scroll. Negative = slower than page. */
  distance?: number;
  /** Fade out as it leaves */
  fade?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Scroll-linked parallax layer. Children render on the server untouched;
 * only `transform`/`opacity` are animated so this is paint-cheap.
 */
export default function Parallax({
  children,
  distance = 80,
  fade = false,
  className = "",
  style,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, distance]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, fade ? 0 : 1]);

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, y, opacity }}
    >
      {children}
    </motion.div>
  );
}
