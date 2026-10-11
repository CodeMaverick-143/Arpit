/**
 * Motion tokens — single source of truth for easings, durations and
 * reusable framer-motion variants so every animation on the site feels
 * like it belongs to the same system.
 */
import type { Transition, Variants } from "framer-motion";

export const ease = {
  /** Default "out" curve used for reveals */
  out: [0.25, 0.46, 0.45, 0.94] as const,
  /** Snappy expo-out for UI chrome (nav, modals) */
  expo: [0.16, 1, 0.3, 1] as const,
  /** Gentle in-out for scroll-linked movement */
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const duration = {
  fast: 0.2,
  base: 0.4,
  slow: 0.7,
  reveal: 0.6,
};

export const spring = {
  /** Cards, tilt, magnetic buttons */
  soft: { type: "spring", stiffness: 150, damping: 20, mass: 0.5 } as const,
  /** Nav pills, toggles */
  snappy: { type: "spring", stiffness: 400, damping: 30 } as const,
  /** Cursor follow */
  cursor: { stiffness: 500, damping: 40, mass: 0.2 } as const,
};

export const revealTransition: Transition = {
  duration: duration.reveal,
  ease: ease.out,
};

/** Parent container that staggers its children */
export const staggerContainer = (
  stagger = 0.08,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Child item for staggerContainer */
export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: revealTransition },
};

export const scaleInItem: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: revealTransition },
};

/** Entrance for route templates */
export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: ease.expo },
  },
};
