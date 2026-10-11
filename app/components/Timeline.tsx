"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Experience } from "@/data/experience";
import { ease } from "@/lib/motion";

interface TimelineProps {
  items: Experience[];
}

/**
 * Experience timeline whose spine draws itself as the user scrolls down,
 * with a glowing head that tracks the reading position.
 */
export default function Timeline({ items }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.7"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const lineScale = reduce ? 1 : progress;
  const headTop = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative">
      {/* Static track */}
      <div
        className="absolute left-[7px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px"
        style={{ background: "var(--border)" }}
        aria-hidden
      />
      {/* Drawn line */}
      <motion.div
        className="absolute left-[7px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px origin-top"
        style={{
          scaleY: lineScale,
          background: "var(--text-primary)",
        }}
        aria-hidden
      />
      {/* Glowing head */}
      {!reduce && (
        <motion.div
          className="absolute left-[7px] md:left-1/2 w-3 h-3 -ml-[5.5px] -mt-1.5 rounded-full"
          style={{
            top: headTop,
            background: "var(--brand)",
            boxShadow: "0 0 18px 4px var(--brand-soft), 0 0 6px var(--brand)",
          }}
          aria-hidden
        />
      )}

      {items.map((item, index) => (
        <TimelineItem key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}

function TimelineItem({ item, index }: { item: Experience; index: number }) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const isLeft = index % 2 === 0;
  const founding = item.type === "founding";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: ease.out }}
      className={`relative flex items-start gap-8 mb-16 md:mb-24 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Dot */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 18,
            delay: 0.3,
          }}
          className="w-[14px] h-[14px] rounded-full border-2"
          style={{
            borderColor: founding ? "var(--brand)" : "var(--text-muted)",
            background: founding ? "var(--brand)" : "var(--surface-0)",
          }}
        />
      </div>

      {/* Content */}
      <div
        className={`flex-1 pl-10 md:pl-0 ${isLeft ? "md:pr-16 md:text-right" : "md:pl-16"}`}
      >
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: ease.out }}
          data-spotlight
          className="md:max-w-md p-6 rounded-2xl card-lift"
          style={{
            marginLeft: isLeft ? "auto" : undefined,
            background: "var(--surface-1)",
            border: "1px solid var(--border)",
          }}
        >
          <span
            className="inline-block brand-mono text-[9px] font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-sm mb-4"
            style={{
              color: founding ? "var(--brand)" : "var(--text-tertiary)",
              background: founding ? "var(--brand-soft)" : "var(--surface-2)",
              border: `1px solid ${founding ? "var(--brand-border)" : "var(--border)"}`,
            }}
          >
            {item.type}
          </span>

          <h3
            className="text-2xl font-bold tracking-tight mb-2 leading-none"
            style={{ color: "var(--text-primary)" }}
          >
            {item.role}
          </h3>
          <p
            className="text-[15px] font-semibold mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            {item.company}
          </p>
          <div
            className={`flex flex-wrap items-center gap-x-3 gap-y-1 mb-6 ${isLeft ? "md:justify-end" : ""}`}
          >
            <span
              className="brand-mono text-[10px] font-bold uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              {item.period}
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
            <span
              className="brand-mono text-[10px] font-bold uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              {item.location}
            </span>
          </div>

          <p className="text-[14px] leading-relaxed text-body mb-6">
            {item.description}
          </p>

          <ul className="space-y-3 mb-8">
            {item.achievements.slice(0, 3).map((achievement, i) => (
              <li
                key={i}
                className={`text-[13px] leading-relaxed flex items-start gap-3 ${isLeft ? "md:flex-row-reverse md:text-right" : ""}`}
                style={{ color: "var(--text-secondary)" }}
              >
                <span
                  className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: "var(--brand)" }}
                />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>

          <div
            className={`flex flex-wrap gap-2 ${isLeft ? "md:justify-end" : ""}`}
          >
            {item.techStack.map((tech) => (
              <span
                key={tech}
                className="brand-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm"
                style={{
                  color: "var(--text-secondary)",
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="hidden md:block flex-1" />
    </motion.div>
  );
}
