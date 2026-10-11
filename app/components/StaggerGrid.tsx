"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUpItem } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface StaggerGridProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  /** Re-trigger when the key changes (e.g. filter change) */
  animateKey?: string;
}

/**
 * Parent that staggers its children into view with one IntersectionObserver
 * instead of one per child. Children can be `<StaggerItem>` or any
 * `motion.*` element using the `fadeUpItem` variants.
 */
export default function StaggerGrid({
  children,
  className = "",
  stagger = 0.08,
  animateKey,
}: StaggerGridProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      key={animateKey}
      className={className}
      variants={staggerContainer(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={fadeUpItem} className={className}>
      {children}
    </motion.div>
  );
}
