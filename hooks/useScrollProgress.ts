"use client";

import { useScroll } from "framer-motion";

/**
 * Page scroll progress as framer MotionValues (0 → 1 and raw px).
 * No React state is touched on scroll, so consumers can bind the values
 * straight to `style` without re-rendering.
 */
export function useScrollProgress() {
  const { scrollY, scrollYProgress } = useScroll();
  return { progress: scrollYProgress, scrollY };
}
