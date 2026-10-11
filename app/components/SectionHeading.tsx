"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ease } from "@/lib/motion";
import ScrambleText from "./ScrambleText";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Use the terminal decode effect on the title */
  scramble?: boolean;
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "left",
  scramble = true,
}: SectionHeadingProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`mb-16 ${align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}`}
    >
      {label && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: ease.out }}
          className={`flex items-center gap-3 mb-6 ${align === "center" ? "justify-center" : ""}`}
        >
          <div className="w-8 h-px" style={{ background: "var(--brand)" }} />
          <span
            className="brand-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em]"
            style={{ color: "var(--text-tertiary)" }}
          >
            {label}
          </span>
        </motion.div>
      )}
      {scramble ? (
        <ScrambleText
          as="h2"
          text={title}
          className="heading-section text-h2 mb-6 tracking-tight"
          style={{ color: "var(--text-primary)" }}
        />
      ) : (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: ease.out }}
          className="heading-section text-h2 mb-6 tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </motion.h2>
      )}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: ease.out }}
          className={`text-body text-base md:text-lg leading-relaxed max-w-xl ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
