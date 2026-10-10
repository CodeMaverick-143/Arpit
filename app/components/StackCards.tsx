"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface StackCardData {
  icon?: React.ReactNode;
  title: string;
  description: string;
  index?: string;
}

interface StackCardsProps {
  items: StackCardData[];
}

/**
 * Sticky stacking cards: each card pins near the top and scales/dims as
 * the next one slides over it. Falls back to a plain grid for reduced motion.
 */
export default function StackCards({ items }: StackCardsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  if (reduce) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <CardBody key={i} item={item} i={i} />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      style={{ height: `${items.length * 70 + 30}vh` }}
    >
      {items.map((item, i) => (
        <StackCard
          key={i}
          item={item}
          i={i}
          total={items.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function StackCard({
  item,
  i,
  total,
  progress,
}: {
  item: StackCardData;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // This card is "covered" between its own slot end and the end of the stack.
  // The last card is never covered, so its ranges stay flat (1 → 1) instead
  // of collapsing to a degenerate [1, 1] input range.
  const slot = 1 / total;
  const isLast = i === total - 1;
  const coverStart = isLast ? 0 : (i + 1) * slot;
  const coverEnd = isLast ? 1 : Math.min(1, coverStart + slot);
  const scale = useTransform(
    progress,
    [coverStart, 1],
    [1, isLast ? 1 : 1 - (total - 1 - i) * 0.05],
  );
  const opacity = useTransform(
    progress,
    [coverStart, coverEnd],
    [1, isLast ? 1 : 0.45],
  );

  return (
    <div
      className="sticky"
      style={{ top: `calc(var(--nav-height) + ${40 + i * 24}px)` }}
    >
      <motion.div
        style={{ scale, opacity, transformOrigin: "top center" }}
        className="mb-[16vh]"
      >
        <CardBody item={item} i={i} />
      </motion.div>
    </div>
  );
}

function CardBody({ item, i }: { item: StackCardData; i: number }) {
  return (
    <div
      data-spotlight
      className="relative p-8 md:p-12 rounded-3xl overflow-hidden"
      style={{
        background: "var(--surface-1)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-xl)",
      }}
    >
      <div className="flex items-start justify-between gap-6 mb-6">
        <span
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{
            background: "var(--brand-soft)",
            color: "var(--brand)",
            border: "1px solid var(--brand-border)",
          }}
        >
          {item.icon}
        </span>
        <span
          className="brand-mono text-[11px]"
          style={{ color: "var(--text-muted)" }}
        >
          {item.index ?? String(i + 1).padStart(2, "0")}
        </span>
      </div>
      <h3
        className="heading-section text-h3 mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        {item.title}
      </h3>
      <p className="text-body text-base md:text-lg max-w-2xl">
        {item.description}
      </p>
    </div>
  );
}
