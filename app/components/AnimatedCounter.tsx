"use client";

import { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

/**
 * Counts up when scrolled into view. The MotionValue is rendered directly,
 * so the count animates without a React re-render per frame.
 */
export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
}: AnimatedCounterProps) {
  const [ref, isInView] = useInView<HTMLSpanElement>({
    threshold: 0.5,
    once: true,
  });
  const reduce = useReducedMotion();
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(
    spring,
    (current) => `${prefix}${Math.round(current)}${suffix}`,
  );

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, spring, value]);

  return (
    <span
      ref={ref}
      className={className}
      aria-label={`${prefix}${value}${suffix}`}
    >
      {reduce ? (
        `${prefix}${value}${suffix}`
      ) : (
        <motion.span aria-hidden>{display}</motion.span>
      )}
    </span>
  );
}
