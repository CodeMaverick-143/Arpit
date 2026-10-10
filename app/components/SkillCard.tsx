"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Skill } from "@/data/skills";
import { useIsTouch } from "@/hooks/useIsTouch";
import { ease } from "@/lib/motion";
import TechIcon from "./TechIcon";

// Monochrome: variants only differ in proficiency width; colour comes from the theme
const variantConfig: Record<
  Skill["colorVariant"],
  { color: string; width: string }
> = {
  emerald: { color: "var(--text-primary)", width: "92%" },
  blue: { color: "var(--text-primary)", width: "84%" },
  violet: { color: "var(--text-secondary)", width: "76%" },
  amber: { color: "var(--text-secondary)", width: "68%" },
  slate: { color: "var(--text-tertiary)", width: "60%" },
};

const proofIcons: Record<string, string> = {
  Production: "●",
  "Built Projects": "◈",
  "Open Source": "⬡",
  "Used in Startup": "▲",
  Learning: "◎",
};

interface SkillCardProps {
  skill: Skill;
  index: number;
}

/**
 * 3D flip card with the technology's original logo. Front: logo tile,
 * name, proof and proficiency bar. Back: large logo in brand colour plus
 * what it was used for. Hover flips on desktop; tap toggles on touch.
 */
export default function SkillCard({ skill, index }: SkillCardProps) {
  const config = variantConfig[skill.colorVariant];
  const isTouch = useIsTouch();
  const [flipped, setFlipped] = useState(false);
  const iconName = skill.icon ?? skill.name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: Math.min(index, 6) * 0.04,
        ease: ease.out,
      }}
      className={`flip-card h-[148px] ${flipped ? "is-flipped" : ""}`}
    >
      <button
        type="button"
        onClick={() => isTouch && setFlipped((f) => !f)}
        aria-pressed={isTouch ? flipped : undefined}
        aria-label={`${skill.name}: ${skill.detail}. ${skill.proof}`}
        className="flip-card-inner group w-full h-full text-left cursor-default rounded-xl"
      >
        {/* Front */}
        <div
          data-spotlight
          className="flip-card-face rounded-xl p-4 flex flex-col overflow-hidden"
          style={{
            background: "var(--surface-1)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3 min-w-0">
              {/* Logo tile */}
              <span
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                }}
              >
                <TechIcon name={iconName} size={22} label={skill.name} />
              </span>
              <div className="min-w-0">
                <h4
                  className="text-[13px] font-bold tracking-tight truncate leading-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {skill.name}
                </h4>
                <span
                  className="brand-mono text-[9px] font-bold uppercase tracking-wider block mt-0.5 truncate"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span className="mr-1" style={{ color: config.color }}>
                    {proofIcons[skill.proof] || "●"}
                  </span>
                  {skill.proof}
                </span>
              </div>
            </div>
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
              style={{
                background: config.color,
                boxShadow: "0 0 10px var(--brand-soft)",
              }}
            />
          </div>

          <p
            className="text-[11px] leading-relaxed font-medium line-clamp-2"
            style={{ color: "var(--text-tertiary)" }}
          >
            {skill.detail}
          </p>

          <div className="flex items-center gap-3 mt-auto pt-3">
            <div
              className="flex-1 h-[1.5px] rounded-full overflow-hidden"
              style={{ background: "var(--surface-3)" }}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: config.width }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + Math.min(index, 6) * 0.04,
                  ease: ease.out,
                }}
                className="h-full rounded-full"
                style={{ background: config.color }}
              />
            </div>
            <span
              className="brand-mono text-[8px] uppercase tracking-wider opacity-40"
              style={{ color: "var(--text-muted)" }}
            >
              {isTouch ? "tap" : "hover"} ↻
            </span>
          </div>
        </div>

        {/* Back */}
        <div
          className="flip-card-face flip-card-back rounded-xl p-4 flex gap-4 overflow-hidden"
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--brand-border)",
          }}
        >
          {/* Large original-colour logo */}
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 self-center"
            style={{
              background: "var(--surface-1)",
              border: "1px solid var(--border)",
            }}
          >
            <TechIcon name={iconName} size={36} color label={skill.name} />
          </div>
          <div className="flex flex-col justify-between min-w-0 flex-1">
            <div>
              <span
                className="brand-mono text-[9px] font-bold uppercase tracking-[0.2em] block mb-1.5"
                style={{ color: "var(--text-tertiary)" }}
              >
                Used for
              </span>
              <p
                className="text-[12px] leading-relaxed font-medium line-clamp-3"
                style={{ color: "var(--text-primary)" }}
              >
                {skill.detail}
              </p>
            </div>
            <div className="flex items-center justify-between gap-2 mt-2">
              <span
                className="brand-mono text-[9px] uppercase tracking-wider truncate"
                style={{ color: "var(--text-tertiary)" }}
              >
                {skill.proof}
              </span>
              <span
                className="text-[12px] font-bold tracking-tight truncate"
                style={{ color: "var(--text-secondary)" }}
              >
                {skill.name}
              </span>
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
}
